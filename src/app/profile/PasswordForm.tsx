"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordSchema } from "./schemas";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePurchaseAlert } from "@/context/PurchaseAlertContext";
import { useAuth } from "@/context/authContext";
import z from "zod";
import api from "@/lib/axios";

type PasswordFormValues = z.infer<typeof passwordSchema>;

export default function PasswordForm() {
  const {showPurchaseAlert}=usePurchaseAlert();
  const {logout}=useAuth(); 
  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
    password: "",
    confirm_password: "",
  },
  });

  async function onSubmit(data: PasswordFormValues) {
    try {
     const res = await api.post("/auth/changePassword",data,{
          headers: {
            token: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      if (res.data.message === "Password changed successfully") {
        showPurchaseAlert("Password changed!");
        localStorage.removeItem("userToken");
        logout();
      } else {
        form.setError("confirm_password", { message: res.data.error });
      }
    } catch {
    //   toast.error("Error changing password");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6">
        <div className="grid grid-cols-2 gap-2 ">
<FormField name="password" control={form.control} render={({ field }) => (
          <FormItem>
            <FormLabel>New Password</FormLabel>
            <FormControl><Input type="password" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField name="confirm_password" control={form.control} render={({ field }) => (
          <FormItem>
            <FormLabel>Confirm Password</FormLabel>
            <FormControl><Input type="password" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        </div>
        
        <Button type="submit">Change Password</Button>
      </form>
    </Form>
  );
}
