"use client";

import type React from "react";

import { Bell, Download, Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";

export const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="bg-black px-3 py-2 flex justify-between items-center">
      {/* Left Side: Logo, Home, Search */}
      <div className="flex items-center space-x-4">
        {/* Logo */}
        <div className="relative w-10 h-10 ml-2 rounded-full flex items-center justify-center">
          <Image
            src="/spotify-logo.svg"
            alt="Spotify"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Home Icon */}
        <Button
          variant="ghost"
          className="w-10 h-10 bg-[#282828] text-white rounded-full flex items-center justify-center p-0"
          aria-label="Home"
        >
          <svg viewBox="0 0 24 24" className="size-6 fill-current">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
        </Button>

        {/* Search Bar */}
        <div className="relative ml-2 hidden md:block w-[350px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 size-5" />
          <Input
            type="text"
            placeholder="What do you want to play?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-zinc-800 text-zinc-200 border-none outline-none rounded-full pl-10 pr-10 py-2 w-full"
            aria-label="Search"
          />

          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center">
            <Separator
              orientation="vertical"
              className="h-6 w-px bg-zinc-600 mr-2"
            />
            <Image src="/file.png" alt="File Icon" width={20} height={20} />
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          className="bg-white text-black hover:bg-gray-200 rounded-full font-medium text-sm"
        >
          Explore Premium
        </Button>

        <Button
          variant="ghost"
          className="text-white hover:bg-zinc-700 rounded-full gap-2 font-medium text-sm"
        >
          <Download className="size-4" />
          Install App
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-white overflow-hidden"
          aria-label="Notifications"
        >
          <Bell className="size-5" />
        </Button>

        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="User profile" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};
