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
            <a>
              <SwiperSlide>
                <img src="/tv units.webp"></img>
              </SwiperSlide>
            </a>
            <a>
              <SwiperSlide>
                <img src="/shoeRacks.webp"></img>
              </SwiperSlide>
            </a>
            <a>
              <SwiperSlide>
                <img src="/wardrobes.webp"></img>
              </SwiperSlide>
            </a>

            <a>
              <SwiperSlide>
                <img src="recliners.webp"></img>
              </SwiperSlide>
            </a>
            <a>
              <SwiperSlide>
                <img src="/bookcases.webp"></img>
              </SwiperSlide>
            </a>
            <a>
              <SwiperSlide>
                <img src="/officechairs.webp"></img>
              </SwiperSlide>
            </a>
            <a>
              <SwiperSlide>
                <img src="/Plastic-Chairs.webp"></img>
              </SwiperSlide>
            </a>
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default CategorySection;
