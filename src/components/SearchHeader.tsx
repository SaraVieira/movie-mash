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
  onSearch,
  required = true,
  placeholder = "search for a movie",
}: {
  open?: boolean;
  value?: string;
  placeholder?: string;
  // eslint-disable-next-line no-unused-vars
  onSearch?: (value: string) => void;
  required?: boolean;
}) => {
  const [searchOpen, setSearchOpen] = useState(open);
  const searchInput: { current: HTMLInputElement } = useRef();
  const [search, setSearch] = useState(value);
  const router = useRouter();

  const searchMovies = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(search);
      return;
    }
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
    <div
      className={classNames(
        searchOpen ? "" : " mb-8",
        "flex justify-between align-center  relative z-10"
      )}
    >
      {!onSearch && (
        <Link href="/">
          <a>
            <Logo className="h-5" />
          </a>
        </Link>
      )}
      <form
        onSubmit={searchMovies}
        className={classNames(
          "flex-grow-1 transition",
          onSearch ? "" : "absolute right-0 mt-[-9px]",
          searchOpen
            ? "w-full md:w-[70%] opacity-1 min-w-[300px]"
            : "w-0 opacity-0"
        )}
      >
        <Input
          ref={searchInput}
          // @ts-ignore
          value={search}
          required={required}
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          placeholder={placeholder}
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
