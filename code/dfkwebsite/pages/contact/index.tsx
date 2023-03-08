import { NextPage } from "next";
import Faq from "../../components/Faq";

const Contact: NextPage = () => {
  return (
    <div>
      <h1 className="text-6xl font-extrabold text-white mb-5">
        Contact pagina
      </h1>

      <h2 className="text-4xl font-semibold text-white my-10">FAQ</h2>

      <div className="flex flex-col gap-5">
        <Faq question="testquestion" answer="testanswer" />
        <Faq question="testquestion" answer="testanswer" />
      </div>
    </div>
  );
}

export default Contact;
