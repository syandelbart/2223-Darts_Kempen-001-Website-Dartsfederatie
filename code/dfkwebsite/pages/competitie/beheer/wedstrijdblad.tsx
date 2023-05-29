import { NextPage } from "next";
import DefaultCheckbox from "../../../components/DefaultCheckbox";
import { useEffect, useState } from "react";
import { getParams } from "../../../modules/general";
import { useRouter } from "next/router";
import { Competition, Playday } from "../../../types/competition";
import { TableData } from "./playdays";

const WedstrijdbladBeheer: NextPage = () => {
  const [competition, setCompetition] = useState<Competition | null>(null);
  const [playday, setPlayday] = useState<TableData[]>([]);
  const [match, setMatch] = useState<TableData | null>(null);

  const router = useRouter();
  useEffect(() => {
    console.log("WedstrijdbladBeheer");
    let params = getParams(router.asPath);
    console.log(params);

    if (!params.competitionID) {
      console.log("No competition ID found");
      return;
    }

    if (!params.playdayNumber) {
      console.log("No playday number found");
      return;
    }

    fetch(`/api/competition/${params.competitionID}`)
      .then((res) => res.json())
      .then((parsedCompetition: Competition) => {
        if (!parsedCompetition) {
          console.log("No competition found");
          return;
        }
        setCompetition(parsedCompetition);

        console.log(parsedCompetition);

        if (!parsedCompetition.playdays) {
          console.log("No playdays found");
          return;
        }

        if (!params.playdayNumber) {
          console.log("No playday number found");
          return;
        }

        if (parsedCompetition.playdays.length < params.playdayNumber) {
          console.log("Playday not found");
          return;
        }

        setPlayday(parsedCompetition.playdays[params.playdayNumber - 1]);

        console.log(parsedCompetition.playdays[params.playdayNumber - 1]);

        if (!params.matchNumber) {
          console.log("No match number found");
          return;
        }

        if (
          parsedCompetition.playdays[params.playdayNumber - 1].length <
          params.matchNumber
        ) {
          console.log("Match not found");
          return;
        }

        setMatch(
          parsedCompetition.playdays[params.playdayNumber - 1][
            params.matchNumber - 1
          ]
        );

        console.log(
          params.matchNumber,
          parsedCompetition.playdays[params.playdayNumber - 1][
            params.matchNumber - 1
          ]
        );

        return parsedCompetition;
      })
      .catch((err) => {
        console.log("Error while fetching competition");
        console.log(err);
        return null;
      });
  }, []);

  return (
    <div className="text-white">
      <div className="grid grid-cols-2 bg-nav-background children:border children:pl-5 children:py-2">
        <p className="col-span-2 text-center font-semibold text-3xl pl-0">
          Reeks: Competitie 2022 - 2023 - Provinciaal Speeldag: Speeldag 01
          Datum: 30-09-2022
        </p>
        <p className="text-lg font-semibold">THUISSPELERS: {match?.team1}</p>
        <p className="text-lg font-semibold">BEZOEKERS: DFK 2</p>
        <p className="text-xl bg-background">NAAM EN VOORNAAM</p>
        <p className="text-xl bg-background">NAAM EN VOORNAAM</p>
        {[...Array(12)].map((e, i) => {
          return (
            <>
              <p>{i + 1}. Naam Voornaam</p>
              <p>{i + 1}. Naam Voornaam</p>
            </>
          );
        })}
      </div>

      <div className="grid grid-cols-12 bg-nav-background children:border children:py-2 children:text-center">
        <p className="text-xl col-span-5 bg-background">NAAM EN VOORNAAM</p>
        <p className="text-xl col-span-2 bg-background">UITSLAG</p>
        <p className="text-xl col-span-5 bg-background">NAAM EN VOORNAAM</p>

        <p className="text-lg">180</p>
        <p className="text-lg col-span-2">ENKELSPELEN</p>
        <p className="text-lg">KLEG</p>
        <p className="text-lg">H.U.</p>
        <p className="text-lg col-span-2">Best of 7 - 501</p>
        <p className="text-lg">H.U.</p>
        <p className="text-lg">KLEG</p>
        <p className="text-lg col-span-2">ENKELSPELEN</p>
        <p className="text-lg">180</p>

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

        <p className="text-lg">180</p>
        <p className="text-lg col-span-2">DUBBELS</p>
        <p className="text-lg">KLEG</p>
        <p className="text-lg">H.U.</p>
        <p className="text-lg col-span-2">Best of 5 - 701</p>
        <p className="text-lg">H.U.</p>
        <p className="text-lg">KLEG</p>
        <p className="text-lg col-span-2">DUBBELS</p>
        <p className="text-lg">180</p>

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

        <p className="text-lg">180</p>
        <p className="text-lg col-span-2">ENKELSPELEN</p>
        <p className="text-lg">KLEG</p>
        <p className="text-lg">H.U.</p>
        <p className="text-lg col-span-2">Best of 7 - 501</p>
        <p className="text-lg">H.U.</p>
        <p className="text-lg">KLEG</p>
        <p className="text-lg col-span-2">ENKELSPELEN</p>
        <p className="text-lg">180</p>

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

        <p className="text-lg col-span-5 border-b-0">Notities</p>
        <p className="text-lg col-span-2">EINDUITSLAG</p>
        <p className="text-lg col-span-5 border-b-0">Notities</p>

        <p className="col-span-5 py-10 border-y-0"></p>
        <p className="col-span-1">4</p>
        <p className="col-span-1">6</p>
        <p className="col-span-5 border-y-0"></p>

        <div className="col-span-12 flex justify-center items-center">
          <DefaultCheckbox label="Definitief opslaan" name="save_permanent" />
        </div>
        <a href="" className="text-lg col-span-12">
          Opslaan
        </a>
      </div>
    </div>
  );
};

export default WedstrijdbladBeheer;
