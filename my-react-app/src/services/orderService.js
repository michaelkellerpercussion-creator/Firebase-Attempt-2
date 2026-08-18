import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";

const ordersCollection = collection(db, "orders");

// Create Order
export const createOrder = async (userId, cartItems, totalPrice) => {
  const orderData = {
    userId: userId,
    items: cartItems,
    totalPrice: totalPrice,
    createdAt: new Date().toISOString(),
  };

  const docRef = await addDoc(ordersCollection, orderData);
  return docRef.id;
};

// Read User Order History
export const getUserOrders = async (userId) => {
  const q = query(
    ordersCollection,
    where("userId", "==", userId),
    orderBy("createdAt", "desc"),
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
