import Menu from './components/Menu.js';
import Particles,{initParticlesEngine} from '@tsparticles/react';
import './App.css';
import './css/Particles.css';
import { useEffect, useMemo, useState } from "react";
import { loadSlim } from "@tsparticles/slim";
import './css/Design.css';
import Market from './components/Market.js';
import Footer from './components/Footer.js';
import Banners from './components/Banners.js';
import logo from './images/Logo3.png';
import Popup from './components/Popup.js';


function App() {
  
  const [init, setInit] = useState(false);

  useEffect(() => {
    document.title="AlbionRoyalMarket"
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = './images/icon/icon.ico'; 

    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = useMemo( 
    () => ({
      fpsLimit: 120,
      particles: {
        color: {
          value: ["#6c2305", "#e8611e", "#ba6d3f"]
        },
        move: {
          enable: true,
          random: true,
          speed: {
            max:15,
            min:2
          },
          warp: true,
          straight: false,
          direction:"top",
          angle: {
            value: {
              max:25,
              min:5
            },
            offset: 0
          },
          // trail: {
          //   enable: true,
          //   fill: {
          //     color:"#43352e",
          //   },
          //   length: 4
          // }
        },
        number: {
          value: 50,
          density: {
            enable: true,
          }
        },
        opacity: {
          value: 1,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 4 },
        }
      }
    }),
    [],
  );

  let [active,setActivity] = useState(0);
  let [data,setDataReceived] = useState([]);

  const handlePopup = (state)=>{
    setActivity(state);
  }
  const handleActive = (state)=>{
    setActivity(state);
  };

  const handleDataSentMarket = (item)=>{
    setDataReceived(item);
  }
  const handleDataSentPopup = (item)=>{
    setDataReceived(item);
  }
  
  return (
    <>
    <Popup inactive={handleActive} state={active} receiveData={data} sendData={handleDataSentPopup}/>

    <div className="App" id='custom-scroll'>

      <header className="App-header">

        <div className='background'>
          <div className='background-color'/>
          <div className='design'>
            <div className='stripe'/>
            <Banners/>
          </div>
          <div className='top'>
            <div className='bg-image-top'/>
            <mask>
              <div className='bg-image-bottom'/>
            </mask>
            <div className='bg-shadow'/>
            <div className='gradient'/>
          </div>
          <Particles id="tsParticles" options={options}/>
        </div>

        <div className='main'>
          <Menu/>
          <div className='main-wrapper'>
            <img src={logo} className="App-logo" alt="logo"/>
            <Market openPopup={handlePopup} sendData={handleDataSentMarket} receiveData={data}/>
          </div>
          <Footer/>
        </div> 
      </header>

    </div>
    </>
  );
}

export default App;
