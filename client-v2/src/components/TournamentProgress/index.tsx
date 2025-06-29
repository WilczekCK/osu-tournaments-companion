import useTournamentStageHook from "hooks/useTournamentStageHook"
import MatchCreated from "./MatchCreated"
import MapPlayed from "./MapPlayed"
import MatchEnded from "./MatchEnded"

export default function TournamentProgress({progress, users, teams}) {
    const tournamentStages = useTournamentStageHook(progress, teams);

    const getUserDetails   = (userId) => {
        return users.find(user => user.user_id === userId) || null;
    }

    const getUsersDetails = (scores) => {
        const users = [];

        scores.forEach(score => {
            const user = getUserDetails(score.user_id);

            if (user) {
                users.push(user);
            }
        });

        return users;
    }

    return (
        <div className="relative w-[100%]">
            <div className={"absolute h-[100%] left-[3.5%] bg-pink-custom w-1 z-0 rounded-full"}>
                {/* STRIP LINE */}
            </div>

            <div className={"w-100 z-10 relative ml-2 flex flex-col gap-8"}>
                {
                    tournamentStages.map(stage => {
                        if (stage.stageType === 'match-created') {
                            return <MatchCreated details={stage} user={getUserDetails(stage.user_id)} />;
                        } 

                        if (stage.stageType === 'map-played') {
                            return <MapPlayed details={stage} users={users} />;
                        }

                        if (stage.stageType === 'match-disbanded') {
                            return <MatchEnded details={stage} user={getUserDetails(stage.user_id)} />;
                        }

                        return null; 
                    })
                }
            </div>
        </div>
    );
}