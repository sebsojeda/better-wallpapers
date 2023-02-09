import { encode } from "blurhash";
import pixels from "image-pixels";

/**
 * Calculates the blurhash of an uploaded image.
 *
 * @param {import("aws-lambda").APIGatewayProxyEventV2} event
 */
export async function handler(event) {
  let body;

  try {
    body = JSON.parse(event.body);
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Unable to parse JSON request body" }),
    };
  }

  if (!body.filepath) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "Key 'filepath' missing from request body",
      }),
    };
  }

  const { data, width, height } = await pixels(body.filepath);
  const blurHash = encode(data, width, height, 4, 3);

  return {
    statusCode: 200,
    body: JSON.stringify({ blurHash }),
  };
}
