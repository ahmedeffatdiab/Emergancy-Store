import { z } from "zod";
export const countryEnum = z.enum(["USA", "Canada", "UK", "Germany", "Egypt"]);

export const checkoutSchema = z.object({
  First_name: z.string().min(5, "First name must be at least 5 characters"),
  Last_name: z.string().min(3, "Last name must be at least 3 characters"),
  country: countryEnum,
  address: z.string().min(5, "Address must be at least 5 characters"),
  PostCode_ZIP: z
    .string()
    .regex(/^\d+$/, "Postcode / ZIP must be a number")
    .min(3, "Postcode / ZIP must be at least 3 digits"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Invalid email address"),
});

export type CheckoutForm = z.infer<typeof checkoutSchema>;

export const countryOptions = countryEnum.options;
