
export const encryptSymmetric = async (plaintext: string, key: string) => {
  // create a random 96-bit initialization vector (IV)
  const iv = crypto.getRandomValues(new Uint8Array(12));

  // encode the text you want to encrypt
  const encodedPlaintext = new TextEncoder().encode(plaintext);

  // prepare the secret key for encryption
  const secretKey = await crypto.subtle.importKey('raw', Buffer.from(key, 'base64'), {
      name: 'AES-GCM',
      length: 256
  }, true, ['encrypt', 'decrypt']);

  // encrypt the text with the secret key
  const ciphertext = await crypto.subtle.encrypt({
      name: 'AES-GCM',
      iv
  }, secretKey, encodedPlaintext);
  
  // return the encrypted text "ciphertext" and the IV
  // encoded in base64
  return ({
      ciphertext: Buffer.from(ciphertext).toString('base64'),
      iv: Buffer.from(iv).toString('base64')
  });
}
