"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, ProductFormValues } from "@/lib/productValidation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { addProduct } from "@/lib/productValidation"; 
import { usePurchaseAlert } from "@/context/PurchaseAlertContext";

export default function AddProductForm() {
  const { showPurchaseAlert } = usePurchaseAlert();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = async (data: ProductFormValues) => {
    setIsSubmitting(true);
    try {
      await addProduct(data);
      showPurchaseAlert("Product added successfully!");
      reset();
    } catch (err) {
      console.error(err);
      showPurchaseAlert("Error adding product.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>Product Name</label>
        <Input {...register("productName")} />
        {errors.productName && (
          <p className="text-red-500">{errors.productName.message}</p>
        )}
      </div>

      <div>
        <label>Category</label>
        <Input {...register("category")} />
        {errors.category && (
          <p className="text-red-500">{errors.category.message}</p>
        )}
      </div>

      <div>
        <label>Product Details</label>
        <Input {...register("productDetails")} />
        {errors.productDetails && (
          <p className="text-red-500">{errors.productDetails.message}</p>
        )}
      </div>

      <div>
        <label>Price</label>
        <Input type="number" {...register("price", { valueAsNumber: true })} />
        {errors.price && (
          <p className="text-red-500">{errors.price.message}</p>
        )}
      </div>

      <div>
        <label>Images</label>
        <Controller
          name="images"
          control={control}
          render={({ field }) => (
            <Input type="file" multiple accept="image/*" onChange={(e) => {
                const files = e.target.files;
                if (files) {
                  field.onChange(Array.from(files)); 
                }
              }}
            />
          )}
        />
        {errors.images && (
          <p className="text-red-500">{errors.images.message}</p>
        )}
      </div>

      <Button disabled={isSubmitting}>
        {isSubmitting ? "Adding..." : "Add Product"}
      </Button>
    </form>
  );
}
