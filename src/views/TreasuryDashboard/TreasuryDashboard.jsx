import { useEffect, useState } from "react";
import styled from "styled-components";
import { Paper, Grid, Typography, Box, Zoom, Container, useMediaQuery } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { useSelector } from "react-redux";
import { trim, formatCurrency } from "../../helpers";

import { useTheme } from "@material-ui/core/styles";
import "./treasury-dashboard.scss";

function TreasuryDashboard() {
  const smallerScreen = useMediaQuery("(max-width: 650px)");
  const verySmallScreen = useMediaQuery("(max-width: 379px)");

  const totalAPY = 330000;
  const trimmedTotalAPY = trim(totalAPY * 100, 1);
  const stakingRebase = 0.02355;
  const dailyAPR = 2.19;

  const thirtyDayRate = Math.pow(1 + stakingRebase / 100, 30 * 96);

  const marketPrice = useSelector(state => {
    return state.app.marketPrice;
  });

  const leafPrice = marketPrice;

  const circSupply = useSelector(state => {
    return state.app.circSupply;
  });
  const totalSupply = useSelector(state => {
    return state.app.cc;
  });
  const marketCap = useSelector(state => {
    return state.app.marketCap;
  });

  const lastRebasedTime = useSelector(state => {
    return state.app.lastRebasedTime;
  });

  const leafBalance = useSelector(state => {
    //titano_ balance
    return state.account.balances && state.account.balances.leaf;
  });


  function percentage(num, per) {
    return (num / 100) * per;
  }

  const dailyReturn = percentage(leafBalance, dailyAPR);

  const nextReward = dailyReturn / 96;

  const rfvBalance = useSelector(state => {
    //titano_ balance
    return state.app.rfv;
  });
  const mvtBalance = useSelector(state => {
    //titano_ balance
    return state.app.mvt;
  });

  const fifmin = 15*60;

  const nextRebased = lastRebasedTime + fifmin;

  const blvBalance = useSelector(state => {
    //titano_ balance
    return state.app.blv;
  });
  const CustomSpan = styled.span`
    width: fit-content;
    background-image: linear-gradient(111deg, #fa5853, #f46692 50%, #ffc444);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 900;
  `;
  const CustomHeaderText = styled(Typography)`
    margin-top: 2px !important;
    margin-bottom: 2px !important;
  `;
  return (
    <div id="treasury-dashboard-view" className={`${smallerScreen && "smaller"} ${verySmallScreen && "very-small"}`}>
      <Container
        style={{
          paddingLeft: smallerScreen || verySmallScreen ? "0" : "3.3rem",
          paddingRight: smallerScreen || verySmallScreen ? "0" : "3.3rem",
        }}
      >
        <Box className={`hero-metrics`}>
          <Paper className="leaf-card">
            <Box display="flex" flexWrap="wrap" justifyContent="space-between" alignItems="center" width="100%">
              <Box className="portfolio">
                <div className="portfolio-wrapper">
                  <h1 className="portfolio-h1">Portfolio</h1>
                  <div className="portfolio-icon">
                    <img className="porfolio-img" src=""></img>
                    <h6 className="portfolio-wallet">0x000000000</h6>
                  </div>
                  <div className="flex-grow"></div>
                  <a
                    class="port-btn"
                    href="https://traderjoexyz.com/trade?outputCurrency=0xa787A4ABB13F56F6A6dB7E9E55DCE748Ef3a36bB#/"
                  >
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    BUY $LEAF
                  </a>
                  <button className="port-btn1" href="">
                    View Chart
                  </button>
                </div>
              </Box>

              <Box className="metric-price">
                <div>
                  <div className="yourstats">
                    <CustomHeaderText variant="h6" color="textSecondary">
                      Your Balance
                    </CustomHeaderText>
                    <Typography variant="h5">${trim(leafBalance * leafPrice, 2)}</Typography>
                  </div>
                  <div className="yourstats">
                    <CustomHeaderText variant="h6" color="textSecondary">
                      Your Leaf
                    </CustomHeaderText>
                    <Typography variant="h5">
                      {/* appleseed-fix */}
                      {new Intl.NumberFormat("en-US").format(parseInt(leafBalance))} $LEAF
                    </Typography>
                  </div>
                </div>
                <div>
                  <div className="yourstats">
                    <CustomHeaderText variant="h6" color="textSecondary">
                      Buy Tax
                    </CustomHeaderText>
                    <Typography variant="h5">
                      {/* appleseed-fix */}
                      15%
                    </Typography>
                  </div>
                  <div className="yourstats">
                    <CustomHeaderText variant="h6" color="textSecondary">
                      Sell Tax
                    </CustomHeaderText>
                    <Typography variant="h5">
                      {/* appleseed-fix */}
                      20%
                    </Typography>
                  </div>
                </div>
              </Box>

              <Box className="metric wsoprice">
                <div className="yourstats">
                  <CustomHeaderText variant="h6" color="textSecondary">
                    Next Rebase
                  </CustomHeaderText>
                  <Typography variant="h5"> {new Intl.NumberFormat("en-US").format("00:00:00")}</Typography>
                </div>
                <div className="yourstats">
                  <CustomHeaderText variant="h6" color="textSecondary">
                    Your Next Reward
                  </CustomHeaderText>
                  <Typography variant="h5">{trim(nextReward, 2)} $LEAF</Typography>
                </div>
              </Box>
            </Box>
          </Paper>
        </Box>

        <Box className={`hero-metrics1`}>
          <Paper className="leaf-card">
            <Box display="flex" flexWrap="wrap" justifyContent="space-between" alignItems="center">
              <Box className="metric market">
                <div>
                  <CustomHeaderText variant="h6" color="textSecondary">
                    APY
                  </CustomHeaderText>
                  <Typography variant="h5">{totalAPY}%</Typography>
                </div>
              </Box>

              <Box className="metric price">
                <CustomHeaderText variant="h6" color="textSecondary">
                  DAILY APR
                </CustomHeaderText>
                <Typography variant="h5">
                  {/* appleseed-fix */}
                  {new Intl.NumberFormat("en-US").format(dailyAPR)}%
                </Typography>
              </Box>

              <Box className="metric bpo">
                <CustomHeaderText variant="h6" color="textSecondary">
                  DAILY REWARD
                </CustomHeaderText>
                <Typography variant="h5">
                  {new Intl.NumberFormat("en-US").format(parseInt(dailyReturn))} $LEAF
                </Typography>
              </Box>

              <Box className="metric bpo">
                <CustomHeaderText variant="h6" color="textSecondary">
                  DAILY EARNED $
                </CustomHeaderText>
                <Typography variant="h5">
                  ${new Intl.NumberFormat("en-US").format(parseInt(parseInt(dailyReturn * leafPrice)))}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>

        <Zoom in={true}>
          <Grid container spacing={2} className="data-grid">
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Paper className="leaf-card">
                <div className="card-header">
                  <Typography variant="body1">$LEAF Price</Typography>
                  <Typography variant="h5">
                    {/* appleseed-fix */}
                    {marketPrice}
                  </Typography>
                </div>
              </Paper>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Paper className="leaf-card">
                <div className="card-header">
                  <Typography variant="body1">USDC.e Liquidity Value</Typography>
                  <Typography variant="h5">
                    {/* appleseed-fix */}
                    {blvBalance ? formatCurrency(blvBalance, 4) : <Skeleton type="text" />}
                  </Typography>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Zoom>
      </Container>
    </div>
  );
}



export default TreasuryDashboard;
