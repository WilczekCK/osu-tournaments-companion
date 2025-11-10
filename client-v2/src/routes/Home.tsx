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
import { useTournamentsStore } from 'stores/useTournamentsStore'
import { useSearchStore } from 'stores/useSearchStore'
type LoadingError = 'fetch-error' | 'no-results' | 'no-more' | false;

function Home() {
  const [loading, setLoading] = useState(true)
  const [isInfiniteLoading, setIsInfiniteLoading] = useState(false)
  const [error, setError]: LoadingError = useState(false)
  const [cursor, setCursor] = useState(0);

  // Infinite load
  const toggleLoad = useLoadMoreStore((state) => state.toggled);
  const setToggleLoad = useLoadMoreStore((state) => state.setToggle);

  // Tournaments store
  const tournaments = useTournamentsStore((state) => state.tournaments);
  const tournamentsCount = useTournamentsStore((state) => state.tournamentsCount);
  const tournamentsStatus = useTournamentsStore((state) => state.status);
  const setTournaments = useTournamentsStore((state) => state.addTournaments);
  const fetchTournamentsStore = useTournamentsStore((state) => state.loadTournaments);

  // Queries
  const modesSelected = useModeSelectStore((state) => state.modesSelected);
  const searchPhrase = useSearchStore((state) => state.searchPhrase);

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    fetchTournamentsStore()
  };

  return (
    <>
      <Header />
      
      <div className="flex flex-col w-full bg-container-main p-5 pt-4 px-8 rounded-xl items-center">

      <div className="flex flex-row columns-2 w-full items-center">
        <div className="min-w-[50%] flex flex-row gap-3 items-center text-white text-lg">
            <img src={Tournaments} alt="tournaments-icon" className="h-4 mt-[2px] self-center"/>
            Tournaments
        </div>
        <div className="min-w-[50%] flex justify-end text-zinc-300 items-center gap-4">
          {tournamentsStatus == 'loading' ? (
            <div className="flex justify-center">
              <div className="animate-spin h-4 w-4 border-4 border-pink-custom border-t-transparent rounded-full"></div>
            </div>
          ) : (
            <div>
              {tournamentsCount} tournaments found
            </div>
          )}

          <button className="bg-pink-custom p-2 pb-3 hover:bg-pink-900 hover:text-white transition duration-300 ease-in-out" onClick={() => [setToggleLoad(!toggleLoad), (!toggleLoad && fetchTournamentsStore(4))]}>
            {!toggleLoad ? 'load more' : 'stop loading more tournaments'}
          </button>
        </div>
      </div>

      {(!error || (error == 'no-more' && tournaments.length)) && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-32 gap-2 w-full masonry mt-4">
            <InfiniteScroll
              dataLength={tournaments.length}
              next={fetchTournaments}
              hasMore={toggleLoad}
              scrollThreshold={0.1}
              next={fetchTournaments}
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

              {(error && error == 'no-more' && tournaments.length) && (
                <div className="text-white mt-4">
                  Thats all results we have in our database
                </div>
              )}
            </InfiniteScroll>

            {(tournamentsStatus == 'loading') && (
              Array.from({ length: LOAD_AMOUNT }).map((_, i) => (
                <TournamentPlaceholder itemNum={i} loadCount={cursor} />
              ))
            )}
          </div>
        </>
      )}
    
      {(tournamentsStatus == 'no-results') && (
        <div className="text-white">
          No more tournaments found matching your criteria.
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
