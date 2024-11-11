import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseChimney, faFolderPlus,} from "@fortawesome/free-solid-svg-icons";
function Navbar (){
    return(        
        <div className="navbar">
            <div className="home-button">
                <FontAwesomeIcon icon={faHouseChimney} />
            </div>
            <div className="folder-button">
                <FontAwesomeIcon icon={faFolderPlus} />
            </div>
            <div className="github-button">
                <a target="_blank" href="https://github.com/Sheng232/Flashcard-project">{`</>`}</a>
            </div>
        
        </div>
    )
}


export default Navbar