import Player from "components/Player";

export default function Team({name, players, teamNumber, areQualifiers, variant}: {name: string, players: any[], teamNumber: number, areQualifiers: boolean, variant: string}) {
  return (
    <div className={"flex flex-col scroll-m-1 "+ (areQualifiers ? 'w-full md:w-[100%]' : 'w-full md:w-[50%]') }>
      <div className={"text-2xl font-bold text-center text-xl "+ (variant == 'white' ? 'text-white' : '')}>{name}</div>
      <div className="flex flex-col gap-2 w-full mt-2">
        {
          players.length > 0 
            ? (players.map((player, index) => <Player player={player} key={index} withRanking={true} teamNumber={teamNumber}/>))
            // ? (players.map((player, index) => <></>))
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