import { ReactComponent as ForumIcon } from "../../assets/icons/forum.svg";
import { ReactComponent as GovIcon } from "../../assets/icons/governance.svg";
import { ReactComponent as DocsIcon } from "../../assets/icons/docs.svg";
import { ReactComponent as SpookySwapIcon } from "../../assets/icons/spookyswap.svg";
import { ReactComponent as SpiritSwapIcon } from "../../assets/icons/spiritswap.svg";
import { ReactComponent as FeedbackIcon } from "../../assets/icons/feedback.svg";
import { SvgIcon } from "@material-ui/core";
import { AccountBalanceOutlined, MonetizationOnOutlined } from "@material-ui/icons";

const externalUrls = [
  {
    title: "Charts",
    icon: <img color="primary" src="/images/icon.png" className={`icon_dashboard`} width="20px" height="20px" style={{"margin-right":"10px"}}/>,
    url: "https://dexscreener.com/polygon/0xA9a779aeA33b6f40CfC78A29Cf56Fc7e6fb329AB",
  },
  {
    title: "Buy on QuickSwap",
    url: "https://quickswap.exchange/#/swap?inputCurrency=&outputCurrency=0xA9a779aeA33b6f40CfC78A29Cf56Fc7e6fb329AB",
    icon: <img color="primary" src="/images/quick.png" width="20px" height="20px" style={{"margin-right":"10px"}}/>,
  },
  // {
  //   title: "Mama Lend",
  //   label: "(Coming soon)",
  //   icon: <MonetizationOnOutlined viewBox="0 0 20 24" />,
  // },
  // {
  //   title: "Mama Borrow",
  //   label: "(Coming soon)",
  //   icon: <MonetizationOnOutlined viewBox="0 0 20 24" />,
  // },
  // {
  //   title: "Mama PRO",
  //   label: "(Coming soon)",
  //   icon: <AccountBalanceOutlined viewBox="0 0 20 24" />,
  // },
  // {
  //   title: "Governance",
  //   url: "https://snapshot.org/#/galacticdao.eth",
  //   icon: <SvgIcon color="primary" component={GovIcon} />,
  // },
  // {
  //   title: "Docs",
  //   url: "https://docs.galacticdao.com",
  //   icon: <SvgIcon color="primary" component={DocsIcon} />,
  // },
];

export default externalUrls;
