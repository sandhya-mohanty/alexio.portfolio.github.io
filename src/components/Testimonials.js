import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { sliderProps } from "../sliderProps";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch(
      "https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae"
    )
      .then((response) => response.json())
      .then((data) => setTestimonials(data.user.testimonials))
      .catch((error) => console.error("Error fetching testimonials:", error));
  }, []);

  return (
    <div className="testimonial-section m-30px-t sm-m-20px-t pb-5">
      <div className="sub-title m-30px-b">
        <h2 className="dark-color theme-after">What People Say?</h2>
      </div>
      <Slider {...sliderProps.testimonial} id="client-slider-single">
        {testimonials &&
          testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-col">
              <div className="say">
                <p>{testimonial.review}</p>
              </div>
              <div className="user">
                <div className="img">
                  <img src={testimonial.image.url} alt={testimonial.name} />
                </div>
                <div className="name ml-2">
                  <span>{testimonial.name}</span>
                  <label>{testimonial.position}</label>
                </div>
              </div>
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default Testimonials;
