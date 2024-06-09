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
  assertionResponse: any,
): Promise<VerificationResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASEURL}/auth/user/verifyPassPhraseLogin`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, assertionResponse: assertionResponse }),
    },
  );
  return res.json();
};

const arrayBufferToBase64url = (buffer: ArrayBuffer): string => {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};
// Register component
const PassPhrase = ({ email, token, isLOGGEDiN }) => {
  const [username, setUsername] = useState<string>("");
  // Fetch options from the server for the registration
  const getAuthenticationOptions = async (username: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASEURL}/auth/user/getPassphrase`,
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

  // const handleLogin = async (e: any) => {
  //   const options = await getAuthenticationOptions(username);
  //   // options.challenge = Uint8Array.from(atob(options.challenge), (c) =>
  //   //   c.charCodeAt(0),
  //   // );

  //   const allowCredentials = options.allowCredentials.map((cred: any) => {
  //     return {
  //       ...cred,
  //       id: base64urlToArrayBuffer(cred.id),
  //     };
  //   });

  //   const credential = await (navigator.credentials as any).get({
  //     publicKey: {
  //       ...options,
  //       allowCredentials,
  //       challenge: base64urlToArrayBuffer(options.challenge),
  //     },
  //   } as unknown as PublicKeyCredentialRequestOptions);

  //   const attestationResponse: AttestationResponse = {
  //     id: credential.id,
  //     rawId: arrayBufferToBase64url(credential.rawId),
  //     type: credential.type,
  //     response: {
  //       clientDataJSON: arrayBufferToBase64url(
  //         credential.response.clientDataJSON,
  //       ),
  //       attestationObject: arrayBufferToBase64url(
  //         (credential.response as AuthenticatorAttestationResponse)
  //           .authenticatorData,
  //       ),
  //     },
  //   };

  //   const verification = await verifyResponseWithServer(
  //     email,
  //     attestationResponse,
  //   );

  //   if (verification.status === "ok") {
  //     Cookies.set("c&m-userEmail", email);
  //     Cookies.set("c&m-isLoggedIn", true);
  //     Cookies.set("c&m-token", token);
  //     alert("Login successful");
  //   } else {
  //     alert("Login failed");
  //   }
  // };

  const userEmail = Cookies.get("c&m-userEmail");
  const userIsLoggedIn = Cookies.get("c&m-isLoggedIn");
  const userToken = Cookies.get("c&m-token");
  const router = useRouter();
  const handleLogin = async (e: any) => {
    e.preventDefault();
    const options = await getAuthenticationOptions(username);
    console.log(options.allowCredentials);

    const allowCredentials = options.allowCredentials.map((cred: any) => ({
      ...cred,
      id: base64urlToArrayBuffer(cred.id),
    }));

    console.log(allowCredentials);

    const credential = await (navigator.credentials as any).get({
      publicKey: {
        ...options,
        allowCredentials,
        challenge: base64urlToArrayBuffer(options.challenge),
      },
    } as unknown as PublicKeyCredentialRequestOptions);

    console.log(credential);

    const assertionResponse = {
      id: credential.id,
      rawId: arrayBufferToBase64url(credential.rawId),
      type: credential.type,
      response: {
        authenticatorData: arrayBufferToBase64url(
          credential.response.authenticatorData,
        ),
        clientDataJSON: arrayBufferToBase64url(
          credential.response.clientDataJSON,
        ),
        signature: arrayBufferToBase64url(credential.response.signature),
        userHandle: arrayBufferToBase64url(credential.response.userHandle),
      },
    };
    console.log(assertionResponse);

    const verification = await verifyResponseWithServer(
      email,
      assertionResponse,
    );

    if (verification.status === "ok") {
      Cookies.set("c&m-userEmail", email);
      Cookies.set("c&m-isLoggedIn", true);
      Cookies.set("c&m-token", token);
      toast.success("Login successful");
      setUsername("");
      router.push("/");
    } else {
      toast.error("Passkey authentication failed");
    }
  };

  useEffect(() => {
    if (userEmail && userIsLoggedIn && userToken) {
      toast.error("You are logged in...");
      router.push("/");
    }
  }, []);

  return (
    <div
      className=" mt-6 pb-6
    "
    >
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
          handleLogin(e);
        }}
        className="w-full rounded-md bg-primary py-3.5 text-base font-semibold text-white transition-all duration-300 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-opacity-80"
      >
        Confirm your PassKey
      </button>
    </div>
  );
};

export default PassPhrase;
