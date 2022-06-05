import SearchStore from "@/components/search/SearchStore";
import { PropsWithChildren } from "react";
import DefaultLayout from "./default-layout";
import Footer from "@/layout/footer";

interface Props {
  title: string;
  showFooter?: boolean;
}

export default function StoreLayoutPage({
  title,
  children,
  showFooter = true,
}: PropsWithChildren<Props>) {
  return (
    <DefaultLayout title={title} search={<SearchStore />}>
      {children}
      {showFooter && <Footer />}
    </DefaultLayout>
  );
}
