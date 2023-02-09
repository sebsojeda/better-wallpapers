import Image from "next/image";

async function getRandomWallpaper() {
  const res = await fetch(
    `https://www.betterwallpapers.app/api/random?tag=editorial`
  );
  const data = await res.json();
  return data;
}

export default async function Home() {
  const randomImage = await getRandomWallpaper();
  console.log(randomImage);

  return (
    <main>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-black">
          <Image src={"/home.jpg"} width={450} height={300} alt="" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">
            Beautiful, high-resolution desktop wallpapers for MacOS.
          </h1>
        </div>
      </div>
    </main>
  );
}
