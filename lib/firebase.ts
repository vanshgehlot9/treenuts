// lib/firebase.ts

import { initializeApp, getApps } from "firebase/app"
import { getFirestore, collection, addDoc, getDocs, DocumentData, QueryDocumentSnapshot, doc, updateDoc, deleteDoc, query, where } from "firebase/firestore"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseSignOut, User as FirebaseUser, updateProfile } from "firebase/auth"

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID!
}

// Initialize Firebase app only once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
export const db = getFirestore(app)
export const storage = getStorage(app)
export const auth = getAuth(app)

// --- Product Data Structure ---
export interface ProductVariant {
  weight: "250gm" | "500gm"
  price: number
  stock: number
  sku: string
}

export interface Product {
  id: string
  name: string
  description: string
  category: string
  images: string[]
  gstNumber: string
  hsnCode: string
  tax: number
  shipping: string
  variants: ProductVariant[]
  createdBy: string
  // UI-required fields
  price: number
  originalPrice: number | null
  rating: number
  reviewCount: number
  badge: string
}

// Replace uploadProductImage with Cloudinary upload
export async function uploadProductImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'unsigned_preset'); // your preset name

  const res = await fetch('https://api.cloudinary.com/v1_1/dvlouirmz/image/upload', {
    method: 'POST',
    body: formData,
  });
  const data = await res.json();
  return data.secure_url; // This is the image URL to save in Firestore
}

// Add a product to Firestore
export async function addProduct(product: Omit<Product, "id">): Promise<Product> {
  const docRef = await addDoc(collection(db, "products"), product)
  return { ...product, id: docRef.id }
}

// Fetch all products from Firestore
export async function getAllProducts(): Promise<Product[]> {
  const querySnapshot = await getDocs(collection(db, "products"))
  return querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
    const data = doc.data()
    return {
      id: doc.id,
      name: data.name || "Unnamed Product",
      description: data.description || "No description available.",
      category: data.category || "Uncategorized",
      images: Array.isArray(data.images) && data.images.length > 0 ? data.images : ["/placeholder.svg"],
      gstNumber: data.gstNumber || "",
      hsnCode: data.hsnCode || "",
      tax: typeof data.tax === 'number' ? data.tax : 0,
      shipping: data.shipping || "",
      variants: Array.isArray(data.variants) ? data.variants : [],
      createdBy: data.createdBy || "",
      // UI-required fields with defaults:
      price: typeof data.price === 'number' ? data.price : (Array.isArray(data.variants) && data.variants[0]?.price ? data.variants[0].price : 0),
      originalPrice: typeof data.originalPrice === 'number' ? data.originalPrice : null,
      rating: typeof data.rating === 'number' ? data.rating : 0,
      reviewCount: typeof data.reviewCount === 'number' ? data.reviewCount : 0,
      badge: data.badge || "",
    }
  })
}

// Fetch a single product by ID from Firestore
export async function getProductById(id: string): Promise<Product | null> {
  const docRef = doc(db, "products", id)
  const docSnap = await getDocs(collection(db, "products"))
  const found = docSnap.docs.find((d) => d.id === id)
  if (!found) return null;
  const data = found.data();
  return {
    id: found.id,
    name: data.name || "Unnamed Product",
    description: data.description || "No description available.",
    category: data.category || "Uncategorized",
    images: Array.isArray(data.images) && data.images.length > 0 ? data.images : ["/placeholder.svg"],
    gstNumber: data.gstNumber || "",
    hsnCode: data.hsnCode || "",
    tax: typeof data.tax === 'number' ? data.tax : 0,
    shipping: data.shipping || "",
    variants: Array.isArray(data.variants) ? data.variants : [],
    createdBy: data.createdBy || "",
    price: typeof data.price === 'number' ? data.price : (Array.isArray(data.variants) && data.variants[0]?.price ? data.variants[0].price : 0),
    originalPrice: typeof data.originalPrice === 'number' ? data.originalPrice : null,
    rating: typeof data.rating === 'number' ? data.rating : 0,
    reviewCount: typeof data.reviewCount === 'number' ? data.reviewCount : 0,
    badge: data.badge || "",
  }
}

// Update a product in Firestore
export async function updateProduct(id: string, data: Partial<Product>): Promise<void> {
  const docRef = doc(db, "products", id)
  await updateDoc(docRef, data)
}

// Delete a product from Firestore
export async function deleteProduct(id: string): Promise<void> {
  const docRef = doc(db, "products", id)
  await deleteDoc(docRef)
}

// Real Auth helpers
export async function signUpWithEmail(email: string, password: string, name: string) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  // Optionally update profile with name
  if (userCredential.user) {
    await updateProfile(userCredential.user, { displayName: name })
  }
  return userCredential.user
}

export async function signInWithEmail(email: string, password: string) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password)
  return userCredential.user
}

export async function signOutUser() {
  await firebaseSignOut(auth)
}

// --- Orders ---
export interface OrderItem {
  productId: string
  name: string
  qty: number
  price: number
}

export interface Order {
  id: string
  buyer: {
    name: string
    email: string
    phone: string
    address: string
  }
  items: OrderItem[]
  total: number
  status: string
  date: string
}

export async function getAllOrders(): Promise<Order[]> {
  const querySnapshot = await getDocs(collection(db, "orders"))
  return querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({ id: doc.id, ...doc.data() } as Order))
}

export async function getOrdersForUser(email: string): Promise<Order[]> {
  const q = query(collection(db, "orders"), where("buyer.email", "==", email))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({ id: doc.id, ...doc.data() } as Order))
}

export async function deleteOrder(id: string): Promise<void> {
  const docRef = doc(db, "orders", id)
  await deleteDoc(docRef)
}

export async function createOrder(order: Omit<Order, "id">): Promise<Order> {
  const docRef = await addDoc(collection(db, "orders"), order)
  return { ...order, id: docRef.id }
}

export async function updateOrder(id: string, data: Partial<Order>): Promise<void> {
  const docRef = doc(db, "orders", id)
  await updateDoc(docRef, data)
}

// --- Buyer Messages ---
export interface BuyerMessage {
  id: string
  name: string
  email: string
  message: string
  date: string
}
export async function getMessages(): Promise<BuyerMessage[]> {
  const querySnapshot = await getDocs(collection(db, "messages"))
  return querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({ id: doc.id, ...doc.data() } as BuyerMessage))
}

// --- Keywords ---
export async function getKeywords(): Promise<string[]> {
  const querySnapshot = await getDocs(collection(db, "keywords"))
  return querySnapshot.docs.map(doc => doc.data().keyword as string)
}
export async function addKeyword(keyword: string): Promise<void> {
  await addDoc(collection(db, "keywords"), { keyword })
}
export async function deleteKeyword(keyword: string): Promise<void> {
  const querySnapshot = await getDocs(collection(db, "keywords"))
  const toDelete = querySnapshot.docs.find(doc => doc.data().keyword === keyword)
  if (toDelete) await deleteDoc(doc(db, "keywords", toDelete.id))
}

export async function getUserProfile(uid: string) {
  const userDoc = await getDocs(query(collection(db, "users"), where("uid", "==", uid)))
  if (!userDoc.empty) {
    return { id: userDoc.docs[0].id, ...userDoc.docs[0].data() }
  }
  return null
}

export async function setUserProfile(uid: string, profile: any) {
  // Upsert user profile by uid
  const userDoc = await getDocs(query(collection(db, "users"), where("uid", "==", uid)))
  if (!userDoc.empty) {
    // Update existing
    const docRef = doc(db, "users", userDoc.docs[0].id)
    await updateDoc(docRef, profile)
  } else {
    // Create new
    await addDoc(collection(db, "users"), { uid, ...profile })
  }
} 