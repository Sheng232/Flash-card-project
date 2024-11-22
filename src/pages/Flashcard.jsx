import { useState, useEffect } from 'react'
import Topbar from "../components/Topbar"
import FlashcardComponent from "../components/FlashcardComponent"
import CreateCard from '../components/CreateCard/CreateCard'
import { useParams } from 'react-router-dom'
function Flashcard() {

  const {id} = useParams();
  //When a folder is clicked, this finds the title and deck that matches the id in the
  //local storage folders array and update the indiviudal title and deck
  useEffect(() => {
    const storedFolders = JSON.parse(localStorage.getItem("folders")) || [];
    const currentFolder = storedFolders.find((folder) => folder.id === parseInt(id));
    if (currentFolder) {
      setTitle(currentFolder.title);
      setDeck(currentFolder.deck);
    }
  }, [id]);
  
  const [isActive, setIsActive] = useState(1);
  const [title, setTitle] = useState(()=>JSON.parse(localStorage.getItem("folders"))[id - 1].title || "Flash Card");
  const [deck, setDeck] = useState(
    ()=>JSON.parse(localStorage.getItem("folders"))[id - 1].deck || []);

  function nextCard(){
    if(isActive === deck.length){
      setIsActive(1);
    }
    else{
      setIsActive(isActive + 1);
    }
  }
  // useEffect(
  //   ()=>{
  //     localStorage.setItem("deck", JSON.stringify(deck)), [deck]
  //   }
  // );

  // useEffect(
  //   ()=>{
  //     const title = JSON.parse(localStorage.getItem("folders"))[id - 1].title;
  //     setTitle(title);
  //   }, [title]
  // );

  function autosave(currentDeck){
    //temporarily creating a folders variable to get the localstorage 
    //element with the name storage
    //everytime state changes, it maps through the folders to 
    //update the changes in the local storage
    //it updates by first storing the wanted changes in a updatedFolders variable
    //then storing it to local storage
    const folders = JSON.parse(localStorage.getItem("folders"));
    const updatedFolders = folders.map((folder) =>
      folder.id === parseInt(id)
        ? { ...folder, deck: currentDeck }
        : folder
    );
    localStorage.setItem("folders", JSON.stringify(updatedFolders));
    
    setDeck(updatedFolders[id-1].deck);
    setIsActive(1);
  }
 

  function addNewCard(event){
    event.preventDefault();
    setDeck(prevState=>{
      return([
        ...prevState,
        {frontText: "",
        backText: "",
        id: prevState.length + 1}
      ])
    })
  }
  
  function previousCard(){
    if(isActive === 1){
      setIsActive(deck.length)
    }
    else{
      setIsActive(isActive - 1);
    }
  }
  function setDeckTitle(event){
    const folders = JSON.parse(localStorage.getItem("folders"));
    const updatedFolders = folders.map((folder) =>
      folder.id === parseInt(id)
        ? { ...folder, title: event.target.value }
        : folder
    );
    localStorage.setItem("folders", JSON.stringify(updatedFolders));
    const title = JSON.parse(localStorage.getItem("folders"))[id - 1].title;
    setTitle(title);
  }

  const displayCard = deck.map(card => {
           return <FlashcardComponent 
              key = {card.id}
              frontText = {card.frontText}
              backText = {card.backText}
              isActive = {isActive === card.id ? "" : "invisible"}
              nextCard = {nextCard}
              previousCard = {previousCard}
            />      
    });

  return (
    <div id="app">
      <Topbar
        length={deck.length}
        activeCard = {isActive}
        title = {title}
      />
      {displayCard}
      <CreateCard 
        length={deck.length}
        deck = {deck}
        // save = {save}
        addNewcard = {addNewCard}
        autosave = {autosave}
        setDeckTitle = {setDeckTitle}
        title = {title}
      />
      <footer>
        Work In Progress
        <br />
        Developed by Sheng Jian &#169;
      </footer>
    </div>
  )
}

export default Flashcard