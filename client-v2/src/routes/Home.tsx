import Header from 'components/Header'
import Tournaments from '../assets/svg/tournaments.svg'
import Tournament from 'components/Tournament'


function Home() {
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
            12415 tournaments in total
            <button className="bg-pink-custom p-2 pb-3 hover:bg-pink-900 hover:text-white transition duration-300 ease-in-out">see more</button>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full mt-6 columns-2">
          <Tournament 
            name={"OWC 2024"}
            mode={"standard"}
            teams={[{name: 'Poland', score:3, players: ['WubWoofWolf', 'Fartownik']}, {name: 'Japan', score:2, players: ['Cookiezi', 'rrtyui']}]}
            progress={{map: 'Blue Dragon', score: 3, total: 5}}
            status={'inprogress'}
            started={'2025.04.12 02:53'}
          />
        </div>
      </div>
    </>
  )
}

export default Home
