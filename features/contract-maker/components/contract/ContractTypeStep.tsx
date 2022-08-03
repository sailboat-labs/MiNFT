import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { getContract } from "redux/reducers/selectors/contract";
import { getProjectState } from "redux/reducers/selectors/project";

import ContractTypeRadio from "@/components/controls/ContractTypeRadio";

import { IProject } from "@/interfaces";
import { firestore } from "@/pages/dashboard";

import { saveContractMaker } from "./../../../launch/launch-config/launchpad-config.logic";

const ContractTypeStep = () => {
  const [selected, setSelected] = useState();

  const contractState = useSelector(getContract);

  const [contractType, setContractType] = useState(contractState.type);

  const project = useSelector(getProjectState) as IProject;

  async function handleSaveContractMaker(
    field: string,
    value: string | boolean | { title: string; description: string }[]
  ) {
    const saveDraft = await saveContractMaker(project, field, value);

    if (!saveDraft) {
      toast.error(
        "Error Ocurred while saving draft. Changes will not be saved"
      );
      console.log("Toast error occured!");
    }
  }

  useEffect(() => {
    const _doc = doc(
      firestore,
      `Projects/${project.slug}/Contract-Maker/draft/classicMint/details`
    );
    const unsubscribe = onSnapshot(_doc, (snapshot) => {
      // eslint-disable-next-line @typescript-eslint/ban-types
      setContractType(snapshot.data()?.contractType as Object);
      setSelected(snapshot.data()?.contractType);
      console.log({ data: snapshot.data() });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    handleSaveContractMaker("contractType", contractType);
  }, [contractType]);

  return (
    <section className="pt-10">
      {/* <ContractStepHeader
        selectOptions={[{ name: "Admin" }]}
        title=""
        onChange={(value) => setSelected(value)}
      /> */}
      <h1 className="text-3xl text-indigo-800">Contract Type</h1>
      <p className="mt-2 text-lg text-indigo-900">
        Select your preferred contract type
      </p>
      <div
        className="4xl:grid-cols-4 mt-8 grid gap-8 lg:grid-cols-2 2xl:grid-cols-3"
        // style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}
      >
        {contractTypes.map((contract, index) => (
          <ContractTypeRadio
            type={contract.name}
            description={contract.description}
            checked={
              new RegExp(`^${contractState.type}$`, "ig").test(contract.name) &&
              contract.whitelist === contractState.whitelisted
            }
            whitelist={contract.whitelist}
            key={index}
          />
        ))}
      </div>
    </section>
  );
};

export default ContractTypeStep;

const contractTypes = [
  {
    name: "Classic Mint",
    whitelist: false,
  },
  {
    name: "Classic Mint",
    whitelist: true,
    description:
      "In a Classic Mint, the price is fixed throughout the duration of the minting period. There are no restrictions on wallets that can purchase the NFTs, sale is open to all wallets.",
  },

  {
    name: "Dutch Auction",
    whitelist: false,
  },
  {
    name: "Dutch Auction",
    whitelist: true,
    description:
      "In a Dutch Auction, the price of an NFT starts at an initial price (ceiling) and drops by a small amount periodically (e.g. 0.1 ETH every 10 minutes) until it hits the lowest price it will go (the resting price).",
  },
  {
    name: "Fair Dutch Auction",
    whitelist: false,
  },
  {
    name: "Fair Dutch Auction",
    whitelist: true,
    description:
      "In a Fair Dutch Auction, the pricing format is similar to the Dutch Auction.This contract has a refund policy, which means wallets only pay the lowest bid price that the auction sells out at. Any difference will be refunded to the wallet.",
  },
  {
    name: "Pure Whitelist",
    whitelist: true,
    description:
      "In a Pure Whitelist, the price is fixed throughout the duration of the minting period. There are restrictions on which wallets can purchase the NFTs. Specific wallets are given access to purchase the NFTs by the contract owner.",
  },
];
