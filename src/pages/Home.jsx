import {Link} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder, faFolderPlus, faDeleteLeft  } from "@fortawesome/free-solid-svg-icons";
import {useState, useEffect} from "react"
function Home() {


  const [folders, setFolders] = useState(() => JSON.parse(localStorage.getItem("folders")) || []);

  useEffect(()=>{
    localStorage.setItem("folders", JSON.stringify(folders))
},[folders]);

  function addFolder(){
    const newFolder ={
      id: folders.length + 1,
      title: `folder${folders.length + 1}`,
      deck: []
    }
    setFolders(prevState =>{
      return ([
        ...prevState,
        newFolder
      ])
    })
  }
  function deleteFolder(id){
    const newFolders = folders.filter((folder)=> {
      return(
        folder.id !== id ? folder : null
      )
    })
    setFolders(newFolders);
  }
  const displayFolder = folders.map((folder, index)=>{
    return(
      <div className="relative " key={index}>
        <Link
          to={`/Flashcard-project/Flashcard/${folder.id}`}
          className="flashcard-folder"
        >
        <div><FontAwesomeIcon icon={faFolder} /> { folder.title} </div> 
        </Link>
        <FontAwesomeIcon 
          className="delete-folder-button" 
          icon={faDeleteLeft} 
          onClick={()=>{
            deleteFolder(folder.id)
          }}  
        />
    </div> )
  })
  const title = JSON.parse(localStorage.getItem("title"));

  return(
    <>
        <div className="flashcard-set">
            <div className= "flashcard-set-title">
              <div className="folder-button">
                <FontAwesomeIcon icon={faFolderPlus} onClick={addFolder}/>
              </div>
            Flash card set:</div>
            {displayFolder}
        </div>
    </>
  )
}

export default Home
