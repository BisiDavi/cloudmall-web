import SearchStore from "@/components/search/SearchStore";
import { PropsWithChildren } from "react";
import DefaultLayout from "./default-layout";
import Footer from "@/layout/footer";

interface Props {
  title: string;
  showFooter?: boolean;
  padding?: string;
  showArrow?: boolean;
}

export default function StoreLayoutPage({
  title,
  children,
  showFooter = true,
  showArrow = true,
  padding,
}: PropsWithChildren<Props>) {
  return (
    <DefaultLayout
      title={title}
      search={<SearchStore />}
      padding={padding}
      showArrow={showArrow}
    >
      <>
        <div className="children-view">{children}</div>
        {showFooter && <Footer />}
        <style jsx>
          {`
            .childen-view {
              height: calc(85vh-65px);
              overflow-y: scroll;
            }
          `}
        </style>
      </>
    </DefaultLayout>
  );
}
