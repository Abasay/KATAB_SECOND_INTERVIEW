import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import OTPComponent from "./DashboardPages/Securities/SMSOtp";
import PassKey from "./DashboardPages/Securities/PassKey";
import toast from "react-hot-toast";

const Setup2FA = () => {
  const [qrCode, setQrCode] = useState<string>("");
  const [secret, setSecret] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [verificationMessage, setVerificationMessage] = useState<string>("");

  const [authsEnabled, setAuthsEnabled] = useState<string[]>([]);
  const router = useRouter();

  const generateSecret = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASEURL}/auth/user/generate2fa`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: Cookies.get("c&m-userEmail") }),
      },
    );
    const data = await res.json();
    setQrCode(data.qrCode);
    setSecret(data.secret);
  };

  useEffect(() => {
    const getAuths = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASEURL}/auth/user/auths`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: Cookies.get("c&m-userEmail") }),
          },
        );
        const data = await res.json();
        setAuthsEnabled(data.authsEnabled);
      } catch (error) {
        console.log(error);
      }
    };

    getAuths();
  }, []);

  useEffect(() => {
    const getAuths = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASEURL}/auth/user/auths`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: Cookies.get("c&m-userEmail") }),
          },
        );
        const data = await res.json();
        setAuthsEnabled(data.authsEnabled);
      } catch (error) {
        console.log(error);
      }
    };

    getAuths();
  }, [verificationMessage]);

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

  const verifyToken = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASEURL}/auth/user/verify2fa`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            secret,
            email: Cookies.get("c&m-userEmail"),
          }),
        },
      );

      const data = await res.json();
      if (data.verified) {
        setVerificationMessage("Token verified successfully!");
      } else {
        setVerificationMessage("Token verification failed.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setQrCode("");
      setSecret("");
      setToken("");
      if (verificationMessage === "Token verified successfully!") {
        setVerificationMessage("");
        router.push("/dashboard");
      }
    }
  };

  return (
    <>
      <div className="w-[700px] pl-20">
        <h1 className="mb-4 mt-10 text-center text-2xl font-bold">
          Setup Your Security
        </h1>
        <div className="mx-auto w-full py-8">
          <div className=" flex w-full flex-col items-center justify-center ">
            <div className=" w-full max-w-md items-center gap-5 rounded-lg bg-slate-100 p-8 shadow-lg">
              <h1 className="mb-4 flex items-center gap-3 text-center text-2xl font-bold">
                <span>1. Setup 2FA</span>
                {authsEnabled?.includes("authenticator-auth") ? (
                  <>
                    <span className=" rounded-lg border border-green-500 bg-green-200 p-2 text-xs">
                      enabled
                    </span>
                    <span
                      className=" ml-2 cursor-pointer rounded-lg border border-slate-400 bg-blue-400 p-2 text-xs text-slate-50"
                      onClick={() => {
                        disableAuth("authenticator-auth");
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
                Set up Two Factor Authentication using Google Authenticator App.
              </p>
              {!authsEnabled?.includes("authenticator-auth") && (
                <button
                  onClick={generateSecret}
                  className="mb-4 w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Generate Secret
                </button>
              )}
              {qrCode && (
                <div>
                  <img src={qrCode} alt="QR Code" className="mx-auto mb-4" />
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="token"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Test your token here.
                      </label>
                      <input
                        type="text"
                        id="token"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                      />
                    </div>
                    <button
                      onClick={verifyToken}
                      className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Verify Token
                    </button>
                    {verificationMessage && (
                      <p className="mt-4 text-center text-red-500">
                        {verificationMessage}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
            <OTPComponent authsEnabled={authsEnabled} />
            <div>
              <PassKey authsEnabled={authsEnabled} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Setup2FA;
