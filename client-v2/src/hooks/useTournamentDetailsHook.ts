import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "utils";

export default function useTournamentDetailsHook<T>(tournamentId: number, enabled: boolean = true) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [tournamentDetails, setTournamentDetails] = useState({})

    useEffect(() => {
        if (!enabled) return;

        async function fetchTournament() {
            await axios
                .get(`${API_URL}/tournaments/${tournamentId}`)
                .then((response) => {
                    setTournamentDetails(response.data.result[0]);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching tournament:", error);
                    setError(true);
                    setLoading(false);
                });
        }

        fetchTournament();
    }, [tournamentId, enabled]);



    return {tournamentDetails, loading, error};
}