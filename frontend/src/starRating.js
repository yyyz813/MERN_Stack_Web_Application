import React, { useState,useEffect } from "react";
const StarRating = (props) => {
    const [rating, setRating] = useState(props.rating);
    const [hover, setHover] = useState(0);

    function setReturnStar(input){
      console.log(input)
        return props.returnStar(input);
    }

    return (
      <div className="star-rating">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={index <= (hover || props.rating) ? "starOn" : "starOff"}
              onClick={() => {props.dynamic && ( setReturnStar(index)  && setRating(index))}}
              onMouseEnter={() => props.dynamic && setHover(index)}
              onMouseLeave={() => props.dynamic && setHover(rating)}
            >
              <span className="star">&#9733;</span>
            </button>
          );
        })}
      </div>
    );
  };
  export default StarRating