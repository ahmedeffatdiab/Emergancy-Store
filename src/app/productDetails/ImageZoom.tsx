"use client"
import React, { useRef, useState } from 'react'
import { Product } from '../../../utility/ProductsInterfce';
import Image from 'next/image';

interface Props{
  product:Product,
}
const ImageZoom = ({product}:Props) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const handleMouseMove = (e: React.MouseEvent) => {
      const img = imageRef.current;
      if (!img) return;
  
      const { left, top, width, height } = img.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
  
      img.style.transformOrigin = `${x}% ${y}%`;
      img.style.transform = 'scale(2)';
    };
  
    const handleMouseLeave = () => {
      const img = imageRef.current;
      if (!img) return;
  
      img.style.transform = 'scale(1)';
      img.style.transformOrigin = 'center center';
    };
    const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };
  return (
    <div>
      <div className="overflow-hidden border rounded-md">
            {product.imageUrls?.[selectedImageIndex] && (
              <img 
                ref={imageRef}
                src={product.imageUrls[selectedImageIndex]}
                alt="Product"
                className="object-cover w-full h-auto max-h-[600px]"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              />
            )}
    </div>
    <div className="flex flex-wrap gap-2 mt-4">
                {product.imageUrls?.map((url, index) => (
                  <div
                    key={index}
                    onClick={() => handleImageClick(index)}
                    className={`w-24 h-24 border cursor-pointer rounded overflow-hidden ${
                      selectedImageIndex === index ? 'ring-2 ring-blue-500' : ''
                    }`}
                  >
                    <Image width={500} height={300} src={url} alt={`Thumb-${index}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
    </div>
    
  )
}

export default ImageZoom
