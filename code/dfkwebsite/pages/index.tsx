import ImageRead from '../components/ImageRead';
import { NextPage } from "next";

const HomePage: NextPage = () => {
  return (
    <div>
      <ImageRead title="This is a title" summary="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " date={1}/>
      <ImageRead title="This is a title" summary="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,  quis nostrud exercitation ullamco laboris..." order={true} date={1}/>
      <div>
        <h1 className=" font-extrabold text-5xl mb-1 text-white">Toernooi in de kijker</h1>
        <div className="min-h-[200vh] w-full bg-[#676767]"></div>
      </div>
    </div>
  );
}

export default HomePage;