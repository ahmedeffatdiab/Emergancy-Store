import { z } from "zod";
import api from "@/lib/axios"; 

export const productSchema = z.object({
  productName: z.string().min(3, "Product name must be at least 3 characters"),
  category: z.string().nonempty("Category is required"),
  productDetails: z.string().nonempty("Product details are required"),
  price: z.number().positive("Price must be > 0"),
  images: z
    .array(z.instanceof(File))
    .min(1, "At least one image is required"),
});

export type ProductFormValues = z.infer<typeof productSchema>;

export async function addProduct(data: ProductFormValues) {
  const formData = new FormData();
  formData.append("productName", data.productName);
  formData.append("Category", data.category);
  formData.append("datialOfProduct", data.productDetails);
  formData.append("price", data.price.toString());

  data.images.forEach((file) => {
    formData.append("images", file);
  });

  const res = await api.post(
    "/add-products",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
}
