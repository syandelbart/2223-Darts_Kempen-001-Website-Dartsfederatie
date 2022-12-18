import Image from "next/image";
import dfkLogo from "../public/dfklogo.png";
import Link from "next/link";

type MyProps = {
  order?: boolean;
  title: string;
  summary: string;
  src?: string;
  date: number;
};

export default function ImageRead(props: MyProps) {
  return (
    <div className="h-[400px] flex flex-row w-full gap-20 mb-10">
      <div className={`w-[700px] min-w-[700px] max-w-[700px] h-full flex-grow relative overflow-hidden ${props.order ? 'order-1': 'order-0'}`}>
        <Image src={dfkLogo} alt="test" className="bg-[#676767] object-cover" fill/>
      </div>
      <div className={`flex flex-col flex-grow text-white ${props.order ? 'order-0': 'order-1 text-left' }`}>
        <h1 className=" font-extrabold text-5xl mb-1">{props.title}</h1>
        <h6 className="text-white text-sm mb-6">{(new Date(props.date)).toLocaleDateString()}</h6>
        <p className="text-2xl" >{props.summary}</p>

        <Link className="text-black w-fit text-2xl py-6 px-10 mt-12 bg-blue-50 hover:bg-gray-300" href={`/info/nieuws/${props.title.toLowerCase().replace(" ","-")}`}>
          Lees meer
        </Link>
      </div>
    </div>
  );
}
