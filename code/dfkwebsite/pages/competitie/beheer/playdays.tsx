import { ChangeEvent, useEffect, useState } from "react";
import { NextPage } from "next";
import OverzichtTopBar from "../../../components/OverzichtTopBar";
import { useRouter } from "next/router";
import {
  SelectOption,
  countFridays,
  getNextFriday,
  getParams,
} from "../../../modules/general";
import { teams, competitions } from "../../../data";
import { Competition } from "../../../types/competition";
import DefaultSelect from "../../../components/DefaultSelect";
import { getTeams } from "../../../modules/team";
import * as dummyData from "../../../data";

export interface TableData {
  team1: string;
  team2: string;
}

const GeneratePlaydays: NextPage = () => {
  const router = useRouter();
  const { asPath } = router;
  const params = getParams(asPath);

  // const startDate = new Date(params.startDate);
  // const endDate = new Date(params.endDate);

  const [competitionInfo, setCompetitionInfo] = useState<
    Competition | undefined
  >(undefined);

  const [amountTeams, setAmountTeams] = useState<number>(0);

  const [tableData, setTableData] = useState<TableData[][]>([]);

  const handleAmountTeamsChange = (
    competitionInfo: Competition,
    teamAmount?: number
  ): void => {
    const teamCount = teamAmount || amountTeams;

    if (!competitionInfo) return;

    const maxRows = countFridays(
      new Date(competitionInfo?.startDate),
      new Date(competitionInfo?.endDate)
    );

    const newData: TableData[][] = [];
    for (let i = 0; i < maxRows; i++) {
      const row: TableData[] = [];
      for (let j = 0; j < teamCount; j++) {
        row.push({ team1: "", team2: "" });
      }
      newData.push(row);
    }
    setTableData(newData);
  };

  const handleTableDataChange = (
    selectedOption: SelectOption,
    rowIndex: number,
    columnIndex: number,
    field: "team1" | "team2"
  ): void => {
    const { value } = selectedOption;

    let tableD = [...tableData];
    console.log(value);
    tableD[rowIndex][columnIndex][field] = value;

    setTableData(tableD);
    console.log(tableD);
  };

  const [teams, setTeams] = useState(
    dummyData.teams.map((team) => {
      return { label: team.name, value: team.teamID } as SelectOption;
    })
  );

  const [competitionTeams, setCompetitionTeams] = useState<SelectOption[]>([]);

  const tableFilled = (): boolean => {
    if (tableData.some((row) => row.some((cell) => !cell.team1 || !cell.team2)))
      return false;

    return true;
  };

  const handleSubmit = async (e: any) => {
    // Check the table data for empty values and return if there is any empty value by using the most efficient method
    if (!tableFilled()) return;

    let data = new FormData();
    data.append("playDaysTable", JSON.stringify(tableData));
    await fetch(`/api/competition/${params.competitionID}`, {
      method: "PUT",
      body: JSON.stringify({ playDaysTable: tableData }),
      headers: { "Content-Type": "application/json" },
    });
  };

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_NO_API) {
      fetch(`/api/competition/${params.competitionID}`)
        .then((competition) => competition.json())
        .then((parsedCompetition: Competition) => {
          setCompetitionInfo(parsedCompetition);
          if (parsedCompetition.playDaysTable)
            setTableData(parsedCompetition.playDaysTable);
          handleAmountTeamsChange(parsedCompetition);
          return parsedCompetition;
        })
        .catch((err) => console.log(err));
    }

    getTeams()
      .then((teams) => setTeams(teams))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <OverzichtTopBar titleName="Speeldagen genereren" />

      <DefaultSelect
        name="teams"
        label="Selecteer teams"
        options={teams}
        multiple
        search
        onSelectChange={(selectedOptions, action) => {
          setCompetitionTeams(selectedOptions);
          setAmountTeams(selectedOptions.length);

          handleAmountTeamsChange(
            competitionInfo as Competition,
            selectedOptions.length
          );

          console.log(selectedOptions);
          console.log(teams);
        }}
      />

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
                  getNextFriday(
                    new Date(competitionInfo?.startDate || 0)
                  ).setDate(
                    getNextFriday(
                      new Date(competitionInfo?.endDate || 0)
                    ).getDate() +
                      7 * rowIndex
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
                  <DefaultSelect
                    name={`${rowIndex}-${columnIndex}`}
                    labelEnabled={false}
                    options={competitionTeams}
                    search
                    onSelectChange={(
                      selectedOption: SelectOption,
                      action: { action: string; name: string }
                    ) =>
                      handleTableDataChange(
                        selectedOption,
                        rowIndex,
                        columnIndex,
                        "team1"
                      )
                    }
                  />

                  <span>vs</span>
                  <DefaultSelect
                    name={`${rowIndex}-${columnIndex}`}
                    options={competitionTeams}
                    labelEnabled={false}
                    search
                    onSelectChange={(
                      selectedOption: SelectOption,
                      action: { action: string; name: string }
                    ) =>
                      handleTableDataChange(
                        selectedOption,
                        rowIndex,
                        columnIndex,
                        "team2"
                      )
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div>
        <button
          type="submit"
          className="bg-[#0A893D] text-white rounded-lg p-3 mt-10"
          onClick={handleSubmit}
          disabled={!tableFilled()}
        >
          Genereer speeldagen
        </button>
        {tableFilled() ? null : (
          <span>De tabel is nog niet volledig ingevuld</span>
        )}
      </div>
    </div>
  );
};

export default GeneratePlaydays;
