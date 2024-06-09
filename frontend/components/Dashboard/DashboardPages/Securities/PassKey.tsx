import PassPhrase from "@/components/Auth/PassPhrase";
import React from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const PassKey = ({ authsEnabled }) => {
  const userEmail = Cookies.get("c&m-userEmail");
  const disableAuth = async (authType) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASEURL}/auth/user/disableAuth`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: Cookies.get("c&m-userEmail"),
            auth: authType,
          }),
        },
      );

      const data = await res.json();
      if (data.success) toast.success(`${authType} disabled.`);
      else toast.error("An error occurred, failed to disable auth.");
    } catch (error) {
      console.log(error);
      toast.error("An error occurred, failed to disable auth.");
    }
  };

  return (
    <div className="mx-auto mt-4 w-full rounded-lg bg-slate-100 p-4 py-8">
      <div className=" flex w-full flex-col items-center justify-center ">
        <div className=" w-full max-w-md items-center gap-5 rounded-lg bg-slate-100 p-8 shadow-lg">
          <h1 className="mb-4 flex items-center gap-3 text-center text-2xl font-bold">
            <span>3. Passkeys</span>
            {authsEnabled?.includes("passkey-auth") ? (
              <>
                <span className=" rounded-lg border border-green-500 bg-green-200 p-2 text-xs">
                  enabled
                </span>
                <span
                  className=" ml-2 cursor-pointer rounded-lg border border-slate-400 bg-blue-400 p-2 text-xs text-slate-50"
                  onClick={() => {
                    disableAuth("passkey-auth");
                  }}
                >
                  disable
                </span>
              </>
            ) : (
              <span className=" rounded-lg border border-slate-400 bg-slate-200 p-2 text-xs">
                not enabled
              </span>
            )}
          </h1>
          <p>
            Protect your account and withdrawals with Passkeys and/or security
            keys, such as Yubikey.
          </p>
        </div>
      </div>
      {!authsEnabled?.includes("passkey-auth") && (
        <PassPhrase email={userEmail} />
      )}
    </div>
  );
};

export default PassKey;
