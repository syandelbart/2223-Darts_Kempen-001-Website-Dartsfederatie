import { NextPage } from "next";
import GewestFilter from "../../../components/GewestFilter";
import KlassementTable from "../../../components/KlassementTable";
import { TeamRanking, TROPHY } from "../../../types/general";
import React, { useCallback, useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { FacebookShareButton, TwitterShareButton } from "react-share";


const provinciaal : Array<TeamRanking> = [
  {
    id: 1,
    ploegnaam: "Dartsclub De Kruisboog",
    gespeeld: 0,
    gewonnen: 0,
    gelijk: 0,
    verloren: 0,
    voor: 0,
    tegen: 0,
    punten: 0,
    trophy: TROPHY.GOLD
  },
  {
    id: 2,
    ploegnaam: "Dartsclub De Kruisboog",
    gespeeld: 0,
    gewonnen: 0,
    gelijk: 0,
    verloren: 0,
    voor: 0,
    tegen: 0,
    punten: 0,
    trophy: TROPHY.SILVER
  },
  {
    id: 3,
    ploegnaam: "Dartsclub De Kruisboog",
    gespeeld: 0,
    gewonnen: 0,
    gelijk: 0,
    verloren: 0,
    voor: 0,
    tegen: 0,
    punten: 0,
    trophy: TROPHY.BRONZE
  },
  {
    id: 4,
    ploegnaam: "Dartsclub De Kruisboog",
    gespeeld: 0,
    gewonnen: 0,
    gelijk: 0,
    verloren: 0,
    voor: 0,
    tegen: 0,
    punten: 0,
  },
  {
    id: 5,
    ploegnaam: "Dartsclub De Kruisboog",
    gespeeld: 0,
    gewonnen: 0,
    gelijk: 0,
    verloren: 0,
    voor: 0,
    tegen: 0,
    punten: 0,
  },
  {
    id: 6,
    ploegnaam: "Dartsclub De Kruisboog",
    gespeeld: 0,
    gewonnen: 0,
    gelijk: 0,
    verloren: 0,
    voor: 0,
    tegen: 0,
    punten: 0,
  },
];

const Klassement : NextPage = () => {
  const ref = useRef<HTMLTableElement>(null)
  const [url, setUrl] = useState<string>("")

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return
    }

    toPng(ref.current, { cacheBust: true, })
      .then((dataUrl) => {
        setUrl(dataUrl)
        // const link = document.createElement('a')
        // link.download = 'my-image-name.png'
        // link.href = dataUrl
        // link.click()
      })
      .catch((err) => {
        console.log(err)
      })
  }, [ref])

  return (
    <div className="text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-6xl font-extrabold mb-5">Klassement ranking</h1>
        <GewestFilter />
      </div>

      <button onClick={onButtonClick}>Create Shareable Image</button>
        <div>
          <h2>Shareable Image:</h2>
          <img src={url} alt="Shareable Image" />
          <FacebookShareButton url={url}>
            Share on Facebook
          </FacebookShareButton>
          <TwitterShareButton url={url}>
            Share on Twitter
          </TwitterShareButton>
        </div>

      <div className="my-5">
        <h2 className="text-4xl font-semibold my-10">Provinciaal</h2>
        <table className="table-auto w-full text-center text-[#313131]" ref={ref}>
          <thead>
            <tr className="bg-[#313131] text-white h-12">
              <th className="w-5"></th>
              <th>Nr.</th>
              <th>Ploegnaam</th>
              <th>Gespeeld</th>
              <th>Gewonnen</th>
              <th>Gelijk</th>
              <th>Verloren</th>
              <th>Voor</th>
              <th>Tegen</th>
              <th>Punten</th>
            </tr>
          </thead>

          <tbody>
            {provinciaal.map((team, i) => {
              return <KlassementTable key={i} teamData={team} index={i} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Klassement;