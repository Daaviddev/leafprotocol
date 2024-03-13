import { useState, useEffect } from "react";
import styled from "styled-components";
import { addresses, TOKEN_DECIMALS } from "../../constants";
import { Link, SvgIcon, Popper, Button, Paper, Typography, Divider, Box, Fade, Slide } from "@material-ui/core";
import { ReactComponent as InfoIcon } from "../../assets/icons/info-fill.svg";
import { ReactComponent as ArrowUpIcon } from "../../assets/icons/arrow-up.svg";
import "./mamamenu.scss";
import { useWeb3Context } from "../../hooks/web3Context";

import LeafImg from "src/assets/tokens/leaf.png";

const addTokenToWallet = (tokenSymbol, tokenAddress) => async () => {
  if (window.ethereum) {
    const host = window.location.origin;
    // NOTE (appleseed): 33T token defaults to sGLA logo since we don't have a 33T logo yet
    let tokenPath;
    // if (tokenSymbol === "GLA") {

    // } ? MamaImg : SMamaImg;
    tokenPath = LeafImg;
    const imageURL = `${host}/${tokenPath}`;

    try {
      await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: TOKEN_DECIMALS,
            image: imageURL,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
};

const CustomButton = styled(Button)`
  min-width: 180px;
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  background-color: #fa5853;
  background-image: -webkit-gradient(linear, left top, right top, from(#fa5853), color-stop(50%, #f46692), to(#ffc444));
  background-image: linear-gradient(90deg, #fa5853, #f46692 50%, #ffc444);
  -webkit-transition: letter-spacing 300ms ease, color 300ms ease;
  transition: letter-spacing 300ms ease, color 300ms ease;
  font-family: "Open Sans", sans-serif;
  color: #fff;
  font-weight: 600;
  text-align: center;
  letter-spacing: 0px;
  text-decoration: none;
`;

function MamaMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const isEthereumAPIAvailable = window.ethereum;
  const { chainID } = useWeb3Context();

  const networkID = chainID;

  const LEAF_ADDRESS = addresses[networkID].LEAF_ADDRESS;

  const handleClick = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = "leaf-popper";
  return (
    <div className="main-nav-wrapper">

      <Box
        component="div"
        onMouseEnter={e => handleClick(e)}
        onMouseLeave={e => handleClick(e)}
        id="leaf-menu-button-hover"
      >
        <CustomButton id="leaf-menu-button" title="LEAF" aria-describedby={id}>
          <Typography> LEAF </Typography>
        </CustomButton>

        <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom-start" transition>
          {({ TransitionProps }) => {
            return (
              <Fade {...TransitionProps} timeout={100}>
                <Paper className="leaf-menu" elevation={1}>
                  <Box component="div" className="buy-tokens">
                    <Link
                      href={`https://traderjoexyz.com/trade?outputCurrency=${LEAF_ADDRESS}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Button size="large" variant="contained" color="secondary" fullWidth>
                        <Typography align="left">
                          Buy on TraderJoe <SvgIcon component={ArrowUpIcon} htmlColor="#A3A3A3" />
                        </Typography>
                      </Button>
                    </Link>
                  </Box>

                  {isEthereumAPIAvailable ? (
                    <Box className="add-tokens">
                      <Divider color="secondary" />
                      <p>ADD TOKEN TO WALLET</p>
                      <Box display="flex" flexDirection="row" justifyContent="space-between">
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={addTokenToWallet("LEAF", LEAF_ADDRESS)}
                        >
                          <img src="/images/logo.png" style={{ height: "25px", width: "25px" }} />
                          <Typography variant="body1">LEAF</Typography>
                        </Button>
                      </Box>
                    </Box>
                  ) : null}
                </Paper>
              </Fade>
            );
          }}
        </Popper>
      </Box>
    </div>
  );
}

export default MamaMenu;
