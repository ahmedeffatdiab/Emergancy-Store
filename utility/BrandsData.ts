import { StaticImageData } from 'next/image';
import BransOne from "../src/app/assets/brands/1.webp"
import BransTwo from "../src/app/assets/brands/2.webp"
import BransThree from "../src/app/assets/brands/3.webp"
import BransFour from "../src/app/assets/brands/4.webp"
import BransFive from "../src/app/assets/brands/5.webp"
import BransSix from "../src/app/assets/brands/6.webp"
import BransSeven from "../src/app/assets/brands/7.webp"
import BransEight from "../src/app/assets/brands/8.webp"
import BransNine from "../src/app/assets/brands/9.webp"
export interface Brands{
    id:number,
    link:StaticImageData
}

export const brands:Brands[] = [
  { id: 1, link:BransOne },
  { id: 2, link:BransTwo },
  { id: 4, link:BransThree },
  { id: 3,link:BransFour },
  { id: 5,link:BransFive },
  { id: 6, link: BransSix},
  { id: 7, link:BransSeven },
  { id: 8,link: BransEight},
  { id: 9,link:BransNine},
];

