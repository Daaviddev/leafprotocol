import { ethers } from "ethers";
import { addresses } from "../constants";
import { abi as ierc20Abi } from "../abi/IERC20.json";
import { setAll } from "../helpers";

import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/store";
import { IBaseAddressAsyncThunk } from "./interfaces";

export const getBalances = createAsyncThunk(
  "account/getBalances",
  async ({ address, networkID, provider }: IBaseAddressAsyncThunk) => {
    const leafContract = new ethers.Contract(addresses[networkID].LEAF_ADDRESS as string, ierc20Abi, provider);
    const leafBalance = await leafContract.balanceOf(address);
    
    return {
      balances: {
        leaf: ethers.utils.formatUnits(leafBalance, "ether"),
      },
    };
  },
);

export const loadAccountDetails = createAsyncThunk(
  "account/loadAccountDetails",
  async ({ networkID, provider, address }: IBaseAddressAsyncThunk) => {
    let leafBalance = 0;
    const leafContract = new ethers.Contract(addresses[networkID].LEAF_ADDRESS as string, ierc20Abi, provider);
    leafBalance = await leafContract.balanceOf(address);
    return {
      balances: {
        leaf: ethers.utils.formatUnits(leafBalance, "ether"),
      },
    };
  },
);

export interface IUserBondDetails {
  allowance: number;
  interestDue: number;
  bondMaturationBlock: number;
  pendingPayout: string; //Payout formatted in gwei.
}


interface IAccountSlice {
  bonds: { [key: string]: IUserBondDetails };
  balances: {
    leaf: string;
  };
  loading: boolean;
}
const initialState: IAccountSlice = {
  loading: false,
  bonds: {},
  balances: { leaf: "" },
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    fetchAccountSuccess(state, action) {
      setAll(state, action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadAccountDetails.pending, state => {
        state.loading = true;
      })
      .addCase(loadAccountDetails.fulfilled, (state, action) => {
        setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(loadAccountDetails.rejected, (state, { error }) => {
        state.loading = false;
        console.log(error);
      })
      .addCase(getBalances.pending, state => {
        state.loading = true;
      })
      .addCase(getBalances.fulfilled, (state, action) => {
        setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(getBalances.rejected, (state, { error }) => {
        state.loading = false;
        console.log(error);
      })
      
  },
});

export default accountSlice.reducer;

export const { fetchAccountSuccess } = accountSlice.actions;

const baseInfo = (state: RootState) => state.account;

export const getAccountState = createSelector(baseInfo, account => account);
