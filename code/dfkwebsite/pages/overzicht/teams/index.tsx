import { useEffect, useState } from "react";
import { NextPage } from "next";
import Card from "../../../components/Card";
import CardGrid from "../../../components/CardGrid";
import * as dummyData from "../../../data";
import OverzichtTopBar from "../../../components/OverzichtTopBar";
import AddTeamModal from "../../../components/AddTeamModal";
import TeamCard from "../../../components/TeamCard";
import TeamSpelers from "../../../components/TeamSpelers";
import { TeamFront } from "../../../types/team";
import Modal from "../../../components/Modal";
import {
  handleDeletePlayerFromTeam,
  handleMakePlayerCaptain,
} from "../../../modules/overzicht";
import SearchableCardGrid from "../../../components/SearchableCardGrid";

const Teams: NextPage = () => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [teams, setTeams] = useState<TeamFront[]>(dummyData.teams);
  const [currentTeam, setCurrentTeam] = useState<TeamFront | null>(null);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_NO_API) {
      fetch(`/api/teams`)
        .then((teams) => teams.json())
        .then((parsedTeams) => setTeams(parsedTeams));
    }
  }, []);
  return (
    <div>
      <AddTeamModal
        addModalOpen={addModalOpen}
        setAddModalOpen={setAddModalOpen}
        teams={teams}
        setTeams={setTeams}
      />
      <OverzichtTopBar
        titleName="Teams"
        search={search}
        setSearch={setSearch}
        addButtonName="Team toevoegen"
        addModalOpen={addModalOpen}
        setAddModalOpen={setAddModalOpen}
      />

      {currentTeam && (
        <Modal
          title={currentTeam.name}
          modalOpen={isOpen}
          setModalOpen={setIsOpen}
        >
          <input
            className="bg-inherit"
            type="text"
            defaultValue={
              currentTeam.captain?.firstName +
              " " +
              currentTeam.captain?.lastName
            }
          ></input>
          <input
            className="bg-inherit"
            type="text"
            defaultValue={currentTeam.captain?.phone}
          ></input>

          <TeamSpelers
            team={currentTeam}
            handleDeletePlayerFromTeam={handleDeletePlayerFromTeam}
            handleMakePlayerCaptain={handleMakePlayerCaptain}
          />
        </Modal>
      )}

      <SearchableCardGrid items={teams} search={search}>
        {(team: TeamFront) => {
          return (
            <TeamCard
              teamData={team}
              setCurrentTeam={setCurrentTeam}
              setIsOpen={setIsOpen}
            />
          );
        }}
      </SearchableCardGrid>
    </div>
  );
};

export default Teams;
