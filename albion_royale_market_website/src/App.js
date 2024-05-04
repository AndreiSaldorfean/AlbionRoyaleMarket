import bg from './images/woodtexture.jpg';
import Menu from './components/Menu.js';
import Particles,{initParticlesEngine} from '@tsparticles/react';
import './App.css';
import pOptions from './particles.json'
import './css/Particles.css';
import { useEffect, useMemo, useState } from "react";
import { loadSlim } from "@tsparticles/slim";
import Header from './components/Header.js';
import './css/Design.css';
import Market from './components/Market.js';
import Footer from './components/Footer.js';
import Banners from './components/Banners.js';
import logo from './images/Logo3.png';

function App() {
  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

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

  return (
    <>
    <div className="App">
      
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
          <Header/>
          <Menu/>
          <div className='main-wrapper'>
            <img src={logo} className="App-logo" alt="logo"/>
            <Market/>
          </div>
          <Footer/>
        </div> 
      </header>

    </div>
    </>
  );
}

export default App;
