import { useParams } from "react-router";
import Header from "components/Header"
import useTournamentDetailsHook from "../hooks/useTournamentDetailsHook";

function Tournament({props}) {
  let {id} = useParams();
  const {tournamentDetails, loading: tournamentLoading, error: tournamentError} = useTournamentDetailsHook(id, true);

  console.log(tournamentDetails)

  return (
    <Header />
  )
}

export default Tournament
