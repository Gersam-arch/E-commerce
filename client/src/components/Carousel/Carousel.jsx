import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { img } from './img/data'
import styles from './Carousel.module.css'

function CarouselEffect() {
  return (
    <div className={styles.carouselContainer}>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={true}
        showThumbs={false}
        showStatus={false}
        interval={3000}
      >
        {img.map((imageItemLink, index) => (
          <div key={index}>
            <img
              src={imageItemLink}
              alt={`banner-${index + 1}`}
              className={styles.carouselImage}
            />
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default CarouselEffect