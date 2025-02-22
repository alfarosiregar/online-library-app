import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.NEXTAUTH_SECRET || "";

function encryptData(data: any) {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
}

export default encryptData;
