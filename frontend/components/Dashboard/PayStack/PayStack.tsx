import React from "react";
import {
  usePaystackPayment,
  PaystackButton,
  PaystackConsumer,
} from "react-paystack";
// import { PaystackButtonProps } from "react-paystack";

const config = {
  reference: new Date().getTime().toString(),
  email: process.env.NEXT_PUBLIC_PAYMENT_EMAIL,
  publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_ID,
  firstname: "Ayomide",
  lastname: "Asheem",
  /*split: { //if you want to use transaction split
        "type": "percentage",
        "bearer_type": "all",
        "subaccounts": [
            {
                "subaccount": "ACCT_mtl3xzwjfhcldkw",
                "share": 30
            },
            {
                "subaccount": "ACCT_y19ht107y44o294",
                "share": 20
            }
        ]
    }*/
};

const onSuccess = (reference) => {
  // Implementation for whatever you want to do with reference and after success call.
  console.log("reference", reference);
};

const onClose = () => {
  // implementation for whatever you want to do when the Paystack dialog closed.
  console.log("closed");
};

function PayStack({ amount }) {
  const config = {
    reference: new Date().getTime().toString(),
    email: "abdulsalamasheem@gmail.com",
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_ID || "",
    firstname: "Ayomide",
    lastname: "Asheem",
  };

  const componentProps = {
    ...config,
    amount: amount,
    text: "Pay Now",
    onSuccess,
    onClose,
    email: process.env.NEXT_PUBLIC_PAYMENT_EMAIL || "",
  };

  return (
    <div className="">
      <PaystackButton
        {...componentProps}
        className="hover-bg-blue-400 hover-text-black rounded-full bg-blue-500 px-5 py-1 text-white hover:animate-pulse "
      />
    </div>
  );
}

export default PayStack;
