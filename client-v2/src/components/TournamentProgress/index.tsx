import useTournamentStageHook from "hooks/useTournamentStageHook"
import MatchCreated from "./MatchCreated"

export default function TournamentProgress({progress, users}) {
    const tournamentStages = useTournamentStageHook(progress);

    const getUserDetails   = (userId) => {
        return users.find(user => user.user_id === userId) || null;
    }

    return (
        <div className="relative w-[100%]">
            <div className={"absolute h-[95%] left-5 bg-pink-400 w-1 z-0 rounded-full"}>
                {/* STRIP LINE */}
            </div>

            <div className={"w-3/4 z-10 relative ml-2"}>
                {
                    tournamentStages.map(stage => {
                        if (stage.stageType === 'match-created') {
                            return <MatchCreated details={stage} user={getUserDetails(stage.user_id)} />;
                        } 

                        return null; 
                    })
                }
            </div>
        </div>
    );
}