import { NextPage } from "next";
import { useEffect, useState } from "react";
import { Competition } from "../../../types/competition";
import Link from "next/link";

const Speeldagen: NextPage = () => {
  const [activeCompetition, setActiveCompetition] = useState<Competition[]>([]);

  useEffect(() => {
    fetch("/api/competition/current")
      .then((res) => res.json())
      .then((parsedCompetitions: Competition[]) => {
        setActiveCompetition(parsedCompetitions);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h1 className="text-6xl font-extrabold text-white mb-5">
        Speeldagen pagina
      </h1>
      {activeCompetition.map((competition) => (
        <div className="flex flex-col" key={competition.competitionID}>
          <p key={competition.competitionID}>
            {competition.competitionID} {competition.classification}
          </p>

          {competition.playdays?.map((playday, i) => {
            return (
              <div key={i}>
                <h2>Speeldag {i + 1}</h2>
                <ul>
                  {playday.map((match, j) => {
                    return (
                      <li key={match.team1 + match.team2}>
                        {match.team1} vs {match.team2}
                        <Link
                          href={`/competitie/beheer/wedstrijdblad?competitionID=${
                            competition.competitionID
                          }&playdayNumber=${i + 1}&matchNumber=${j + 1}`}
                        >
                          Scores ingeven
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
};

export default Speeldagen;
