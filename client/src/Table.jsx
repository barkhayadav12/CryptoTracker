import React, { useState,useEffect } from 'react'
import axios from 'axios'
import './index.css'
const Table = () => {
    const [search,setSearch]=useState("");
    const [crypto,setCrypto]=useState([]);
    const url='https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false';
    let num=0;
    useEffect(()=>{
        axios.get(url)
        .then(res=>setCrypto(res.data))
        .catch(err=>console.log(err));
    },[])
  return (
    <div class='container-fluid'>
    <div className='searchBox'>
    <input className='searchBar' type='text' placeholder='Search coins....' onChange={(e)=>setSearch(e.target.value)}/>
    </div>
    <table class="table table-sm table-dark">
    <thead>
      <tr>
        <th scope="col">Sl no.</th>
        <th scope="col">Name</th>
        <th scope="col">Symbol</th>
        <th scope="col">Market Cap</th>
        <th scope="col">Price</th>
        <th scope="col">Available Supply</th>
        <th scope="col">Volume(24hrs)</th>
      </tr>
    </thead>
    <tbody>
    {
        crypto.filter((val)=>{
            return val.name.toLowerCase().includes(search.toLocaleLowerCase());
        })
        .map((val,id)=>{
            return(
                <tr id={id}>
                    <th scope='row'>{num++}</th>
                    <td>
                        <a href={val.websiteUrl}>
                            <img src={val.image} width='30px'/>
                        </a>
                        <p>{val.name}</p>
                    </td>
                    <td>{val.symbol}</td>
                    <td>{val.market_cap}</td>
                    <td>{val.price_change_24h.toFixed(2)}</td>
                    <td>{val.total_supply}</td>
                    <td>{val.total_volume.toFixed(0)}</td>

                </tr>
            )
        })
    }
    </tbody>
  </table>
  </div>
  )
}

export default Table