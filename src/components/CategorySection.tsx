import styles from "./CategorySection.module.css";
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
const CategorySection = () => {
  return (
    <>
      <div className={styles.categoryText}>Shop By Categories</div>

      <div>
        <div className={styles.categoriesSliderWrappper}>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={3}
          >
            <SwiperSlide>
              <a href="/hello">
                <img src="/tv units.webp"></img>
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a href="/hello">
                <img src="/shoeRacks.webp"></img>
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a href="/products">
                <img src="/wardrobes.webp"></img>
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a href="/hello">
                <img src="recliners.webp"></img>
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a href="/hello">
                <img src="/bookcases.webp"></img>
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a href="/products/chairs">
                <img src="/officechairs.webp"></img>
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a href="/hello">
                <img src="/Plastic-Chairs.webp"></img>
              </a>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default CategorySection;
