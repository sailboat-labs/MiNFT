import dashify from "dashify";
import {
  collection,
  DocumentData,
  getFirestore,
  limit,
  query,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useDispatch, useSelector } from "react-redux";
import {
  getDashboardState,
  getSlideInModalState,
} from "redux/reducers/selectors/dashboard";
import { setConfiguration } from "redux/reducers/slices/configuration";
import { setSlideInModalConfig } from "redux/reducers/slices/dashboard";
import { setProject } from "redux/reducers/slices/project";

import { firebaseApp } from "@/lib/firebase";
import useStorage from "@/hooks/storage";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Whitelist from "@/components/dashboard/Whitelist";
import ComingSoon from "@/components/layout/ComingSoon";
import AddLayer from "@/components/nft/AddLayer";
import TraitsSearchbar from "@/components/nft/TraitsSearchbar";
import ContractMakerView from "@/components/pages/Dashboard/contract-maker";
import DashboardHome from "@/components/pages/Dashboard/dashboard-home";
import NFTGenerator from "@/components/pages/Dashboard/NftGenerator";
import DevPage from "@/components/pages/dev/dev";
import PageLoader from "@/components/shared/PageLoader";

import { enumNFTGenConfig } from "@/enums/nft-gen-configurations";
import { IDashboardState, IProject } from "@/interfaces";

const firestore = getFirestore(firebaseApp);

export default function DashboardHomePage() {
  const dashboardState = useSelector(getDashboardState) as IDashboardState;
  const selectedSidebar = dashboardState.selectedSidebar;
  const router = useRouter();
  const dispatch = useDispatch();
  const { getItem, setItem, removeItem } = useStorage();

  const account =
    (getItem("isAuthenticated") == "true" ? getItem("account") : "") ?? "";

  const content: {
    component: any;
    value: string;
    label: string;
    titleOptions?: any;
  }[] = [
    {
      component: <DashboardHome />,
      value: "dashboard-home",
      label: "Dashboard",
    },
    {
      component: <NFTGenerator />,
      value: "nft-generator",
      label: "Trait Mixer",
      titleOptions: <NFTGeneratorTitleOptions />,
    },
    {
      component: <ContractMakerView />,
      value: "contract-maker",
      label: "Contract Maker",
    },
    {
      component: <Whitelist />,
      value: "whitelist",
      label: "Whitelist",
    },
    {
      component: <ComingSoon />,
      value: "marketing",
      label: "Marketing",
    },
    {
      component: <ComingSoon />,
      value: "ip-rights",
      label: "IP Rights",
    },
    {
      component: <DevPage />,
      value: "dev-page",
      label: "Development Eyes",
    },
  ];

  const _query = query(
    collection(firestore, `Projects`),
    where("owner", "==", account ?? ""),
    where("slug", "==", dashify((router?.query?.project as string) ?? "")),

    limit(1)
  );
  const [snapshots, loading] = useCollectionData(_query);

  useEffect(() => {
    if (!account) return;
    if (loading) return;
    if (!snapshots) return;

    const data = snapshots.reduce((acc: IProject[], curr: DocumentData) => {
      acc.push(curr as IProject);
      return acc;
    }, []);

    if (data.length < 1 && account) {
      router.push("/dashboard");
    } else {
      dispatch(setProject(data[0]));

      dispatch(
        setConfiguration({
          key: enumNFTGenConfig.NAME,
          value: data[0].projectName,
        })
      );

      dispatch(
        setConfiguration({
          key: enumNFTGenConfig.SUPPLY,
          value: data[0].tokenSupply,
        })
      );

      dispatch(
        setConfiguration({
          key: enumNFTGenConfig.DESCRIPTION,
          value: data[0].description,
        })
      );

      dispatch(
        setConfiguration({
          key: enumNFTGenConfig.BASE_URL,
          value: data[0].baseUrl,
        })
      );
    }
  }, [loading, snapshots, account]);

  if (loading)
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <PageLoader />
        Getting things ready for you...
      </div>
    );

  return (
    <DashboardLayout
      showTitleBar={selectedSidebar == "dashboard-home" ? false : true}
      title={content.find((item) => item.value == selectedSidebar)?.label ?? ""}
      titleBarEndChildren={
        content.find((item) => item.value == selectedSidebar)?.titleOptions ??
        ""
      }
      child={
        content.find((item) => item.value == selectedSidebar)?.component ?? (
          <></>
        )
      }
    />
  );
}

function NFTGeneratorTitleOptions() {
  const slideInModalState = useSelector(getSlideInModalState);
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-3">
      <TraitsSearchbar />
      <AddLayer />
      <div
        onClick={() => {
          dispatch(
            setSlideInModalConfig({
              key: "componentLabel",
              value: "nft-gen-settings",
            })
          );
          dispatch(setSlideInModalConfig({ key: "show", value: true }));
        }}
        className="flex cursor-pointer items-center gap-2 rounded border px-2 py-1 transition-all hover:bg-gray-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 rotate-0 cursor-pointer transition-all hover:rotate-180 hover:scale-110"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <span className="hidden xl:inline">Settings</span>
      </div>
    </div>
  );
}
