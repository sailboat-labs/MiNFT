import dashify from "dashify";
import { formatEthAddress } from "eth-address";
import ContractMakerView from "features/contract-maker/components";
import DashboardHome from "features/dashboard-home/components/dashboard-home";
import LaunchpadConfig from "features/launch/launch-config/launchpad-config";
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
import { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardState } from "redux/reducers/selectors/dashboard";
import { getProjectState } from "redux/reducers/selectors/project";
import { getAddress } from "redux/reducers/selectors/user";
import { setConfiguration } from "redux/reducers/slices/configuration";
import { setInformationBarConfig } from "redux/reducers/slices/dashboard";
import { setLayers } from "redux/reducers/slices/layers";
import { setProject } from "redux/reducers/slices/project";

import { firebaseApp } from "@/lib/firebase";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Whitelist from "@/components/dashboard/Whitelist";
import ComingSoon from "@/components/layout/ComingSoon";
import AddLayer from "@/components/nft/AddLayer";
import TraitsSearchbar from "@/components/nft/TraitsSearchbar";
import PageLoader from "@/components/shared/PageLoader";

import { enumNFTGenConfig } from "@/enums/nft-gen-configurations";
import { IDashboardState, ILayer, IProject } from "@/interfaces";
import { hasAccessToProject } from "@/utils/authentication";

const firestore = getFirestore(firebaseApp);

export default function DashboardHomePage() {
  const dashboardState = useSelector(getDashboardState) as IDashboardState;
  const project = useSelector(getProjectState) as IProject;
  const selectedSidebar = dashboardState.selectedSidebar;
  const router = useRouter();
  const dispatch = useDispatch();
  const address = useSelector(getAddress);
  const [hasProjectAccess, setHasProjectAccess] = useState(true);

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
      component: <LaunchpadConfig />,
      value: "minting-page-builder",
      label: "Launchpad",
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

    // {
    //   component: <DevPage />,
    //   value: "dev-page",
    //   label: "Development Eyes",
    // },
  ];

  const _query = query(
    collection(firestore, `Projects`),
    // where("owner", "==", account ?? ""),
    where("slug", "==", dashify((router?.query?.project as string) ?? "")),

    limit(1)
  );

  const _layersQuery = query(
    collection(firestore, `Projects/${project?.slug}/Layers`)
  );

  const [snapshots, loading] = useCollectionData(_query);
  const [layerSnapshots, layerLoading] = useCollectionData(_layersQuery);

  async function checkUserValidity() {
    if (!address) return;
    const hasAccess = await hasAccessToProject(
      router.query.project as string,
      address
    );
    setHasProjectAccess(hasAccess);

    if (hasAccess) {
      if (loading) return;
      if (!snapshots) return;

      const data = snapshots.reduce((acc: IProject[], curr: DocumentData) => {
        acc.push(curr as IProject);
        return acc;
      }, []);

      if (data.length < 1 && address) {
        router.push("/dashboard");
      } else {
        dispatch(setProject(data[0]));

        if (data[0].owner != address) {
          dispatch(
            setInformationBarConfig({
              show: true,
              message: `Delegated Access by ${formatEthAddress(
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                data[0].owner!
              )}`,
              showLoader: false,
            })
          );
        }

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
    } else {
      router.push("/dashboard");
    }
  }

  useEffect(() => {
    checkUserValidity();
  }, [loading, snapshots, address]);

  useEffect(() => {
    if (!address) return;
    if (layerLoading) return;
    if (!layerSnapshots) return;

    const data = layerSnapshots.reduce((acc: ILayer[], curr: DocumentData) => {
      acc.push(curr as ILayer);

      return acc;
    }, []);

    dispatch(setLayers(data));
  }, [project, layerSnapshots, layerLoading, address]);

  if (loading)
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <PageLoader />
        Getting things ready for you...
      </div>
    );

  if (project) {
    return (
      <div>
        <DashboardLayout
          showTitleBar={selectedSidebar == "dashboard-home" ? false : true}
          title={
            content.find((item) => item.value == selectedSidebar)?.label ?? ""
          }
          titleBarEndChildren={
            content.find((item) => item.value == selectedSidebar)
              ?.titleOptions ?? ""
          }
          child={
            content.find((item) => item.value == selectedSidebar)
              ?.component ?? (
              <>Something happened! No sidebar item was selected</>
            )
          }
        />
      </div>
    );
  }

  return (
    <div>Hmmm... If you&apos;re seeing this something terrible happened</div>
  );
}

function NFTGeneratorTitleOptions() {
  return (
    <div className="flex items-center gap-3">
      <TraitsSearchbar />
      <AddLayer />
    </div>
  );
}
