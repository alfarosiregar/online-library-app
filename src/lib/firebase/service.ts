import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import app from "./init";

const firestore = getFirestore(app);

export async function addData(
  collectionName: string,
  data: any,
  callback: Function,
) {
  await addDoc(collection(firestore, collectionName), data)
    .then(() => {
      callback(true);
    })
    .catch((err) => {
      callback(false);
      console.log(err);
    });
}

export async function retrieveData(collectionName: string) {
  const snapshot = await getDocs(collection(firestore, collectionName));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}

export async function retrieveDataById(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(firestore, collectionName, id));
  const data = snapshot.data();
  return data;
}

export async function retrieveDataByField(
  collectionName: string,
  field: string,
  value: string,
) {
  const q = query(
    collection(firestore, collectionName),
    where(field, "==", value),
  );
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

export async function getData(collectionName: string) {
  const queryProducts = await getDocs(collection(firestore, collectionName));
  const data = queryProducts.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return data;
}

export async function getDataById(collectionName: string, id: string) {
  const queryProduct = await getDoc(doc(firestore, collectionName, id));
  const data = queryProduct.data();
  return data;
}

export async function updateUser(
  collectionName: string,
  id: string,
  data: any,
  callback: Function,
) {
  const docRef = doc(firestore, collectionName, id);
  await updateDoc(docRef, data)
    .then(() => {
      callback(true);
    })
    .catch(() => {
      callback(false);
    });
}

export async function deleteUser(
  collectionName: string,
  id: string,
  callback: Function,
) {
  const docRef = doc(firestore, collectionName, id);
  await deleteDoc(docRef)
    .then(() => {
      callback(true);
    })
    .catch(() => {
      callback(false);
    });
}
