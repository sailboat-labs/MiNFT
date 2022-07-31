import { ethers } from "ethers";

const signerAddress = "0xa404daa677ba01bef2be4da2e049f5e81e41cfc7";

const contractInfo = {
  owner: signerAddress,
  trustedForwarder: process.env.NEXT_PUBLIC_FORWARDER_ADDRESS,
  name: "Legendary Indians",
  symbol: "OGINDIAN",
  primarySaleRecipient: signerAddress,
  royaltyRecipient: signerAddress,
  royaltyFraction: 500,
  saleConfig: [40, 0, 1, 1, ethers.utils.parseEther("1"), 0, 1689793367],
  reservedTokens: 0,

  auctionSaleConfig: [
    40,
    0,
    1,
    1,
    ethers.utils.parseEther("5"),
    ethers.utils.parseEther("1"),
    ethers.utils.parseEther("0.5"),
    60,
    0,
    1689793367,
  ],

  whitelistSale: [20, 2, 2, ethers.utils.parseEther("1"), 0, 1689793367],

  publicSale: [40, 1, 1, ethers.utils.parseEther("1"), 0, 1689793367],

  publicAuctionSale: [
    40,
    1,
    1,
    ethers.utils.parseEther("5"),
    ethers.utils.parseEther("1"),
    ethers.utils.parseEther("0.5"),
    60,
    0,
    1689793367,
  ],

  payees: [
    "0xA404dAa677Ba01bEf2Be4da2E049F5E81E41CFc7",
    "0x7464cCC85fE5BE491154F6AbEA417E56F6dCcbB8",
    "0xa6fc71A8EFe68e744E0d5979d6cacC9F9ae184A6",
  ],

  shares: [50, 30, 20],
};

// classic mint payload
export const cmPayload = [
  contractInfo.owner,
  contractInfo.trustedForwarder,
  contractInfo.name,
  contractInfo.symbol,
  contractInfo.primarySaleRecipient,
  contractInfo.royaltyRecipient,
  contractInfo.royaltyFraction,
  contractInfo.saleConfig,
];

// pure whitelist payload
export const pwlPayload = [
  contractInfo.owner,
  contractInfo.trustedForwarder,
  contractInfo.name,
  contractInfo.symbol,
  contractInfo.primarySaleRecipient,
  contractInfo.royaltyRecipient,
  contractInfo.royaltyFraction,
  contractInfo.saleConfig,
];

// dutch auction payload
export const daPayload = [
  contractInfo.owner,
  contractInfo.trustedForwarder,
  contractInfo.name,
  contractInfo.symbol,
  contractInfo.primarySaleRecipient,
  contractInfo.royaltyRecipient,
  contractInfo.royaltyFraction,
  contractInfo.auctionSaleConfig,
];

// fair dutch auction payload
export const fdaPayload = [
  contractInfo.owner,
  contractInfo.trustedForwarder,
  contractInfo.name,
  contractInfo.symbol,
  contractInfo.primarySaleRecipient,
  contractInfo.royaltyRecipient,
  contractInfo.royaltyFraction,
  contractInfo.auctionSaleConfig,
];

// classic mint with wl payload
export const wlCMPayload = [
  contractInfo.owner,
  contractInfo.trustedForwarder,
  contractInfo.name,
  contractInfo.symbol,
  contractInfo.primarySaleRecipient,
  contractInfo.royaltyRecipient,
  contractInfo.royaltyFraction,
  contractInfo.reservedTokens,
  contractInfo.whitelistSale,
  contractInfo.publicSale,
];

// dutch auction with wl payload
export const wlDAPayload = [
  contractInfo.owner,
  contractInfo.trustedForwarder,
  contractInfo.name,
  contractInfo.symbol,
  contractInfo.primarySaleRecipient,
  contractInfo.royaltyRecipient,
  contractInfo.royaltyFraction,
  contractInfo.reservedTokens,
  contractInfo.whitelistSale,
  contractInfo.publicAuctionSale,
];

// fair dutch auction with wl payload
export const wlFDAPayload = [
  contractInfo.owner,
  contractInfo.trustedForwarder,
  contractInfo.name,
  contractInfo.symbol,
  contractInfo.primarySaleRecipient,
  contractInfo.royaltyRecipient,
  contractInfo.royaltyFraction,
  contractInfo.reservedTokens,
  contractInfo.whitelistSale,
  contractInfo.publicAuctionSale,
];

// payment split payload
export const paymentSliptPayload = [
  contractInfo.owner,
  contractInfo.trustedForwarder,
  contractInfo.payees,
  contractInfo.shares,
];
