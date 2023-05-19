import { ChangeEvent, useEffect, useState } from "react";
import { NextPage } from "next";
import OverzichtTopBar from "../../../components/OverzichtTopBar";
import Modal from "../../../components/Modal";
import DefaultInput from "../../../components/DefaultInput";
import {
  CLASSIFICATION,
  COMPETITION_TYPE,
  Competition,
} from "../../../types/competition";
import * as formHandler from "../../../modules/formHandler";
import { useRouter } from "next/router";
import { countFridays } from "../../../modules/general";
import { competitionRegexPatterns } from "../../../modules/competition";
import * as dummyData from "../../../data";
import DataTable from "react-data-table-component";
import { Icon } from "@iconify/react";

interface TableData {
  team1: string;
  team2: string;
}

type columnType = {
  name: string;
  selector: (row: Competition) => any;
  sortable?: boolean;
  filterable?: boolean;
  grow?: number;
};

const Clubs: NextPage = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);

  const [amountTeams, setAmountTeams] = useState<number>(0);
  const [tableData, setTableData] = useState<TableData[][]>([]);

  const [competitions, setCompetitions] = useState<Competition[]>(
    dummyData.competitions
  );

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

  const [formValues, setFormValues] = useState<{ [key: string]: string }>({
    amountteams: "",
    classification: "",
    startdate: "",
    enddate: "",
    type: "",
  });

  const handleChange = (event: any) => {
    formHandler.handleChange(event, setFormValues, formValues);
  };

  const handleSubmit = async (event: any) => {
    console.log(formValues);

    const competition: Competition | null = await formHandler.handleSubmit(
      event,
      formValues,
      competitionRegexPatterns,
      "/api/competition",
      competitions[0],
      process.env.NEXT_PUBLIC_NO_API == "1" ? true : false
    );

    if (!competition) return;

    router.push({
      pathname: "/competitie/beheer/playdays",
      query: {
        competitionID: competition.competitionID,
        // Passing extra variables if the API is disabled
        query: true,
        startDate: formValues.startdate,
        endDate: formValues.enddate,
        amountTeams: formValues.amountteams,
        classification: formValues.classification,
        type: formValues.type,
      },
    });
  };

  let competitionCount = 0;

  const columns: Array<columnType> = [
    {
      name: "ID",
      selector: (row) => {
        competitionCount++;
        return competitionCount;
      },
      sortable: true,
      filterable: true,
    },
    {
      name: "Start datum",
      selector: (row) =>
        new Date(row.startDate).toLocaleDateString("nl-BE", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
      sortable: true,
      filterable: true,
      grow: 2,
    },
    {
      name: "Type",
      selector: (row) => row.type,
      sortable: true,
      filterable: true,
      grow: 2,
    },
    {
      name: "Classificatie",
      selector: (row) => row.classification,
      sortable: true,
      filterable: true,
      grow: 2,
    },
    {
      name: "Aantal teams",
      selector: (row) => row.playDaysTable?.[0]?.length || 0,
      sortable: true,
      filterable: true,
      grow: 2,
    },
    {
      name: "Acties",
      selector: (row) => (
        <div className="flex gap-3 flex-nowrap">
          <Icon
            className="cursor-pointer text-2xl"
            onClick={() => onClickDelete(row.competitionID)}
            icon="mdi:delete"
          />
        </div>
      ),
      grow: 1,
    },
  ];

  const onClickDelete = async (id: string) => {
    if (!window.confirm("Ben je zeker dat je deze competitie wil verwijderen?"))
      return;
    if (process.env.NEXT_PUBLIC_NO_API) {
      setCompetitions(
        competitions.filter((competition) => competition.competitionID != id)
      );
      return;
    }

    await fetch(`/api/competitions/${id}`, { method: "DELETE" }).then(
      (response) => {
        if (response.status != 200)
          throw new Error("Competition not deleted correctly");
        setCompetitions(
          competitions.filter((competition) => competition.competitionID != id)
        );
      }
    );
  };

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_NO_API) {
      fetch(`/api/competitions`)
        .then((competitions) => competitions.json())
        .then((parsedCompetitions) => setCompetitions(parsedCompetitions));
    }
  }, []);

  return (
    <div>
      <Modal
        title="Competitie toevoegen"
        modalOpen={addModalOpen}
        setModalOpen={setAddModalOpen}
      >
        <div>
          <DefaultInput
            name="startdate"
            label="Start datum"
            type="date"
            value={formValues.startdate}
            onChange={handleChange}
          />
          <DefaultInput
            name="enddate"
            label="Eind datum"
            type="date"
            value={formValues.enddate}
            onChange={handleChange}
          />

          {formValues.enddate && formValues.startdate && (
            <p className="max-w-sm pt-2">
              De door jouw ingegeven datums zullen ervoor zorgen dat er{" "}
              <span className="font-bold">
                {countFridays(
                  new Date(formValues.startdate),
                  new Date(formValues.enddate)
                )}
              </span>{" "}
              speeldagen worden gegenereerd.
            </p>
          )}

          <DefaultInput
            name="amountteams"
            value={formValues.amountteams}
            onChange={handleChange}
            label={"Aantal teams"}
            type="number"
          />

          <div className="flex flex-col">
            <label
              htmlFor="classification"
              className="text-xl text-white mt-5 mb-2"
            >
              Classificatie
            </label>
            <select
              name="classification"
              className="p-2 text-black"
              value={formValues.classification}
              onChange={handleChange}
            >
              <option key={"Selecteer"} value="">
                Selecteer
              </option>
              {Object.keys(CLASSIFICATION).map((classification) => {
                return (
                  <option key={classification} value={classification}>
                    {classification.substring(0, 1).toUpperCase()}
                    {classification.substring(1).toLowerCase()}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="type" className="text-xl text-white mt-5 mb-2">
              Type
            </label>
            <select
              name="type"
              className="p-2 text-black"
              value={formValues.typ}
              onChange={handleChange}
            >
              <option key={"Selecteer"} value="">
                Selecteer
              </option>
              {Object.keys(COMPETITION_TYPE).map((type) => {
                return (
                  <option key={type} value={type}>
                    {type.substring(0, 1).toUpperCase()}
                    {type.substring(1).toLowerCase()}
                  </option>
                );
              })}
            </select>
          </div>

          <button
            type="submit"
            className="bg-[#0A893D] text-white rounded-lg p-3 mt-10"
            onClick={handleSubmit}
          >
            Aanmaken
          </button>
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
      <DataTable
        title="Projecten"
        columns={columns}
        data={competitions}
        pagination
      />
    </div>
  );
};

export default Clubs;
