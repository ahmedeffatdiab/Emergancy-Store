import Image from 'next/image'
import React from 'react'
import { brands } from '../../../../utility/BrandsData'

type BrandProps={
    showPageHeading?:boolean;
    BrandSectionIntro?:boolean
}
const Brand = ({showPageHeading,BrandSectionIntro}:BrandProps) => {
    const visibleBrands = BrandSectionIntro ? brands : brands.slice(0, 5);
  return (
    <div className='container mx-auto'>
        {showPageHeading && (
            <div className="py-3">
                    <h1 id="new-products-heading" className="font-arial text-xl font-bold mb-2">Trending Brands</h1>
                    <hr className="border-t-3 dark:bg-white border-gray-300" />
            </div>
        )}
        {BrandSectionIntro && (
            <div className="text-center py-3 mb-10 w-full md:w-[50%] mx-auto my-2">
                <h4 className="text-2xl font-semibold mb-2">Trending Brands</h4>
                <p className="text-gray-500 dark:text-gray-200">
                 Discover the most popular and talked-about brands making waves this season. Shop the latest trends from top labels in fashion, tech, and lifestyle.
                </p>
            </div>
        )}
            
            <section aria-labelledby="new-products-heading">
              <div className='grid my-3 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2 px-2'>
                {visibleBrands.map((ele,index)=>(
                    <div key={index} className='border text-center border-gray-400 '>
                        <Image className="w-34 h-24 my-2 object-contain  mx-auto" alt="product_image"
                          width={200}  height={200} src={ele.link} />
                    </div>
                ))}
              </div>
            </section>
        </div>
  )
}

export default Brand
