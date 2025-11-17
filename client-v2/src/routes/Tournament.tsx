import { useParams } from "react-router-dom";
import { useEffect } from "react";

import Header from "components/Header"
import TournamentHeader from "components/TournamentDetails/Header";
import useTournamentDetailsHook from "../hooks/useTournamentDetailsHook";
import TournamentTeamsList from "components/TournamentTeamsList";
import TournamentProgress from "components/TournamentProgress";

import useTeamsShuffleHook from "hooks/useTeamsShuffleHook";
import usePlayersHook from "hooks/usePlayersHook";


function Tournament({props}) {
  let {id} = useParams();
  const {tournamentDetails, loading: tournamentLoading, error: tournamentError} = useTournamentDetailsHook(id, true);
  
  let players, teams;
  if (!tournamentLoading) {
    players = usePlayersHook(tournamentDetails.users, tournamentDetails.judge);
    teams   = useTeamsShuffleHook(players, tournamentDetails.teams);  
  }
  
  return (
    <>
      <Header />

      {!tournamentLoading && (
        <>
          <TournamentHeader tournamentDetails={tournamentDetails} />

          <div className="flex flex-col gap-12 pt-8 mt-[-20px] bg-container-main px-8 pb-6">
            <div className="flex gap-4">
              <TournamentTeamsList teams={tournamentDetails.teams} details={tournamentDetails} />
            </div>

            {/* <div className="bg-container-tournament p-4"> */}
              <TournamentProgress progress={tournamentDetails.events} users={tournamentDetails.users} teams={teams} />
            {/* </div> */}
          </div>
        </>
      )}
    </>
  )
}

export default Tournament
