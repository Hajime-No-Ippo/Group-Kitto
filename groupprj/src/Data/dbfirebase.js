import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

async function addItem() {
  await addDoc(
    collection(db, "items"),
    {
      id: 1,
      name: "Vintage Jacket",
      description:
        "Classic denim jacket with a timeless 90s look, perfect for layering or casual wear.",
      seller: "RetroVibes",
      category: "Clothes",
      price: 45.0,
      condition: "Good",
      exchangeFor: "Casual hoodie",
    },
    {
      id: 2,
      name: "Sneakers",
      description:
        "Lightweight sneakers made with breathable fabric and recycled rubber soles.",
      seller: "RunEarth",
      category: "Shoes",
      price: 35.5,
      condition: "Like New",
      exchangeFor: "Gym backpack",
    },
    {
      id: 3,
      name: "Backpack",
      description:
        "Durable canvas backpack with laptop compartment and water-resistant coating.",
      seller: "UrbanNomad",
      category: "Others",
      price: 40.0,
      condition: "New",
      exchangeFor: "Tote bag",
    }
  );
  alert("Item added.");
}
