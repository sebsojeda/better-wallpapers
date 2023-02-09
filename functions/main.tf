terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws",
      version = "~> 4.0.0"
    }
    archive = {
      source  = "hashicorp/archive"
      version = "~> 2.2.0"
    }
  }

  required_version = "~> 1.0"

  backend "s3" {
    bucket = "better-wallpapers"
    key    = "terraform.tfstate"
    region = "us-east-1"
  }
}

provider "aws" {
  region = var.aws_region
}

data "archive_file" "lambda_process_image" {
  type = "zip"

  source_dir  = "${path.module}/process-image"
  output_path = "${path.module}/process-image.zip"
}

resource "aws_s3_object" "lambda_process_image" {
  bucket = var.aws_bucket

  key    = "process-image.zip"
  source = data.archive_file.lambda_process_image.output_path

  etag = filemd5(data.archive_file.lambda_process_image.output_path)
}

resource "aws_lambda_function" "process_image" {
  function_name = "ProcessImage"

  s3_bucket = var.aws_bucket
  s3_key    = aws_s3_object.lambda_process_image.key

  handler = "index.handler"
  runtime = "nodejs14.x"
  timeout = 120

  source_code_hash = data.archive_file.lambda_process_image.output_base64sha256

  role = aws_iam_role.lambda_exec.arn
}

resource "aws_cloudwatch_log_group" "process_image" {
  name = "/aws/lambda/${aws_lambda_function.process_image.function_name}"

  retention_in_days = 30
}

resource "aws_iam_role" "lambda_exec" {
  name = "serverless_lambda"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Sid    = ""
      Principal = {
        Service = "lambda.amazonaws.com"
      }
      }
    ]
  })

}

resource "aws_iam_role_policy_attachment" "lambda_policy" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_apigatewayv2_api" "lambda" {
  name          = "serverless_lambda_gw"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_stage" "lambda" {
  api_id = aws_apigatewayv2_api.lambda.id

  name        = "serverless_lambda_stage"
  auto_deploy = true

  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.api_gw.arn

    format = jsonencode({
      requestId               = "$context.requestId"
      sourceIp                = "$context.identity.sourceIp"
      requestTime             = "$context.requestTime"
      protocol                = "$context.protocol"
      httpMethod              = "$context.httpMethod"
      resourcePath            = "$context.resourcePath"
      routeKey                = "$context.routeKey"
      status                  = "$context.status"
      responseLength          = "$context.responseLength"
      integrationErrorMessage = "$context.integrationErrorMessage"
      }
    )
  }
}

resource "aws_apigatewayv2_integration" "process_image" {
  api_id = aws_apigatewayv2_api.lambda.id

  integration_uri    = aws_lambda_function.process_image.invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
}

resource "aws_apigatewayv2_route" "process_image" {
  api_id = aws_apigatewayv2_api.lambda.id

  route_key = "POST /process-image"
  target    = "integrations/${aws_apigatewayv2_integration.process_image.id}"
}

resource "aws_cloudwatch_log_group" "api_gw" {
  name = "/aws/api_gw/${aws_apigatewayv2_api.lambda.name}"

  retention_in_days = 30
}

resource "aws_lambda_permission" "api_gw" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.process_image.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_apigatewayv2_api.lambda.execution_arn}/*/*"
}

