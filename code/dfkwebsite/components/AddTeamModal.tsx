import { Dispatch, FunctionComponent, useEffect, useState } from "react";
import Modal from "./Modal";
import { CLASSIFICATION } from "../types/competition";
import DefaultInput from "./DefaultInput";
import DefaultSelect from "./DefaultSelect";
import { ClubFront } from "../types/club";
import InformationBox from "./InformationBox";
import * as dummyData from "../data";
import * as formHandler from "../modules/formHandler";
import { Team, TeamFront } from "../types/team";
import { teamRegexPatterns } from "../modules/team";
import { PlayerFront } from "../types/player";
import { SelectOption, getAllSelectOptionsByName } from "../modules/general";

type AddTeamModalData = {
  addModalOpen: boolean;
  setAddModalOpen: any;
  currentClub?: ClubFront | null;
  currentPlayer?: PlayerFront | null;
  showTeamList?: boolean;
  teams?: TeamFront[];
  setTeams?: Dispatch<React.SetStateAction<TeamFront[]>>;
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
    formHandler.handleChange(event, setFormValues, formValues);
  };

  const handleSelectChange = ( value: { value : string, label: string }, action: { action : string, name: string } ) => {
    console.log("handleSelectChange");
    console.log("value: ", value);
    console.log("value.value: ", value.value);
    console.log("action: ", action);
    console.log("action.name: ", action.name);
    
    formHandler.handleChangeSelect(value, action, setFormValues, formValues);
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
    if (!props.setTeams) return;

    props.setTeams((teams) => {
      if (!team) return teams;
      // The new Team will be of type Team, but we want it to be of type TeamFront
      return [...teams, team as TeamFront];
    });
    
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
            return {
              value: speler.value,
              label: speler.label,
            };
          })}
          onSelectChange={handleSelectChange}
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
          onSelectChange={handleSelectChange}
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
            onSelectChange={handleSelectChange}
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
            onSelectChange={handleSelectChange}
            search={true}
            multiple={true}
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
