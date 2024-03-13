import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import "./calculator.scss";
import { useWeb3Context } from "../../hooks";
import store from "src/store";
import { Grid, InputAdornment, OutlinedInput, Zoom, Slider, Paper, Box, Typography } from "@material-ui/core";
import { trim } from "../../helpers";
import { Skeleton } from "@material-ui/lab";

function Calculator() {
    const isAppLoading = useSelector(state => state.app.loading);
    const marketPrice = useSelector(state => {
        return state.app.marketPrice;
    });
    const TotalAPY = 330000;
    const leafBalance = useSelector(state => {
        return state.account.balances && state.account.balances.leaf;
    });

    const trimmedTotalAPY = trim(TotalAPY * 100, 1);
    const trimmedleafBalance = trim(Number(leafBalance), 4);
    const trimeMarketPrice = trim(marketPrice, 2);

    const [leafAmount, setleafAmount] = useState(trimmedleafBalance);
    const [rewardYield, setRewardYield] = useState(trimmedTotalAPY);
    const [priceAtPurchase, setPriceAtPurchase] = useState(trimeMarketPrice);
    const [futureMarketPrice, setFutureMarketPrice] = useState(trimeMarketPrice);
    const [days, setDays] = useState(30);

    const [rewardsEstimation, setRewardsEstimation] = useState("0");
    const [potentialReturn, setPotentialReturn] = useState("0");

    const calcInitialInvestment = () => {
        const _leaf = Number(leafAmount) || 0;
        const price = parseFloat(priceAtPurchase) || 0;
        const amount = _leaf * price;
        return trim(amount, 2);
    };

    const calcCurrentWealth = () => {
        const _leaf = Number(leafAmount) || 0;
        const price = parseFloat(trimeMarketPrice);
        const amount = _leaf * price;
        return trim(amount, 2);
    };

    const [initialInvestment, setInitialInvestment] = useState(calcInitialInvestment());

    useEffect(() => {
        const newInitialInvestment = calcInitialInvestment();
        setInitialInvestment(newInitialInvestment);
    }, [leafAmount, priceAtPurchase]);

    const calcNewBalance = () => {
        let value = parseFloat(rewardYield) / 100;
        value = Math.pow(value - 1, 1 / (365 * 96)) - 1 || 0;
        let balance = Number(leafAmount);
        for (let i = 0; i < days * 96; i++) {
            balance += balance * value;
        }
        return balance;
    };

    useEffect(() => {
        const newBalance = calcNewBalance();
        setRewardsEstimation(trim(newBalance, 6));
        const newPotentialReturn = newBalance * (parseFloat(futureMarketPrice) || 0);
        setPotentialReturn(trim(newPotentialReturn, 2));
    }, [days, rewardYield, futureMarketPrice, leafAmount]);

    return (
        <div className="calculator-view">
            <Zoom in={true}>
                <Paper className="leaf-card calculator-card">
                    <Grid className="calculator-card-grid" container direction="column" spacing={2}>
                        <Grid item>
                            <Box className="calculator-card-header">
                                <Typography variant="h5">Calculator</Typography>
                                <Typography variant="body2">Estimate your returns</Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box className="calculator-card-metrics">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={4} md={4} lg={4}>
                                        <Box className="calculator-card-apy">
                                            <Typography variant="h5" color="textSecondary">LEAF Price</Typography>
                                            <Typography variant="h4">{isAppLoading ? <Skeleton width="100px" /> : `$${trimeMarketPrice}`}</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6} sm={4} md={4} lg={4}>
                                        <Box className="calculator-card-tvl">
                                            <Typography variant="h5" color="textSecondary">Current APY</Typography>
                                            <Typography variant="h4">
                                                {isAppLoading ? <Skeleton width="100px" /> : <>{new Intl.NumberFormat("en-US").format(Number(trimmedTotalAPY))}%</>}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6} sm={4} md={4} lg={4}>
                                        <Box className="calculator-card-index">
                                            <Typography variant="h5" color="textSecondary">Your Balance</Typography>
                                            <Typography variant="h4">{isAppLoading ? <Skeleton width="100px" /> : <>{new Intl.NumberFormat("en-US").format(trimmedleafBalance)} LEAF</>}</Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>

                        <Box className="calculator-card-area">
                            <Box>
                                <Box className="calculator-card-action-area">
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6}>
                                            <Box className="calculator-card-action-area-inp-wrap">
                                                <Typography variant="h6">LEAF Amount</Typography>
                                                <OutlinedInput
                                                    type="number"
                                                    placeholder="Amount"
                                                    className="calculator-card-action-input"
                                                    value={leafAmount}
                                                    onChange={e => setleafAmount(e.target.value)}
                                                    labelWidth={0}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <div onClick={() => setleafAmount(trimmedleafBalance)} className="stake-card-action-input-btn">
                                                                <Typography>Max</Typography>
                                                            </div>
                                                        </InputAdornment>
                                                    }
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Box className="calculator-card-action-area-inp-wrap">
                                                <Typography variant="h6">APY (%)</Typography>
                                                <OutlinedInput
                                                    type="number"
                                                    placeholder="Amount"
                                                    className="calculator-card-action-input"
                                                    value={TotalAPY * 100}
                                                    labelWidth={0}
                                                    disabled="true"                                                   
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Box className="calculator-card-action-area-inp-wrap">
                                                <Typography variant="h6">LEAF price at purchase ($)</Typography>
                                                <OutlinedInput
                                                    type="number"
                                                    placeholder="Amount"
                                                    className="calculator-card-action-input"
                                                    value={priceAtPurchase}
                                                    onChange={e => setPriceAtPurchase(e.target.value)}
                                                    labelWidth={0}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <div onClick={() => setPriceAtPurchase(trimeMarketPrice)} className="stake-card-action-input-btn">
                                                                <Typography>Current</Typography>
                                                            </div>
                                                        </InputAdornment>
                                                    }
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Box className="calculator-card-action-area-inp-wrap">
                                                <Typography variant="h6">Future LEAF market price ($)</Typography>
                                                <OutlinedInput
                                                    type="number"
                                                    placeholder="Amount"
                                                    className="calculator-card-action-input"
                                                    value={futureMarketPrice}
                                                    onChange={e => setFutureMarketPrice(e.target.value)}
                                                    labelWidth={0}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <div onClick={() => setFutureMarketPrice(trimeMarketPrice)} className="stake-card-action-input-btn">
                                                                <Typography>Current</Typography>
                                                            </div>
                                                        </InputAdornment>
                                                    }
                                                />
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box className="calculator-days-slider-wrap">
                                    <Typography >{`${days} day${days > 1 ? "s" : ""}`}</Typography>
                                    <Slider className="calculator-days-slider" min={1} max={365} value={days} onChange={(e, newValue) => setDays(newValue)} />
                                </Box>
                                <Box className="calculator-user-data">
                                    <Box className="data-row">
                                        <Typography>Your initial investment</Typography>
                                        <Typography>{isAppLoading ? <Skeleton width="80px" /> : <>${new Intl.NumberFormat("en-US").format(initialInvestment)}</>}</Typography>
                                    </Box>
                                    <Box className="data-row">
                                        <Typography>Current wealth</Typography>
                                        <Typography>{isAppLoading ? <Skeleton width="80px" /> : <>${new Intl.NumberFormat("en-US").format(calcCurrentWealth())}</>}</Typography>
                                    </Box>
                                    <Box className="data-row">
                                        <Typography>LEAF rewards estimation</Typography>
                                        <Typography>{isAppLoading ? <Skeleton width="80px" /> : <>{new Intl.NumberFormat("en-US").format(rewardsEstimation)} LEAF</>}</Typography>
                                    </Box>
                                    <Box className="data-row">
                                        <Typography>Potential return</Typography>
                                        <Typography>{isAppLoading ? <Skeleton width="80px" /> : <>${new Intl.NumberFormat("en-US").format(potentialReturn)}</>}</Typography>
                                    </Box>
                                    
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Paper>
            </Zoom>
        </div>
    );
}

export default Calculator;