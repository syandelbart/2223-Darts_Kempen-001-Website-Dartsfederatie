import Image from "next/image";
import dfkLogo from "../public/dfklogo.png";
import Link from "next/link";
import { FunctionComponent } from "react";

type imageData = {
  order?: boolean;
  title: string;
  summary: string;
  src?: string;
  date: number;
};

const ImageRead: FunctionComponent<imageData> = (imageData: imageData) => {
  return (
    <div className="flex flex-row w-full flex-wrap gap-5 sm:gap-20 mb-10">
      <Image
        src={dfkLogo}
        alt="test"
        className={`bg-light-gray object-cover max-w-full  relative overflow-hidden aspect-video ${
          imageData.order ? "md:order-1" : "md:order-0"
        }`}
        height={400}
        width={700}
      />
      <div
        className={`flex flex-col flex-grow text-white ${
          imageData.order ? "order-0" : "order-1 text-left"
        }`}
      >
        <h1 className=" font-extrabold text-4xl sm:text-5xl mb-1">
          {imageData.title}
        </h1>
        <h6 className="text-white text-sm mb-6">
          {new Date(imageData.date).toLocaleDateString("nl-BE", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </h6>
        <p className="text-xl sm:text-2xl">{imageData.summary}</p>

        <Link
          className="text-black w-fit text-xl sm:text-2xl py-4 sm:py-6 px-6 sm:px-10 mt-4 sm:mt-12 bg-blue-50 hover:bg-gray-300"
          href={`/info/nieuws/${imageData.title
            .toLowerCase()
            .replace(" ", "-")}`}
        >
          Lees meer
        </Link>
      </div>
    </div>
  );
};

export default ImageRead;
