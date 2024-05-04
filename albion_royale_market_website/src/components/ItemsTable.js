import Input from '../json_input/final.json';
import ItemTableRow from './ItemTableRow.js';
import '../css/ItemTable.css';

export default function ItemsTable(){
    let str = JSON.stringify(Input);
    let jObject = JSON.parse(str);
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
                        <div className='col'>
                            <h2 className='market-offers'>Market Offers</h2>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <div className='scroll'>
                                {jObject.map((element,index) => (
                                    
                                    <ItemTableRow 
                                        id={element.id} 
                                        ign={element.ign}
                                        city-buy={element.city_buy}
                                        buy-price={element.buy_price}
                                        city-sell={element.city_sell}
                                        sell-price={element.sell_price}
                                        city-craft={element.city_craft}
                                        time={element.time}
                                        buy-time-update={element.buy_time_update}
                                        sell-time-update={element.sell_time_update}
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
                            next-previous-logic
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}