import { encode } from "blurhash";
import pixels from "image-pixels";
import { createHash, createHmac } from "node:crypto";

/**
 * Calculates the blurhash of an uploaded image.
 *
 * @param {import("aws-lambda").APIGatewayEvent} event
 * @param {import("aws-lambda").Context} context
 */
export async function handler(event, context) {
  console.log(event);
  const signature = event.headers["upstash-signature"];
  const currentSigningKey = process.env["QSTASH_CURRENT_SIGNING_KEY"];
  const nextSigningKey = process.env["QSTASH_NEXT_SIGNING_KEY"];
  const url = `https://${event.requestContext.domainName}`;

  try {
    await verify(signature, currentSigningKey, event.body, url).catch((err) => {
      console.error(
        `Failed to verify signature with current signing key: ${err}`
      );
      return verify(signature, nextSigningKey, event.body, url);
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

  if (!!!body.imageUrl || !!!body.imageId) {
    return {
      statusCode: 400,
      body: "Expected key missing from request body",
    };
  }

  const { imageUrl, imageId } = body;
  const { data, width, height } = await pixels(imageUrl);
  const blurHash = encode(data, width, height, 4, 3);

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ blurHash, imageId }),
  };
}

/**
 * @param {string} jwt - The content of the `upstash-signature` header
 * @param {string} signingKey - The signing key to use to verify the signature (Get it from Upstash Console)
 * @param {string?} body - The raw body of the request
 * @param {string} url - The public URL of the lambda function
 */
async function verify(jwt, signingKey, body, url) {
  const split = jwt.split(".");
  if (split.length != 3) {
    throw new Error("Invalid JWT");
  }
  const [header, payload, signature] = split;

  if (
    signature !=
    createHmac("sha256", signingKey)
      .update(`${header}.${payload}`)
      .digest("base64url")
  ) {
    throw new Error("Invalid JWT signature");
  }

  // Now the jwt is verified and we can start looking at the claims in the payload
  const p = JSON.parse(Buffer.from(payload, "base64url").toString());

  if (p.iss !== "Upstash") {
    throw new Error(`invalid issuer: ${p.iss}, expected "Upstash"`);
  }
  if (p.sub !== url) {
    throw new Error(`invalid subject: ${p.sub}, expected "${url}"`);
  }

  const now = Math.floor(Date.now() / 1000);
  if (now > p.exp) {
    throw new Error("token has expired");
  }
  if (now < p.nbf) {
    throw new Error("token is not yet valid");
  }

  if (body != null) {
    if (
      p.body.replace(/=+$/, "") !=
      createHash("sha256").update(body).digest("base64url")
    ) {
      throw new Error("body hash does not match");
    }
  }
}
