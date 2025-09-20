import styles from "./CategorySection.module.css";
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import {Navigation, Pagination } from "swiper/modules";
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
            {/* <SwiperSlide>
              <a href="/hello">
                <img src="/tv units.webp"></img>
              </a>
            </SwiperSlide> */}
            <SwiperSlide>
              <a href="/products/categories/shoe-racks">
                <img src="/shoeRacks.webp" alt="Shoe-Racks"></img>
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a href="/products/categories/wardrobes">
                <img src="/wardrobes.webp" alt="wardrobes"></img>
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a href="/products/categories/recliners">
                <img src="/recliners.webp" alt="recliners"></img>
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a href="/products/categories/bookcases">
                <img src="/bookcases.webp" alt="bookcases"></img>
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a href="/products/categories/chair">
                <img src="/officechairs.webp" alt="chair"></img>
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a href="/products/categories/chair">
                <img src="/Plastic-Chairs.webp" alt="chair"></img>
              </a>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default CategorySection;
