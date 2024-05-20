import '../css/Menu.css'


export default function Menu(){
    
    return (
        <>
        <div class="container-fluid w-100 p-0 menu-pos">
            <a className='menu-hover a-menu-left' href='./AboutPage.js'>About</a>
            <a className='menu-hover a-menu-right'>Contact</a>
        </div>
        </>
    );
}