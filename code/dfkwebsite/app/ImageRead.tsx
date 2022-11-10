import Image from "next/image";
import dfkLogo from "../public/dfklogo.png";

type MyProps = {
  order?: boolean;
};

export default function ImageRead(props: MyProps) {
  return (
    <div className="h-96 flex ">
      <div className="w-[800px] h-[500px] relative flex-grow">
        <Image src={dfkLogo} alt="test" className="bg-[#676767] object-cover" fill/>
      </div>
      <div className="flex">
        <h1>Test</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>

      </div>
    </div>
  );
}
