import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

export const registerUser = async (email, password, userData) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const user = userCredential.user;

  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    email: email,
    name: userData.name || "",
    address: userData.address || "",
    createdAt: new Date().toISOString(),
  });

  return user;
};

// Login
export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = () => {
  return signOut(auth);
};

export const getUserProfile = async (uid) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};

// Update Profile
export const updateUserProfile = async (uid, updateData) => {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, updateData);
};

// Delete Account
export const deleteUserAccount = async () => {
  const user = auth.currentUser;
  if (!user) return;

  // 1. Delete user document from Firestore
  await deleteDoc(doc(db, "users", user.uid));
  // 2. Delete user from Firebase Auth
  await deleteUser(user);
};
