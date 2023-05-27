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

interface TableData {
  team1: string;
  team2: string;
}

const GeneratePlaydays: NextPage = () => {
  const router = useRouter();
  const { asPath } = router;
  const params = getParams(asPath);

  const startDate = new Date(params.startDate);
  const endDate = new Date(params.endDate);

  const [competitionInfo, setCompetitionInfo] = useState<
    Competition | undefined
  >(undefined);

  const [amountTeams, setAmountTeams] = useState<number>(0);

  const [tableData, setTableData] = useState<TableData[][]>([]);

  const handleAmountTeamsChange = (e?: ChangeEvent<HTMLInputElement>): void => {
    const teamCount = amountTeams;
    const maxRows = countFridays(startDate, endDate);

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

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_NO_API) {
      setAmountTeams(Number(params.amountTeams));
      setCompetitionInfo(competitions[0]);
    } else {
      fetch(`/api/competition/${params.competitionID}`)
        .then((competition) => competition.json())
        .then((parsedCompetition) => {
          setCompetitionInfo(parsedCompetition);
          setAmountTeams(parsedCompetition.teams.length);
        });
    }

    getTeams()
      .then((teams) => setTeams(teams))
      .catch((err) => console.log(err));

    handleAmountTeamsChange();
  }, [amountTeams]);

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
    </div>
  );
};

export default GeneratePlaydays;
