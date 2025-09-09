'use client';
import React from 'react';
import { IoStar, IoStarHalf, IoStarOutline } from 'react-icons/io5';

interface StarRatingProps {
  rating: number;
  StarSize?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, StarSize = 16 }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <IoStar key={`full-${i}`} size={StarSize} color="gold"/>
    );
  }

  if (halfStar) {
    stars.push(
      <IoStarHalf key="half" size={StarSize} color="gold"/>
    );
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <IoStarOutline key={`empty-${i}`} size={StarSize} color="gold"/>
    );
  }

  return <div className="flex gap-1">{stars}</div>;
};

export default StarRating;
