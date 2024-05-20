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
    const handleDataSent = (item)=>{
        sendData(item);
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
                    <InputMenu3/>
                    <ItemsTable openPopup={handlePopup} sendData={handleDataSent} receiveData={receiveData}/>
                </div>
            </div>
        </>
    );
}