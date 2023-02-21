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
                <p>1. Naam Voornaam</p>
                <p>1. Naam Voornaam</p>
                <p>2. Naam Voornaam</p>
                <p>2. Naam Voornaam</p>
                <p>3. Naam Voornaam</p>
                <p>3. Naam Voornaam</p>
                <p>4. Naam Voornaam</p>
                <p>4. Naam Voornaam</p>
                <p>5. Naam Voornaam</p>
                <p>5. Naam Voornaam</p>
                <p>6. Naam Voornaam</p>
                <p>6. Naam Voornaam</p>
                <p>7. Naam Voornaam</p>
                <p>7. Naam Voornaam</p>
                <p>8. Naam Voornaam</p>
                <p>8. Naam Voornaam</p>
                <p>9. Naam Voornaam</p>
                <p>9. Naam Voornaam</p>
                <p>10. Naam Voornaam</p>
                <p>10. Naam Voornaam</p>
                <p>11. Naam Voornaam</p>
                <p>11. Naam Voornaam</p>
                <p>12. Naam Voornaam</p>
                <p>12. Naam Voornaam</p>
            </div>

            <div className="grid grid-cols-12 bg-nav-background children:border children:pl-5 children:py-2 children:text-center">
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
            </div>
        </div>
    );
}

export default Wedstrijdblad;