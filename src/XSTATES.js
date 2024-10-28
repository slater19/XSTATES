import React, { useEffect, useState } from "react";
import axios from "axios";
import Styles from './XSTATES.css';


const XSTATES = () => {

    const [selCountry, setSelCountry] = useState('');
    const [cities, setCities] = useState([]);
    const [selCities, setSelCities] = useState('');
    const [state, setState] = useState([]);
    const [selState, setSelState] = useState('');
    const [ country, setCountry] = useState([]);
    useEffect(() => {
        axios.get("https://crio-location-selector.onrender.com/countries")
        .then(response =>{ setCountry(response.data)})
            
        
      .catch(err => {
        console.error("Error fetching country",err)
        
      });},[]);

      useEffect(() => {
        if(selCountry){
        axios.get(`https://crio-location-selector.onrender.com/country=${selCountry}/states`)
        .then(response =>{ 
            setState(response.data)
            setSelState("")
            setCities([])
            setSelCities("")
        })  
            
        
      .catch(err => {
        console.error("Error fetching State",err)
        
      })}},[selCountry]);

      useEffect(() => {
        if(selCountry && selState){
        axios.get(`https://crio-location-selector.onrender.com/country=${selCountry}/state=${selState}/cities`)
        .then(response =>{ setCities(response.data)
            setCities(response.data)
            setSelCities("")
 }).catch(err => {
        console.error("Error fetching State",err)
        
      })}},[selCountry,selState]);
      
    
    

  return (
    <div className={Styles["city-sel"]}>
        <h1>Select location</h1>
        <div className={Styles["dropdowns"]}>
        <select value={selCountry} onChange={(e)=>setSelCountry(e.target.value)} className={Styles["dropdown"]}>
        <option value="" disabled>Select Country</option>
        {country.map(country => 
        <option key={country} value={country} >{country}</option>
    )}
</select>        
<select value={selState} onChange={(e)=>setSelState(e.target.value)} disabled={!selCountry} className={Styles["dropdown"]}>
        <option value="" disabled>Select State</option>
        {state.map(state => 
        <option key={state} value={state} >{state}</option>
    )}
</select>
    
    <select value={selCities} onChange={(e)=>setSelCities(e.target.value)} disabled={!selState} className={Styles["dropdown"]}>
        <option value="" disabled>Select City</option>
        {cities.map(cities => 
        <option key={cities} value={cities} >{cities}</option>
    )}
</select></div>
    
{selCities && <h2 className={Styles["res"]}>You selected<span className={Styles["highlight"]}>{selCities}</span>,<span className={Styles["highlight"]}>{" "}{selState},{selCountry}</span></h2>}
    </div>
  )
}

export default XSTATES
