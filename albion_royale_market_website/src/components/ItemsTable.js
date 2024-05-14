import {sortJson} from  '../scripts/sorter.js';
import ItemTableRow from './ItemTableRow.js';
import '../css/ItemTable.css';
import { useState, useEffect } from "react";
import Pagination from './Pagination.js';
import {isFileChange} from '../scripts/detectFileChange.js';

export default function ItemsTable(){
    const PATH = "http://192.168.0.144:3000/final.json";
    const [jsonData, setJsonData] = useState([]);
    const [items, setItems] = useState("");
    let [jobject, setJobject] = useState([]);
    const [sortBy, setSortBy] = useState('roi');
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const handleSortChange = (e) => {
        setSortBy(e.target.value);
        sortJson(jobject,e.target.value);
    };
    let [currentRecords,setRecords] = useState([]);
    let [nPages, setPages] = useState(0); 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(PATH);
                const data = await response.json();
                const tempItem = JSON.stringify(data);
                const tempObj = JSON.parse(tempItem);
                const tempRecords = tempObj.slice(indexOfFirstRecord, indexOfLastRecord);
                const tempPages = Math.ceil(tempObj.length / recordsPerPage);
                setJsonData(tempObj);
                setJsonData(tempRecords);
                setJsonData(tempPages);
                setItems(tempItem);
                setJobject(tempObj);
                setRecords(tempRecords);
                setPages(tempPages);
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
                                    <option value="roi">Roi</option>
                                    <option value="profit">Profit</option>
                                    <option value="time">Time</option>
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
                                        id={element.id} 
                                        ign={element.ign}
                                        city_buy={element.city_buy}
                                        buy_price={element.buy_price}
                                        city_sell={element.city_sell}
                                        sell_price={element.sell_price}
                                        city_craft={element.city_craft}
                                        time={element.time}
                                        buy_time_update={element.buy_time_update}
                                        sell_time_update={element.sell_time_update}
                                        carrying_capacity={element.carrying_capacity}
                                        recipe={element.recipe}
                                        quality={element.quality}
                                        profit={element.profit}
                                        roi={element.roi}
                                        index={element.index}
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