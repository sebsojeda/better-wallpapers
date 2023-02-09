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

  handler     = "index.handler"
  runtime     = "nodejs14.x"
  timeout     = 180
  memory_size = 512

  source_code_hash = data.archive_file.lambda_process_image.output_base64sha256

  role = aws_iam_role.lambda_exec.arn

  environment {
    variables = {
      QSTASH_CURRENT_SIGNING_KEY = var.qstash_current_signing_key
      QSTASH_NEXT_SIGNING_KEY    = var.qstash_next_signing_key
    }
  }
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
