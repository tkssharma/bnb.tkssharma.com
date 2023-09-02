'use client';
import { SafeUser } from "@/app/types";
import Logo from "./Logo"
import Search from "./Search"
import { UserMenu } from "./UserMenu"
import {User} from '@prisma/client'
import Categories from "./Categories";
import Container from "../Common/Container";

interface NavbarProps {
  currentUser?: SafeUser | null
}

export const Navbar = ({currentUser}:NavbarProps) => {

  return (
        <div className="fixed w-full bg-white z-10 shadow-sm">
      <div
        className="
          py-4 
          border-b-[1px]
        "
      >
      <Container>
        <div 
          className="
            flex 
            flex-row 
            items-center 
            justify-between
            gap-3
            md:gap-0
          "
        >
          <Logo />
          <Search />
          <UserMenu currentUser={currentUser} />
        </div>
      </Container>
    </div>
    <Categories />
  </div>
  )
}
