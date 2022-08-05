import { ethers } from "ethers";
import CLASSIC_MINT_JSON from "src/contract-api/abi/classicMint.json";
import DUTCH_AUCTION_JSON from "src/contract-api/abi/dutchAuction.json";
import FACTORY_JSON from "src/contract-api/abi/factory.json";
import FAIR_DUTCH_AUCTION_JSON from "src/contract-api/abi/fairDutchAuction.json";
import PAYMENTSLIP_JSON from "src/contract-api/abi/paymentSplit.json";
import PURE_WHITELIST_JSON from "src/contract-api/abi/pureWhitelist.json";
import REGISTRY_JSON from "src/contract-api/abi/registry.json";
import CLASSIC_MINT_WITH_WL_JSON from "src/contract-api/abi/wlClassicMint.json";
import DUTCH_AUCTION_WITH_WL_JSON from "src/contract-api/abi/wlDutchAuction.json";
import FAIR_DUTCH_AUCTION_WITH_WL_JSON from "src/contract-api/abi/wlFairDutchAuction.json";

import { enumContractType } from "@/enums/contract-type.enum";

export function getContract(contractType: string, signer: any) {
  switch (contractType) {
    case enumContractType.CLASSIC_MINT: {
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CLASSIC_MINT!,
        CLASSIC_MINT_JSON.abi,
        signer
      );

      const abi = CLASSIC_MINT_JSON.abi;
      return { contract, abi };
    }
    case enumContractType.CLASSIC_MINT_WITH_WL: {
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CLASSIC_MINT_WITH_WL!,
        CLASSIC_MINT_WITH_WL_JSON.abi,
        signer
      );
      const abi = CLASSIC_MINT_WITH_WL_JSON.abi;
      return { contract, abi };
    }
    case enumContractType.DUTCH_AUCTION: {
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_DUTCH_AUCTION!,
        DUTCH_AUCTION_JSON.abi,
        signer
      );
      const abi = DUTCH_AUCTION_JSON.abi;
      return { contract, abi };
    }
    case enumContractType.DUTCH_AUCTION_WITH_WL: {
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_DUTCH_AUCTION_WITH_WL!,
        DUTCH_AUCTION_WITH_WL_JSON.abi,
        signer
      );
      const abi = DUTCH_AUCTION_WITH_WL_JSON.abi;
      return { contract, abi };
    }
    case enumContractType.FAIR_DUTCH_AUCTION: {
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_FAIR_DUTCH_AUCTION!,
        FAIR_DUTCH_AUCTION_JSON.abi,
        signer
      );
      const abi = FAIR_DUTCH_AUCTION_JSON.abi;
      return { contract, abi };
    }
    case enumContractType.FAIR_DUTCH_AUCTION_WITH_WL: {
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_FAIR_DUTCH_WITH_WL!,
        FAIR_DUTCH_AUCTION_WITH_WL_JSON.abi,
        signer
      );
      const abi = FAIR_DUTCH_AUCTION_WITH_WL_JSON.abi;
      return { contract, abi };
    }
    case enumContractType.PURE_WHITELIST: {
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_PURE_WHITELIST!,
        PURE_WHITELIST_JSON.abi,
        signer
      );
      const abi = PURE_WHITELIST_JSON.abi;
      return { contract, abi };
    }
    case "Factory": {
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_FACTORY_ADDRESS!,
        FACTORY_JSON.abi,
        signer
      );

      const abi = FACTORY_JSON.abi;
      return { contract, abi };
    }
    case "Registry": {
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_REGISTRY_ADDRESS!,
        REGISTRY_JSON.abi,
        signer
      );

      const abi = REGISTRY_JSON.abi;
      return { contract, abi };
    }
    case "MMFee": {
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_PLATFORM_FEE!,
        REGISTRY_JSON.abi,
        signer
      );

      const abi = REGISTRY_JSON.abi;
      return { contract, abi };
    }

    case "PaymentSplit": {
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_PAYMENT_SPLIT!,
        PAYMENTSLIP_JSON.abi,
        signer
      );

      const abi = PAYMENTSLIP_JSON.abi;
      return { contract, abi };
    }

    default:
      return;
  }
}
