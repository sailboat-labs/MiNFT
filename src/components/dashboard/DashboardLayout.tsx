import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getSlideInModalState } from "redux/reducers/selectors/dashboard";
import { setSlideInModalConfig } from "redux/reducers/slices/dashboard";

import useAuthenticationDialog from "@/hooks/UseAuthDialog";

import Navbar from "./NavBar";
import Sidebar from "./Sidebar";
import Layout from "../layout/Layout";
import SlideInModal from "../modals/SlideIn";
import BasicSettings from "../pages/settings/BasicSettings";
import CollectionSettings from "../pages/settings/Collection";
import OutputSettingsPage from "../pages/settings/RenderSettings";
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

  // const { account, chainId, isAuthenticated } = useMoralis();
  const { AuthDialog, setShowAuthDialog, account, isAuthenticated } =
    useAuthenticationDialog();

  useEffect(() => {
    if (!account || !isAuthenticated) return;

    // setProfile(user);
  }, [account, isAuthenticated]);

  if (!account || !isAuthenticated) {
    return (
      <Layout>
        <div className="mt-20 flex h-full w-full flex-col items-center justify-center gap-5 px-10 text-center">
          <AuthDialog />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            Connect your wallet to view your profile
          </div>
          <div
            onClick={() => {
              setShowAuthDialog(true);
            }}
            className="gradient-button"
          >
            Connect your wallet
          </div>
        </div>
      </Layout>
    );
  }

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
