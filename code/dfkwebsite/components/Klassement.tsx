import { Icon } from "@iconify/react";

type MyProps = {
  data: any[];
  i: number;
};

export default function Klassement(props: MyProps) {

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
  });
}
