import dashify from "dashify";
import ContractMakerView from "features/contract-maker/components";
import DashboardHome from "features/dashboard/components/dashboard-home";
import PageBuilder from "features/minting-page-builder/components/page-builder";
import NFTGenerator from "features/traitmixer/components";
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
import { getProjectState } from "redux/reducers/selectors/project";
import { setConfiguration } from "redux/reducers/slices/configuration";
import { setLayers } from "redux/reducers/slices/layers";
import { setProject } from "redux/reducers/slices/project";

import { firebaseApp } from "@/lib/firebase";
import useStorage from "@/hooks/storage";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Whitelist from "@/components/dashboard/Whitelist";
import ComingSoon from "@/components/layout/ComingSoon";
import AddLayer from "@/components/nft/AddLayer";
import TraitsSearchbar from "@/components/nft/TraitsSearchbar";
import DevPage from "@/components/pages/dev/dev";
import PageLoader from "@/components/shared/PageLoader";

import { enumNFTGenConfig } from "@/enums/nft-gen-configurations";
import { IDashboardState, ILayer, IProject } from "@/interfaces";

const firestore = getFirestore(firebaseApp);

export default function DashboardHomePage() {
  const dashboardState = useSelector(getDashboardState) as IDashboardState;
  const project = useSelector(getProjectState) as IProject;
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
      component: <PageBuilder />,
      value: "minting-page-builder",
      label: "Minting Page Builder",
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

  const _layersQuery = query(
    collection(firestore, `Projects/${project?.slug}/Layers`)
  );

  const [snapshots, loading] = useCollectionData(_query);
  const [layerSnapshots, layerLoading] = useCollectionData(_layersQuery);

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

  useEffect(() => {
    if (!account) return;
    if (layerLoading) return;
    if (!layerSnapshots) return;

    const data = layerSnapshots.reduce((acc: ILayer[], curr: DocumentData) => {
      acc.push(curr as ILayer);
      return acc;
    }, []);

    dispatch(setLayers(data));
  }, [project, layerSnapshots, layerLoading, account]);

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
    </div>
  );
}
