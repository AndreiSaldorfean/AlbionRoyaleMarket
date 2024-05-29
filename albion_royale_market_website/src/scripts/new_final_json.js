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

const REFINING_BONUS=1.58
const CRAFTING_BONUS=1.33
const MARKET_PERCENTAGE=0.92 
const TAX =0.08
const TAX_HI =0.12

function computeTime(playerMount,mapGraph, dict, startingCity) {
    let totalTime = 0;
    let currentCity = startingCity;
    for (const item of Object.entries(dict["recipe"]["buy"])) {
        if (currentCity === item[1]["city_buy"]) {
            continue;
        }
        totalTime += playerMount.cityTravelTime(mapGraph, currentCity, item[1]["city_buy"]);
        currentCity = item[1]["city_buy"];
    }
    for (const item of Object.entries(dict["recipe"]["craft"])) {
        if (currentCity === item[1]["city_buy"]) {
            continue;
        }
        totalTime += playerMount.cityTravelTime(mapGraph, currentCity, item[1]["city_buy"]);
        currentCity = item[1]["city_buy"];
    }
    return parseInt(totalTime) + 1;
}

function computeCarryingCapacity(playerMount, itemWeight) {
    return parseInt(playerMount.getCarryLoad() / itemWeight);
}

function getAmount(recipe,investment){
    let sum = 0;
    for(const item in recipe){
        const tempAmount =parseInt(recipe[item][1]["amount"],10);
        sum +=tempAmount*parseInt(recipe[item][1]["price_buy"],10);
    }
    return investment/sum;
}

function computeRound(buyList,craftList,market_price){
    const amount = buyList["amount"];
    const craft_price = amount*buyList["price_buy"];
    const mp = market_price["price_buy"]*market_price["amount"];
    if(craft_price > mp){
        return 1;
    }else{
        market_price["amount"] = amount;
        market_price["price_buy"] = craftList["amount"]*parseInt(buyList["price_buy"]);//price per craft,
                                                                                        //how much it costs to craft one item,
                                                                                        //not profit per crafted item!
    }
}

function computeProfit(item, investment) {
    let buyingList = Object.entries(item["recipe"]["buy"]);
    let craftingList = Object.entries(item["recipe"]["craft"]);
    const priceSell = parseInt(item["recipe"]["craft"][item["ign"]]["price_sell"] * MARKET_PERCENTAGE);
    if(craftingList == undefined)return -1;
    const nca = parseInt(getAmount(buyingList,investment));
    let gca = nca*REFINING_BONUS;
    let quantity = 0;
    let initCost = 0;

    // if(craftingList[0][0] == buyingList[0][0]){
    //     buyingList.pop(0);
    // }

    let subNca = nca;
    for (let i = 0; i<=craftingList.length-1;i++) {
        craftingList[i][1]["amount"] = subNca;
        subNca = parseFloat(subNca/REFINING_BONUS);
    }
    subNca = nca;
        for (let i = 0; i<=buyingList.length-1;i++) {
        buyingList[i][1]["amount"] = parseInt(buyingList[i][1]["amount"])*subNca;
        subNca = parseFloat(subNca/REFINING_BONUS);
    }

    //Init
    {
        const index = buyingList.length-1;
        const amount = parseInt(buyingList[index][1]["amount"]);
        const craft_price = (amount*nca/REFINING_BONUS)*buyingList[index][1]["price_buy"];
        const market_price = (amount*nca*craftingList[index][1]["price_buy"]);
        if(craft_price > market_price){
            buyingList.pop(index);
            craftingList[index][1]["amount"] = amount*nca;
        }else{
            craftingList[index][1]["amount"] = parseInt(amount*nca/REFINING_BONUS);
            craftingList[index][1]["price_buy"] = craftingList[index][1]["amount"]*
                                                  parseInt(buyingList[index][1]["price_buy"])/nca;//price per craft,
                                                                                                  //how much it costs to craft one item,
                                                                                                  //not profit per crafted item!
        }
    }
    for (let i = buyingList.length - 2; i>0;i--) {
        // console.log(craftingList);
        // console.log(buyingList);
        // console.log(j);
        // console.log(craftingList[j][1]);
        // console.log(buyingList);
        // console.log(buyingList[j]);
        // console.log(buyingList[j][1]);

        // let amount_m1 = craftingList[i+1][1]["amount"];  
        // let ppc_m1    = craftingList[i+1][1]["price_buy"];
        // //console.log(ppc_m1);
        // initCost += ppc_m1*amount_m1;
        // initCost += buyingList[j][1]["price_buy"]*buyingList[j][1]["amount"]*nca;
        if(computeRound(buyingList[i][1],craftingList[i][1],craftingList[i+1][1]))buyingList.pop(i);
    }

    //console.log(initCost);
    const gain = priceSell *gca;
    //console.log(priceSell);
    //console.log(gain);
    let profit = gain-initCost;
    //console.log(profit);
    return gain - initCost;
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
    var mount = transport_mounts[site_input["mount"]]

    var mountObj =new Mount(mount["Gallop delay"],
                            mount["Move bonus"],
                            mount["Gallop bonus"],
                            mount["Carry capacity"]);
    p_items.map((item)=>{
        item[1]["time"]             = computeTime(mountObj,
                                        mapGraphJson,
                                        item[1],
                                        site_input["current_city"]);
        item[1]["carrying_capacity"] = site_input["carrying_capacity"];
        item[1]["profit"]           = computeProfit(item[1],site_input["investment"]);
        console.log(item[1]["profit"]);
        // item["roi"]               = computeRoi(site_input["investment"],item["profit"]);
        item[1]["roi"]               = 0;
    })
    return p_items;
}

function compute_item(item){
    let site_input = JSON.parse(localStorage.getItem("site_input"));
    var mount = transport_mounts[site_input["mount"]]
    var mountObj =new Mount(mount["Gallop delay"],
                            mount["Move bonus"],
                            mount["Gallop bonus"],
                            mount["Carry capacity"]);
    
    
    item["time"]              = computeTime(mountObj,
                                mapGraphJson,
                                item,
                                site_input["current_city"]);

    item["carrying_capacity"] = site_input["carrying_capacity"];
    item["profit"]            = computeProfit(item,site_input["investment"]);
    item["roi"]               = computeRoi(site_input["investment"],item["profit"]);
    return item;    
}

export {final_json, compute_item};