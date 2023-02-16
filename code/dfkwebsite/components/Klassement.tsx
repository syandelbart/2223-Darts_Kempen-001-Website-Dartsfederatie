import { Icon } from "@iconify/react";

type MyProps = {
  provinciaal: any;
};

export default function Klassement(props: MyProps) {
  props.provinciaal.map((item: any, i: number) => {
    return (
      <tr className="even:bg-[#BDBBBB] odd:bg-[#D9D9D9] border-t border-[#313131]">
        {i === 0 ? (
          <td>
            <Icon
              icon="mdi:trophy-variant"
              className="text-[#AE8625] text-3xl ml-2 my-2"
            />
          </td>
        ) : i === 1 ? (
          <td>
            <Icon
              icon="mdi:trophy-variant"
              className="text-[#8B8B8B] text-3xl ml-2 my-2"
            />
          </td>
        ) : i === 2 ? (
          <td>
            <Icon
              icon="mdi:trophy-variant"
              className="text-[#967444] text-3xl ml-2 my-2"
            />
          </td>
        ) : (
          <td></td>
        )}
        <td className="py-2">{item.id}</td>
        <td className="py-2">{item.ploegnaam}</td>
        <td className="py-2">{item.gespeeld}</td>
        <td className="py-2">{item.gewonnen}</td>
        <td className="py-2">{item.gelijk}</td>
        <td className="py-2">{item.verloren}</td>
        <td className="py-2">{item.voor}</td>
        <td className="py-2">{item.tegen}</td>
        <td className="py-2">{item.punten}</td>
      </tr>
    );
  });
}
