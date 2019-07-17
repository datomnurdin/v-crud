import { initializeApp } from 'firebase';
const app = initializeApp({
  apiKey: "",
  authDomain: "crud-b82de.firebaseapp.com",
  databaseURL: "https://crud-b82de.firebaseio.com",
  projectId: "crud-b82de",
  storageBucket: "crud-b82de.appspot.com",
  messagingSenderId: "313351689734"
});

export const db = app.firestore();
export const todosCollection = db.collection('todos');