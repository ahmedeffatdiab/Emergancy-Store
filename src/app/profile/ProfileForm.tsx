"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { profileSchema } from "./schemas";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { usePurchaseAlert } from "@/context/PurchaseAlertContext";
import { useAuth } from "@/context/authContext";
import api from "@/lib/axios";

type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  defaultValues: ProfileFormValues;
}

export default function ProfileForm({ defaultValues }: ProfileFormProps) {
  const { showPurchaseAlert } = usePurchaseAlert();
  const { logout } = useAuth();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });
  useEffect(() => {
    form.setValue("username", defaultValues.username);
    form.setValue("email", defaultValues.email);
  }, [defaultValues, form]);

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        console.error("User token not found in localStorage");
        return;
      }
      const res = await api.post("/auth/editUserInfo",{
          username: data.username,
          email: data.email,
      },
      {
        headers: {
          token: `Bearer ${token}`,
        },
      });

      if (res.data.message === "Updated successfully") {
        localStorage.removeItem("userToken");
        logout();
        showPurchaseAlert("👍 Changed profile info successfully! Login again");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error updating profile:", {
          message: err.message,
        });
      } else {
        console.error("Unknown error updating profile", err);
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="w-full text-center mb-4">
          <h1 className="font-semibold text-3xl text-blue-900">Profile Info</h1>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField control={form.control} name="username" render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <div className="min-h-[20px]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <div className="min-h-[20px]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="">
          Save Info
        </Button>
      </form>
    </Form>
  );
}
