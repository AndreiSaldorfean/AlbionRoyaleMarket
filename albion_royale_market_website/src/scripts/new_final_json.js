import { Mount } from "./classMount";
import transport_mounts from '../json_input/transport_mounts.json';
import mapGraphJson from '../json_input/cities.json';

// function sumQuantity(itemQuantities) {
//     let neededQuantity = 0;
//     for (const index of itemQuantities["buy"]) {
//         if (index[3] > 0) {
//             neededQuantity += index[3];
//         } else {
//             return ERROR_CODE0;
//         }
//     }
//     for (const index of itemQuantities["craft"]) {
//         if (index[3] > 0) {
//             neededQuantity += index[3];
//         } else {
//             return ERROR_CODE0;
//         }
//     }
//     return neededQuantity;
// }

function buySum(buyingList) {
    let sum = 0;
    for (const itemIndex of buyingList) {
        if (parseInt(itemIndex[3]) > 0) {
            sum += parseInt(itemIndex[3]) * parseInt(itemIndex[4]);
        }
    }
    return sum;
}
const REFINING_BONUS=1.58
const CRAFTING_BONUS=1.33
const MARKET_PERCENTAGE=0.92 

function computeTime(playerMount,mapGraph, dict, startingCity) {
    let totalTime = 0;
    let currentCity = startingCity;
    for (const item of dict["recipe"]["buy"]) {
        if (currentCity === item[2]) {
            continue;
        }
        totalTime += playerMount.cityTravelTime(mapGraph, currentCity, item[2]);
        currentCity = item[2];
    }
    for (const item of dict["recipe"]["craft"]) {
        if (currentCity === item[2]) {
            continue;
        }
        totalTime += playerMount.cityTravelTime(mapGraph, currentCity, item[2]);
        currentCity = item[2];
    }
    return parseInt(totalTime) + 1;
}

function computeCarryingCapacity(playerMount, itemWeight) {
    return parseInt(playerMount.getCarryLoad() / itemWeight);
}

function computeProfit(item, investment) {
    const buyingList = item["recipe"]["buy"];
    const craftingList = item["recipe"]["craft"];
    const priceSell = item["price_sell"];
    const exists = craftingList.some(sublist => sublist.includes(item["id"]));
    if (exists) {
        let quantity = 0;
        let totalCost = buySum(buyingList); // for items which are bought
        for (let i = 0; i < craftingList.length; i++) {
            if (craftingList[i][0] === item["id"]) {
                quantity = craftingList[i][3];
                totalCost += craftingList[i][5];
            }
        }
        const gain = priceSell * quantity * MARKET_PERCENTAGE;
        return gain - totalCost;
    }
    return -1;
}

function computeRoi(investment, profit) {
    return parseInt((profit / investment) * 100);
}

function formatNumber(num) {
    let string = "";
    if (num > 1000000000) {
        string = (num / 1000000000).toFixed(2) + "b";
    } else if (num > 1000000) {
        string = (num / 1000000).toFixed(2) + "m";
    } else if (num > 1000) {
        string = (num / 1000).toFixed(2) + "k";
    }
    return string;
}


function final_json(p_items,site_input){
    var arr = Object.entries(p_items);
    var mount = transport_mounts[site_input["mount"]]

    var mountObj =new Mount(mount["Gallop delay"],
                            mount["Move bonus"],
                            mount["Gallop bonus"],
                            mount["Carry capacity"]);

    arr.map((item)=>{
        item[1]["time"]              = computeTime(mountObj,
                                    mapGraphJson,
                                    item[1],
                                    site_input["current_city"]);
        item[1]["carrying_capacity"] = site_input["carrying_capacity"];
        // item[1]["profit"]            = computeProfit(item[1],site_input["investment"]);
        item[1]["profit"]            = 0;
        // item["roi"]               = computeRoi(site_input["investment"],item["profit"]);
        item[1]["roi"]               = 0;
    })
    return arr;
}
function modify_item(final_json,item){
    console.log(`${final_json} \n ${item}`);
}
export {final_json, modify_item};