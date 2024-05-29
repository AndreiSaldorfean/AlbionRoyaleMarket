import { useState } from 'react';
import '../css/Popup.css';
import ItemImage from './ItemImage.js';

export default function Popup(
    {   inactive,
        state,
        receiveData,
        sendData
    }) {
    const closePopup=()=>{
        inactive(0);
    }
    return (
        <>
            <div className={`container-fluid panel-parent ${state==0?"d-none":""}`}>
                <div className='panel'>
                    <div className='container'>
                        <button className='btn close-btn' onClick={closePopup}>X</button>
                        <ItemImage id={receiveData["id"]} ign={receiveData["ign"]}/>
                        {
                           
                        }
                    </div>
                </div>
            </div>
        </>
    )

}