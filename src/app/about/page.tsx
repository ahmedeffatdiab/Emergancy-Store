import React from "react";
import { CollectionItem, getCollections } from "../../../utility/AboutData";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const Page = async () => {
  const collections: CollectionItem[] = await getCollections();
  return (
    <main className="container mx-auto py-6" role="main" aria-label="About Page">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold" tabIndex={0} aria-label="About Us heading">
          About Us
        </h1>
        <p className="text-gray-400 px-1 max-w-2xl mx-auto" tabIndex={0}>
          Discover high-quality fashion for every lifestyle — from casual tees to performance sportswear.
        </p>
      </header>
      <section className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6" aria-labelledby="who-we-are-heading" >
        <div className="w-full md:w-[40%] min-h-[15rem] relative" aria-hidden="true">
          <Image src="https://res.cloudinary.com/dptz3ognb/image/upload/v1749600983/blog-4_i3l2m9.jpg" alt="Fashion designers collaborating in a studio"
            fill className="object-contain rounded" style={{ objectPosition: "center" }} sizes="(max-width: 768px) 100vw, 40vw" priority />
        </div>
        <div className="w-full px-2 md:w-[60%]">
          <h2 id="who-we-are-heading" className="font-semibold text-2xl mb-4" tabIndex={0} aria-label="Who We Are section" >
            Who We Are
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed" tabIndex={0}>
              We&apos;re a team of fashion enthusiasts offering premium clothing for modern lifestyles. Whether you&apos;re hitting
              the gym, heading to work, or dressing up for the weekend, our collection combines comfort, quality, and
              style. We believe that clothing isn&apos;t just a piece of clothing; it&apos;s an extension of your personality and
              an expression of your personal style. That&apos;s why we carefully design our products using selected materials,
              ensuring a comfortable, long-lasting wearing experience. Our goal is for every customer to feel confident
              and unique every moment they wear our products.
          </p>
        </div>
      </section>

      <section aria-labelledby="collections-heading" className="mt-10">
        <h2 id="collections-heading" className="text-xl font-bold mb-2 font-arial" tabIndex={0} aria-label="Our Collections" >
          Our Collections
        </h2>
        <hr className="border-t-2 dark:bg-white border-gray-300 mb-4" />
        <ul className="grid grid-cols-2 px-2 md:grid-cols-3 lg:grid-cols-4 gap-4" role="list" aria-label="Product categories" >
          {collections.map((item, idx) => (
            <li key={idx} role="listitem">
              <Card className="h-full shadow-sm border-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <div className="relative w-full h-[220px] rounded overflow-hidden bg-white flex items-center justify-center" aria-hidden="true" >
                  <Image src={item.image} alt={`Category: ${item.title}`} fill sizes="(max-width: 768px) 100vw, 25vw"  className="object-contain object-center" />
                </div>
                <CardContent className="text-center">
                  <CardTitle tabIndex={0}>{item.title}</CardTitle>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-10 text-center" aria-labelledby="mission-heading">
        <h2 id="mission-heading" className="text-2xl font-semibold mb-3" tabIndex={0}>
          Our Mission
        </h2>
        <p className="text-gray-400 dark:text-gray-300 mx-auto max-w-[700px]" tabIndex={0} aria-label="Mission statement paragraph" >
          We believe fashion should be accessible, durable, and ethical. Our mission is to offer customers stylish
          clothing options while supporting sustainable manufacturing and fair trade.
        </p>
      </section>
    </main>
  );
};

export default Page;
