import {Link} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder } from "@fortawesome/free-solid-svg-icons";

function Home() {
  return(
    <>
        <div className="flashcard-set">
            <h1>My Flashcard set:</h1>
            <Link to="/Flashcard-project/Flashcard" className="flashcard-folder">Flashcard Folder <FontAwesomeIcon icon={faFolder} /></Link>
        </div>
    </>
  )
}

export default Home
