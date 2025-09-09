export interface Review {
  _id: string;
  user: string;
  name: string;
  rating: number;
  comment: string;
}

export interface Product {
  _id: string;
  title: string;
  category: string;
  imageUrls: string[];
  rating: number;
  discount?: number;
  datialOfProduct: string;
  price: number;
  numReviews: number;
  reviews: Review[];
  createdAt: string;  
  updatedAt: string;  
  __v?: number;       
}
export interface CategoryData {
  clothes: Product[];
  shoes: Product[];
  accessories: Product[];
}


export interface ProductFormValues {
  productName: string;
  category: string;
  productDetails: string;
  price: number;
  images: FileList;
}