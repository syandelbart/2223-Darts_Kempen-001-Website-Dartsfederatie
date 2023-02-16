import { Icon } from "@iconify/react";

const provinciaal = [
    {
        "id": 1,
        "name": "Jens Van den Broeck",
        "ploeg": "Dartsclub De Kruisboog",
        "punten": 0,
        "180": 0,
        "shot": 0,
        "k_leg": 0
    },
    {
        "id": 2,
        "name": "Jens Van den Broeck",
        "ploeg": "Dartsclub De Kruisboog",
        "punten": 0,
        "180": 0,
        "shot": 0,
        "k_leg": 0
    },
    {
        "id": 3,
        "name": "Jens Van den Broeck",
        "ploeg": "Dartsclub De Kruisboog",
        "punten": 0,
        "180": 0,
        "shot": 0,
        "k_leg": 0
    },
    {
        "id": 4,
        "name": "Jens Van den Broeck",
        "ploeg": "Dartsclub De Kruisboog",
        "punten": 0,
        "180": 0,
        "shot": 0,
        "k_leg": 0
    },
    {
        "id": 5,
        "name": "Jens Van den Broeck",
        "ploeg": "Dartsclub De Kruisboog",
        "punten": 0,
        "180": 0,
        "shot": 0,
        "k_leg": 0
    },
    {
        "id": 6,
        "name": "Jens Van den Broeck",
        "ploeg": "Dartsclub De Kruisboog",
        "punten": 0,
        "180": 0,
        "shot": 0,
        "k_leg": 0
    },
]

export default function Individueleranking() {
    return (
        <div className="text-white ">
            <div className="flex justify-between items-center">
                <h1 className="text-6xl font-extrabold mb-5">Individuele ranking</h1>
                <div>
                    <p>Alle gewesten</p>
                </div>
            </div>

            <div className="my-5">
                <h2 className="text-4xl font-semibold my-5">Provinciaal</h2>
                <table className="w-full text-center text-[#313131]">
                    <thead>
                        <tr className="bg-[#313131] text-white">
                            <th className="w-5"></th>
                            <th>Nr.</th>
                            <th>Naam</th>
                            <th>Ploeg</th>
                            <th>Punten</th>
                            <th>180</th>
                            <th>Shot</th>
                            <th>K. Leg</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            provinciaal.map((item, i) => {
                                return (
                                    <tr className="even:bg-[#BDBBBB] odd:bg-[#D9D9D9] border-t border-[#313131]">
                                        {i === 0 ? <td><Icon icon="mdi:trophy-variant" className="text-[#AE8625] text-3xl ml-2" /></td> : i === 1 ? <td><Icon icon="mdi:trophy-variant" className="text-[#8B8B8B] text-3xl ml-2" /></td> : i === 2 ? <td><Icon icon="mdi:trophy-variant" className="text-[#967444] text-3xl ml-2" /></td> : <td></td>}
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.ploeg}</td>
                                        <td>{item.punten}</td>
                                        <td>{item["180"]}</td>
                                        <td>{item.shot}</td>
                                        <td>{item.k_leg}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}  