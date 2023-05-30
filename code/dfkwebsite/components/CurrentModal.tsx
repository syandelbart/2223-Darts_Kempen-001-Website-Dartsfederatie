import {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Modal from "./Modal";
import AddButton from "./AddButton";
import { TeamFront } from "../types/team";
import TeamSpelers from "./TeamSpelers";
import {
  handleDeletePlayerFromTeam,
  handleMakePlayerCaptain,
} from "../modules/overzicht";

type CurrentModalData = {
  currentObject: any;
  title: string | undefined;
  currentModalOpen: boolean;
  setCurrentModal: Function;
  children?: (item: any) => JSX.Element;
  addTeams?: boolean;
  addTeamModalOpen?: boolean;
  setAddTeamModalOpen?: Dispatch<SetStateAction<boolean>>;
};

const CurrentModal: FunctionComponent<CurrentModalData> = ({
  currentObject,
  title,
  currentModalOpen,
  setCurrentModal,
  children,
  addTeams,
  addTeamModalOpen,
  setAddTeamModalOpen,
}) => {
  const [teams, setTeams] = useState<TeamFront[]>([]);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_NO_API) {
      currentObject &&
        currentObject.teamIDs.map((team: TeamFront) => {
          fetch(`/api/teams/${team.teamID}`)
            .then((team) => team.json())
            .then((parsedTeam) => {
              setTeams((teams) => [...teams, parsedTeam]);
              console.log(teams);
            })
            .catch((err) => console.log(err));
        });
    }
  }, []);

  return (
    currentObject && (
      <Modal
        title={title}
        modalOpen={currentModalOpen}
        setModalOpen={setCurrentModal}
      >
        {children ? children(currentObject) : null}
        {addTeams && (
          <div className="mt-10 w-1/2">
            <AddButton
              name="Team toevoegen"
              addModalOpen={addTeamModalOpen}
              setAddModalOpen={setAddTeamModalOpen}
            />
          </div>
        )}
        {teams && teams.length !== 0 ? (
          teams.map((team: TeamFront) => (
            <TeamSpelers
              team={team}
              key={team.teamID}
              handleDeletePlayerFromTeam={handleDeletePlayerFromTeam}
              handleMakePlayerCaptain={handleMakePlayerCaptain}
            />
          ))
        ) : (
          <p className="text-xl mt-10">{addTeams && "Geen teams gevonden."}</p>
        )}
      </Modal>
    )
  );
};

export default CurrentModal;
