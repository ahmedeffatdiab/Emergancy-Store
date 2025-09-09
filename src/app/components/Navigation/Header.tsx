"use client"
import React, { useState } from 'react'
import { MenuIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Search,User, Heart, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link'
import Navbar from './Navbar';
import { navLinks } from '../../../../utility/HeaderData';
import ModeToggle from './ModeToggle';


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '../../../context/authContext';
import { useCart } from '@/context/CartContext';
import { useLove } from '@/context/LoveContext';
import { useRouter } from 'next/navigation';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const { token, logout } = useAuth();
    const { cartNum } = useCart();
    const {userLoveCount}=useLove();
    const router =useRouter();
     const handleSearch = () => {
    if (!searchText.trim()) return;
    router.push(`/search?word=${encodeURIComponent(searchText.trim())}`);
  };
  return (
    <div>
      <header className="w-full border-b shadow-sm bg-background">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-3xl font-bold text-primary">
          Emergancy
        </Link>
        <div className="w-[35%] mt-4 mb-1 relative hidden md:block">
          <Input id="searchInput" value={searchText} onChange={(e)=>setSearchText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSearch()} type="text" placeholder="Search about Product ..." className="pl-10" />
          <Button type="button" variant="ghost" onClick={handleSearch} size="icon"  className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:bg-transparent" >
            <Search className="w-4 h-4" />
          </Button>
        </div>
        <div className='flex flex-row items-center gap-x-4'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="hover:text-primary transition">
                  <User className="w-7 h-7 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                {!token?(
                  <>
                <DropdownMenuItem asChild>
                  <Link href="/login" className="w-full">
                    Login
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/register" className="w-full">
                    Register
                  </Link>
                </DropdownMenuItem>
                  </>
                ):
                <>
                  <DropdownMenuItem asChild>
                  <Link href="/profile" className="w-full">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <button
                    onClick={logout}
                    className="w-full text-left"
                  >
                    Logout
                  </button>
                </DropdownMenuItem>
                </>
                }               
              </DropdownMenuContent>
           </DropdownMenu>
          <Link href="/addLovedList">
            <div className="relative w-6 h-6 cursor-pointer">
              <Heart className="w-7 h-7 text-muted-foreground" />
              <Badge variant="destructive" className="absolute -right-[13px] -top-[13px] h-5 min-w-5 rounded-full px-1 text-[10px] font-mono tabular-nums">{userLoveCount}</Badge>
            </div>
          </Link>
          
          <Link href="/cart">
            <div className="relative w-6 h-6">
              <ShoppingCart className="w-7 h-7 text-muted-foreground" />
              <Badge variant="destructive" className="absolute -right-[13px] -top-[13px] h-5 min-w-5 rounded-full px-1 text-[10px] font-mono tabular-nums">{cartNum}</Badge>
            </div>
          </Link>
          <ModeToggle/>
          <Button variant="outline" size="icon" className="md:hidden hover:cursor-pointer" onClick={() => setIsOpen(true)}>
            <MenuIcon className="w-5 h-5 txet-2xl" />
          </Button>
        </div>
      </div>
    </header>
    <Navbar navLinks={navLinks} isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
}

export default Header
