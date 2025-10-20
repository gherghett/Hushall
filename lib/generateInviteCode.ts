import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";

const CHAR_SET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const generateRandomCode = (lenght = 6) => {
  let code = "";
  for (let i = 0; i < lenght; i++) {
    code += CHAR_SET.charAt(Math.floor(Math.random() * CHAR_SET.length));
  }
  return code;
};

export const generateUniqueJoinCode = async (): Promise<string> => {
  let code: string = "";
  let exists = true;

  while (exists) {
    code = generateRandomCode();

    const q = query(collection(db, "Households"), where("code", "==", code));
    const querySnap = await getDocs(q);

    exists = !querySnap.empty;
  }

  return code;
};
