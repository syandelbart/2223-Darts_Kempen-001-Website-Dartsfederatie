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
        <Faq question="Vraag" answer="Antwoord" />
        <Faq question="Vraag" answer="Antwoord" />
      </div>

      <div className="text-white my-20">
        <h2 className="text-4xl font-semibold mb-10">Contacteer ons</h2>
        <form action="" className="flex flex-col gap-5 w-8/12">
          <div className="flex gap-10">
            <div className="flex flex-col gap-1 w-1/2">
              <label htmlFor="afzender">Afzender</label>
              <input type="text" name="afzender" id="afzender" className="bg-nav-background rounded" />
            </div>
            <div className="flex flex-col gap-1 w-1/2">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="afzemailender" className="bg-nav-background rounded" />
            </div>
          </div>
          <div className="flex gap-10">
            <div className="flex flex-col gap-1 w-1/2">
              <label htmlFor="aan">Aan</label>
              <select name="aan" id="aan" className="bg-nav-background rounded">
                <option value="1">Voorzitter (Wim Oeyen)</option>
                <option value="2">Secretaris (Pieter Fransen)</option>
                <option value="3">Penningmeester (Annelies Cox)</option>
                <option value="4">Wedstrijdleiding (Kurt Schepers)</option>
                <option value="5">Wedstrijdleiding Finales (Mario Vangeel)</option>
                <option value="6">Sportieve Cel/Standenkeuring (Willy Cremers)</option>
                <option value="7">Ledenbeweging (Jos Vanbergen)</option>
                <option value="8">Volledig DFK Bestuur</option>
              </select>
            </div>
            <div className="flex flex-col gap-1 w-1/2">
              <label htmlFor="onderwerp">Onderwerp</label>
              <input type="text" name="onderwerp" id="onderwerp" className="bg-nav-background rounded" />
            </div>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="bericht">Bericht</label>
            <textarea name="bericht" id="bericht" cols={30} rows={10} className="bg-nav-background rounded" />
          </div>
          <div className="flex items-center gap-5">
            <label htmlFor="kopie">Stuur mij een kopie</label>
            <input type="checkbox" name="kopie" id="kopie" className="bg-nav-background rounded" />
          </div>
          <button type="submit" className="bg-nav-background px-10 py-2 rounded w-1/3">Verstuur</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
