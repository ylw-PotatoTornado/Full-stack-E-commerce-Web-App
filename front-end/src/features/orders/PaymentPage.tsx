import { useEffect, useState } from "react";
import { useParams, useRouteLoaderData } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";

import { AuthData } from "../auth/authData";
import InlineErrorPage from "../../components/InlineErrorPage/InlineErrorPage";
import utilStyles from "../../App/utilStyles.module.css";


// https://docs.stripe.com/checkout/embedded/quickstart?client=react&lang=node
// https://docs.stripe.com/payments/accept-a-payment?platform=web&ui=embedded-form#mount-checkout
const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`);

export default function PaymentPage() {
  
  const { orderId } = useParams();
  const authData = useRouteLoaderData("app") as AuthData;
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create a Checkout Session as soon as the page loads
    const basePath = `${process.env.REACT_APP_API_BASE_URL}/checkout/create-payment-session`;
    fetch(`${basePath}?order_id=${orderId}`,
    {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data: { clientSecret: string }) => setClientSecret(data.clientSecret));
  }, [orderId]);

  if (!authData.logged_in) {
    return <InlineErrorPage pageName="Order failed" type="login_required" loginRedirect="/orders" />;
  }

  return (
    <div className={utilStyles.pagePadding} id="checkout">
      <h1 className={utilStyles.h1}>Complete your payment below</h1>
      <p>Payment Feature to be updated. No payment supported now.</p>
      <p>Sample Payment Fields:</p>
      <ul className={utilStyles.mb3rem}>
        <li><strong>Email: </strong>test@gmail.com</li>
        <li><strong>Card number: </strong>1234 5678 4321 8765</li>
        <li><strong>Expiry date: </strong>12/01</li>
        <li><strong>CVC: </strong>123</li>
        <li><strong>Name: </strong>Georgia Tech</li>
        <li><strong>Postcode: </strong>30315</li>
      </ul>
      {clientSecret && (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{clientSecret}}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </div>
  )
}
