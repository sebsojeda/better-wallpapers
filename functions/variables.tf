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

variable "qstash_current_signing_key" {
  description = "QStash current signing key."
  type        = string
  sensitive   = true
}

variable "qstash_next_signing_key" {
  description = "QStash next signing key."
  type        = string
  sensitive   = true
}
