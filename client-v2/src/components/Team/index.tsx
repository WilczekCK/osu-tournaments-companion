import Player from "components/Player";

export default function Team({name, players}: {name: string, players: any[]}) {
  return (
    <div>
       {players.map((player, index) => <Player player={player} key={index} withRanking={true}/>)}
    </div>
  );
}