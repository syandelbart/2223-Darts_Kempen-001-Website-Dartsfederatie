import { ChangeEvent, useEffect, useState } from "react";
import { NextPage } from "next";
import AddClubModal from "../../components/AddClubModal";
import OverzichtTopBar from "../../components/OverzichtTopBar";
import { Club } from "../../types/club";
import Modal from "../../components/Modal";

interface TableData {
  value: string;
}

const Clubs: NextPage = () => {
  const [clubs, setClubs] = useState<Array<Club>>([]);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const [amountTeams, setAmountTeams] = useState<number>(0);
  const [tableData, setTableData] = useState<TableData[][]>([]);

  const handleAmountTeamsChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    const teamCount = parseInt(value, 10);
    setAmountTeams(teamCount);

    const newData: TableData[][] = [];
    for (let i = 0; i < teamCount; i++) {
      const row: TableData[] = [];
      for (let j = 0; j < teamCount; j++) {
        row.push({ team1: "", team2: "" });
      }
      newData.push(row);
    }
    setTableData(newData);
  };

  const handleTableDataChange = (
    e: ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    columnIndex: number,
    field: "team1" | "team2"
  ): void => {
    const { value } = e.target;
    const newData = [...tableData];
    newData[rowIndex][columnIndex] = {
      ...newData[rowIndex][columnIndex],
      [field]: value,
    };
    console.log(newData);
    setTableData(newData);
  };

  useEffect(() => {
    // fetch(`/api/clubs`)
    //   .then((clubs) => clubs.json())
    //   .then((parsedClubs) => setClubs(parsedClubs));
  }, []);
  return (
    <div>
      <Modal
        title="Competitie toevoegen"
        modalOpen={addModalOpen}
        setModalOpen={setAddModalOpen}
      >
        <div>
          <label htmlFor="amountTeams">Amount of Teams:</label>
          <input
            type="number"
            id="amountTeams"
            name="amountTeams"
            value={amountTeams}
            onChange={handleAmountTeamsChange}
          />

          <table>
            <thead>
              <tr>
                <th></th>
                {tableData.map((_, index) => (
                  <th key={index}>Team {index + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((rowData, rowIndex) => (
                <tr key={rowIndex}>
                  <td>Team {rowIndex + 1}</td>
                  {rowData.map((data, columnIndex) => (
                    <td key={columnIndex}>
                      <input
                        type="text"
                        value={data.team1}
                        onChange={(e) =>
                          handleTableDataChange(
                            e,
                            rowIndex,
                            columnIndex,
                            "team1"
                          )
                        }
                      />
                      <span>vs</span>
                      <input
                        type="text"
                        value={data.team2}
                        onChange={(e) =>
                          handleTableDataChange(
                            e,
                            rowIndex,
                            columnIndex,
                            "team2"
                          )
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>
      <OverzichtTopBar
        titleName="Beheer Competities"
        search={search}
        setSearch={setSearch}
        addButtonName="competition"
        addModalOpen={addModalOpen}
        setAddModalOpen={setAddModalOpen}
      />
    </div>
  );
};

export default Clubs;
