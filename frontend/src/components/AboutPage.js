
import '../css/AboutPage.css';
const APILink='https://west.albion-online-data.com/api/swagger/index.html';
export default function AboutPage(){
    
    return (
        <>
        <div className='about-page-class'>
            <h2>What is ARM?</h2>
            <p>
                Albion Royal Market (ARM for short) is a web application aimed at helping
                Albion Online players in making a quick buck. This application also serves
                as our project for the Web programming course.
            </p>
            <h2>Methodology</h2>
               <p> ARM achieves it's purpose through a three stage process.
                First, data regarding item prices is fetched from 
                <a href={APILink} target="_blank"> Albion Online Data API</a>.
                Secondly, this data is processed and filtered out by taking into account time needed to acquire it, crafting fees and bonuses, and most important of all,
                user input. The user shall be able to enter information about his/her investment,location and mount.
                Lastly, all of the newly obtained information is sent to the end user and presented in a intuitive and concise manner.
                </p>
            <h2>Used techonogies</h2>
            <p>The following techonogies were used:</p>
                <ul>
                    <li>
                        Backend:
                        <ul>
                            <li>NGINX,Node.js</li>
                            <li>Python</li>
                        </ul>
                    </li>
                    <li>Frontend:</li>
                        <ul>
                            <li>React.js</li>
                            <li>Bootstrap</li>
                        </ul>
                </ul>
        </div>
        </>
    );
}