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
import {
  handleDeletePlayerFromTeam,
  handleMakePlayerCaptain,
} from "../../../modules/overzicht";
import SearchableCardGrid from "../../../components/SearchableCardGrid";
import CurrentModal from "../../../components/CurrentModal";

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
      {/* Add Team Modal */}
      <AddTeamModal
        addModalOpen={addModalOpen}
        setAddModalOpen={setAddModalOpen}
        teams={teams}
        setTeams={setTeams}
      />

      {/* Page title, add team button and search field */}
      <OverzichtTopBar
        titleName="Teams"
        search={search}
        setSearch={setSearch}
        addButtonName="Team toevoegen"
        addModalOpen={addModalOpen}
        setAddModalOpen={setAddModalOpen}
      />

      {/* Modal for team details when you press team button */}
      <CurrentModal
        currentObject={currentTeam}
        title={currentTeam?.name}
        currentModalOpen={isOpen}
        setCurrentModal={setIsOpen}
      >
        {(team) => {
          return (
            <div>
              <input
                className="bg-inherit"
                type="text"
                defaultValue={
                  team.captain?.firstName + " " + team.captain?.lastName
                }
              ></input>
              <input
                className="bg-inherit"
                type="text"
                defaultValue={team.captain?.phone}
              ></input>

              <TeamSpelers
                team={team}
                handleDeletePlayerFromTeam={handleDeletePlayerFromTeam}
                handleMakePlayerCaptain={handleMakePlayerCaptain}
              />
            </div>
          );
        }}
      </CurrentModal>

      {/* Grid with all teams */}
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
