import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAwo4gJjic-Z-Y8WEgiqNKCl3p6OFMC16I",
  authDomain: "chat-f162d.firebaseapp.com",
  projectId: "chat-f162d",
  storageBucket: "chat-f162d.appspot.com",
  messagingSenderId: "97764022182",
  appId: "1:97764022182:web:64be654ef744d21c58a167",
  measurementId: "G-05VZE48H1N"
};

const app = initializeApp(firebaseConfig);

// Analyticsni faqat brauzerda ishlatish uchun
let analytics;
if (typeof window !== "undefined" && (await isSupported())) {
  analytics = getAnalytics(app);
}

export const auth = getAuth(app);
export const db = getFirestore(app);
export { analytics };
