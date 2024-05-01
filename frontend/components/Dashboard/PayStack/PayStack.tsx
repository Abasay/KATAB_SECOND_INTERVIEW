import React, { useState } from "react";
import {
  usePaystackPayment,
  PaystackButton,
  PaystackConsumer,
} from "react-paystack";
import Cookies from "js-cookie";
import { URLS } from "@/lib/urls";
import toast from "react-hot-toast";
// import { PaystackButtonProps } from "react-paystack";

const config = {
  reference: new Date().getTime().toString(),
  email: process.env.NEXT_PUBLIC_PAYMENT_EMAIL,
  publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_ID,
  firstname: "Ayomide",
  lastname: "Asheem",
};

const onSuccess = (reference) => {
  // Implementation for whatever you want to do with reference and after success call.
  console.log("reference", reference);
};

const onClose = () => {
  // implementation for whatever you want to do when the Paystack dialog closed.
  console.log("closed");
};

function PayStack({ amount, paymentDetails }) {
  const [paymentId, setPaymentId] = useState("");

  const paymentUpdate = (reference) => {
    const paymentPromise = new Promise(async (resolve, reject) => {
      const uploadPaymentDetails = await fetch(
        `${process.env.NEXT_PUBLIC_BASEURL}${URLS.transactionUpload}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("c&m-token")}`,
          },
          body: JSON.stringify({
            transactionId: reference.reference,
            journey: paymentDetails.placeToJourney,
            milesTravelled: paymentDetails.miles,
            journeyDuration: paymentDetails.journeyDuration,
            tfare: paymentDetails.fee,
            trans: reference.transaction,
          }),
        },
      );

      const response = await uploadPaymentDetails.json();
      console.log(response);

      if (response.success) resolve(response);
      else
        reject(
          "An error Occurred, Your card has been debited? Kindly contact our support.",
        );
    });
    toast.promise(paymentPromise, {
      loading: "Concluding Transaction Please wait a moment.",
      success:
        "Transaction Completed, View Details in transaction history page.",
      error:
        "An error occurred while concluding transaction, Your card has been debited? Kindly contact our support.",
    });
  };

  const config = {
    reference: new Date().getTime().toString(),
    email: "abdulsalamasheem@gmail.com",
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_ID || "",
    firstname: "Ayomide",
    lastname: "Asheem",
  };

  const componentProps = {
    ...config,
  };

  return (
    <div className="">
      <PaystackButton
        {...config}
        onSuccess={(reference) => {
          paymentUpdate(reference);
        }}
        text="Make Payment"
        amount={amount}
        email={process.env.NEXT_PUBLIC_PAYMENT_EMAIL || ""}
        className="hover-bg-blue-400 hover-text-black rounded-full bg-blue-500 px-5 py-2 text-white hover:animate-pulse "
      />
    </div>
  );
}

export default PayStack;
