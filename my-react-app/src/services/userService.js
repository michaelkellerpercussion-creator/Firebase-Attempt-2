import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

// Register + Create User Document (Part 2 & Part 3 - Create)
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

// Login (Part 2)
export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Logout (Part 2)
export const logoutUser = () => {
  return signOut(auth);
};

// Read Profile (Part 3 - Read)
export const getUserProfile = async (uid) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};

// Update Profile (Part 3 - Update)
export const updateUserProfile = async (uid, updateData) => {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, updateData);
};

// Delete Account (Part 3 - Delete)
export const deleteUserAccount = async () => {
  const user = auth.currentUser;
  if (!user) return;

  // 1. Delete user document from Firestore
  await deleteDoc(doc(db, "users", user.uid));
  // 2. Delete user from Firebase Auth
  await deleteUser(user);
};
