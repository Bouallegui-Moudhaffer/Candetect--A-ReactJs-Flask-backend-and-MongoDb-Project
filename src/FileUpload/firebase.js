import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAVMKtmiL9Mxj9tK9lj4HppzKO09iLC6pE",
    authDomain: "candetect-838ef.firebaseapp.com",
    databaseURL: "https://candetect-838ef-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "candetect-838ef",
    storageBucket: "candetect-838ef.appspot.com",
    messagingSenderId: "136984825672",
    appId: "1:136984825672:web:034077fe53e3b58aa46d7d",
    measurementId: "G-YWGBWPM5B2"
  };

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);