import { Icon } from "@iconify/react";

type MyProps = {
    provinciaal: any;
};

export default function IndividueleRanking(props: MyProps) {
    props.provinciaal.map((item: any, i:number) => {
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
            <td className="py-2">{item.name}</td>
            <td className="py-2">{item.ploeg}</td>
            <td className="py-2">{item.punten}</td>
            <td className="py-2">{item["180"]}</td>
            <td className="py-2">{item.shot}</td>
            <td className="py-2">{item.k_leg}</td>
          </tr>
        );
      })
}