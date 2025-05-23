import { useEffect, useState } from "react";
import axios from "axios";

export default function usePlayerDetailsHook(playerId: number) {
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(false);
    // const [playerDetails, setPlayerDetails] = useState({});

    // useEffect(() => {
    //     axios
    //         .get(`https://api.otc.glad.vision/users/${playerId}`)
    //         .then((response) => {
    //             setPlayerDetails(response.data.result[0]);
    //             setLoading(false);
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching user:", error);
    //             setError(true);
    //             setLoading(false);
    //         });
    // }, [playerId]);

    return { };
}