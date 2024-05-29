import {sortJson} from  '../scripts/sorter.js';
import ItemTableRow from './ItemTableRow.js';
import '../css/ItemTable.css';
import { useState, useEffect } from "react";
import Pagination from './Pagination.js';
import {final_json,modify_item} from '../scripts/new_final_json.js';
import axios from 'axios';

export default function ItemsTable(
    {
        openPopup,
        sendData,
        receiveData,
        calculate,
        setCalculate
    }){
    
    const PATH_f = "http://localhost:5555/final.json";
    const PATH_s = "http://localhost:5555/site_input.json";
    const [jsonData, setJsonData] = useState({});
    const [items, setItems] = useState("");
    let   [jobject, setJobject] = useState([]);
    const [sortBy, setSortBy] = useState('roi');
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    let [currentRecords,setRecords] = useState({});
    let [nPages, setPages] = useState(0); 
    let [siteInput, setSiteInput] = useState(""); 
    const handleSortChange = (e) => {
        setSortBy(e.target.value);
        jobject = sortJson(jobject,e.target.value);
        localStorage.setItem("jObject",jobject);
    };
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                let isFJSONSet = localStorage.getItem("fJson");
                if(isFJSONSet != undefined){
                    let site_input = localStorage.getItem("site_input");
                    if(site_input === null){
                        const response1   = await fetch(PATH_s);
                        let resp          = await response1.text();
                        site_input        = JSON.parse(resp);
                        localStorage.setItem("site_input",JSON.stringify(site_input));
                    }else{  
                        site_input        = localStorage.getItem("site_input");
                        site_input        = JSON.parse(site_input);
                    }
                    let data          = JSON.parse(isFJSONSet);
                    const fJson       = Object.entries(data);
                    const tempItem    = JSON.stringify(fJson);
                    const tempObj     = JSON.parse(tempItem);
                    const tempRecords = tempObj.slice(indexOfFirstRecord, indexOfLastRecord);
                    const tempPages   = Math.ceil(tempObj.length / recordsPerPage);
                    setJsonData(tempObj);
                    setJsonData(tempRecords);
                    setJsonData(tempPages);
                    setItems(tempItem);
                    setJobject(tempObj);
                    setRecords(tempRecords);
                    setPages(tempPages);
                    setSiteInput(site_input);
                }
                else{
                    let site_input = localStorage.getItem("site_input");
                    if(site_input === null){
                        const response1   = await fetch(PATH_s);
                        let resp          = await response1.text();
                        site_input        = JSON.parse(resp);
                        localStorage.setItem("site_input",JSON.stringify(site_input));
                    }else{
                        site_input        = localStorage.getItem("site_input");
                        site_input        = JSON.parse(site_input);
                    }
                    const response    = await fetch(PATH_f);
                    let data          = await response.text();
                    data              = JSON.parse(data);
                    localStorage.setItem("fJson",JSON.stringify(data));
                    const fJson       = final_json(data,site_input);
                    const tempItem    = JSON.stringify(fJson);
                    const tempObj     = JSON.parse(tempItem);
                    const tempRecords = tempObj.slice(indexOfFirstRecord, indexOfLastRecord);
                    const tempPages   = Math.ceil(tempObj.length / recordsPerPage);
                    setJsonData(tempObj);
                    setJsonData(tempRecords);
                    setJsonData(tempPages);
                    setItems(tempItem);
                    setJobject(tempObj);
                    setRecords(tempRecords);
                    setPages(tempPages);
                    setSiteInput(site_input);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []); 

    if(jobject != []){
        currentRecords = jobject.slice(indexOfFirstRecord, indexOfLastRecord);
        nPages =  Math.ceil(jobject.length / recordsPerPage);
    }
    const handleDataSent = (item)=>{
        sendData(item);
    }

    const handleOpenPopup = ()=>{
        openPopup(1);
    }
    if(calculate == 1){
        //console.log(jobject);
        let temp = jobject;
        console.log(final_json(temp,siteInput));
        setCalculate(0);
    }
    return (
        <>
            <div className='container-fluid position-relative'>
                <div className='backgrond'>
                    <div className='color'>
                        <div className='papyrus-texture'/>
                    </div>
                </div>

                <div className='position-relative d-flex flex-column justify-content-center'>
                    <div className='row w-100'>
                        <div className='col d-flex'>
                            <h2 className='market-offers me-3'>Market Offers</h2>
                            <div className='d-flex'>
                                <h3 className='me-2 sort-by-style'>Sort By:</h3>    
                                <select class="transparent-inp-field sort-by-inp" id="sort-by" value={sortBy} onChange={handleSortChange}>
                                    <option value="roi">              Roi</option>
                                    <option value="profit">           Profit</option>
                                    <option value="time">             Time</option>
                                    <option value="carrying_capacity">Carring Capacity</option>
                                </select> 
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <div className='scroll' id='albion-scroll'>
                                {currentRecords.map((element,index) => (
                                    <ItemTableRow 
                                        openPopup = {handleOpenPopup}
                                        sendData={handleDataSent} 
                                        receiveData={receiveData}
                                        jsData={element[1]}
                                        id={element[0]} 
                                        ign={element[1]["ign"]}
                                        city_buy={element[1]["city_buy"]}
                                        buy_price={element[1]["buy_price"]}
                                        city_sell={element[1]["city_sell"]}
                                        sell_price={element[1]["sell_price"]}
                                        city_craft={element[1]["city_craft"]}
                                        time={element[1]["time"]}
                                        buy_time_update={element[1]["buy_time_update"]}
                                        sell_time_update={element[1]["sell_time_update"]}
                                        carrying_capacity={element[1]["carrying_capacity"]}
                                        recipe={element[1]["recipe"]}
                                        quality={element[1]["quality"]}
                                        profit={element[1]["profit"]}
                                        roi={element[1]["roi"]}
                                        index={element[1]["index"]}
                                        style={index % 2 === 0 ? "even-row-style" : "odd-row-style"}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='row w-100'>
                        <div className='col'>
                            <Pagination
                                nPages={nPages}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}