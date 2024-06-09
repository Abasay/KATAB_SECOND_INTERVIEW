import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// Define types for the server responses
interface OptionsResponse {
  rp: {
    name: string;
  };
  user: {
    id: string; // Base64 encoded
    name: string;
    displayName: string;
  };
  pubKeyCredParams: PublicKeyCredentialParameters[];
  challenge: string; // Base64 encoded
  timeout: number;
  authenticatorSelection?: {
    authenticatorAttachment?: AuthenticatorAttachment;
    requireResidentKey?: boolean;
    userVerification?: UserVerificationRequirement;
  };
  attestation: AttestationConveyancePreference;
}

interface VerificationResponse {
  status: "ok" | "failed";
}

interface AttestationResponse {
  id: string;
  rawId: string;
  type: string;
  response: {
    clientDataJSON: string;
    attestationObject: string;
  };
}

const base64urlToArrayBuffer = (base64url: string): ArrayBuffer => {
  const binaryString = atob(base64url.replace(/-/g, "+").replace(/_/g, "/"));
  const length = binaryString.length;
  const bytes = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
};

const base64url = (buffer: Uint8Array): string => {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const length = bytes.byteLength;
  for (let i = 0; i < length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};
// Fetch options from the server for the registration

// Verify the response with the server
const verifyResponseWithServer = async (
  email: string,
  attestationResponse: any,
): Promise<VerificationResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASEURL}/auth/user/verifypassphrase`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, attestationResponse }),
    },
  );
  return res.json();
};

const arrayBufferToBase64url = (buffer: ArrayBuffer): string => {
  return base64url(new Uint8Array(buffer));
};
// Register component
const PassPhrase = ({ email }) => {
  const [username, setUsername] = useState<string>("");
  // Fetch options from the server for the registration
  const getOptionsFromServer = async (
    email: string,
    username: string,
  ): Promise<OptionsResponse> => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASEURL}/auth/user/setpassphrase`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, username: username }),
      },
    );
    return res.json();
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const options = await getOptionsFromServer(email, username);

    // Convert the challenge and user.id from base64 to ArrayBuffer
    const publicKeyOptions: PublicKeyCredentialCreationOptions = {
      ...options,
      challenge: base64urlToArrayBuffer(options.challenge),
      user: {
        ...options.user,
        id: base64urlToArrayBuffer(options.user.id),
      },
    };

    const credential = (await navigator.credentials.create({
      publicKey: publicKeyOptions,
    })) as PublicKeyCredential;

    console.log(credential);
    // const attestationResponse: AttestationResponse = {
    //   id: credential.id,
    //   rawId: Array.from(new Uint8Array(credential.rawId)).toString(),
    //   type: credential.type,
    //   response: {
    //     clientDataJSON: Array.from(
    //       new Uint8Array(credential.response.clientDataJSON),
    //     ).toString(),
    //     attestationObject: Array.from(
    //       new Uint8Array(
    //         (
    //           credential.response as AuthenticatorAttestationResponse
    //         ).attestationObject,
    //       ),
    //     ).toString(),
    //   },
    // };

    // console.log(attestationResponse);
    const attestationResponse: AttestationResponse = {
      id: credential.id,
      rawId: arrayBufferToBase64url(credential.rawId),
      type: credential.type,
      response: {
        clientDataJSON: arrayBufferToBase64url(
          credential.response.clientDataJSON,
        ),
        attestationObject: arrayBufferToBase64url(
          (credential.response as AuthenticatorAttestationResponse)
            .attestationObject,
        ),
      },
    };

    const verification = await verifyResponseWithServer(
      email,
      attestationResponse,
    );

    if (verification.status === "ok") {
      toast.success("Registration successful");
      router.push("/auth/signin");
      alert();
    } else {
      alert("Registration failed");
    }
  };

  const router = useRouter();
  const userEmail = Cookies.get("c&m-userEmail");
  const userIsLoggedIn = Cookies.get("c&m-isLoggedIn");
  const userToken = Cookies.get("c&m-token");

  // useEffect(() => {
  //   if (userEmail && userIsLoggedIn && userToken) {
  //     toast.error("You are logged in...");
  //     router.push("/");
  //   }
  // }, []);

  return (
    <div className=" mt-6">
      <input
        name="username"
        type="username"
        placeholder="Create a Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo  focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
      />

      {/* Signup Button */}
      <button
        type="submit"
        onClick={(e: any) => {
          handleRegister(e);
        }}
        className="w-full rounded-md bg-primary py-3.5 text-base font-semibold text-white transition-all duration-300 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-opacity-80"
      >
        Create your PassKey
      </button>
    </div>
  );
};

export default PassPhrase;
