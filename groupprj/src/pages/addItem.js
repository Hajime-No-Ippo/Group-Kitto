import "./styles.css";
import { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function AddItem() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(
    "book",
    "electronic",
    "clothes",
    "shoes",
    "others"
  );
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("new", "like new", "good", "fair");
  const [exchangeFor, setExchangeFor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !price || !exchangeFor) {
      alert("请填写所有必填信息！");
      return;
    }

    await addDoc(collection(db, "items"), {
      name,
      description,
      category,
      price,
      condition,
      exchangeFor,
      createdAt: serverTimestamp(),
    });

    alert("Item publish success");
    setName("");
    setDescription("");
    setCategory("clothes");
    setPrice("");
    setCondition("new");
    setExchangeFor("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        width: "400px",
        gap: "10px",
      }}
    >
      <h2>Publish Your Item</h2>
      <input
        type="text"
        placeholder="item name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <textarea
        placeholder="item description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <label>
        分类：
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="book">book</option>
          <option value="electronic">lectronic</option>
          <option value="clothes">clothes</option>
          <option value="shoes">shoes</option>
          <option value="others">others</option>
        </select>
      </label>

      <input
        type="number"
        placeholder="price(euro)"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />

      <label>
        新旧程度：
        <select
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        >
          <option value="new">new</option>
          <option value="like new">like new</option>
          <option value="good">good</option>
          <option value="fair">fair</option>
        </select>
      </label>

      <input
        type="text"
        placeholder="wanted item"
        value={exchangeFor}
        onChange={(e) => setExchangeFor(e.target.value)}
        required
      />

      <button type="submit">Publish Item</button>
    </form>
  );
}
