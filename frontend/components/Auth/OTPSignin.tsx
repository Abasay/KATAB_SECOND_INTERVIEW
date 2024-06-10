import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type OTPComponentProps = {
  authsEnabled: string[];
  email: string;
  token: string;
  isLOGGEDiN: Boolean;
  setSmsAuth;
} & React.HTMLAttributes<HTMLDivElement>;

const OTPComponent: React.FC<OTPComponentProps> = ({
  authsEnabled,
  email,
  token,
  isLOGGEDiN,
  setSmsAuth,
}) => {
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
        `${process.env.NEXT_PUBLIC_BASEURL}/auth/user/get-sms-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phoneNumber, email: email }),
        },
      );
      const data = await res.json();
      setMessage(data.message || data.error);
    } catch (error) {
      setRequested(false);
      toast.error("An error occurred, try again");
    }
  };

  useEffect(() => {
    requestOtp();
  }, []);
  const router = useRouter();
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
      if (data.success) {
        Cookies.set("c&m-userEmail", email);
        Cookies.set("c&m-isLoggedIn", true);
        Cookies.set("c&m-token", token);
        toast.success("Login successful");
        router.push("/");
      }
      setMessage(data.message || data.error);
    } catch (error) {
      console.log(error);
      setOtpEntered(false);
    }
  };

  return (
    <div className="mx-auto mt-6 max-w-md rounded-lg bg-slate-100 p-8 shadow-md">
      <h1 className="mb-4 flex items-center gap-3 text-center text-2xl font-bold"></h1>
      {!authsEnabled?.includes("sms-auth") && (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Enter the OTP sent to your linked number
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
