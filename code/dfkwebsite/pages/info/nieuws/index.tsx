import { NextPage } from "next";
import { createNews } from "../../../data";

const Nieuws: NextPage = () => {
    return (
        <h1 className="text-6xl font-extrabold text-white mb-5" onClick={() => createNews()}>Nieuws</h1>
    );
  };
export default Nieuws;