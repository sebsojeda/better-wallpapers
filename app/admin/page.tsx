import { redirect } from "next/navigation";

import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import ImageUpload from "../components/ImageUpload";

export default async function Admin() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <main>
      <div className="flex flex-col mx-auto max-w-4xl items-center">
        <div>
          <ImageUpload />
        </div>
      </div>
    </main>
  );
}
