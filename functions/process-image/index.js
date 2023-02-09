import { Receiver } from "@upstash/qstash";
import { encode } from "blurhash";
import pixels from "image-pixels";

const r = new Receiver({
  currentSigningKey: process.env["QSTASH_CURRENT_SIGNING_KEY"],
  nextSigningKey: process.env["QSTASH_NEXT_SIGNING_KEY"],
});

/**
 * Calculates the blurhash of an uploaded image.
 *
 * @param {import("aws-lambda").APIGatewayProxyEventV2} event
 */
export async function handler(event) {
  try {
    await r.verify({
      signature: event.headers["upstash-signature"],
      body: event.body,
      url: `https://${event.requestContext.domainName}`,
    });
  } catch (err) {
    return {
      statusCode: 400,
      body: err instanceof Error ? err.toString() : err,
    };
  }

  let body;

  try {
    body = JSON.parse(event.body);
  } catch {
    return {
      statusCode: 400,
      body: "Unable to parse JSON request body",
    };
  }

  if (!body.imageUrl) {
    return {
      statusCode: 400,
      body: "Key 'imageUrl' missing from request body",
    };
  }

  const { data, width, height } = await pixels(body.imageUrl);
  const blurHash = encode(data, width, height, 4, 3);

  return {
    statusCode: 200,
    body: JSON.stringify({ blurHash }),
  };
}
