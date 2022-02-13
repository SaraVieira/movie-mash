import {
  ClockIcon,
  HomeIcon,
  PlayIcon,
  UserIcon,
} from "@heroicons/react/outline";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";

const links = [
  {
    href: "/",
    label: "Home",
    Icon: HomeIcon,
  },
  {
    href: "/watchlist",
    label: "WatchList",
    Icon: ClockIcon,
  },
  {
    href: "/watched",
    label: "Watched",
    Icon: PlayIcon,
  },
  {
    href: "/me",
    label: "Me",
    Icon: UserIcon,
  },
];
const linkClasses =
  "justify-center h-full  flex items-center px-8 w-full text-white text-opacity-50 hover:text-opacity-100 transition-all";

export const FooterNav = () => {
  const router = useRouter();

  return (
    <footer className="fixed bottom-0 w-screen left-0 bg-brand-darkBlue z-40 px-10 max-w-7xl shadow-xl border-t-[1px] border-brand-inputBg">
      <nav>
        <ul className="flex justify-between items-center h-[60px] p-0 m-0">
          {links.map(({ Icon, ...link }, i) => (
            <li
              key={link.href}
              className="h-full flex-grow flex justify-center"
            >
              <Link href={link.href}>
                <a
                  className={classNames(
                    linkClasses,
                    i === 0 && "pl-0",
                    i === links.length - 1 && "pr-0",
                    router.route === link.href &&
                      "text-brand-lightBlue text-opacity-100"
                  )}
                >
                  <Icon className="w-7 h-7" />
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
};
