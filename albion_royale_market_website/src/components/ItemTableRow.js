import ItemImage from './ItemImage.js';
import React, { useState, useEffect } from 'react';
import { Collapse } from 'bootstrap';
import '../css/ItemTableRow.css';
import ShowBtn from '../images/show.png';

export default function ItemTableRow(params){
    var [toggle, setToggle] = useState(false);
    
    useEffect(() => {
        var myCollapse = document.getElementById(params.id+"1")
        var bsCollapse = new Collapse(myCollapse, {toggle: false})
        toggle ? bsCollapse.show() : bsCollapse.hide()
    })
    return (
        <>
        <div className='row position-relative row-style'>
            <div className={`${params.style}`}>
            </div>
          
            <div className='col-lg col-style  d-flex justify-content-center'>
                <div className='ign-wrapper'>
                    <div className='img-width'>
                        <ItemImage id={params.id} ign={params.ign}/>
                    </div>
                    <div className='p-width'>
                        <p>{params.ign}</p>
                    </div>                           
                </div>
            </div>
            <div className='col-lg col-style  d-flex justify-content-center'>
                <div className='table-text'>
                    <p>Time</p>
                    <p>{params.time}</p>
                </div>
            </div>
            <div className='col-lg col-style d-flex justify-content-center'>
                <div className='table-text'>
                    <p>Roi</p>
                    <p>{params.roi}</p>
                </div>
            </div>
            <div className='col-lg col-style  d-flex justify-content-center'>
                <div className='table-text'>
                    <p>Profit</p>
                    <p>{params.profit}</p>
                </div>
            </div>
            <div className='col-lg col-style  d-flex justify-content-center'>
                <div className='table-text'>
                    <p>Carring Capacity</p>
                    <p>{params.carrying_capacity}</p>
                </div>
            </div>
            <div className='col-lg col-style  d-flex justify-content-center'>
                <div className='table-text show-btn-wrapper'>
                    <button className="albion-button" onClick={() => setToggle(toggle => !toggle)}/>
                </div>
            
            </div>
        </div>
        <div className="collapse text-center" id={params.id+"1"}>
            <p>
                Recipe
            </p>
        </div>
        </>
    );
}