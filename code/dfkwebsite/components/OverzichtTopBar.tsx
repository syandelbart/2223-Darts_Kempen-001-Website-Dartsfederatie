import { FunctionComponent } from "react";
import AddButton from "./AddButton";

type topBarData = {
    titleName: string;
    search: string
    setSearch: Function;
    addButtonName: string;
    addModalOpen: boolean;
    setAddModalOpen: any;
}

const OverzichtTopBar: FunctionComponent<topBarData> = ({ titleName, search, setSearch, addButtonName, addModalOpen, setAddModalOpen }: any) => {
    return (
        <div className="flex justify-between items-center mb-10">
            <h1 className="text-6xl font-extrabold text-white">{titleName}</h1>
            <div className="flex gap-10 items-center">
                <AddButton name={addButtonName} addModalOpen={addModalOpen} setAddModalOpen={setAddModalOpen} />
                <input
                    type="text"
                    placeholder="Zoeken..."
                    className="px-5 py-3 rounded bg-[#D9D9D9]"
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
        </div>
    );
}

export default OverzichtTopBar;