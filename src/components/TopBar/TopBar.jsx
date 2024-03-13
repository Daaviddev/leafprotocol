import { AppBar, Toolbar, Box, Button, SvgIcon, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { ReactComponent as MenuIcon } from "../../assets/icons/hamburger.svg";
import MamaMenu from "./MamaMenu.jsx";
import ThemeSwitcher from "./ThemeSwitch.jsx";
import ConnectMenu from "./ConnectMenu.jsx";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: "100%",
      padding: "10px",
    },
    justifyContent: "center",
    alignItems: "center",
    background: "transparent",
    backdropFilter: "none",
    zIndex: 10,
    width: "100%",
    display: "flex",
    flexWrap: "nowrap",
    justifyContent: "space-between",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("981")]: {
      display: "none",
    },
  },
}));

function TopBar({ theme, toggleTheme, handleDrawerToggle }) {
  const classes = useStyles();
  const isVerySmallScreen = useMediaQuery("(max-width: 355px)");

  return (
    <AppBar position="sticky" className={classes.appBar} elevation={0}>
      <Toolbar disableGutters className="dapp-topbar">
        <Box component="div" id="top-nav">
          <input id="menu-toggle" type="checkbox" />
          <label class="menu-button-container" for="menu-toggle">
            <div class="menu-button"></div>
          </label>
            <ul className="menu">
              <li className="">
                    Dashboard
              </li>
              <li className="">
                    Calculator
              </li>
              <li className="">
                    Swap
              </li>
              <li className="">
                    Docs
              </li>
              <li className="">
                    Boost
              </li>
            </ul>
        </Box>

        <Box display="flex" justifyContent="flex-end">
          {!isVerySmallScreen && <MamaMenu />}

          <ConnectMenu theme={theme} justifyContent="flex-end" />

          {/* <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} /> */}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
