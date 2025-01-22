import { Form, redirect, useActionData, useRouteLoaderData, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { AuthData } from "./authData";
import InlineLink from "../../components/InlineLink/InlineLink";
import utilStyles from "../../App/utilStyles.module.css";

export async function loginAction({ request }: { request: Request }) {
  let formData = await request.formData();
  try {
    const username = formData.get("email_address");
    const password = formData.get("password");

    const res = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      }
    );

    if (res.ok) {
      let redirectPath = new URL(request.url).searchParams.get("redirect") || "/account";
      if (redirectPath.charAt(0) !== "/") {
        redirectPath = `/${redirectPath}`;
        console.log("Redirect path adjusted to:", redirectPath);
      }
      return redirect(redirectPath);
    } else if (res.status === 401) {
      return "Login failed. The username or password is incorrect.";
    }
    throw new Error(`Unexpected status code: ${res.status}`);
  } catch (error) {
    console.error("Error during login:", error);
    return "Sorry, login failed. Please try again later.";
  }
}

export function LoginPage() {
  const authData = useRouteLoaderData("app") as AuthData;
  const loginError = useActionData() as string | undefined;

  useEffect(() => {
    async function fetchAuthStatus() {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/status`, {
        method: "GET",
        credentials: "include", 
      });
      const data = await res.json();
      console.log("Auth status response:", data);
    }
    fetchAuthStatus();
  }, []);

  const registerLink = <InlineLink path="/register" anchor="register" />;
  const loggedOutContent = <>If you haven't created an account, please {registerLink} first.</>;
  const loggedInContent = <>You are already logged in as {authData.email_address}.</>;

  return (
    <div className={`${utilStyles.pagePadding} ${utilStyles.mw80rem}`}>
      <h1 className={utilStyles.h1}>Log in</h1>
      <p className={utilStyles.mb2rem}>{authData.logged_in ? loggedInContent : loggedOutContent}</p>
      <Form method="post" className={utilStyles.stackedForm}>
        <label htmlFor="email_address" className={utilStyles.label}>Email</label>
        <input id="email_address" className={utilStyles.input} type="email" name="email_address" required />
        <label htmlFor="password" className={utilStyles.label}>Password</label>
        <input id="password" className={utilStyles.input} type="password" name="password" required />
        <button type="submit" className={utilStyles.button}>Log in</button>
      </Form>
      <p>{loginError ? loginError : null}</p>
      <hr className={utilStyles.separator} />
    </div>
  );
}

