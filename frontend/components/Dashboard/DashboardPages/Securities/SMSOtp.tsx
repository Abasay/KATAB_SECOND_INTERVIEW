import { useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

type OTPComponentProps = {
  authsEnabled: string[];
} & React.HTMLAttributes<HTMLDivElement>;

const OTPComponent: React.FC<OTPComponentProps> = ({ authsEnabled }) => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const userEmail = Cookies.get("c&m-userEmail");
  const [requested, setRequested] = useState<boolean>(false);
  const [otpEntered, setOtpEntered] = useState<boolean>(false);

  const requestOtp = async () => {
    try {
      setRequested(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASEURL}/auth/user/sms-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phoneNumber, email: userEmail }),
        },
      );
      const data = await res.json();
      setMessage(data.message || data.error);
    } catch (error) {
      setRequested(false);
      toast.error("An error occurred, try again");
    }
  };

  const verifyOtp = async () => {
    try {
      setOtpEntered(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASEURL}/auth/user/verify-sms-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phoneNumber, otp, email: userEmail }),
        },
      );
      const data = await res.json();
      setMessage(data.message || data.error);
    } catch (error) {
      console.log(error);
      setOtpEntered(false);
    }
  };

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
    <div className="mx-auto mt-6 max-w-md rounded-lg bg-slate-100 p-8 shadow-md">
      <h1 className="mb-4 flex items-center gap-3 text-center text-2xl font-bold">
        <span>2. OTP Authentication</span>
        {authsEnabled?.includes("sms-auth") ? (
          <>
            <span className=" rounded-lg border border-green-500 bg-green-200 p-2 text-xs">
              enabled
            </span>
            <span
              className=" ml-2 cursor-pointer rounded-lg border border-slate-400 bg-blue-400 p-2 text-xs text-slate-50"
              onClick={() => {
                disableAuth("sms-auth");
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
      <p>Link Your Phone Number to receive otp sms.</p>
      {!authsEnabled?.includes("sms-auth") && (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              value={phoneNumber}
              disabled={requested}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 disabled:cursor-not-allowed"
            />
            <button
              onClick={requestOtp}
              disabled={requested}
              className="mt-2 w-full rounded-md bg-blue-500 px-4 py-2 font-semibold text-white shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed"
            >
              Request OTP
            </button>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              OTP
            </label>
            <input
              type="text"
              value={otp}
              disabled={otpEntered}
              onChange={(e) => setOtp(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 disabled:cursor-not-allowed"
            />
            <button
              onClick={verifyOtp}
              disabled={otpEntered}
              className="mt-2 w-full rounded-md bg-green-500 px-4 py-2 font-semibold text-white shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:cursor-not-allowed"
            >
              Verify OTP
            </button>
          </div>
        </>
      )}

      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </div>
  );
};

export default OTPComponent;
