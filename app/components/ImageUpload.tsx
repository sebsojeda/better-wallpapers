"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { z } from "zod";

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

    if (!selectedFile) {
      setError("No image is attached");
      setUploading(false);
      return;
    }

    try {
      validateSchema.parse({ authorName, authorUrl, tags });
    } catch (err: any) {
      setError(err.errors[0].message);
      setUploading(false);
      return;
    }

    setError("");

    try {
      const form = new FormData();
      form.append("authorName", authorName);
      form.append("authorUrl", authorUrl);
      form.append("tags", tags);
      form.append("image", selectedFile);

      const res = await fetch("api/upload", {
        method: "POST",
        body: form,
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error);
      }
      setAuthorName("");
      setAuthorUrl("");
      setTags("");
      setSelectedImage("");
      setSlectedFile(undefined);
    } catch {
      setError("An unexpected error occurred");
    }
    setUploading(false);
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
