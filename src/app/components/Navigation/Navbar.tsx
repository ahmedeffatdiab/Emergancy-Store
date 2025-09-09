'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button';
import { Search,XIcon } from "lucide-react";
import { Input } from "@/components/ui/input"
import { TypeNavigationItem } from '../../../../utility/HeaderData';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation';

type props = {
    navLinks: TypeNavigationItem[],
    isOpen: boolean,
    setIsOpen: (value: boolean) => void;
}
const Navbar = ({navLinks,isOpen,setIsOpen}:props) => {
  const { isAdmin } = useAuth(); 
  const router=useRouter();
  
      const [searchText, setSearchText] = useState("");
  const filteredNavLinks = isAdmin
    ? navLinks
    : navLinks.filter(link => link.title !== 'Dashboard');

    const handleSearch = () => {
    if (!searchText.trim()) return;

    router.push(`/search?word=${encodeURIComponent(searchText.trim())}`);
    setSearchText("")
  };
  return (
    <div>
   {/* desktop screen*/}
   <nav aria-label="Global" className="py-4 bg-gray-100 border-b   text-lightUi">
            <div className="container w-full ms-0 sm:mx-auto">
                <ul className="flex items-center justify-center gap-14">
                    {filteredNavLinks.map((ele) =>
                        <li key={ele.title} className="hidden md:block relative group overflow-hidden">
                            <Link className=" font-medium text-md text-gray-950" href={ele.link}>
                                {ele.title}
                                <span className="absolute bottom-0 left-0 w-full block h-[2px] bg-gray-600 -translate-x-[100%] group-hover:translate-x-0 duration-300"></span>
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
            <div className="w-[75%] mx-auto    mb-1 block md:hidden relative">
          <Input id="searchInput" onChange={(e)=>setSearchText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSearch()} type="text" placeholder="Search about Product ..." className="pl-10" />
                    <Button type="button" variant="ghost" onClick={handleSearch} size="icon"  className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:bg-transparent" >
                      <Search className="w-4 h-4" />
                    </Button>
            </div>              
    </nav> 
    
    {/* mobile screen */}
    <div className={`fixed inset-0 ${isOpen ? 'block' : 'hidden'} bg-gray-500/50 md:hidden z-[9999]`}>
      <nav aria-label="Global" className="absolute top-0 left-0 z-50 dark:bg-gray-900 w-[75%] h-screen bg-white overflow-hidden md:hidden">
        <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-3xl text-gray-600 hover:text-black transition-colors" aria-label="Close menu">
          <XIcon className="hover:cursor-pointer dark:text-white" />
        </button>
        <div className="flex h-full w-full mr-6 mt-40">
          <ul className="flex flex-col w-full gap-8">
            {navLinks.map((ele) => (
              <li key={ele.title} className="w-3/4 mx-auto rounded-2xl hover:bg-gray-400 pl-5 transition-all duration-500">
                <Link href={ele.link} className="text-lg font-medium text-foreground">{ele.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
    </div>
    
  )
}

export default Navbar
