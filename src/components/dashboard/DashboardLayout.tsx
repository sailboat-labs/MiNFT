import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getSlideInModalState } from "redux/reducers/selectors/dashboard";
import { setSlideInModalConfig } from "redux/reducers/slices/dashboard";

import Navbar from "./NavBar";
import Sidebar from "./Sidebar";
import SlideInModal from "../modals/SlideIn";
import BasicSettings from "../pages/settings/BasicSettings";
import CollectionSettings from "../pages/settings/Collection";
import Seo from "../Seo";

type props = {
  child: ReactNode;
  title: string;
  titleBarEndChildren?: any;
};

export default function DashboardLayout({
  child,
  title,
  titleBarEndChildren,
}: props) {
  const slideInModalState = useSelector(getSlideInModalState);
  const dispatch = useDispatch();

  const slidInComponentMap: { name: string; component: any }[] = [
    {
      name: "nft-gen-settings",
      component: (
        <div>
          <BasicSettings />
          <CollectionSettings />
        </div>
      ),
    },
  ];

  return (
    <main>
      <Seo templateTitle="Dashboard" />
      {/* <Header /> */}
      <SlideInModal
        show={slideInModalState.componentLabel != "" && slideInModalState?.show}
        onClose={() =>
          dispatch(setSlideInModalConfig({ key: "show", value: false }))
        }
        slideFrom={slideInModalState?.slideFrom} // todo: can also assume the value 'right'
      >
        {
          slidInComponentMap.find(
            (item) => item.name == slideInModalState.componentLabel
          )?.component
        }
      </SlideInModal>
      <div className="flex h-screen flex-row overflow-y-hidden">
        <Sidebar currentPage="/" />
        <div className="h-screen flex-1 overflow-y-hidden">
          <Navbar endChildren={titleBarEndChildren} title={title} />
          {child}
        </div>
      </div>
    </main>
  );
}
