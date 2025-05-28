import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "utils";

export default function usePlayerDetailsHook(playerId: number) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [playerDetails, setPlayerDetails] = useState({});

    useEffect(() => {
        async function fetchPlayer(){ {
            await axios
                .get(`${API_URL}/users/${playerId}`)
                .then((response) => {
                    setPlayerDetails(response.data.result[0]);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching player:", error);
                    setError(true);
                    setLoading(false);
                });
        }}


        fetchPlayer();
    }, []);


    return {playerDetails, loading, error};
}