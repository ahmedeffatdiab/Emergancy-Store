import React from 'react'
import Services from './Services'

const Page = () => {
  return (
    <section className='container mx-auto'>
      <div className="py-3">
        <h1 id="services-heading" className="font-arial text-xl font-bold mb-2" >
          Services
        </h1>
        <hr className="border-t-3 dark:bg-white border-gray-300" />
      </div>
        <Services/>
    </section>
  )
}

export default Page
