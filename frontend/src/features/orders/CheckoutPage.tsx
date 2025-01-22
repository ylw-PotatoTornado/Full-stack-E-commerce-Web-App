import { Form, Link, redirect, useActionData, useLoaderData, useRouteLoaderData } from "react-router-dom";
import { useState } from "react";
import { AuthData } from "../auth/authData";
import { CartLoaderData } from "./Cart";
import { renderOrderItems } from "./utils";
import InlineErrorPage from "../../components/InlineErrorPage/InlineErrorPage";

import utilStyles from "../../App/utilStyles.module.css";



export async function checkoutAction({ request }: { request: Request }) {
 
  let formData = await request.formData();
  try {
    const address = formData.get("address");
    const postcode = formData.get("postcode");
    const res = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/checkout/create-pending-order`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ address, postcode })
      }
    );

    if (res.ok) {
      const { order_id }: { order_id: number } = await res.json();
      return redirect(`/checkout/${order_id}/payment`);
    }
    throw new Error("Unexpected status code.");
  } catch (error) {
    return { checkoutErrMsg: "Sorry, your order could not be completed. Please try again later." };
  }
}


export function CheckoutPage() {
  const authData = useRouteLoaderData("app") as AuthData;
  const { cartData, cartLoaderErrMsg } = useLoaderData() as CartLoaderData;
  const checkoutActionData = useActionData() as { checkoutErrMsg: string } | undefined;
  const checkoutErrMsg = checkoutActionData?.checkoutErrMsg;
  const [formError, setFormError] = useState<string | null>(null);

  function validateForm(address: string, postcode: string): boolean {
    if (!address || address.length < 5) { 
      setFormError("Address must be at least 5 characters.");
      return false;
    }
    if (!postcode || !/^\d{5}(-\d{4})?$/.test(postcode)) { 
      setFormError("Postcode must be a valid US zip code.");
      return false;
    }
    setFormError(null); 
    return true;
  }

  if (!authData.logged_in) {
    return <InlineErrorPage pageName="Checkout" type="login_required" loginRedirect="/cart" />;
  } else if (cartLoaderErrMsg) {
    return <InlineErrorPage pageName="Checkout" message={cartLoaderErrMsg} />;
  } else if (cartData.length === 0) {
    return <InlineErrorPage pageName="Checkout" message="Your cart is empty so it is not possible to checkout." />;
  }

  function getTotalCost() {
    let totalCost = 0;
    cartData.forEach(item => {
      totalCost += Number(item.product_price) * item.product_quantity;
    });
    return totalCost.toFixed(2);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); 
    const form = event.target as HTMLFormElement;
    const address = form.address.value;
    const postcode = form.postcode.value;
  
    if (validateForm(address, postcode)) {
      form.submit(); 
    }
  }

  return (
    <div className={utilStyles.pagePadding}>
      <h1 className={utilStyles.h1}>Checkout</h1>
      <p className={utilStyles.mb3rem}>Complete your order below.</p>
      <h2>Order items</h2>
      {renderOrderItems(cartData, false)}
      <div className={`${utilStyles.mb3rem} ${utilStyles.XLText}`}>
        <strong>Total cost: <span className={utilStyles.red}>${getTotalCost()}</span></strong>
      </div>
      <h2>Delivery address</h2>
      <Form method="post" className={utilStyles.stackedForm}>
        <label htmlFor="address" className={utilStyles.label}>Address-US</label>
        <textarea id="address" className={utilStyles.input} name="address" rows={6} minLength={5} maxLength={25} required />
        <label htmlFor="postcode" className={utilStyles.label}>Postcode-US</label>
        <input id="postcode" className={utilStyles.input} type="text" name="postcode" minLength={5} maxLength={8} required />
        <button type="submit" className={`${utilStyles.mt2rem} ${utilStyles.button}`}>Continue to payment</button>
      </Form>

      {formError ? (
        <div className={utilStyles.mt2rem}>
          <p className={`${utilStyles.mb2rem} ${utilStyles.red}`}><strong>{formError}</strong></p>
        </div>
      ) : null}
      {checkoutErrMsg ? (
        <div className={utilStyles.mt2rem}>
          <p className={`${utilStyles.mb2rem} ${utilStyles.red}`}><strong>{checkoutErrMsg}</strong></p>
          <Link to="/" className={utilStyles.button}>Continue shopping</Link>
        </div>
      ) : null}
    </div>
  );
}
