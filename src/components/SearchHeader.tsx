import Logo from "./Logo";
import { SearchIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Input } from "./Form";
import { useRouter } from "next/router";
import classNames from "classnames";

export const SearchHeader = ({
  open = false,
  value = "",
}: {
  open?: boolean;
  value?: string;
}) => {
  const [searchOpen, setSearchOpen] = useState(open);
  const searchInput: { current: HTMLInputElement } = useRef();
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
    if (searchOpen && searchInput?.current) {
      searchInput?.current.focus();
    }
  }, [searchOpen]);

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
          searchOpen ? "w-full md:w-[70%] opacity-1" : "w-0 opacity-0"
        )}
      >
        <Input
          ref={searchInput}
          // @ts-ignore
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
  );
};
