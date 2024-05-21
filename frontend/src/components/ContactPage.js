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
                        <p>Andrei Saldorfean.</p>
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
                        <p>Mihai Neag</p>
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