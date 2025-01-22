import { Link } from "react-router-dom";
import utilStyles from "../../App/utilStyles.module.css";


type InlineLinkProps = {
  path: string,
  anchor: string
}


export default function InlineLink({ path, anchor }: InlineLinkProps) {
  return <Link to={path} className={utilStyles.link}>{anchor}</Link>
}
