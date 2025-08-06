import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const Slider: React.FC = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      autoplay={{ delay: 1900, disableOnInteraction: false }}
      loop={true}
      navigation
      pagination={{ clickable: true }}
      spaceBetween={0}
      slidesPerView={1}
    >
      <SwiperSlide>
        <img src="/banner1.webp" alt="" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/banner2.webp" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/banner3.webp" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/banner4.webp" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/banner5.webp" />
      </SwiperSlide>
    </Swiper>
  );
};

export default Slider;
