import Image from "next/image";
import dfkLogo from "../public/dfklogo.png";

type MyProps = {
  order?: boolean;
  title: string;
  summary: string;
};

export default function ImageRead(props: MyProps) {
  return (
    <div className="h-[500px] flex flex-row w-full gap-20">
      <div className={`w-[700px] min-w-[700px] max-w-[700px] h-full flex-grow relative overflow-hidden ${props.order ? 'order-1': 'order-0'}`}>
        <Image src={dfkLogo} alt="test" className="bg-[#676767] object-cover" fill/>
      </div>
      <div className={`flex flex-col flex-grow text-white ${props.order ? 'order-0': 'order-1 text-left' }`}>
        <h1 className="54442 font-extrabold text-5xl">{props.title}</h1>
        <p className="text-2xl" >{props.summary}</p>
      </div>
    </div>
  );
}
