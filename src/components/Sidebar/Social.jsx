import { SvgIcon, Link } from "@material-ui/core";
import { ReactComponent as GitHub } from "../../assets/icons/github.svg";
import { ReactComponent as Medium } from "../../assets/icons/medium.svg";
import { ReactComponent as Twitter } from "../../assets/icons/twitter.svg";
import { ReactComponent as Discord } from "../../assets/icons/discord.svg";
import { ReactComponent as Docs } from "../../assets/icons/docs.svg";
import { ReactComponent as Reedit } from "../../assets/icons/reedit.svg";

export default function Social() {
  return (
    <div className="social-row">

      <Link href="http://medium.com" target="_blank">
        <SvgIcon color="primary" component={Medium} />
      </Link>

      <Link href="http://twitter.com" target="_blank">
        <SvgIcon color="primary" component={Twitter} />
      </Link>

      <Link href="http://discord.com" target="_blank">
        <SvgIcon color="primary" component={Discord} />
      </Link>
      <Link href="http://reddit.com/" target="_blank">
        <SvgIcon color="primary" component={Reedit} viewBox="0 0 32 32" />
      </Link>

    </div>
  );
}
