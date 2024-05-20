import '../css/InputMenu.css';
import CollapseMenu from './CollapseMenu.js';


export default function InputMenu(){
    return (
        <>
            <div className='container input-menu-style'>
                <div className='row'>
                    <div className='col-sm mt-0'>
                        <h2 className='h2-color'>Investment</h2>
                        <input type='text' className='form-control medieval-inp-form' placeholder='Investment' aria-label='Search' aria-describedby='basic-addon2'/>
                    </div>  
                        
                    <div className='col-sm m-auto'>
                        <h2 className='h2-color'>Usage Fee</h2>
                        <CollapseMenu
                            id="usage-fee"
                            text="Usage Fee"
                            >          
                            <div className='m-2'>
                                <div className='input-group'>
                                    <input type='text' className='form-control' placeholder='Investment' aria-label='Search' aria-describedby='basic-addon2'/>
                                </div>
                                <div className='input-group'>
                                    <input type='text' className='form-control' placeholder='Investment' aria-label='Search' aria-describedby='basic-addon2'/>
                                </div>
                                <div className='input-group'>
                                    <input type='text' className='form-control' placeholder='Investment' aria-label='Search' aria-describedby='basic-addon2'/>
                                </div>
                                <div className='input-group'>
                                    <input type='text' className='form-control' placeholder='Investment' aria-label='Search' aria-describedby='basic-addon2'/>
                                </div>
                            </div>
                        </CollapseMenu>    
                    </div>

                    <div className='col-sm mt-0'>
                        <h2 className='h2-color'>Mount</h2>
                        <select class="medieval-inp-form">
                            <option selected>Ignore carry weight</option>
                            <option value="1">Mammoth</option>
                            <option value="2">Transport Ox T6</option>
                            <option value="2">Transport Ox T8</option>
                        </select>  
                    </div> 

                    <div className='col-sm mt-0'>
                        <h2 className='h2-color'>Current City</h2>
                        <select class="medieval-inp-form">
                            <option selected>Caerleon</option>
                            <option value="1">Lymhurst</option>
                            <option value="2">Bridgewatch</option>
                            <option value="3">Martlock</option>
                            <option value="3">Thetford</option>
                            <option value="3">Forst Sterling</option>
                        </select> 
                    </div>

                    <div className='col-sm mt-0'>
                        <h2 className='h2-color'>Region</h2>
                        <button className='medieval-button'>West</button>
                    </div>
                </div>
            </div>
        </>

    );
}