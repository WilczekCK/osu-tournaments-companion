import useTournamentStageHook from "hooks/useTournamentStageHook"
import MatchCreated from "./MatchCreated"
import MapPlayed from "./MapPlayed"
import MatchEnded from "./MatchEnded"

export default function TournamentProgress({progress, users, teams, variant}: {progress: any[], users: any[], teams: any[], variant: string}) {
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
            <div className={"absolute hidden md:flex h-[100%] left-[23px] bg-pink-custom w-1 z-0 rounded-full"}>
                {/* STRIP LINE */}
            </div>

            <div className={"w-100 z-10 relative ml-2 flex flex-col gap-8"}>
                {
                    tournamentStages.map((stage, index) => (
                        <div key={index}>
                            {stage.stageType === 'match-created' && (
                                <MatchCreated details={stage} user={getUserDetails(stage.user_id)} variant={variant} />
                            )}

                            {stage.stageType === 'map-played' && (
                                <MapPlayed details={stage} users={users} teams={teams} variant={variant} />
                            )}

                            {stage.stageType === 'match-disbanded' && (
                                <MatchEnded details={stage} user={getUserDetails(stage.user_id)} variant={variant} />
                            )}
                        </div>
                    ))
                }
            </div>
        </div>
    );
}