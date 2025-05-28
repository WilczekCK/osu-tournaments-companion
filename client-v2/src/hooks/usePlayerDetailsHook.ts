import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "utils";

const playersLoaded = new Map<number, Player>();

export default function usePlayerDetailsHook(playerId: number) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [playerDetails, setPlayerDetails] = useState({})

    useEffect(() => {
        if (playersLoaded.get(playerId) != undefined) {
            const player = playersLoaded.get(playerId) as Player;
            
            setPlayerDetails(player);
            setLoading(false);
        } else {
            async function fetchPlayer() {
                await axios
                    .get(`${API_URL}/users/${playerId}`)
                    .then((response) => {
                        playersLoaded.set(playerId, response.data.result[0]);

                        setPlayerDetails(response.data.result[0]);
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.error("Error fetching player:", error);
                        setError(true);
                        setLoading(false);
                    });
            }

            fetchPlayer();
        }
    }, [playerId]);



    return {playerDetails, loading, error};
}