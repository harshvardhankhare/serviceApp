import React from 'react'
import "./slide.css"
import Slider from "infinite-react-carousel";

const Slide = () => {
  return (
    <div className="slide">
    <div className="container">
      <Slider slidesToShow={slidesToShow} arrowsScroll={arrowsScroll}>
        {children}
      </Slider>
    </div>
  </div>
  )
}

export default Slide