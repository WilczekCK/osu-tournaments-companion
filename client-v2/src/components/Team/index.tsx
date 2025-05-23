import Player from "components/Player";

export default function Team({name, players, teamNumber, areQualifiers}: {name: string, players: any[], teamNumber: number, areQualifiers: boolean}) {
  return (
    <div className={"flex flex-col scroll-m-1 "+ (areQualifiers ? 'md:w-[100%]' : 'md:w-[50%]') }>
      <div className="text-2xl font-bold text-center text-xl">{name}</div>
      <div className="flex flex-col gap-2 w-ful mt-2">
        {
          players.length > 0 
            ? (players.map((player, index) => <Player player={player} key={index} withRanking={true} teamNumber={teamNumber}/>))
            : (
              <div className="flex flex-col items-center">
                No players in team
                <div className="text-pink-900 text-sm">They might come later...</div>
              </div>
              )
        }
      </div>
    </div>
  );
}