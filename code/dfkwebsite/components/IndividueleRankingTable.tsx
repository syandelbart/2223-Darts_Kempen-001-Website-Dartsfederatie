import { Icon } from "@iconify/react";
import { PersonRanking } from "../types/general";

type MyProps = {
  data: PersonRanking;
  i: number;
};

export default function IndividueleRankingTable(props: MyProps) {
  return (
    <tr className="even:bg-[#BDBBBB] odd:bg-[#D9D9D9] border-t border-[#313131]">
      <td>
        {
          props.data.trophy != undefined ?
          <Icon
            icon="mdi:trophy-variant"
            className={`text-trophy-${props.data.trophy} text-3xl ml-2 my-2`}
          />
          : ""
        }
      </td>
      <td className="py-2">{props.data.id}</td>
      <td className="py-2">{props.data.name}</td>
      <td className="py-2">{props.data.ploeg}</td>
      <td className="py-2">{props.data.punten}</td>
      <td className="py-2">{props.data["180"]}</td>
      <td className="py-2">{props.data.shot}</td>
      <td className="py-2">{props.data.k_leg}</td>
    </tr>
  );
}