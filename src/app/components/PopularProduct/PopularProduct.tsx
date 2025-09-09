import React from 'react'
import ProductsMinimal from "./ProductsMinimal"

const PopularProduct = () => {
  return (
    <>
        <div className="py-3">
            <h1 className=".font-arial text-xl font-bold mb-2">Popular Products</h1>
            <hr className="border-t-3 dark:bg-white border-gray-300" />
        </div>
        <ProductsMinimal/>
    </>  
  )
}

export default PopularProduct
