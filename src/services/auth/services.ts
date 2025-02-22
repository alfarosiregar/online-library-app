import { addData, retrieveDataByField } from "@/lib/firebase/service";
import bcrypt from "bcrypt";
import encryptData from "../cryptoJS";

export async function signUp(
  userData: {
    email: string;
    fullname: string;
    phone: string;
    gender: string;
    role?: string;
    password: string;
    created_at?: Date;
    updated_at?: Date;
    type?: string;
  },
  callback: Function,
) {
  const data = await retrieveDataByField("users", "email", userData.email);

  if (data.length > 0) {
    callback(false);
  } else {
    if (!userData.role) {
      userData.role = "member";
    }
    userData.type = "credentials";
    userData.created_at = new Date();
    userData.updated_at = new Date();
    userData.email = encryptData(userData.email);
    userData.phone = encryptData(userData.phone);
    userData.password = await bcrypt.hash(userData.password, 10);
    addData("users", userData, (status: boolean) => {
      callback(status);
    });
  }
}

export async function signIn(email: string) {
  const data = await retrieveDataByField("users", "email", email);

  if (data) {
    return data[0];
  } else {
    return null;
  }
}

export async function loginWithGoogle(
  userData: {
    email: string;
    role?: string;
    created_at?: Date;
    updated_at?: Date;
    password?: string;
  },
  callback: Function,
) {
  const data = await retrieveDataByField("users", "email", userData.email);

  if (data.length > 0) {
    return data[0];
  } else {
    userData.role = "member";
    userData.created_at = new Date();
    userData.updated_at = new Date();
    userData.password = "";
    await addData("users", userData, (status: boolean) => {
      if (status) {
        callback(userData);
      }
    });
  }
}
