import Team from "components/Team";
import useTeamsShuffleHook from "hooks/useTeamsShuffleHook";
import usePlayersHook from "hooks/usePlayersHook";

export default function TournamentTeamsList({teams, details, variant}: {teams: any[], details: any, variant: string}) {
  // Details needs to be reloaded
  if (!teams.length && details) {
    const players = usePlayersHook(details.users, details.judge);
    teams = useTeamsShuffleHook(players, details.teams)
  } 


  if (teams.length) {
    const areQualifiers = teams[1].name === 'Qualifiers';

    return (
      <>
          <Team name={teams[0].name} players={teams[0].players} teamNumber={0} areQualifiers={areQualifiers} variant={variant}/>
          {!areQualifiers && (
              <Team name={teams[1].name} players={teams[1].players} teamNumber={1} variant={variant}/>
          )}
      </>
    );
  }
}