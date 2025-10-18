import Header from 'components/Header'
import Tournaments from '../assets/svg/tournaments.svg'
import Tournament from 'components/Tournament'
import { useEffect, useState, useRef} from 'react'
import axios from 'axios'
import { API_URL, LOAD_AMOUNT } from 'utils'
import { useLoadMoreStore } from 'stores/useLoadMoreStore'
import InfiniteScroll from 'react-infinite-scroll-component'
import TournamentPlaceholder from 'components/Tournament/Placeholder'
import { useModeSelectStore } from 'stores/useModeSelectStore'
import { setFips } from 'crypto'

type LoadingError = 'fetch-error' | 'no-results' | 'no-more' | false;

function Home() {
  const [loading, setLoading] = useState(true)
  const [isInfiniteLoading, setIsInfiniteLoading] = useState(false)
  const [error, setError]: LoadingError = useState(false)
  const [tournaments, setTournaments] = useState([]);
  const [cursor, setCursor] = useState(0);

  // Infinite load
  const toggleLoad = useLoadMoreStore((state) => state.toggled);
  const setToggleLoad = useLoadMoreStore((state) => state.setToggle);

  // Osu mode selection
  let previousModesSelected = [];
  const getModesSelected: Mode[] = useModeSelectStore(
    (state) => state.modesSelected
  )

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
      setCursor((prevCursor) => {
        const newCursor = prevCursor + 1;
        setIsInfiniteLoading(true);
        setLoading(true);
        setError(false)

        let customQuery = '';
        if (getModesSelected.length > 0) {
          customQuery += `queryKey=gameMode&queryValue=${getModesSelected.join('|')}`;
        }

        axios
          .get(`${API_URL}/tournaments/?limit=${LOAD_AMOUNT}&startFrom=${LOAD_AMOUNT * newCursor}&${customQuery}`)
          .then((response) => {
            if (tournaments && tournaments.length && !response.data) {
              setError('no-results')
              setLoading(false);
              setIsInfiniteLoading(false);
            } else if (!response.data.length) {
              setError('no-more')
              setLoading(false);
              setIsInfiniteLoading(false);
            }

            if (!error && tournaments && response.data.length) {
              setTournaments((tournaments) => [...tournaments, ...response.data]);
              setLoading(false);
              setIsInfiniteLoading(false);
            } else {
            }

            return;
          })

    
        return newCursor;
      });
  };

  return (
    <>
      <Header />
      
      <div className="flex flex-col w-full bg-container-main p-5 pt-4 px-8 rounded-xl items-center">

      {(error && error == 'fetch-error') && (
        <div className="text-white">
          Something went wrong, please contact with the support
        </div>
      )}

      {(error && error == 'no-results') && (
        <div className="text-white">
          No tournaments found matching your criteria.
        </div>
      )}


      {(error && error == 'no-more' && !tournaments.length) && (
        <div className="text-white">
          Thats all results we have in our database
        </div>
      )}

      {(!error || (error == 'no-more' && tournaments.length)) && (
        <>
          <div className="flex flex-row columns-2 w-full items-center">
            <div className="min-w-[50%] flex flex-row gap-3 items-center text-white text-lg">
                <img src={Tournaments} alt="tournaments-icon" className="h-4 mt-[2px] self-center"/>
                Tournaments
            </div>
            <div className="min-w-[50%] flex justify-end text-zinc-300 items-center gap-4">
              12415 tournaments in total
              <button className="bg-pink-custom p-2 pb-3 hover:bg-pink-900 hover:text-white transition duration-300 ease-in-out" onClick={() => [setToggleLoad(!toggleLoad), fetchTournaments()]}>
                {!toggleLoad ? 'load more' : 'stop loading more tournaments'}
                </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-32 gap-2 w-full masonry mt-4">
            <InfiniteScroll
              dataLength={tournaments.length}
              next={fetchTournaments}
              hasMore={toggleLoad}
              loader={(
                (loading && !error) && (
                  Array.from({ length: LOAD_AMOUNT }).map((_, i) => (
                    <TournamentPlaceholder itemNum={i} loadCount={cursor} />
                  ))
                )
              )}
              >
              {
                tournaments.map((tournament, index) => (
                  <div key={index} className="break-inside-avoid">
                    <Tournament tournament={tournament} />
                  </div>
                ))
              }
            </InfiniteScroll>

            {(loading && !error) && (
              Array.from({ length: LOAD_AMOUNT }).map((_, i) => (
                <TournamentPlaceholder itemNum={i} loadCount={cursor} />
              ))
            )}
          </div>
        </>
      )}
      
      {(error && error == 'no-more' && tournaments.length) && (
        <div className="text-white mt-4">
          Thats all results we have in our database
        </div>
      )}

      </div>

      <div className="grid grid-cols-2 md:grid-cols-32 gap-2 w-full masonry mt-4">
          Tu będzie content
      </div>
    </>
  )
}

export default Home
