import { useState } from 'react';
import Cookies from 'js-cookie'

const Setup2FA = () => {
  const [qrCode, setQrCode] = useState<string>('');
  const [secret, setSecret] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [verificationMessage, setVerificationMessage] = useState<string>('');

  const generateSecret = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/auth/user/generate2fa`,{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email:Cookies.get('c&m-userEmail')}),
    });
    const data = await res.json();
    setQrCode(data.qrCode);
    setSecret(data.secret);
  };

  const verifyToken = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/auth/user/verify2fa`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, secret, email:Cookies.get('c&m-userEmail') }),
    });

    const data = await res.json();
    if (data.verified) {
      setVerificationMessage('Token verified successfully!');
    } else {
      setVerificationMessage('Token verification failed.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Setup 2FA</h1>
        <button
          onClick={generateSecret}
          className="w-full py-2 px-4 mb-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Generate Secret
        </button>
        {qrCode && (
          <div>
            <img src={qrCode} alt="QR Code" className="mb-4 mx-auto" />
            <div className="space-y-4">
              <div>
                <label htmlFor="token" className="block text-sm font-medium text-gray-700">Enter Token</label>
                <input
                  type="text"
                  id="token"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                />
              </div>
              <button
                onClick={verifyToken}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Verify Token
              </button>
              {verificationMessage && <p className="mt-4 text-center text-red-500">{verificationMessage}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Setup2FA;
