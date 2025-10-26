import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './menu.css'

export default function Home() {
  const [selectedValue, setSelectedValue] = useState("")
  const [clothes, setClothes] = useState("clothes")
  const navigate = useNavigate();
  const handleClick = () =>{
    navigate('/')
  }
  
  function onSearchFormChange(event){
    setClothes(event.target.value)
  }

  return(
    
    <div className = 'Container'>
    <h1>This is the Menu Page</h1>


    <select
      value={selectedValue}
      onChange={e => setSelectedValue(e.target.value)}
      className="my-custom-select"
      >
      <option value="">Select your exchanging plan</option>
      <option value="exchangeProduct">Products </option>
      <option value="books">Books </option>
      <option value="Clothes">Clothes </option>
      <option value="chat">Chatting Channel</option>
      <option value="edu">Reels</option> 
    </select>
      <br/>
      
      <Back handleClick = {handleClick}/>
      <br/>
      <h2>You can search the <u><i>{clothes}</i></u> category here!</h2>
      <input onChange = {onSearchFormChange} type = 'text'></input>
      
      <Data searchFilter = {clothes}/>
      
 </div>
    
  );
  }

  function Back({ handleClick }){
    return(
    <button className = 'backButton' onClick={handleClick}>
        Back to First Page
      </button>
    )
  }

  function Data({searchFilter}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const filterClothes = data.filter(item => item.sub_category.toLowerCase().includes(searchFilter.toLowerCase()))

  useEffect(() => {
    const URL = "https://raw.githubusercontent.com/Hajime-No-Ippo/MOBILE_APPLICATION_DEVELOPMENT/main/archive/productDataSet.json"


    async function fetchData() {
      try {
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setData(json);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (error) {
    return <h1>Oops! An error has occurred: {error.toString()}</h1>;
  } else if (loading) {
    return <h1>Loading Data… please wait!</h1>;
  } else {
    return <ResultsComponent APIData={filterClothes}
     />;
  }
}

function ResultsComponent(props){
let dataLength = props.APIData.length
let n = Math.floor(Math.random() * dataLength);

let localAPIData = props.APIData.slice(0,n);
return(
  <> 
  <h1>Number of exchanging clothes returned: {localAPIData.length}</h1>
  <table border = "1">
  <thead>
    <tr>
      <th><h3>Product Name</h3></th>
      <th><h3>Saled?</h3></th>
      <th><h3>Exchanging Date</h3></th>
      <th><h3>Category</h3></th>
      <th><h3>Rating</h3></th>
      <th><h3>Seller</h3></th>
    </tr>
  </thead>
  <tbody>
    {localAPIData.map((k,index) => (
      <tr key = {index}>
        <td>
          <b>{k.title}</b>
        </td>
        <td>
          <b>{String(k.already_saled)}</b>
        </td>
        <td>
          <b>{k.crawled_at}</b>
        </td>
        <td>
          <b>{k.sub_category}</b>
        </td>
        <td>
          <b>{k.average_rating}</b>
        </td>
        <td>
          <b>{k.seller}</b>
        </td>
      </tr>

    ))}
  </tbody>
  </table>
  </>
)
}