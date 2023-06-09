import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StaticStar from './StaticStar.jsx';

export default function Stars({ productId, ratingInt, returnAvgRating }) {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (productId) {
      axios.get(`/reviews?product_id=${productId}&count=9999`)
        ?.then((results) => {
          const ratingSum = results.data.results?.reduce((accum, val) => (
            accum + val.rating
          ), 0);
          const avRating = Math.round((ratingSum / results.data.results?.length) * 10) / 10;
          setRating(avRating);
          if (returnAvgRating) {
            if (avRating % 1 === 0) {
              returnAvgRating(`${avRating}.0`);
            } else {
              returnAvgRating(avRating);
            }
          }
        })
        .catch((err) => { throw err; });
    }
  }, [productId]);

  useEffect(() => {
    setRating(ratingInt);
  }, [ratingInt]);

  const stars = Array(5).fill(0);
  const ratingWhole = Math.floor(rating);
  const ratingDecimal = rating % 1;

  // conforming a number into an array representing each star
  // 3.4 would be [1, 1, 1, 0.4, 0]
  for (let i = 0; i < ratingWhole; i += 1) {
    stars[i] = 1;
  }
  if (ratingWhole < 5) {
    stars[ratingWhole] = Math.round(ratingDecimal * 10) / 10;
  }

  return (
    <div className="star-box">
      {stars.map((val, i) => (<StaticStar value={val} key={i} />))}
    </div>
  );
}
