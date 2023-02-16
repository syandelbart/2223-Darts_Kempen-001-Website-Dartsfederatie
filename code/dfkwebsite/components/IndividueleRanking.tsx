import { Icon } from "@iconify/react";

type MyProps = {
  data: any[];
  i: number;
};

export default function IndividueleRanking(props: MyProps) {
  return (
    <tr className="even:bg-[#BDBBBB] odd:bg-[#D9D9D9] border-t border-[#313131]">
      {props.i === 0 ? (
        <td>
          <Icon
            icon="mdi:trophy-variant"
            className="text-[#AE8625] text-3xl ml-2 my-2"
          />
        </td>
      ) : props.i === 1 ? (
        <td>
          <Icon
            icon="mdi:trophy-variant"
            className="text-[#8B8B8B] text-3xl ml-2 my-2"
          />
        </td>
      ) : props.i === 2 ? (
        <td>
          <Icon
            icon="mdi:trophy-variant"
            className="text-[#967444] text-3xl ml-2 my-2"
          />
        </td>
      ) : (
        <td></td>
      )}
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