'use client'

import Link from "next/link";
// import ImagePicker from "./ui/ImagePicker";

export default function Home() {
  return (
    <div className="flex-col gap-8">
      <div className="mb-8">
        <h1 className="text-4xl uppercase font-black">Welcome to the future of workout apps.</h1>
        <sub className="text-xs text-red-600 uppercase font-black relative -top-2">*Or whatever is clever</sub>
        <p className="text-2xl font-bold mt-8">Tired of paying for apps or a coach? Well why wait. We got what you need right here.</p>
        <p className="text-xl">Curated by our own expert* staff. And look at how not a shrimp they are!</p>
      </div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold">So what&apos;s the catch?</h2>
        <p className="text-xl">No catch. I update this when I get inspiration. We have a whole roadmap. See it here <Link href={'/roadmap'} className="underline text-emerald-600 hover:no-underline hover:text-emerald-800">Roadmap</Link></p>
      </div>
      <div>
        <h2 className="text-3xl font-bold">Now lets get fit!</h2>
      </div>
      {/* <ImagePicker id="previewThumbnail" /> */}
    </div>
  );
}
