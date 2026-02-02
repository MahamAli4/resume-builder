
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBAHDYkgN6GOB6WK05umMrvcZINfv7sxME",
    authDomain: "resume-builder-app-7fc86.firebaseapp.com",
    projectId: "resume-builder-app-7fc86",
    storageBucket: "resume-builder-app-7fc86.firebasestorage.app",
    messagingSenderId: "749664459314",
    appId: "1:749664459314:web:52921ce641b1711a01fa2b",
    measurementId: "G-MJVHW0JFSJ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Use initializeFirestore with long polling to fix hangs in restricted environments
export const db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
});
export const storage = getStorage(app);

// Analytics is optional and might throw in some environments if not handled carefully,
// but for now we initialize it as requested.
let analytics;
if (typeof window !== "undefined") {
    analytics = getAnalytics(app);
}

export { analytics };
