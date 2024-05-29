import '../css/InputMenu3.css';
import { useEffect,useState } from 'react';
import CollapseMenu from './CollapseMenu.js';

export default function InputMenu3({calculate}) {
    let [inputValues, setInputValues] = useState({
        usage_fee: {
            tanner: "",
            weaver: "",
            smelter: "",
            lumbermill: "",
            ToolMaker: "",
            warrior: "",
            hunter: "",
            mage: ""
        },
        carrying_capacity: "",
        investment: "",
        mount: "",
        current_city: ""
    });

    console.log("Component rendered with inputValues:", inputValues);

    useEffect(() => {
        const fetchData = async () => {
            console.log("Fetching site_input from localStorage or server");
            let site_input = JSON.parse(localStorage.getItem("site_input")) || {};
            if (Object.keys(site_input).length === 0) {
                console.log("site_input is empty, fetching from server");
                try {
                    const response1 = await fetch("http://localhost:420/site_input.json");
                    if (!response1.ok) throw new Error(`Network response was not ok: ${response1.statusText}`);
                    const resp = await response1.text();
                    site_input = JSON.parse(resp);
                    setInputValues(site_input);
                    console.log("Fetched data from server and updated state:", site_input);
                } catch (error) {
                    console.error("Fetch error:", error);
                }
            } else {
                console.log("site_input is not empty, using localStorage data");
                setInputValues(site_input);
            }
        };

        fetchData();
    }, []);
    

    const handleInputChange = (event, key) => {
        const { name, value } = event.target;
        setInputValues(prevState => ({
            ...prevState,
            [key]: {
                ...prevState[key],
                [name]: value
            }
        }));
    };
    const handleInput = () => {
        var site_input = JSON.parse(localStorage.getItem("site_input")) || {};
        for (const key in site_input["usage_fee"]) {
            site_input["usage_fee"][key] = inputValues[key]?.[key] ?? site_input["usage_fee"][key];
        }
        site_input["investment"] = inputValues["investment"]?.investment ?? site_input["investment"];
        site_input["mount"] = inputValues["mount"]?.mount ?? site_input["mount"];
        site_input["carrying_capacity"] = inputValues["carrying_capacity"]?.carrying_capacity ?? site_input["carrying_capacity"];
        site_input["current_city"] = inputValues["current_city"]?.current_city ?? site_input["current_city"];
        
        localStorage.setItem("site_input", JSON.stringify(site_input));
        calculate(1);
    };

    return (
        <>
            <div className='container-fluid p-0 me-0 ms-0 input-menu-style'>
                <div className='row d-flex justify-content-center '>
                    <div className='col-lg d-flex justify-content-center' key={"search"}>
                        <input 
                            name='carrying_capacity'
                            defaultValue={inputValues["carrying_capacity"]}
                            onChange={(e) => handleInputChange(e, "carrying_capacity")}
                            type='text' 
                            className='albion-inp-field' 
                            placeholder='Carrying Capacity'/>
                    </div>  
                        
                    <div className='col-lg d-flex justify-content-center' key={"investment"}>
                        <input 
                            name='investment'
                            defaultValue={inputValues["investment"]}
                            onChange={(e) => handleInputChange(e, "investment")}
                            type='text' 
                            className='albion-inp-field' 
                            placeholder='Investment' 
                            aria-label='Search' 
                            aria-describedby='basic-addon2'/>
                    </div>

                    <div className='col-lg d-flex justify-content-center'>
                        <div className='flex-column d-flex' key={"usage-fee"}> 
                        <CollapseMenu
                            id="usage-fee"
                            text="Usage Fee"
                            className_btn="albion-inp-field p-0">          
                                <input 
                                    name='tanner'
                                    defaultValue={inputValues["usage_fee"]["tanner"]}
                                    onChange={(e) => handleInputChange(e, "usage_fee")}
                                    type='text' 
                                    className='form-control' 
                                    placeholder='Tanner' 
                                    aria-label='Search' 
                                    aria-describedby='basic-addon2'/>
                                <input 
                                    name='weaver'
                                    defaultValue={inputValues["usage_fee"]["weaver"]}
                                    onChange={(e) => handleInputChange(e, "usage_fee")}
                                    type='text' 
                                    className='form-control' 
                                    placeholder='Weaver' 
                                    aria-label='Search' 
                                    aria-describedby='basic-addon2'/>
                                <input 
                                    name='smelter'
                                    defaultValue={inputValues["usage_fee"]["smelter"]}
                                    onChange={(e) => handleInputChange(e, "usage_fee")}
                                    type='text' 
                                    className='form-control' 
                                    placeholder='Smelter' 
                                    aria-label='Search' 
                                    aria-describedby='basic-addon2'/>
                                <input 
                                    name='lumbermill'
                                    defaultValue={inputValues["usage_fee"]["lumbermill"]}
                                    onChange={(e) => handleInputChange(e, "usage_fee")}
                                    type='text' 
                                    className='form-control' 
                                    placeholder='Lumbermill' 
                                    aria-label='Search' 
                                    aria-describedby='basic-addon2'/>
                                <input 
                                    name='ToolMaker'
                                    defaultValue={inputValues["usage_fee"]["ToolMaker"]}
                                    onChange={(e) => handleInputChange(e, "usage_fee")}
                                    type='text' 
                                    className='form-control' 
                                    placeholder='ToolMaker' 
                                    aria-label='Search' 
                                    aria-describedby='basic-addon2'/>
                                <input 
                                    name='warrior'
                                    defaultValue={inputValues["usage_fee"]["warrior"]}
                                    onChange={(e) => handleInputChange(e, "usage_fee")}
                                    type='text' 
                                    className='form-control' 
                                    placeholder='Warrior' 
                                    aria-label='Search' 
                                    aria-describedby='basic-addon2'/>
                                <input 
                                    name='hunter'
                                    defaultValue={inputValues["usage_fee"]["hunter"]}
                                    onChange={(e) => handleInputChange(e, "usage_fee")}
                                    type='text' 
                                    className='form-control' 
                                    placeholder='Hunter' 
                                    aria-label='Search' 
                                    aria-describedby='basic-addon2'/>
                                <input 
                                    name='mage'
                                    defaultValue={inputValues["usage_fee"]["mage"]}
                                    onChange={(e) => handleInputChange(e, "usage_fee")}
                                    type='text' 
                                    className='form-control' 
                                    placeholder='Mage' 
                                    aria-label='Search' 
                                    aria-describedby='basic-addon2'/>
                        </CollapseMenu>    
                        </div>
                    </div> 

                    <div className='col-lg d-flex justify-content-center'>
                        <select 
                            name='mount'
                            defaultValue={inputValues["mount"]}
                            onChange={(e) => handleInputChange(e, "mount")}
                            className='albion-inp-field' 
                            key={"mount"}>
                            <option value="Ignore carry weight">Ignore carry weight</option>
                            <option value="Expert's Transport Ox">Expert's Transport Ox</option>
                            <option value="Master's Transport Ox">Master's Transport Ox</option>
                            <option value="Grandmaster's Transport Ox">Grandmaster's Transport Ox</option>
                            <option value="Elder's Transport Ox">Elder's Transport Ox</option>
                            <option value="Saddled Direboar">Saddled Direboar</option>
                        </select> 
                    </div>

                    <div className='col-lg d-flex justify-content-center'>
                        <select 
                            name='current_city'
                            defaultValue={inputValues["current_city"]}
                            onChange={(e) => handleInputChange(e, "current_city")}
                            className='albion-inp-field'>  
                            <option value="Caerleon">Caerleon</option>
                            <option value="Lymhurst">Lymhurst</option>
                            <option value="Bridgewatch">Bridgewatch</option>
                            <option value="Martlock">Martlock</option>
                            <option value="Thetford">Thetford</option>
                            <option value="Forst Sterling">Forst Sterling</option>
                        </select> 
                    </div> 
                    <div className='col-lg d-flex justify-content-center'>
                        <button className='albion-calculate-btn' onClick={handleInput}/>
                    </div>
                </div>
            </div>
        </>
    );
}
