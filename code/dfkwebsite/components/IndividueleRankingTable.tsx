import { Icon } from "@iconify/react";
import { FunctionComponent } from "react";
import { PersonRanking } from "../types/general";

interface individueleRankingTableInterface {
  personData: PersonRanking;
  index: number;
}


const individueleRankingTable: FunctionComponent<individueleRankingTableInterface> = ({personData, index}) => {
  return (
    <tr className="even:bg-[#BDBBBB] odd:bg-[#D9D9D9] border-t border-[#313131]">
      <td>
        {
          personData.trophy != undefined ?
          <Icon
            icon="mdi:trophy-variant"
            className={`text-trophy-${personData.trophy} text-3xl ml-2 my-2`}
          />
          : ""
        }
      </td>
      <td className="py-2">{personData.id}</td>
      <td className="py-2">{personData.name}</td>
      <td className="py-2">{personData.ploeg}</td>
      <td className="py-2">{personData.punten}</td>
      <td className="py-2">{personData["180"]}</td>
      <td className="py-2">{personData.shot}</td>
      <td className="py-2">{personData.k_leg}</td>
    </tr>
  );
}

export default individueleRankingTable;