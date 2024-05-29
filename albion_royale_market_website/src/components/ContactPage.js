import MihaiPicture from '../images/mihai.png';
import AndreiPicture from '../images/andrei.jpg';
import '../css/ContactPage.css'
const andreiLinkedInLink = 'https://www.linkedin.com/in/andrei-saldorfean-834b37263';
const andreiGitHubLink = 'https://github.com/AndreiSaldorfean';
const mihaiLinkedInLink = 'https://www.linkedin.com/in/mihai-neag-b36b12268';
const mihaiGitHubLink = 'https://github.com/MN3141';

export default function ContactPage() {
    return (
        <div className='contacts-wrapper'>
            <div className='contact-container'>
                <div className='contact-content'>
                    <div className='contact-text'>
                        <h2>Andrei Saldorfean</h2>
                        <p>Passionate about hardware and software, I have began thinkering and starting
                            different projects during highschool. Now,in my second year as a 
                            Computer Engineering student I wanted to try something new.
                            A gamer at heart, I wanted to give Albion Online players a tool to make their lives easier.
                        </p>
                        <ul>
                            <li>
                                <a href={andreiLinkedInLink} target='_blank'>
                                LinkedIn
                                </a></li>
                            <li>
                                <a href={andreiGitHubLink} target="_blank">GitHub</a>
                            </li>
                        </ul>
                    </div>
                    <div className='contact-image'>
                        <img src={AndreiPicture} alt='photo of Andrei' />
                    </div>
                </div>
            </div>
            <div className='contact-container'>
                <div className='contact-content'>
                    <div className='contact-text'>
                        <h2>Mihai Neag</h2>
                        <p>Curious how things work behind, I got fascinated with hardware and software,thus 
                             choosing Computer Engineering as my career path.
                            Eager to try out new things I got involved in this project together with Andrei 
                            in order to see what does a web application necessitate.
                        </p>
                        <ul>
                            <li>
                                <a href={mihaiLinkedInLink} target='_blank'>LinkedIn</a>
                            </li>
                            <li>
                                <a href={mihaiGitHubLink} target='_blank'>GitHub</a>
                            </li>
                        </ul>
                    </div>
                    <div className='contact-image'>
                        <img src={MihaiPicture} alt='photo of Mihai' />
                    </div>
                </div>
            </div>
        </div>
    );
}