
export default function Avatar({player} : {player: Player}) {
    return (
        <div className="flex flex-row gap-3 items-center min-w-10">
            <img src={player.playerAvatar} alt={`player-${player.playerName}`} className="w-10 h-10" style={{ boxShadow: '0 10px 15px rgba(0, 0, 0, 0.3)' }} />
        </div>
    );

}