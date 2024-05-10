import ItemImage from './ItemImage.js';
import React, { useState, useEffect } from 'react';
import { Collapse } from 'bootstrap';
import '../css/Market.css';
import InputMenu3 from './InputMenu3.js';
import ItemsTable from './ItemsTable.js';

export default function Market(params){
    return (
        <>
            <div className='market-pos p-2'>
                <div className='tables-wrapper p-2'>
                    <div className='wood-texture'/>
                    <h2 className='marketplace'>Marketplace</h2>
                    <InputMenu3/>
                    <ItemsTable />
                </div>
            </div>
        </>
    );
}