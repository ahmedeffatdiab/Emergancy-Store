"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { usePurchaseAlert } from '@/context/PurchaseAlertContext';
import { Product } from '../../../utility/ProductsInterfce';
import { useRouter } from 'next/navigation';

interface Props {
  product: Product;
}

const ProductReviews = ({ product }: Props) => {
  const [reviews, setReviews] = useState(product.reviews || []);
  const [hover, setHover] = useState(0);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');
  const { showPurchaseAlert } = usePurchaseAlert();
  const router=useRouter()
  const handleStarClick = (star: number) => {
    setRating(star);
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const token=localStorage.getItem("userToken");
    if(!token){
      router.push("/login");
      return false;
    }
    try {
      const resData = await axios.post(
        `https://emergancy-api-kqk9.vercel.app/product/${product._id}/add-review`,
        {
          rating,
          comment,
        },
        {
          headers: {
            token: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );
      console.log(resData)
      const newReview = resData.data?.review || {
        name: resData.data.username || 'You',
        rating,
        comment,
      };

      showPurchaseAlert('👍 Review submitted');
      setReviews([...reviews, newReview]); 
      setRating(0);
      setComment('');
      setMessage('');
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const err = error as { response?: { data?: { message?: string } } };
        setMessage(err.response?.data?.message || 'Error submitting review');
      } else {
        setMessage('Error submitting review');
      }
    }
  };

  return (
    <div className="pt-6 border-t mt-6">
      {/* === Review Form === */}
      <form onSubmit={submitHandler}>
        <h3 className="text-lg font-semibold mb-2">Write a Review</h3>

        {/* Star Rating */}
        <div className="flex mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`cursor-pointer text-2xl ${
                star <= (hover || rating) ? 'text-yellow-400' : 'text-gray-300'
              }`}
              onClick={() => handleStarClick(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            >
              ★
            </span>
          ))}
        </div>

        <textarea
          className="w-full p-2 border rounded mb-3"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          placeholder="Enter comment"
        ></textarea>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={rating === 0}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Review
          </button>
        </div>

        {message && <p className="mt-2 text-red-600">{message}</p>}
      </form>

      {/* === Review List === */}
      <div className="pt-6 border-t mt-6">
        {reviews.length > 0 ? (
          reviews.map((review, idx) => (
            <div key={idx} className="border rounded p-3 mb-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold">{review.name}</span>
                <span className="text-yellow-500">
                  {Array.from({ length: 5 }, (_, index) => (
                    <span key={index}>{index < review.rating ? '★' : '☆'}</span>
                  ))}
                </span>
              </div>
              <p className="text-sm mt-1">{review.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProductReviews;
