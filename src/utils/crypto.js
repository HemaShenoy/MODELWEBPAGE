import CryptoJS from 'crypto-js';

const SECRET = 'demo-frontend-key';

export const encryptPassword = (password) => {
  return CryptoJS.AES.encrypt(password, SECRET).toString();
};

export const decryptPassword = (cipherText) => {
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, SECRET);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch {
    return '';
  }
};
