import useTournamentStageHook from "hooks/useTournamentStageHook"

export default function TournamentProgress({progress}) {
    console.log(progress);
    
    const tournamentStages = useTournamentStageHook(progress)
    
    
    console.log(tournamentStages)

    return (
        <>xd</>
    )
}