import { FunctionComponent, useEffect, useState } from "react";
import Modal from "./Modal";
import { CLASSIFICATION } from "../types/competition";
import DefaultInput from "./DefaultInput";
import DefaultSelect from "./DefaultSelect";
import { ClubFront } from "../types/club";
import InformationBox from "./InformationBox";
import * as dummyData from "../data";
import * as formHandler from "../modules/formHandler";
import { Team } from "../types/team";
import { teamRegexPatterns } from "../modules/team";
import { PlayerFront } from "../types/player";
import { SelectOption, getAllSelectOptionsByName } from "../modules/general";

type AddTeamModalData = {
  addModalOpen: boolean;
  setAddModalOpen: any;
  currentClub?: ClubFront | null;
  currentPlayer?: PlayerFront | null;
  showTeamList?: boolean;
};

const AddTeamModal: FunctionComponent<AddTeamModalData> = (
  props: AddTeamModalData
) => {
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({
    name: "",
    captainid: "",
    classification: "",
    clubid: "",
    playersid: "",
  });

  const [handleSubmitSuccess, setHandleSubmitSuccess] = useState<
    boolean | null
  >(false);
  const [informationBoxMessage, setInformationBoxMessage] = useState("");

  const handleChange = (event: any) => {
    console.log(formValues);
    formHandler.handleChange(event, setFormValues, formValues);
  };

  const handleSubmit = async (event: any) => {
    let team: Team | null = await formHandler.handleSubmit(
      event,
      formValues,
      teamRegexPatterns,
      "/api/teams",
      setInformationBoxMessage,
      setHandleSubmitSuccess,
      dummyData.teams[0],
      process.env.NEXT_PUBLIC_NO_API == "1" ? true : false
    );

    if (!team || !handleSubmitSuccess) return;

    setInformationBoxMessage(
      "Team succesvol aangemaakt, je wordt binnen 5 seconden terug gestuurd naar het algemeen overzicht."
    );
    setTimeout(() => {
      props.setAddModalOpen(false);
    }, 5000);
  };

  const [clubs, setClubs] = useState<SelectOption[]>([]);
  const [teams, setTeams] = useState<SelectOption[]>([]);
  const [spelers, setSpelers] = useState<SelectOption[]>([]);

  useEffect(() => {
    const getClubs = async () => {
      let clubs = await getAllSelectOptionsByName("clubs", "name", "clubID");
      setClubs(clubs);
    };
    getClubs();

    const getTeams = async () => {
      let teams = await getAllSelectOptionsByName("teams", "name", "teamID");
      setTeams(teams);
    };
    getTeams();

    const getSpelers = async () => {
      let spelers = await getAllSelectOptionsByName(
        "players",
        ["firstName", "lastName"],
        "playerID"
      );
      console.log("spelers: ", spelers);
      setSpelers(spelers);
    };
    getSpelers();
  }, []);
  return (
    <Modal
      title="Team toevoegen"
      modalOpen={props.addModalOpen}
      setModalOpen={props.setAddModalOpen}
    >
      {props.showTeamList ? (
        <div className="mt-10">
          <p>Voeg hieronder een bestaand team toe</p>
          <DefaultSelect
            id=""
            name=""
            label="Bestaand Team"
            options={teams}
            search={true}
          />{" "}
        </div>
      ) : null}

      <div className="flex flex-col">
        {props.showTeamList ? (
          <p className="mt-5">Of maak een nieuw team</p>
        ) : null}
        <InformationBox
          success={handleSubmitSuccess}
          show={informationBoxMessage !== ""}
          onClose={() => setInformationBoxMessage("")}
        >
          {informationBoxMessage}
        </InformationBox>
        <DefaultInput
          id="teamnaam"
          name="name"
          label="Teamnaam"
          placeholder="Teamnaam"
          onChange={handleChange}
        />

        <DefaultSelect
          name="captainid"
          id="captainid"
          label="Kapitein"
          options={spelers.map((speler) => {
            console.log(speler);
            return {
              value: speler.value,
              label: speler.label,
            };
          })}
          onChange={handleChange}
          search={true}
        />

        <DefaultSelect
          name="classification"
          id="classification"
          label="Gewest"
          options={Object.values(CLASSIFICATION).map((value) => {
            return {
              value: value,
              label: `${value[0].toUpperCase()}${value
                .substring(1)
                .toLowerCase()}`,
            };
          })}
          onChange={handleChange}
        />
        <div className="flex gap-5">
          <DefaultSelect
            name="clubid"
            id="clubid"
            label="Club"
            options={
              props.currentClub
                ? [
                    {
                      value: props.currentClub.clubID,
                      label: props.currentClub.name,
                    },
                  ]
                : clubs
            }
            onChange={handleChange}
            search={true}
            notRequired={true}
          />

          <DefaultSelect
            name="playersid"
            id="playersid"
            label="Spelers"
            options={
              props.currentPlayer
                ? [
                    {
                      value: props.currentPlayer.playerID,
                      label: `${props.currentPlayer.firstName} ${props.currentPlayer.lastName}`,
                    },
                  ]
                : spelers
            }
            onChange={handleChange}
            search={true}
            notRequired={true}
          />
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
  );
};

export default AddTeamModal;
