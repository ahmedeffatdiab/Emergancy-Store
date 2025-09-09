"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { checkoutSchema } from "./checkoutSchema";
import type { CheckoutForm } from "./checkoutSchema";
import { useCart } from "@/context/CartContext";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const CheckoutForm = () => {
  const { cart } = useCart();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
  });
  if (!cart || !cart.selectedProduct || cart.selectedProduct.length === 0) {
    return (
      <div className="text-center text-red-500 py-8">
        Your cart is empty or not yet loaded.
      </div>
    );
  }
  async function onSubmit(formFields: CheckoutForm) {
      if (!cart) {
    alert("Cart is empty or not loaded.");
    return;
  }
  const stripe = await loadStripe(
    "pk_test_51NyDEZJcducF0sHDjm3bCU0FP61nwWy1Qx0cKhGsAYnpnwDk4C09e9O3owdI3vMfurPYtTCy98lfeOqXp8hIgcNg00Yqzx9dKF"
  );
  if (!stripe) {
  alert("Stripe failed to load. Please refresh the page and try again.");
  return;
}
  try {
    const body = {
      products: cart.selectedProduct,
      amount: cart.totalPrice,
      currency: "USD",
      FormFields: {
        First_name: formFields.First_name,
        Last_name: formFields.Last_name,
        country: formFields.country,
        Address: formFields.address,
        PostCode_ZIP: formFields.PostCode_ZIP,
        Email: formFields.email,
        Phone: formFields.phone,
      }
    };

    const headers = {
      "Content-Type": "application/json",
      token: `Bearer ${localStorage.getItem("userToken")}`,
    };

    const response = await fetch("https://emergancy-api-kqk9.vercel.app/postCheckout", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const session = await response.json();

    await stripe.redirectToCheckout({
      sessionId: session.id,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API Error Response:", error.response?.data);
      alert("Server error: " + (error.response?.data?.message || "Unknown error"));
    } else {
      console.error("Unexpected Error:", error);
      alert("Unexpected error occurred.");
    }
  }
}
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="mb-1">First Name</Label>
            <Input {...register("First_name")} />
            {errors.First_name && (
              <p className="text-red-500">{errors.First_name.message}</p>
            )}
          </div>
          <div>
            <Label className="mb-1">Last Name</Label>
            <Input {...register("Last_name")} />
            {errors.Last_name && (
              <p className="text-red-500">{errors.Last_name.message}</p>
            )}
          </div>
        </div>

        <div>
          <Label className="mb-1">Country</Label>
          <select
            {...register("country")}
            className="block w-full border rounded p-2"
          >
            <option value="">Choose...</option>
            {checkoutSchema.shape.country.options.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.country && (
            <p className="text-red-500">{errors.country.message}</p>
          )}
        </div>

        <div>
          <Label className="mb-1">Address</Label>
          <Input {...register("address")} />
          {errors.address && (
            <p className="text-red-500">{errors.address.message}</p>
          )}
        </div>

        <div>
          <Label className="mb-1">PostCode / ZIP</Label>
          <Input {...register("PostCode_ZIP")} />
          {errors.PostCode_ZIP && (
            <p className="text-red-500">{errors.PostCode_ZIP.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="mb-1">Phone</Label>
            <Input {...register("phone")} />
            {errors.phone && (
              <p className="text-red-500">{errors.phone.message}</p>
            )}
          </div>
          <div>
            <Label className="mb-1">Email</Label>
            <Input {...register("email")} />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Processing..." : `Checkout $${cart.totalPrice}`}
        </Button>
      </form>
    </div>
  );
};

export default CheckoutForm;
