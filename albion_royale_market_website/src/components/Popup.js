import { useState } from 'react';
import '../css/Popup.css';
import ItemImage from './ItemImage.js';
import { compute_item } from '../scripts/new_final_json.js';

export default function Popup(
    {   inactive,
        state,
        receiveData,
        sendData
    }) {
    const [inputValues, setInputValues] = useState({});

    const closePopup = () => {
        inactive(0);
    };

    const handleInputChange = (event, key) => {
        const { name, value } = event.target;
        setInputValues({
            ...inputValues,
            [key]: {
                ...inputValues[key],
                [name]: value
            }
        });
    };

    const handleItemChange = () => {
        for(const key in inputValues){
            const key_ = key.slice(0,key.length -4);
            if(receiveData["recipe"]["buy"][key_] != undefined){
                receiveData["recipe"]["buy"][key_]["price_buy"] = inputValues[key]["buy"]
                receiveData["recipe"]["buy"][key_]["city_buy"] = inputValues[key]["ctb"]|| "Lymhurst"
                receiveData["recipe"]["buy"][key_]["city_sell"] = inputValues[key]["cts"]|| "Lymhurst"
                receiveData["recipe"]["buy"][key_]["price_sell"] = inputValues[key]["sel"]
            }
            if(receiveData["recipe"]["craft"][key_] != undefined){
                receiveData["recipe"]["craft"][key_]["price_buy"] = inputValues[key]["buy"]
                receiveData["recipe"]["craft"][key_]["city_buy"] = inputValues[key]["ctb"] || "Lymhurst"
                receiveData["recipe"]["craft"][key_]["city_sell"] = inputValues[key]["cts"]|| "Lymhurst"
                receiveData["recipe"]["craft"][key_]["price_sell"] = inputValues[key]["sel"]
            }
        }
        compute_item(receiveData);
        let fjson = localStorage.getItem("fJson");
        fjson = JSON.parse(fjson);
        let tempJson = Object.entries(fjson);
        tempJson.map((element)=>{
            Object.entries(receiveData["recipe"]["buy"]).map((i)=>{
                if(element[1]["recipe"]["buy"][i[0]] != undefined){
                    element[1]["recipe"]["buy"][i[0]]["price_buy"] = receiveData["recipe"]["buy"][i[0]]["price_buy"];
                    element[1]["recipe"]["buy"][i[0]]["price_sell"] = receiveData["recipe"]["buy"][i[0]]["price_sell"];
                    element[1]["recipe"]["buy"][i[0]]["city_buy"] = receiveData["recipe"]["buy"][i[0]]["city_buy"];
                    element[1]["recipe"]["buy"][i[0]]["city_sell"] = receiveData["recipe"]["buy"][i[0]]["city_sell"];
                }
            });
            Object.entries(receiveData["recipe"]["craft"]).map((i)=>{
                if(element[1]["recipe"]["buy"][i[0]] != undefined){
                    element[1]["recipe"]["craft"][i[0]]["price_buy"] = receiveData["recipe"]["craft"][i[0]]["price_buy"];
                    element[1]["recipe"]["craft"][i[0]]["price_sell"] = receiveData["recipe"]["craft"][i[0]]["price_sell"];
                    element[1]["recipe"]["craft"][i[0]]["city_buy"] = receiveData["recipe"]["craft"][i[0]]["city_buy"];
                    element[1]["recipe"]["craft"][i[0]]["city_sell"] = receiveData["recipe"]["craft"][i[0]]["city_sell"];
                }
            });
        });
        fjson = Object.fromEntries(tempJson);
        let id = receiveData["recipe"]["craft"][receiveData["ign"]]["id"];
        fjson[id] = receiveData;
        localStorage.removeItem("fJson");
        localStorage.setItem("fJson",JSON.stringify(fjson));
        sendData("ceva");
        inactive(0);
    };

    let recipe_buy = [];
    if (receiveData["recipe"] !== undefined) {
        Object.entries(receiveData["recipe"]["buy"]).forEach(element => {
            const key = `${element[1]["ign"]}-buy`;
            recipe_buy.push(
                <tr className='tr-height' key={key}>
                    <td className='d-flex p-0'>
                        <ItemImage class={"mini-img"} id={element[1]["ign"]} ign={element[1]["ign"]} />
                        <h3 className='h3-head mt-auto mb-auto'>{element[1]["ign"]}</h3>
                    </td>
                    <td className='position-relative p-0'>
                        <input 
                            name="buy"
                            defaultValue={inputValues[key]?.buy || element[1]["price_buy"]} 
                            className='inp-field' 
                            placeholder='Price Buy'
                            onChange={(e) => handleInputChange(e, key)} />
                    </td>
                    <td className='position-relative p-0'>
                        <select 
                            name="ctb"
                            defaultValue={inputValues[key]?.ctb || element[1]["city_buy"]} 
                            class="select-field"
                            onChange={(e) => handleInputChange(e, key)}>
                            
                            <option selected value="Lymhurst" key="Lymhurst">Lymhurst</option>
                            <option value="Bridgewatch" key="Bridgewatch">Bridgewatch</option>
                            <option value="Martlock" key="Martlock">Martlock</option>
                            <option value="Thetford" key="Thetford">Thetford</option>
                            <option value="Forst Sterling" key="Forst Sterling">Forst Sterling</option>
                            <option value="Caerleon" key="Caerleon">Caerleon</option>
                        </select> 
                    </td>
                    <td className='position-relative p-0'>
                        <input 
                            name="sel"
                            defaultValue={inputValues[key]?.sel || element[1]["price_sell"]} 
                            className='inp-field' 
                            placeholder='Price sell'
                            onChange={(e) => handleInputChange(e, key)} />
                    </td>
                    <td className='position-relative p-0'>
                        <select 
                            name="cts"
                            defaultValue={inputValues[key]?.cts || element[1]["city_sell"]} 
                            class="select-field"
                            onChange={(e) => handleInputChange(e, key)}>
                            
                            <option selected value="Lymhurst" key="Lymhurst">Lymhurst</option>
                            <option value="Bridgewatch" key="Bridgewatch">Bridgewatch</option>
                            <option value="Martlock" key="Martlock">Martlock</option>
                            <option value="Thetford" key="Thetford">Thetford</option>
                            <option value="Forst Sterling" key="Forst Sterling">Forst Sterling</option>
                            <option value="Caerleon" key="Caerleon">Caerleon</option>
                        </select> 
                    </td>
                </tr>
            );
        });
    }

    let recipe_craft = [];
    if (receiveData["recipe"] !== undefined) {  
        Object.entries(receiveData["recipe"]["craft"]).forEach((element) => {
        
            const key = `${element[1]["ign"]}-cft`;
            recipe_craft.push(
                <tr className='tr-height' key={key}>
                    <td className='d-flex p-0'>
                        <ItemImage class={"mini-img"} id={element[1]["ign"]} ign={element[1]["ign"]} />
                        <h3 className='h3-head mt-auto mb-auto'>{element[1]["ign"]}</h3>
                    </td>
                    <td className='position-relative p-0'>
                        <input
                            name="buy"
                            defaultValue={inputValues[key]?.buy || element[1]["price_buy"]} 
                            className='inp-field' 
                            placeholder='Price Buy'
                            onChange={(e) => handleInputChange(e, key)}/>
                    </td>
                    <td className='position-relative p-0'>
                        <select 
                            name="ctb"
                            defaultValue={inputValues[key]?.ctb || element[1]["city_buy"]} 
                            class="select-field"
                            onChange={(e) => handleInputChange(e, key)}>
                            <option selected value="Lymhurst" key="Lymhurst">Lymhurst</option>
                            <option value="Bridgewatch" key="Bridgewatch">Bridgewatch</option>
                            <option value="Martlock" key="Martlock">Martlock</option>
                            <option value="Thetford" key="Thetford">Thetford</option>
                            <option value="Forst Sterling" key="Forst Sterling">Forst Sterling</option>
                            <option value="Caerleon" key="Caerleon">Caerleon</option>
                        </select> 
                        
                    </td>
                    <td className='position-relative p-0'>
                        <input
                            name="sel"
                            defaultValue={inputValues[key]?.sel || element[1]["price_sell"]} 
                            className='inp-field' 
                            placeholder='Price sell'
                            onChange={(e) => handleInputChange(e, key)}/>
                    </td>
                    <td className='position-relative p-0'>
                        <select 
                        
                            name="cts"
                            defaultValue={inputValues[key]?.cts || element[1]["city_sell"]} 
                            class="select-field"
                            onChange={(e) => handleInputChange(e, key)}>
                                
                            <option selected value="Lymhurst" key="Lymhurst">Lymhurst</option>
                            <option value="Bridgewatch" key="Bridgewatch">Bridgewatch</option>
                            <option value="Martlock" key="Martlock">Martlock</option>
                            <option value="Thetford" key="Thetford">Thetford</option>
                            <option value="Forst Sterling" key="Forst Sterling">Forst Sterling</option>
                            <option value="Caerleon" key="Caerleon">Caerleon</option>
                        </select> 
                        
                    </td>
                </tr>
            );
        
        });
    }

    return (
        <>
            <div className={`container-fluid panel-parent ${state === 0 ? "d-none" : ""}`}>
                <div className='panel'>
                    <div className='container'>
                        <button className='btn close-btn' onClick={closePopup}>X</button>
                        <div className='row'>
                            <div className='col'> 
                                <ItemImage class={"img-head"} id={receiveData["ign"]} ign={receiveData["ign"]} />
                                <h1 className='h1-head'>{receiveData["ign"]}</h1>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'> 
                                <div className='container scroll-popup' id='custom-scroll'>
                                    <table className='table table-striped table-dark'>
                                        <thead>
                                            <tr>
                                                <th>
                                                    <h2 className='h2-head'>Item</h2>
                                                </th>
                                                <th>
                                                    <h2 className='h2-head'>Price Buy</h2>
                                                </th>
                                                <th>
                                                    <h2 className='h2-head'>City buy</h2>
                                                </th>
                                                <th>
                                                    <h2 className='h2-head'>Price Sell</h2>
                                                </th>
                                                <th>
                                                    <h2 className='h2-head'>City Sell</h2>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {recipe_buy}
                                            {recipe_craft}    
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <button className='btn btn-primary modify-btn' onClick={handleItemChange}>Modify</button>
                    </div>
                </div>
            </div>
        </>
    );
}
