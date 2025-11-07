import './converter.css';
import { useState } from 'react'
import usd from '../assets/usd.png'
import eur from '../assets/eur.png'
import gbp from '../assets/gbp.png'

export default function Converter() {
const [bedrag, setBedrag] = useState('');
const [van, setVan] = useState('USD');
const [naar, setNaar] = useState('USD');
const [resultaat, setResultaat] = useState(null);
const [fout, setFout] = useState(null);

async function omrekenen() {
    if (!bedrag) {
        setFout('Voer een geldig bedrag in.');
        setResultaat(null);
        return;
    }
    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${van}`);
        console.log(response)
        const data = await response.json();
        const rate = data.rates[naar];
        const omrekenBedrag = (bedrag * rate).toFixed(2);
        setResultaat(`${bedrag} ${van} = ${omrekenBedrag} ${naar}`);
        setFout(null);
    } catch (error) {
        setFout(`Er is een fout opgetreden bij het ophalen van de wisselkoersen: ${error.message}`);
        setResultaat(null);
    }   
}   

const vlaggen = {
    'USD': usd,
    'EUR': eur,
    'GBP': gbp,
};


return(
   <div className="converter">
    <h2>Currency converter</h2>
     <div className="converter-box">
      <input type="number" placeholder="Amount" value={bedrag} onChange={(e) => setBedrag(e.target.value)} />
       <img src={vlaggen[van]} className="flag" />
        <select value={van} onChange={(e) => setVan(e.target.value)}  > 
            <option value="USD">USD</option>  
            <option value="EUR">EUR</option>  
            <option value="GBP">GBP</option>  
        </select> 

        <span> 🔄  </span>

        <img src={vlaggen[naar]} className="flag"/>
        <select value={naar} onChange={(e) => setNaar(e.target.value)} >
            <option value="USD">USD</option>  
            <option value="EUR">EUR</option>  
            <option value="GBP">GBP</option>  
        </select>  
        <button onClick={omrekenen}>Convert</button>
        {resultaat && <div className="result">{resultaat}</div>}
        {fout && <div>{fout}</div>}   
        </div>
        </div>
    ); 
}