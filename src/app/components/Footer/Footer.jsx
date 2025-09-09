
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    title: "Fashion",
    links: [
      "T-shirt", "Shirts", "Shorts & Jeans", "Jacket", "Dress & Frock",
      "Innerwear", "Hosiery"
    ],
  },
  {
    title: "Footwear",
    links: [
      "Sport", "Formal", "Boots", "Casual", "Cowboy Shoes", "Safety Shoes",
      "Party Wear Shoes", "Branded", "Firstcopy", "Long Shoes"
    ],
  },
  {
    title: "Jewellery",
    links: [
      "Necklace", "Earrings", "Couple Rings", "Pendants", "Crystal", "Bangles",
      "Bracelets", "Nosepin", "Chain"
    ],
  },
  {
    title: "Cosmetics",
    links: [
      "Shampoo", "Bodywash", "Facewash", "Makeup Kit", "Liner", "Lipstick", "Perfume",
      "Body Soap", "Scrub", "Hair Gel", "Hair Colors", "Hair Dye", "Sunscreen", "Skin Lotion"
    ],
  },
];
const Footer = () => {
  return (
    <footer className="bg-gray-950 dark:bg-gray-900  border-t w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-xl font-bold mb-6 text-cyan-400 dark:text-white" tabIndex={0}>
          Brand Directory
        </h2>
        <div className="space-y-4 mb-6">
          {categories.map((cat, index) => (
            <div key={index} className="flex flex-col gap-2 sm:flex-row sm:items-center flex-wrap">
              <h3 className="font-bold text-pink-700 dark:text-gray-200 whitespace-nowrap mr-2">
                {cat.title}:
              </h3>
              <ul className="flex flex-wrap items-center text-sm">
                {cat.links.map((link, idx) => (
                  <li key={idx} className="flex items-center mx-1">
                    <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition" >
                      {link}
                    </Link>
                    {idx < cat.links.length - 1 && (
                      <span className="text-gray-500 mx-1">|</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="w-full border-t border-gray-200 dark:border-gray-700 pt-6">
          <div className="flex flex-col items-center justify-center text-center">
            <Image src="https://res.cloudinary.com/dptz3ognb/image/upload/v1749600997/payment_sh6ae6.png" alt="Accepted payment methods" width={300}
              height={30} className="h-6 object-contain my-2" />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              © {new Date().getFullYear()}{" "}
              <Link href="#" className="text-blue-600 hover:underline">
                Emergancy
              </Link>
              . All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
