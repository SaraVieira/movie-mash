import { ReactNode } from "react";
import { FooterNav } from "./FooterNav";
import { SearchHeader } from "./SearchHeader";

interface Props {
  children: ReactNode;
  searchHeader?: boolean;
  open?: boolean;
  value?: string;
}

export default function Layout({ children, searchHeader, ...props }: Props) {
  return (
    <div className="p-8 bg-brand-darkBlue min-h-screen w-screen text-white">
      {searchHeader ? <SearchHeader {...props} /> : <></>}
      <main className="max-w-7xl m-auto mb-16">{children}</main>
      <FooterNav />
    </div>
  );
}
