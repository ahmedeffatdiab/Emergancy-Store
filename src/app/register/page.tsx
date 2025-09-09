'use client';
import Link from 'next/link';
import Image from 'next/image';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';

const registerSchema = z
  .object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    email: z.email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'At least one uppercase letter required')
      .regex(/[a-z]/, 'At least one lowercase letter required')
      .regex(/[0-9]/, 'At least one number required'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type RegisterSchemaType = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const [loading,setLoading]=useState(false);
  const [serverValidation,setServerValidation]=useState('')
  const router=useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit =async (data: RegisterSchemaType) => {
    setLoading(true);
    try{
      const res = await api.post("/auth/SignUp", {
          username: data.username,
          email: data.email,
          password: data.password,
          con_password: data.confirmPassword,
      });
        console.log(res);
        if(res.data.message==="success"){
            router.push('/login')
        }else{
            setLoading(false)
            setServerValidation(res.data.message)
        }
    }catch(error : unknown){
      setLoading(false)
      console.log(error);
     if (axios.isAxiosError(error)) {
        setLoading(false)
        const message =
          error.response?.data?.message || 'An error occurred during login.';
        setServerValidation(message);
      } else {
        setServerValidation('Unexpected error occurred.');
      }
    }
  };

  return (
    <section className="w-full flex flex-col md:flex-row justify-center items-center">
      <div className="hidden md:block md:w-1/2">
        <Image width={500} height={500} className="w-full h-full object-contain" alt="image" src="/computerImage2.jpg" />
      </div>

      <div className="w-full md:w-1/2 px-2 py-2 flex items-center justify-center">
        <Card className="w-full md:mx-2 mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Register</CardTitle>
          </CardHeader>
          {serverValidation && (
          <div className="bg-red-100 border mx-2 border-red-400 text-center text-red-700 px-4 py-3 rounded">
              {serverValidation}
          </div>
        )}
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input id="username" {...register('username')} />
                {errors.username && (
                  <p className="text-sm text-red-500">{errors.username.message}</p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input type="text" id="email" {...register('email')} />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" {...register('password')} />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input type="password" id="confirmPassword" {...register('confirmPassword')} />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full">
                 {loading? <Loader className="text-white w-20 h-20 animate-spin" />:"Create Account"}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="justify-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login" className="text-primary hover:underline">
                Login here
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default RegisterPage;
