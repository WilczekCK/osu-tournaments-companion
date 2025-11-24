import { Swiper, SwiperSlide } from 'swiper/react';
import {  Pagination, Autoplay } from 'swiper/modules';
import { formatDate, shuffleArray } from "utils"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import Mode from "components/Mode";
import Header from "components/Header"

export default function TournamentHeader({tournamentDetails}) {
  return (
  <div className="flex flex-col w-full bg-container-main pt-0 rounded-xl items-center gap-0">
    <div className="flex flex-col h-60 w-full overflow-hidden relative border-8 rounded-md" style={{borderColor:"#373434"}}>
        <div className="absolute w-full h-full bg-pink-custom z-10 opacity-60"></div>

        <div className="relative [perspective:1400px] [transform:rotateZ(6.5deg)] mt-[-100px] ml-[-150px]">
        {[...Array(3)].map((_, index) => (
          <div 
          key={index}
          className="
          relative 
          pointer-events-auto
          backdrop-blur-sm
          [transform-style:preserve-3d] 
          [transform:translateY(-48px)_translateZ(-120px)]"
          >
            <Swiper
              spaceBetween={1}
              slidesPerView={4}
              loop={true}
              infinite={true}
              speed={10000}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
              }}
              modules={[Autoplay]}
              style={{overflow: "visible"}}
            >
              {shuffleArray(tournamentDetails.mapsPlayed.length < 3 ? new Array(6).fill(tournamentDetails.mapsPlayed).flat() : tournamentDetails.mapsPlayed).map(map => (
                <SwiperSlide>
                  <img key={map.info.beatmapset_id} className="h-52 w-96 ml-14 object-cover" src={map.info.beatmapset.covers['cover']} />
                </SwiperSlide>
              ))}
            </Swiper>
        </div>
        ))}
        </div>

      </div>

      <div className="w-100 bg-container-tournament border-white text-pink-900 px-10 py-3 pb-5 text-2xl mt-[-135px] z-20 rounded-md justify-center flex flex-col">
        <Mode name={tournamentDetails.gameMode} displayText={false} />
        <h2>{tournamentDetails.title}</h2>
        <small className="text-white text-sm text-center">{formatDate(tournamentDetails.timeCreated)}</small>
      </div>
  </div>
  );
}