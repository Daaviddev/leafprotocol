import { useCallback, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from 'styled-components';
import Social from "./Social";
import { trim, shorten } from "../../helpers";
import { useAddress, useWeb3Context } from "src/hooks/web3Context";
import { Paper, Link, Box, Typography, SvgIcon } from "@material-ui/core";
import "./sidebar.scss";

function NavContent() {
  const [isActive] = useState();
  const address = useAddress();
  const { chainID } = useWeb3Context();

  const checkPage = useCallback((match, location, page) => {
    const currentPath = location.pathname.replace("/", "");
    if (currentPath.indexOf("dashboard") >= 0 && page === "dashboard") {
      return true;
    }
    if (currentPath.indexOf("account") >= 0 && page === "account") {
      return true;
    }
    if ((currentPath.indexOf("bonds") >= 0 || currentPath.indexOf("choose_bond") >= 0) && page === "bonds") {
      return true;
    }
    if ((currentPath.indexOf("calculator") >= 0 || currentPath.indexOf("calculator") >= 0) && page === "calculator") {
      return true;
    }
    return false;
  }, []);



  const CustomTypography = styled(Typography)`

  `
  return (
    <Paper className="">
    </Paper>
  );
}

export default NavContent;
