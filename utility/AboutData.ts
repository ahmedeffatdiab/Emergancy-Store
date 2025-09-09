export type CollectionItem = {
  title: string;
  image: string;
};

export const getCollections = (): CollectionItem[] => [
  {
    title: "T-Shirts",
    image: "https://res.cloudinary.com/dptz3ognb/image/upload/v1749601111/shirt-3_h9vnlo.jpg",
  },
  {
    title: "Jackets",
    image: "https://res.cloudinary.com/dptz3ognb/image/upload/v1749601092/jacket-7_ezd4dy.jpg",
  },
  {
    title: "Shoes",
    image: "https://res.cloudinary.com/dptz3ognb/image/upload/v1749601133/sports-6_cygtzy.jpg",
  },
  {
    title: "Sportswear",
    image: "https://res.cloudinary.com/dptz3ognb/image/upload/v1749601126/shorts-1_xhtpxz.jpg",
  },
  {
    title: "Accessories",
    image: "https://res.cloudinary.com/dptz3ognb/image/upload/v1749601095/il_794xN.5516071211_lbgb_ad7dwv.jpg",
  },
  {
    title: "Skirts",
    image: "https://res.cloudinary.com/dptz3ognb/image/upload/v1749601014/clothes-4_fmlqbf.jpg",
  },
];
