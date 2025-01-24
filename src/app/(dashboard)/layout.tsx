import Link from "next/link";
import { MainNav } from "./_components/main-nav";
import { Search } from "./_components/search";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

import Logo from "../../public/images/logo-horizontal.png";
import { UserButton } from "../(auth)/_components/user-button";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header className="sticky left-0 top-0 z-50 w-full border-b bg-background px-4">
        <div className="container flex h-16 items-center justify-between gap-4">
          {/* LOGO */}
          <Link href="/">
            <Image
              src={Logo}
              alt="logo"
              loading="eager"
              width={128}
              height={181}
              className="h-6 w-auto object-contain"
            />
          </Link>

          {/* SEARCH */}
          <div className="hidden md:flex">
            <Search />
          </div>

          <div className="flex items-center justify-center gap-4">
            {/* MAIN NAV */}
            <div className="hidden md:flex">
              <MainNav />
            </div>

            <Separator orientation="vertical" className="hidden h-8 md:flex" />

            {/* USER NAV */}
            <UserButton />
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer></footer>
    </>
  );
};

export default DashboardLayout;
