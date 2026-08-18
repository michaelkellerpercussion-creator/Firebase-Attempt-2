import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const productsCollection = collection(db, "products");

// Read All Products
export const fetchProducts = async () => {
  const snapshot = await getDocs(productsCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Create Product
export const createProduct = async (productData) => {
  const docRef = await addDoc(productsCollection, {
    ...productData,
    createdAt: new Date().toISOString(),
  });
  return docRef.id;
};

// Update Product
export const updateProduct = async (productId, updatedFields) => {
  const productRef = doc(db, "products", productId);
  await updateDoc(productRef, updatedFields);
};

// Delete Product
export const deleteProduct = async (productId) => {
  const productRef = doc(db, "products", productId);
  await deleteDoc(productRef);
};
