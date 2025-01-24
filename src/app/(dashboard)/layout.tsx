import Link from "next/link";
import { MainNav } from "./_components/main-nav";
import { UserNav } from "./_components/user.nav";
import { Search } from "./_components/search";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

import Logo from "../../public/images/logo-horizontal.png"
import { UserButton } from "@/components/user-button";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return ( 
        <>
        <header className="sticky px-4 top-0 z-50 left-0 w-full bg-background border-b">
            <div className="container flex items-center justify-between h-16 gap-4">

                {/* LOGO */}
                <Link href="/">
                <Image src={Logo} alt="logo" loading="eager" width={128} height={181} className="h-6 w-auto object-contain" />
                </Link>

                {/* SEARCH */}
                <div className="hidden md:flex">

                <Search />
                </div>

                <div className="flex justify-center items-center gap-4">

                    {/* MAIN NAV */}
                    <div className="hidden md:flex">

                    <MainNav />
                    </div>

                    <Separator orientation="vertical" className="h-8 hidden md:flex" />

                    {/* USER NAV */}
                    <UserNav />
                    <UserButton/>

                </div>

            </div>

        </header>
        <main>{children}</main>
        <footer></footer>
        </>
     );
}
 
export default DashboardLayout;

