import '../css/InputMenu2.css';
import InputMenuImage from '../images/input-menu.png';
import CollapseMenu from './CollapseMenu.js';


export default function InputMenu2(){
    return (
        <>
            <div className='container input-menu-style'>
                <div className='row row-pos'>
                    <div className='col-sm mt-0 ps-0 col-style'>
                        <input type='text' className='transparent-inp-field' placeholder='Search' aria-label='Search' aria-describedby='basic-addon2'/>
                    </div>  
                        
                    <div className='col-sm mt-0 ps-0 col-style'>
                        <input type='text' className='transparent-inp-field' placeholder='Investment' aria-label='Search' aria-describedby='basic-addon2'/>
                    </div>

                    <div className='col-sm mt-0 ps-0 col-style'>
                        <CollapseMenu
                            id="usage-fee"
                            text="Usage Fee"
                            className="btn-wrapper"
                            className_show="inp-wrapper"
                            >          
                                <input type='text' className='form-control' placeholder='Investment' aria-label='Search' aria-describedby='basic-addon2'/>
                                <input type='text' className='form-control' placeholder='Investment' aria-label='Search' aria-describedby='basic-addon2'/>
                                <input type='text' className='form-control' placeholder='Investment' aria-label='Search' aria-describedby='basic-addon2'/>
                                <input type='text' className='form-control' placeholder='Investment' aria-label='Search' aria-describedby='basic-addon2'/>
                        </CollapseMenu>    
                    </div> 

                    <div className='col-sm mt-0 ps-0 col-style'>
                        <select class="transparent-inp-field">
                            <option selected>Ignore carry weight</option>
                            <option value="1">Mammoth</option>
                            <option value="2">Transport Ox T6</option>
                            <option value="2">Transport Ox T8</option>
                        </select> 
                    </div>

                    <div className='col-sm mt-0 ps-0 col-style'>
                        <select class="transparent-inp-field">
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