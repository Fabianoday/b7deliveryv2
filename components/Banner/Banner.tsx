import styles from  './Banner.module.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

export const Banner = () =>{    
    return(        
        <div className={styles.container}>
           
           <Swiper     
             slidesPerView={1}
             loop={true}
             autoplay={{
                delay:1000,
                disableOnInteraction:false
             }}

             modules={[Autoplay]}
             className={styles.swiper}
     
    >
      <SwiperSlide className={styles.slide}><img src="/tmp/banner01.png" alt='#'></img></SwiperSlide>
      <SwiperSlide className={styles.slide}><img src="/tmp/banner02.png" alt='#'></img></SwiperSlide>
      
    </Swiper>

        </div>
    )
} 