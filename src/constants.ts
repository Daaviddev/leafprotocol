export const THE_GRAPH_URL = "https://api.thegraph.com/subgraphs/name/wkich/mama-subgraph";
export const EPOCH_INTERVAL = 9600;

// NOTE could get this from an outside source since it changes slightly over time
export const BLOCK_RATE_SECONDS = 1;

export const TOKEN_DECIMALS = 18;

interface IAddresses {
  [key: number]: { [key: string]: string };
}

export const addresses: IAddresses = {
  
  43114: {
    LEAF_ADDRESS: "0xa787A4ABB13F56F6A6dB7E9E55DCE748Ef3a36bB",
    LEAF_USDC_LP_ADDRESS: "0x8942691CA45Eb4fE1fD374E6Ff0acbC396B7d89d",
    USDC_ADDRESS: "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664",
    TREASURY_ADDRESS : "0xdaf768d6b128a352670776d638583ac872aacdf6",
    RFV_ADDRESS : "0xd5a965ffc19a54edf2a9f63d673c64535e383210"
  },
};

export const messages = {
  please_connect: "Please connect your wallet to the Avalanche network to use LEAF protocol.",
  please_connect_wallet: "Please connect your wallet.",
  try_mint_more: (value: string) => `You're trying to mint more than the maximum payout available! The maximum mint payout is ${value} LEAF.`,
  before_minting: "Before minting, enter a value.",
  existing_mint:
      "You have an existing mint. Minting will reset your vesting period and forfeit any pending claimable rewards. We recommend claiming rewards first or using a fresh wallet. Do you still wish to proceed?",
  before_stake: "Before staking, enter a value.",
  before_unstake: "Before un staking, enter a value.",
  tx_successfully_send: "Your transaction was successful",
  your_balance_updated: "Your balance was successfully updated",
  nothing_to_claim: "You have nothing to claim",
  something_wrong: "Something went wrong",
  switch_to_avalanche: "Switch to the Avalanche network?",
  slippage_too_small: "Slippage too small",
  slippage_too_big: "Slippage too big",
  your_balance_update_soon: "Your balance will update soon",
};


 