variable "aws_region" {
  description = "AWS region for all resources."
  type        = string
  default     = "us-east-1"
}

variable "aws_bucket" {
  description = "AWS bucket for all lambdas."
  type        = string
  default     = "better-wallpapers"
}
