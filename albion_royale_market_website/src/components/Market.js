import React, { useState, useEffect } from 'react';
import '../css/Market.css';
import InputMenu3 from './InputMenu3.js';
import ItemsTable from './ItemsTable.js';

export default function Market(
    {
        openPopup,
        sendData,
        receiveData
    }
){
    let [trigger,setTriger] = useState(0);
    const handleDataSent = (item)=>{
        sendData(item);
    }
    const handleCalculate = (item)=>{
        setTriger(item);
    }
    const handleSetCalculate = (item)=>{
        setTriger(item);
    }

    const handlePopup =()=>{
        openPopup(1);
    }
    return (
        <>
            <div className='market-pos p-2'>
                <div className='tables-wrapper p-2'>    
                    <div className='wood-texture'/>
                    <h2 className='marketplace'>Marketplace</h2>
                    <InputMenu3 calculate={handleCalculate}/>
                    <ItemsTable openPopup={handlePopup} sendData={handleDataSent} receiveData={receiveData} calculate={trigger} setCalculate={handleSetCalculate}/>
                </div>
            </div>
        </>
    );
}