import { useRouter } from "next/router";
import { ReactNode, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getDashboardState,
  getSlideInModalState,
} from "redux/reducers/selectors/dashboard";
import { setSlideInModalConfig } from "redux/reducers/slices/dashboard";

import Navbar from "./NavBar";
import Sidebar from "./Sidebar";
import SlideInModal from "../modals/SlideIn";
import BasicSettings from "../pages/settings/BasicSettings";
import CollectionSettings from "../pages/settings/Collection";
import OutputSettingsPage from "../pages/settings/RenderSettings";
import Seo from "../Seo";
import AuthGuard from "../shared/AuthGuard";

type props = {
  child: ReactNode;
  title: string;
  titleBarEndChildren?: any;
  showTitleBar?: boolean;
};

export default function DashboardLayout({
  child,
  title,
  titleBarEndChildren,
  showTitleBar = true,
}: props) {
  const slideInModalState = useSelector(getSlideInModalState);
  const informationBar = useSelector(getDashboardState).informationBar;
  const dispatch = useDispatch();
  const router = useRouter();
  const [profile, setProfile] = useState<any>();

  const slidInComponentMap: { name: string; component: any }[] = [
    {
      name: "nft-gen-settings",
      component: (
        <div>
          <BasicSettings />
          <CollectionSettings />
          <OutputSettingsPage />
        </div>
      ),
    },
  ];

  return (
    <AuthGuard>
      <Seo templateTitle="Dashboard" />
      {informationBar.show && (
        <div
          className={`flex w-screen items-center justify-between bg-indigo-400 px-10 text-sm text-white transition-all ${
            informationBar.show
              ? "pointer-events-auto py-1 opacity-100"
              : " pointer-events-none py-0 opacity-0"
          }`}
        >
          <div className="opacity-0">Magic Mynt</div>

          {informationBar.message}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 cursor-pointer transition-all hover:rotate-90 hover:scale-150"
            onClick={() => {
              router.push("/dashboard");
            }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      )}
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
          {showTitleBar && (
            <div className="absolute z-[2] w-[length:calc(100%-15rem)]">
              <Navbar endChildren={titleBarEndChildren} title={title} />
            </div>
          )}
          <div className="relative z-[1] h-screen overflow-y-auto pt-[4.5rem]">
            {child}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
