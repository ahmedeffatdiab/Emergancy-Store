import React from 'react';
import { CatregoryItem } from "../../../../utility/CategoryData";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  categoryData: CatregoryItem[];
}

const SliderCategory = ({ categoryData }: Props) => {
  return (
    <div className="relative w-full max-w-[92%] mx-auto my-4 overflow-visible">
      <Carousel>
        <div className="relative">
          <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 md:hidden" />
          <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 md:hidden" />
          <CarouselPrevious className="hidden md:flex absolute -left-8 top-1/2 -translate-y-1/2 z-10" />
          <CarouselNext className="hidden md:flex absolute -right-8 top-1/2 -translate-y-1/2 z-10" />
          <CarouselContent>
            {categoryData.map((item, index) => (
              <CarouselItem key={index} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6" >
                <Link href={`/categoryList/${item.title}`} className='hover:bg-gray-300 opacity-70'>
                <div className="flex items-center gap-3 p-4 border-y text-white shadow rounded">
                  <Image src={item.img} alt={item.title} width={40} height={40} className="object-contain"/>
                  <div className="text-left text-gray-950 dark:text-white">
                    <h3 className="text-sm font-medium ">
                      {item.title}
                    </h3>
                    <p className="text-xs ">({item.count})</p>
                  </div>
                </div>
                </Link>
                
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
      </Carousel>
    </div>
  );
};

export default SliderCategory;
