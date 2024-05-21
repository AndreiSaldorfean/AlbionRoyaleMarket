import '../css/Menu.css'
import logo from './../images/Logo3.png';
import { useEffect, useMemo, useState } from "react";
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Market from './Market.js';
import ContactPage from './ContactPage';
import AboutPage from './AboutPage';

export default function Menu() {
    let [active, setActivity] = useState(0);
    let [data, setDataReceived] = useState([]);
    const handlePopup = (state) => {
        setActivity(state);
    }
    const handleDataSentMarket = (item) => {
        setDataReceived(item);
    }
    return (
        <>
                <Router>
                    <div class="container-fluid w-100 p-0 menu-pos">

                        <Link to='/about' className='menu-hover a-menu-left'>About</Link>
                        <Link to='/' className='main-wrapper'></Link>
                        <Link to='/contact' className='menu-hover a-menu-right'>Contact</Link>

                    </div>
                    <Routes>
                        <Route path='/about' element={<AboutPage />} />
                        <Route path='/' element={<Market openPopup={handlePopup} sendData={handleDataSentMarket} receiveData={data} />} />
                        <Route path='/contact' element={<ContactPage />}/>
                    </Routes>
                </Router>
        </>
    );
}