import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.NEXTAUTH_SECRET || "";

function encryptData(data: any) {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
}

const hashData = (data: any) => {
  return CryptoJS.SHA256(data).toString();
};

export { encryptData, hashData };
