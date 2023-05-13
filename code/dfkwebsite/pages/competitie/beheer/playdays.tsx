import { ChangeEvent, useEffect, useState } from "react";
import { NextPage } from "next";
import OverzichtTopBar from "../../../components/OverzichtTopBar";
import { Club } from "../../../types/club";
import Modal from "../../../components/Modal";
import DefaultInput from "../../../components/DefaultInput";
import { CLASSIFICATION } from "../../../types/competition";
import * as formHandler from "../../../modules/formHandler";
import { competitionRegexPatterns } from "../../../modules/competition";
import { useRouter } from "next/router";
import { getParams } from "../../../modules/general";
import teams from "../../../data";

interface TableData {
  team1: string;
  team2: string;
  value: string;
}

const GeneratePlaydays: NextPage = () => {
  const router = useRouter();
  const { asPath } = router;
  const params = getParams(asPath);

  const startDate = new Date(params.startdate);

  const getNextFriday = (startDate: Date) => {
    return new Date(
      startDate.setDate(
        startDate.getDate() + ((5 - startDate.getDay() + 7) % 7)
      )
    );
  };

  const [amountTeams, setAmountTeams] = useState<number>(0);

  const [tableData, setTableData] = useState<TableData[][]>([]);

  const handleAmountTeamsChange = (e?: ChangeEvent<HTMLInputElement>): void => {
    const teamCount = amountTeams;

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

    let tableD = [...tableData];
    console.log(value);
    tableD[rowIndex][columnIndex][field] = value;

    setTableData(tableD);
  };

  const handleChange = (event: any) => {
    formHandler.handleChange(event, setFormValues, formValues);
  };

  const handleSubmit = async (event: any) => {};

  useEffect(() => {
    setAmountTeams(Number(params.amountTeams));
    handleAmountTeamsChange();
  }, [amountTeams]);

  return (
    <div>
      <OverzichtTopBar titleName="Speeldagen genereren" />

      <div
        className="grid children:py-4 gap-2 children:border-b  text-white border-t"
        style={{
          gridTemplateRows: `repeat(${amountTeams + 1}, minmax(0, 1fr))`,
        }}
      >
        {tableData.map((rowData, rowIndex) => (
          <div
            key={rowIndex}
            className="border-b grid"
            style={{
              gridTemplateColumns: `repeat(${amountTeams + 1}, minmax(0, 1fr))`,
            }}
          >
            <div>
              <p>Speeldag {rowIndex + 1}</p>
              <p>
                {new Date(
                  getNextFriday(startDate).setDate(
                    getNextFriday(startDate).getDate() + 7 * rowIndex
                  )
                ).toLocaleDateString("nl-BE", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                  weekday: "short",
                })}
              </p>
            </div>
            {rowData.map((data, columnIndex) => (
              <div key={columnIndex} className="flex items-center ">
                <div className="flex flex-col justify-center items-center">
                  <select
                    className="w-24 text-black"
                    value={data.team1}
                    onChange={(e) =>
                      handleTableDataChange(e, rowIndex, columnIndex, "team1")
                    }
                  >
                    <option value=""></option>
                    {teams.map((team) => {
                      return (
                        <option key={team.teamnaam} value={team.teamnaam}>
                          {team.teamnaam}
                        </option>
                      );
                    })}
                  </select>

                  <span>vs</span>
                  <select
                    className="w-24 text-black"
                    value={data.team2}
                    prefix="H"
                    onChange={(e) =>
                      handleTableDataChange(e, rowIndex, columnIndex, "team2")
                    }
                  >
                    <option value=""></option>
                    {teams.map((team) => {
                      return (
                        <option key={team.teamnaam} value={team.teamnaam}>
                          {team.teamnaam}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeneratePlaydays;
