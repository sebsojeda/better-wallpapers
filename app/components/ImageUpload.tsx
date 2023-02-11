"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { z, ZodError } from "zod";

const validateSchema = z.object({
  authorName: z.string().min(1, "Author name is required"),
  authorUrl: z.string().url("Author url is invalid"),
  tags: z.string().min(1, "At least one tag is required"),
});

export default function ImageUpload() {
  const [uploading, setUploading] = useState(false);
  const [authorName, setAuthorName] = useState("");
  const [authorUrl, setAuthorUrl] = useState("");
  const [tags, setTags] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSlectedFile] = useState<File>();
  const [error, setError] = useState("");

  async function handleUpload(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUploading(true);

    try {
      if (!selectedFile) {
        throw new Error("Image is required");
      }

      validateSchema.parse({ authorName, authorUrl, tags });

      setError("");

      const form = new FormData();
      form.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET!);
      form.append("file", selectedFile);

      const upload = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_URL!, {
        method: "POST",
        body: form,
      });

      if (!upload.ok) {
        throw new Error("Unable to upload image");
      }

      const { public_id: externalId, version: externalVersion } =
        await upload.json();

      const save = await fetch("api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          authorName,
          authorUrl,
          tags,
          externalId,
          externalVersion,
        }),
      });

      if (!save.ok) {
        throw new Error("Unable to save image data");
      }

      setAuthorName("");
      setAuthorUrl("");
      setTags("");
      setSelectedImage("");
      setSlectedFile(undefined);
      setUploading(false);
    } catch (err) {
      if (err instanceof ZodError) {
        setError(err.errors[0].message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
      setUploading(false);
    }
  }

  return (
    <>
      <form onSubmit={handleUpload} className="inline-flex flex-col space-y-6">
        <label>
          Author Name:
          <input
            type="text"
            name="authorName"
            placeholder="Steve Jobs"
            className="border rounded p-1 w-full"
            value={authorName}
            onChange={({ target }) => setAuthorName(target.value)}
          />
        </label>
        <label>
          Author URL:
          <input
            type="text"
            name="authorUrl"
            placeholder="http://example.com"
            className="border rounded p-1 w-full"
            value={authorUrl}
            onChange={({ target }) => setAuthorUrl(target.value)}
          />
        </label>
        <label>
          Tags:
          <input
            type="text"
            name="tags"
            placeholder="editorial"
            className="border rounded p-1 w-full"
            value={tags}
            onChange={({ target }) => setTags(target.value)}
          />
        </label>
        <label>
          <input
            type="file"
            name="image"
            accept="image/jpeg,image/png"
            hidden
            onChange={({ target }) => {
              if (target.files) {
                const file = target.files[0];
                setSelectedImage(URL.createObjectURL(file));
                setSlectedFile(file);
              }
            }}
          />
          <div className="w-[450px] h-[300px] border-2 border-dashed rounded flex items-center justify-center hover:cursor-pointer">
            {selectedImage ? (
              <Image
                className="object-contain w-[450px] h-[300px]"
                src={selectedImage}
                width={300}
                height={450}
                alt={selectedFile!.name}
                title={selectedFile!.name}
              />
            ) : (
              <span>Select Image</span>
            )}
          </div>
        </label>

        <button
          type="submit"
          disabled={uploading}
          className={`${
            uploading ? "opacity-50" : "opacity-100"
          } bg-red-500 text-white p-3 w-32 rounded`}
        >
          {uploading ? "Uploading" : "Upload"}
        </button>
      </form>
      <div className={`pt-5 text-red-500 ${!!error ? "block" : "hidden"}`}>
        {error}
      </div>
    </>
  );
}
