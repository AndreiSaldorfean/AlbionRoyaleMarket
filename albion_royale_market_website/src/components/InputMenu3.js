import '../css/InputMenu3.css';
import InputMenuImage from '../images/input-menu.png';
import CollapseMenu from './CollapseMenu.js';


export default function InputMenu3(){
    return (
        <>
            <div className='container-fluid p-0 me-0 ms-0 input-menu-style'>
                <div className='row d-flex justify-content-center '>
                    <div className='col-lg d-flex justify-content-center'>
                        <input type='text' className='albion-inp-field' placeholder='Search' aria-label='Search' aria-describedby='basic-addon2'/>
                    </div>  
                        
                    <div className='col-lg d-flex justify-content-center'>
                        <input type='text' className='albion-inp-field' placeholder='Investment' aria-label='Search' aria-describedby='basic-addon2'/>
                    </div>

                    <div className='col-lg d-flex justify-content-center'>
                        <div className='flex-column mb-1'> 
                        <CollapseMenu
                            id="usage-fee"
                            text="Usage Fee"
                            className_btn = "albion-inp-field"
                            >          
                                <input type='text' className='form-control' placeholder='Investment' aria-label='Search' aria-describedby='basic-addon2'/>
                                <input type='text' className='form-control' placeholder='Investment' aria-label='Search' aria-describedby='basic-addon2'/>
                                <input type='text' className='form-control' placeholder='Investment' aria-label='Search' aria-describedby='basic-addon2'/>
                                <input type='text' className='form-control' placeholder='Investment' aria-label='Search' aria-describedby='basic-addon2'/>
                        </CollapseMenu>    
                        </div>
                    </div> 

                    <div className='col-lg d-flex justify-content-center'>
                        <select class="albion-inp-field">
                            <option selected>Ignore carry weight</option>
                            <option value="1">Mammoth</option>
                            <option value="2">Transport Ox T6</option>
                            <option value="2">Transport Ox T8</option>
                        </select> 
                    </div>

                    <div className='col-lg d-flex justify-content-center'>
                        <select class="albion-inp-field">
                            <option selected>Caerleon</option>
                            <option value="1">Lymhurst</option>
                            <option value="2">Bridgewatch</option>
                            <option value="3">Martlock</option>
                            <option value="3">Thetford</option>
                            <option value="3">Forst Sterling</option>
                        </select> 
                    </div>
                </div>
            </div>
        </>

    );
}