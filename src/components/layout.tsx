import Logo from "./Logo";
import { SearchIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { Input } from "./Form";
import { useRouter } from "next/router";
import classNames from "classnames";

import { FooterNav } from "./FooterNav";

interface Props {
  children: ReactNode;
  searchHeader?: boolean;
  open?: boolean;
  value?: string;
}

export default function Layout({ children, searchHeader, open, value }: Props) {
  const [searchOpen, setSearchOpen] = useState(open);
  const [search, setSearch] = useState(value);
  const router = useRouter();

  const searchMovies = (e) => {
    e.preventDefault();
    if (!search) return;

    router.push({
      pathname: "/search",
      query: { query: search },
    });
  };

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);
  return (
    <div className="p-8 bg-brand-darkBlue min-h-screen w-screen text-white">
      {searchHeader ? (
        <div className="flex justify-between align-center  mb-8 relative z-10">
          <Link href="/">
            <a>
              <Logo className="h-5" />
            </a>
          </Link>
          <form
            onSubmit={searchMovies}
            className={classNames(
              "right-0 mt-[-9px] absolute flex-grow-1 transition",
              searchOpen ? "w-[70%] opacity-1" : "w-0 opacity-0"
            )}
          >
            <Input
              value={search}
              required
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              placeholder="search for a movie"
            />
          </form>
          {!searchOpen && (
            <button onClick={() => setSearchOpen((o) => !o)}>
              <SearchIcon className="w-5" />
            </button>
          )}
        </div>
      ) : (
        <></>
      )}
      <main className="max-w-7xl m-auto mb-16">{children}</main>
      <FooterNav />
    </div>
  );
}
