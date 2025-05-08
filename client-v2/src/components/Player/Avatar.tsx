
export default function Avatar({player} : {player: Player}) {
    return (
        <div className="flex flex-row gap-3 items-center">
            <img src={player.playerAvatar} alt={`player-${player.playerName}`} className="w-10 h-10" style={{ boxShadow: '0 10px 15px rgba(0, 0, 0, 0.3)' }} />
        </div>
    );

}