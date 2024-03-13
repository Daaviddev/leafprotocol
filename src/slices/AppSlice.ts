import { BigNumber, ethers } from "ethers";
import { addresses } from "../constants";
import { abi } from "../abi/LeafContract.json";
import { abi as ierc20Abi } from "../abi/IERC20.json";
import { setAll, getTokenPrice, getMarketPrice } from "../helpers";
import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "src/store";
import { IBaseAsyncThunk } from "./interfaces";

const initialState = {
  loading: false,
  loadingMarketPrice: false,
};

export const loadAppDetails = createAsyncThunk(
  "app/loadAppDetails",
  async ({ networkID, provider }: IBaseAsyncThunk, { dispatch }) => {
    const marketPrice = await getMarketPrice({ networkID, provider });
    const leafContract = new ethers.Contract(addresses[networkID].LEAF_ADDRESS as string, abi, provider);
    const total = await leafContract.totalSupply();
    const circSupply = (await leafContract.getCirculatingSupply()) / Math.pow(10, 18);
    const lastRebasedTime = await leafContract._lastRebasedTime();
    const totalSupply = total / Math.pow(10, 18);


    const marketCap = marketPrice * circSupply;

    const usdcContract = new ethers.Contract(addresses[networkID].USDC_ADDRESS as string, ierc20Abi, provider);

    const blv = Number(await usdcContract.balanceOf(addresses[networkID].LEAF_USDC_LP_ADDRESS)) / Math.pow(10, 6);

    const mvt = Number(await usdcContract.balanceOf(addresses[networkID].TREASURY_ADDRESS)) / Math.pow(10, 6);

    const rfv = Number(await usdcContract.balanceOf(addresses[networkID].RFV_ADDRESS)) / Math.pow(10, 6);

    if (!provider) {
      console.error("failed to connect to provider, please connect your wallet");
      return {
        marketPrice,
        marketCap,
        circSupply,
        totalSupply,
        lastRebasedTime,
        blv,
        mvt,
        rfv,
      };
    }
    const currentTime = Math.floor(Date.now() / 1000);
    const stakingRebase = 0.02312;
    const ThirtyDayRate = Math.pow(1 + stakingRebase / 330, 30 * 96);
    const totalAPY = 1024.8358;

    //daily rebase
    const DailyAPY = Math.pow(1 + stakingRebase / 100, 96);

    return {
      DailyAPY,
      ThirtyDayRate,
      totalAPY,
      currentTime,
      stakingRebase,
      marketCap,
      marketPrice,
      circSupply,
      totalSupply,
      lastRebasedTime,
      blv,
      mvt,
      rfv,
    } as IAppData;
  },
);

export const findOrLoadMarketPrice = createAsyncThunk(
  "app/findOrLoadMarketPrice",
  async ({ networkID, provider }: IBaseAsyncThunk, { dispatch, getState }) => {
    const state: any = getState();
    let marketPrice;
    // check if we already have loaded market price
    if (state.app.loadingMarketPrice === false && state.app.marketPrice) {
      // go get marketPrice from app.state
      marketPrice = state.app.marketPrice;
    } else {
      // we don't have marketPrice in app.state, so go get it
      try {
        const originalPromiseResult = await dispatch(
          loadMarketPrice({ networkID: networkID, provider: provider }),
        ).unwrap();
        marketPrice = originalPromiseResult?.marketPrice;
      } catch (rejectedValueOrSerializedError) {
        // handle error here
        console.error("Returned a null response from dispatch(loadMarketPrice)");
        return;
      }
    }
    return { marketPrice };
  },
);

const loadMarketPrice = createAsyncThunk("app/loadMarketPrice", async ({ networkID, provider }: IBaseAsyncThunk) => {
  let marketPrice: number;
  try {
    marketPrice = await getMarketPrice({ networkID, provider });
    marketPrice = marketPrice / Math.pow(10, 9);
  } catch (e) {
    marketPrice = await getTokenPrice("leaf");
  }
  return { marketPrice };
});

interface IAppData {
  readonly circSupply: number;
  readonly currentTime?: number;
  readonly marketCap: number;
  readonly marketPrice: number;
  readonly stakingAPY?: number;
  readonly stakingRebase?: number;
  readonly lastRebasedTime: number;
  readonly totalSupply: number;
  readonly treasuryBalance?: number;
  readonly endTime?: number;
}

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    fetchAppSuccess(state, action) {
      setAll(state, action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadAppDetails.pending, state => {
        state.loading = true;
      })
      .addCase(loadAppDetails.fulfilled, (state, action) => {
        setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(loadAppDetails.rejected, (state, { error }) => {
        state.loading = false;
        console.error(error.name, error.message, error.stack);
      })
      .addCase(loadMarketPrice.pending, (state, action) => {
        state.loadingMarketPrice = true;
      })
      .addCase(loadMarketPrice.fulfilled, (state, action) => {
        setAll(state, action.payload);
        state.loadingMarketPrice = false;
      })
      .addCase(loadMarketPrice.rejected, (state, { error }) => {
        state.loadingMarketPrice = false;
        console.error(error.name, error.message, error.stack);
      });
  },
});

const baseInfo = (state: RootState) => state.app;

export default appSlice.reducer;

export const { fetchAppSuccess } = appSlice.actions;

export const getAppState = createSelector(baseInfo, app => app);
