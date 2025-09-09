"use client";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import ProfileAvatar from "./ProfileAvatar";
import ProfileForm from "./ProfileForm";
import PasswordForm from "./PasswordForm";
import { useAuth } from "@/context/authContext";

type User = {
  UserName: string;
  Email: string;
  imageProfile?: string;
};
type JwtPayload = {
  user: User;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const {logout}=useAuth();
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        setUser(decoded.user);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);

  function reload() {
    window.location.reload();
  }

  if (!user) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6 ">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-6">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">My Profile</h1>
          <ProfileAvatar imageUrl={user.imageProfile} onSuccess={reload} />
        </div>
        <div className="p-10 space-y-6">
          <ProfileForm
            defaultValues={{ username: user.UserName, email: user.Email }}
          />
          <PasswordForm />
          <button onClick={logout} className="bg-red-600 p-2 font-semibold rounded-md  text-white text-1xl">Logout</button>
        </div>
      </div>
    </div>
  );
}
