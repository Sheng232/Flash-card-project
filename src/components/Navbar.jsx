import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseChimney, faFolderPlus,} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom"

function Navbar (){
    return(        
        <div className="navbar">
            <Link to="/Flashcard-project/" className="home-button">
                <FontAwesomeIcon icon={faHouseChimney} />
            </Link>
            <div className="github-button">
                <a target="_blank" href="https://github.com/Sheng232/Flashcard-project">{`</>`}</a>
            </div>
        </div>
    )
}


export default Navbar