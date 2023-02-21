import { NextPage } from "next";

const Wedstrijdblad: NextPage = () => {
    return (
        <div className="text-white">
            <div className="grid grid-cols-2 bg-nav-background children:border children:pl-5 children:py-2">
                <p className="col-span-2 text-center font-semibold text-2xl pl-0">Reeks: Competitie 2022 - 2023 - Provinciaal Speeldag: Speeldag 01 Datum: 30-09-2022</p>
                <p className="font-semibold">THUISSPELERS: DFK 1</p>
                <p className="font-semibold">BEZOEKERS: DFK 2</p>
                <p className="bg-background">NAAM EN VOORNAAM</p>
                <p className="bg-background">NAAM EN VOORNAAM</p>
                {
                    [...Array(12)].map((e, i) => {
                        return (
                            <>
                                <p>{i+1}. Naam Voornaam</p>
                                <p>{i+1}. Naam Voornaam</p>
                            </>
                        )
                    })
                }
            </div>

            <div className="grid grid-cols-12 bg-nav-background children:border children:py-2 children:text-center">
                <p className="col-span-5 bg-background">NAAM EN VOORNAAM</p>
                <p className="col-span-2 bg-background">UITSLAG</p>
                <p className="col-span-5 bg-background">NAAM EN VOORNAAM</p>

                <p>180</p>
                <p className="col-span-2">ENKELSPELEN</p>
                <p>KLEG</p>
                <p>H.U.</p>
                <p className="col-span-2">Best of 7 - 501</p>
                <p>H.U.</p>
                <p>KLEG</p>
                <p className="col-span-2">ENKELSPELEN</p>
                <p>180</p>

                <p>1</p>
                <p className="col-span-2">Naam Voornaam</p>
                <p>0</p>
                <p>0</p>
                <p>0</p>
                <p>0</p>
                <p>0</p>
                <p>0</p>
                <p className="col-span-2">Naam Voornaam</p>
                <p>1</p>

                <p>1</p>
                <p className="col-span-2">Naam Voornaam</p>
                <p>0</p>
                <p>0</p>
                <p>0</p>
                <p>0</p>
                <p>0</p>
                <p>0</p>
                <p className="col-span-2">Naam Voornaam</p>
                <p>1</p>

                <p>180</p>
                <p className="col-span-2">DUBBELS</p>
                <p>KLEG</p>
                <p>H.U.</p>
                <p className="col-span-2">Best of 5 - 701</p>
                <p>H.U.</p>
                <p>KLEG</p>
                <p className="col-span-2">DUBBELS</p>
                <p>180</p>

                <p>1</p>
                <p className="col-span-2">Naam Voornaam</p>
                <p>0</p>
                <p>0</p>
                <p className="row-span-2">0</p>
                <p className="row-span-2">0</p>
                <p>0</p>
                <p>0</p>
                <p className="col-span-2">Naam Voornaam</p>
                <p>1</p>

                <p>1</p>
                <p className="col-span-2">Naam Voornaam</p>
                <p>0</p>
                <p>0</p>
                <p>0</p>
                <p>0</p>
                <p className="col-span-2">Naam Voornaam</p>
                <p>1</p>

                <p>1</p>
                <p className="col-span-2">Naam Voornaam</p>
                <p>0</p>
                <p>0</p>
                <p className="row-span-2">0</p>
                <p className="row-span-2">0</p>
                <p>0</p>
                <p>0</p>
                <p className="col-span-2">Naam Voornaam</p>
                <p>1</p>

                <p>1</p>
                <p className="col-span-2">Naam Voornaam</p>
                <p>0</p>
                <p>0</p>
                <p>0</p>
                <p>0</p>
                <p className="col-span-2">Naam Voornaam</p>
                <p>1</p>

                <p>180</p>
                <p className="col-span-2">ENKELSPELEN</p>
                <p>KLEG</p>
                <p>H.U.</p>
                <p className="col-span-2">Best of 7 - 501</p>
                <p>H.U.</p>
                <p>KLEG</p>
                <p className="col-span-2">ENKELSPELEN</p>
                <p>180</p>

                <p>1</p>
                <p className="col-span-2">Naam Voornaam</p>
                <p>0</p>
                <p>0</p>
                <p>0</p>
                <p>0</p>
                <p>0</p>
                <p>0</p>
                <p className="col-span-2">Naam Voornaam</p>
                <p>1</p>

                <p>1</p>
                <p className="col-span-2">Naam Voornaam</p>
                <p>0</p>
                <p>0</p>
                <p>0</p>
                <p>0</p>
                <p>0</p>
                <p>0</p>
                <p className="col-span-2">Naam Voornaam</p>
                <p>1</p>

                <p className="col-span-5 border-b-0">Notities</p>
                <p className="col-span-2">EINDUITSLAG</p>
                <p className="col-span-5 border-b-0">Notities</p>

                <p className="col-span-5 py-10 border-y-0"></p>
                <p className="col-span-1">4</p>
                <p className="col-span-1">6</p>
                <p className="col-span-5 border-y-0"></p>

                <div className="col-span-12">
                    <p>Definitief Opslaan</p>
                    <input type="checkbox" name="" id="" />
                </div>
                <a href="" className="col-span-12">Opslaan</a>
            </div>
        </div>
    );
}

export default Wedstrijdblad;