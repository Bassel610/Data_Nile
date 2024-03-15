import Logo from "../../Media/Logo.jpg"
import "./Header.css"
function Header () {

    let HomeScroll = () => {
        window.scrollTo({top: 0, behavior: 'smooth'})
    }
    let AboutScroll = () => {
        window.scrollTo({top: 600, behavior: 'smooth'})
    }
    let ServiceScroll = () => {
        window.scrollTo({top:   1600, behavior: 'smooth'})
    }
    let ContctScroll = () => {
        window.scrollTo({top: 1870, behavior: 'smooth'})
    }
    return (
        <>
            <div className="Header">
                <div className="Logo">
                    <img src={Logo} alt=";" />
                </div>
                <div className="List">
                    <ul>
                        <li onClick={HomeScroll}>Home</li>
                        <li onClick={AboutScroll}>About Us</li>
                        <li onClick={ServiceScroll}>Our Services</li>
                        <li onClick={ContctScroll}>Contact Us</li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Header