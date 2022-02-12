import Header from "./header";
import type { ReactChildren } from "react";
import Logo from "./Logo";
import { SearchIcon } from "@heroicons/react/solid";
import Link from "next/link";

interface Props {
  children: React.ReactNode;
  searchHeader?: boolean;
}

export default function Layout({ children, searchHeader }: Props) {
  return (
    <div className="p-8 bg-brand-darkBlue min-h-screen w-screen text-white">
      {searchHeader ? (
        <div className="flex justify-between align-center  mb-8 relative z-10">
          <Link href="/">
            <a>
              <Logo className="h-5" />
            </a>
          </Link>
          <SearchIcon className="w-5" />
        </div>
      ) : (
        <></>
      )}
      <main>{children}</main>
    </div>
  );
}
