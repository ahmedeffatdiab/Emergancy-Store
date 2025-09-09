'use client';
import React,{createContext,useContext,useState,useEffect,ReactNode} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {decodeToken} from "@/../utility/tokenUtils"
import api from "@/lib/axios";
interface AuthContextType{
    token:string|null;
    isAdmin: boolean;
    login:(email:string,password:string)=>void;
    logout:()=>void;
    loading:boolean;
    error:string|null
}


const AuthContext=createContext<AuthContextType| undefined>(undefined);

export const AuthProvider=({children}:{children:ReactNode})=>{
    const [token, setToken] = useState<string | null>(null);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router=useRouter();

    useEffect(()=>{
        const storedToken=localStorage.getItem("userToken");
        if(storedToken){
            setToken(storedToken);
            const userData = decodeToken(storedToken);
            if (userData?.user?.isAdmin) {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
        }
    },[])
    const login=async (email:string,password:string)=>{
        setLoading(true);
        setError(null);
        try{
            const response = await api.post("/auth/login", {
                    email,
                    password,
            });
        if(response.data.message=== 'Success'){
            const userToken=response.data.data.token;
            setToken(userToken);
            localStorage.setItem('userToken', userToken);
            const userData = decodeToken(userToken);
            setIsAdmin(userData?.user?.isAdmin || false);
            if(userData?.user.isAdmin==false){
                router.push('/');
            }else{
                router.push("/dashboard")
            }
        } else {
        setError(response.data.message || 'Login failed');
      }
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || 'Unexpected error');
            } else {
                setError('Something went wrong');
            }
        }finally{
            setLoading(false);
        }
       
    }
    const logout = () => {
        setToken(null);
        setIsAdmin(false);
        localStorage.removeItem('userToken');
        router.push('/login');
    };

    return (
    <AuthContext.Provider value={{ token,isAdmin, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};