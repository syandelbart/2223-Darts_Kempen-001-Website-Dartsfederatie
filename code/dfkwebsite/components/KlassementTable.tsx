import { Icon } from "@iconify/react";
import { TeamRanking } from "../types/general";

type MyProps = {
  data: TeamRanking;
  index: number;
};

export default function KlassementTable(props: MyProps) {

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
        <td className="py-2">{props.data.ploegnaam}</td>
        <td className="py-2">{props.data.gespeeld}</td>
        <td className="py-2">{props.data.gewonnen}</td>
        <td className="py-2">{props.data.gelijk}</td>
        <td className="py-2">{props.data.verloren}</td>
        <td className="py-2">{props.data.voor}</td>
        <td className="py-2">{props.data.tegen}</td>
        <td className="py-2">{props.data.punten}</td>
      </tr>
    );
};
