import { Icon } from "@iconify/react";
import { FunctionComponent } from "react";
import { TeamRanking } from "../types/general";

type MyProps = {
  data: TeamRanking;
  index: number;
};

interface klassementTableInterface {
  teamData: TeamRanking;
  index: number;
}


const KlassementTable : FunctionComponent<klassementTableInterface> = ({teamData,index}) => {

    return (
      <tr className="even:bg-[#BDBBBB] odd:bg-[#D9D9D9] border-t border-[#313131]">
        <td>
          {
            teamData.trophy != undefined ?
            <Icon
              icon="mdi:trophy-variant"
              className={`text-trophy-${teamData.trophy} text-3xl ml-2 my-2`}
            />
            : ""
          }
        </td>
        <td className="py-2">{teamData.id}</td>
        <td className="py-2">{teamData.ploegnaam}</td>
        <td className="py-2">{teamData.gespeeld}</td>
        <td className="py-2">{teamData.gewonnen}</td>
        <td className="py-2">{teamData.gelijk}</td>
        <td className="py-2">{teamData.verloren}</td>
        <td className="py-2">{teamData.voor}</td>
        <td className="py-2">{teamData.tegen}</td>
        <td className="py-2">{teamData.punten}</td>
      </tr>
    );
};

export default KlassementTable;