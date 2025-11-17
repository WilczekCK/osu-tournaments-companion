import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination, Autoplay } from 'swiper/modules';
import { formatDate } from "utils"
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import Mode from "components/Mode";

export default function TournamentHeader({tournamentDetails}) {
  return (
    <div className="flex flex-col w-full bg-container-main pt-0 rounded-xl items-center gap-0">
    <div className="flex w-full overflow-hidden relative border-8 rounded-md" style={{borderColor:"#373434"}}>
      <div className="absolute w-full h-full bg-pink-custom z-10 opacity-70"></div>
      <Swiper
        spaceBetween={1}
        loop={true}
        autoplay={{
          disableOnInteraction: false,
        }}
        slidesPerView={4}
        modules={[FreeMode, Autoplay]}
        speed={10000}
        autoPlay={true}
        className="mySwiper"
      >
        {tournamentDetails.mapsPlayed.map(map => (
          <SwiperSlide>
            <img key={map.info.beatmapset_id} className="h-52 w-96 object-cover" src={map.info.beatmapset.covers['cover']} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

    <div className="w-100 bg-container-tournament border-white text-pink-900 px-10 py-3 pb-5 text-2xl mt-[-135px] z-20 rounded-md justify-center flex flex-col">
      <Mode name={tournamentDetails.gameMode} displayText={false} />
      <h2>{tournamentDetails.title}</h2>
      <small className="text-white text-sm text-center">{formatDate(tournamentDetails.timeCreated)}</small>
    </div>
  </div>
  );
}