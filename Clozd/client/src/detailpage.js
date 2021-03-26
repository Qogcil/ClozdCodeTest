import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Button from "@material-ui/core/Button";
import { Link } from 'react-router-dom'


export default function Detailpage() {

const [toDoID, updateID] = React.useState('loading');
const [realEmail, setRealEmail] = React.useState('loading');
const [realPhoto, setRealPhoto] = React.useState('loading');
const [realFullName, setRealFullName] = React.useState('loading');
const [realAddress, setRealFullAddress] = React.useState('loading');
const [realPhone, setRealPhone] = React.useState('loading');
const [realCity, setRealCity] = React.useState('loading');
const [realCountry, setRealCountry] = React.useState('loading');
const [realDOB, setRealDOB] = React.useState('loading');

function Store({ match }) {
  let { id } = match.params;
  updateID(id)
  return (
    <></>
  );
}
React.useEffect(() => {

  const getToDoItemsTwo = async (toDoID) => {
    //console.log(toDoID)
    if (toDoID==='loading'){} else{

    const response = await fetch(
      `${process.env.REACT_APP_TO_DO_ITEMS_API}/details`,
      {method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"id":toDoID})}
    );
    const items = await response.json();
    //console.log(items)
    if (items && Array.isArray(items) && items.length) {
      // @ts-ignore
      setRealEmail(items[0].email)
      setRealPhoto(items[0].photo)
      setRealFullName(items[0].full_name)
      setRealFullAddress(items[0].full_address)
      setRealPhone(items[0].phone)
      setRealCity(items[0].city)
      setRealCountry(items[0].country)
      setRealDOB(items[0].date_of_birth)
    }}
  };
  getToDoItemsTwo(toDoID)
}, [toDoID]);

  return (
    <div>
        
          <Route path={["/details/:id"]} component={Store} />
          <div className="topRow" />
          <div className="container">
          <img src={realPhoto} />
          <div><br /></div>
          <div className='fullName'>{realFullName}</div>
          <div>{realEmail}</div>
          <div>{realPhone}</div>
          <div><br /></div>
          <div>Date of Birth: {realDOB}</div>
Address: {realAddress}, {realCity}, {realCountry}
          </div>
          <div><br /><br /></div>
          
            <Link to="/">
            <Button variant="contained" color="primary">
              back
            </Button>
            </Link>
          
        
        
        
    </div>
  );
}