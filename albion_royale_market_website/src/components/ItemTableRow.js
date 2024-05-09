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

    const string = params.recipe;
    const buy = Array(Array(string["buy"])[0])
    const craft = Array(Array(string["craft"])[0])
    //This block produces some additional divs but they dont 
    //have any effect on the page.
    if(buy[0] == null){
        return(<>
            <div className="collapse" id={params.id+"1"}>
               
            </div>
        </>);
    }

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
            <div className='row'> 
                <div className='col b-r'>
                    <h3 className='show-text'>
                        Buy
                    </h3>

                    {
                        buy[0].map((item,index)=>(
                            <>
                                <div className={`row b-b ${index==0?"b-t":""}`}>
                                    <div className='col d-flex b-r show-table-col'>
                                        <ItemImage id={item[0]} ign={item[1]}/>
                                        <p>
                                            {item[1]}
                                        </p>
                                    </div>
                                    <div className='col b-r show-table-col'>
                                        <p>
                                            Amount
                                        </p>
                                        <p>
                                            {item[3]}
                                        </p>
                                    </div>
                                    <div className='col show-table-col'>
                                        <p>
                                            City Buy
                                        </p>
                                        <p>
                                            {item[2]}
                                        </p>
                                    </div>
                                </div>
                            </>
                            )
                        )
                    }   
                
                </div>

                <div className='col'>
                    <h3 className='show-text'>
                        Craft
                    </h3>
                    {
                        craft[0].map((item,index)=>(
                            <>
                                <div className={`row b-b ${index==0?"b-t":""}`}>
                                    <div className='col d-flex b-r show-table-col'>
                                        <ItemImage id={item[0]} ign={item[1]}/>
                                        <p>
                                            {item[1]}
                                        </p>
                                    </div>
                                    <div className='col b-r show-table-col'>
                                        <p>
                                            Amount
                                        </p>
                                        <p>
                                            {item[3]}
                                        </p>
                                    </div>
                                    <div className='col b-r show-table-col'>
                                        <p>
                                            City craft
                                        </p>
                                        <p>
                                            {item[2]}
                                        </p>
                                    </div>
                                </div>
                            </>
                            )
                        )
                    } 
                </div>
            </div>
           
        </div>
        </>
    );
    
    
}