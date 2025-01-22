import InlineLink from "../InlineLink/InlineLink";
import utilStyles from "../../App/utilStyles.module.css";


type InlineErrorPageLoginErrorProps = {
  type: "login_required",
  pageName?: string,
  message?: null,
  loginRedirect?: string,
}

type InlineErrorPageOtherErrorProps = {
  type?: "other",
  pageName?: string,
  message: string,
  loginRedirect?: null,
}


export default function InlineErrorPage(
  {
    type = "other",
    pageName = "Error",
    message = null,
    loginRedirect = null
  }: InlineErrorPageLoginErrorProps | InlineErrorPageOtherErrorProps
) {

  function renderMessage() {
    if (type === "login_required") {
      const path = loginRedirect ? `/login?redirect=${loginRedirect}` : "/login";
      const loginLink = <InlineLink path={path} anchor="log in" />;
      return <p>Please {loginLink} to view this page.</p>;
    } else {
      return <p>{message}</p>;
    }
  }

  return (
    <div className={utilStyles.pagePadding}>
      <h1 className={utilStyles.h1}>{pageName}</h1>
      <div className={utilStyles.largeText}>
        {renderMessage()}
      </div>
    </div>
  );
}
