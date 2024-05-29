import ItemImage from './ItemImage.js';
import React, { useState, useEffect } from 'react';
import { Collapse } from 'bootstrap';
import '../css/ItemTableRow.css';
import {modify_item} from '../scripts/new_final_json.js';

function format_int(val){
    if(val > 1000_000_000){
        return (val/1000_000_000).toFixed(1) + "b"
    }
    if(val > 1000_000){
        return (val/1000_000).toFixed(1) + "m"
    }
    if(val > 1000){
        return (val/1000).toFixed(1) + "k"
    }
    return val;
}

export default function ItemTableRow(
    {
        openPopup,
        sendData,
        receiveData,
        jsData,
        id,
        ign,
        city_buy,
        buy_price,
        city_sell,
        sell_price,
        city_craft,
        time,
        buy_time_update,
        sell_time_update,
        carrying_capacity,
        recipe,
        quality,
        profit,
        roi,
        index,
        style
    }
    ){
    
    let [data,setData] = useState([]);
    const handlePopup = (item)=>{
        openPopup(1);
        sendData(item);
    }
    var [toggle, setToggle] = useState(false);
    
    useEffect(() => {
        var myCollapse = document.getElementById(id+"1")
        var bsCollapse = new Collapse(myCollapse, {toggle: false})
        toggle ? bsCollapse.show() : bsCollapse.hide()
    })

    const string = recipe;
    let buy = Object.entries(recipe["buy"])[1];
    if(buy != undefined)buy = buy[1];
    let craft = Object.entries(recipe["craft"])[1];
    if(craft != undefined)craft = craft[1];


    //This block produces some additional divs but they dont 
    //have any effect on the page.
    if(buy == undefined){
        return(<>
            <div className="collapse" id={id+"1"}/>
        </>);
    }

    return (
        <>
        <div className='row position-relative row-style'>
            <div className={`${style}`}>
            </div>
            
            <div className='col-lg col-style  d-flex justify-content-center'>
                <div className='ign-wrapper'>
                    <div className='img-width'>
                        <ItemImage id={id} ign={ign}/>
                    </div>
                    <div className='p-width'>
                        <p>{ign}</p>
                    </div>                           
                </div>
            </div>
            <div className='col-lg col-style  d-flex justify-content-center'>
                <div className='table-text'>
                    <p>Time</p>
                    <p>{time}</p>
                </div>
            </div>
            <div className='col-lg col-style d-flex justify-content-center'>
                <div className='table-text'>
                    <p>Roi</p>
                    <p>{roi}</p>
                </div>
            </div>
            <div className='col-lg col-style  d-flex justify-content-center'>
                <div className='table-text'>
                    <p>Profit</p>
                    <p>{format_int(profit)}</p>
                </div>
            </div>
            <div className='col-lg col-style  d-flex justify-content-center'>
                <div className='table-text'>
                    <p>Carring Capacity</p>
                    <p>{format_int(carrying_capacity)}</p>
                </div>
            </div>
            <div className='col-lg col-style  d-flex justify-content-center'>
                <div className='table-text show-btn-wrapper'>
                    <button className="albion-button" onClick={() => setToggle(toggle => !toggle)}/>
                </div>
            
            </div>
            <div className='col-lg-1 col-style  d-flex justify-content-end'>
                <div className='edit-btn-wrapper'>
                    <button className="edit-button" onClick={() => handlePopup(jsData)}/>
                </div>
            </div>
        </div>
        <div className="collapse text-center" id={id+"1"}>
            <div className='row'> 
                <div className='col b-r'>
                    <h3 className='show-text'>
                        Buy
                    </h3>

                    <div className={`row b-b ${index==0?"b-t":""}`}>
                        <div className='col d-flex b-r show-table-col'>
                            <ItemImage id={buy["ign"]} ign={buy["ign"]}/>
                            <p>
                                {buy["ign"]}
                            </p>
                        </div>
                        <div className='col b-r show-table-col'>
                            <p>
                                Amount
                            </p>
                            <p>
                                {buy["amount"]}
                            </p>
                        </div>
                        <div className='col show-table-col'>
                            <p>
                                City Buy
                            </p>
                            <p>
                                {buy["city_buy"]}
                            </p>
                        </div>
                    </div>
                
                
                </div>

                <div className='col'>
                    <h3 className='show-text'>
                        Craft
                    </h3>
                 
                    <div className={`row b-b ${index==0?"b-t":""}`}>
                        <div className='col d-flex b-r show-table-col'>
                            <ItemImage id={craft["ign"]} ign={craft["ign"]}/>
                            <p>
                                {craft["ign"]}
                            </p>
                        </div>
                        <div className='col b-r show-table-col'>
                            <p>
                                Amount
                            </p>
                            <p>
                                {parseInt(craft["amount"])}
                            </p>
                        </div>
                        <div className='col b-r show-table-col'>
                            <p>
                                City craft
                            </p>
                            <p>
                                {craft["city_craft"]}
                            </p>
                        </div>
                    </div>
                
                </div>
            </div>
           
        </div>
        </>
    );
    
    
}