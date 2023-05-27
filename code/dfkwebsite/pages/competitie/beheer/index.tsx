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
import InformationBox from "../../../components/InformationBox";
import DefaultSelect from "../../../components/DefaultSelect";

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
    formHandler.handleChange(
      event,
      setFormValues,
      formValues,
      setHandledChange
    );
  };

  const handleSubmit = async (event: any) => {
    console.log(formValues);

    let competition: Competition | null = await formHandler.handleSubmit(
      event,
      formValues,
      competitionRegexPatterns,
      "/api/competition",
      setInformationBoxMessage,
      setHandleSubmitSuccess,
      competitions[0],
      process.env.NEXT_PUBLIC_NO_API == "1" ? true : false
    );

    if (!competition) {
      return;
    }

    setInformationBoxMessage(
      "Competitie succesvol aangemaakt, je wordt binnen 5 seconden doorgestuurd naar de speeldagen pagina."
    );
    setTimeout(() => {
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
    }, 5000);
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

    await fetch(`/api/competition/${id}`, { method: "DELETE" }).then(
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
      fetch(`/api/competition`)
        .then((competitions) => competitions.json())
        .then((parsedCompetitions) => setCompetitions(parsedCompetitions))
        .catch((err) => console.log(err));
    }
  }, []);

  const [handleSubmitSuccess, setHandleSubmitSuccess] = useState<
    boolean | null
  >(false);
  const [handledChange, setHandledChange] = useState(false);
  const [informationBoxMessage, setInformationBoxMessage] = useState("");

  return (
    <div>
      <Modal
        title="Competitie toevoegen"
        modalOpen={addModalOpen}
        setModalOpen={setAddModalOpen}
      >
        <InformationBox
          success={handleSubmitSuccess}
          show={informationBoxMessage !== ""}
          onClose={() => setInformationBoxMessage("")}
        >
          {informationBoxMessage}
        </InformationBox>
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
            <DefaultSelect
              name="classification"
              id="classification"
              label="Classificatie"
              value={formValues.classification}
              onChange={handleChange}
              options={Object.values(CLASSIFICATION).map((value) => {
                return {
                  value: value,
                  label: `${value[0].toUpperCase()}${value
                    .substring(1)
                    .toLowerCase()}`,
                };
              })}
            />
          </div>

          <div className="flex flex-col">
            <DefaultSelect
              name="type"
              id="type"
              label="Type"
              value={formValues.type}
              onChange={handleChange}
              options={Object.values(COMPETITION_TYPE).map((value) => {
                return {
                  value: value,
                  label: `${value[0].toUpperCase()}${value
                    .substring(1)
                    .toLowerCase()}`,
                };
              })}
            />
          </div>

          <button
            type="submit"
            className="bg-[#0A893D] text-white rounded-lg p-3 mt-10"
            onClick={() => handleSubmit}
            disabled={!handledChange}
          >
            Aanmaken
          </button>
        </div>
      </Modal>
      <OverzichtTopBar
        titleName="Beheer Competities"
        search={search}
        setSearch={setSearch}
        addButtonName="Competition toevoegen"
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
