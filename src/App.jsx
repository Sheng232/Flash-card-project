import { useState, useEffect } from 'react'
import Topbar from "./components/Topbar"
import Flashcard from "../src/components/Flashcard"
import CreateCard from './components/CreateCard/CreateCard'
import Navbar from "./components/Navbar"

function App() {
  const [isActive, setIsActive] = useState(1);
  const [deck, setDeck] = useState(
    JSON.parse(localStorage.getItem("deck")) || []);


  function nextCard(){
    if(isActive === deck.length){
      setIsActive(1);
    }
    else{
      setIsActive(isActive + 1);
    }
  }
  useEffect(
    ()=>{localStorage.setItem("deck", JSON.stringify(deck)), [deck]}
  );

//   function save(currentDeck, event){
//     event.preventDefault()
//     setDeck(currentDeck);
//     localStorage.setItem("deck", JSON.stringify(deck));
// }

  function autosave(currentDeck){
    setDeck(currentDeck);
    localStorage.setItem("deck", JSON.stringify(deck));
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


  const displayCard = deck.map(card => {
           return <Flashcard 
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
      <Navbar />
      <Topbar
        length={deck.length}
        activeCard = {isActive}
      />
      {displayCard}
      <CreateCard 
        length={deck.length}
        deck = {deck}
        // save = {save}
        addNewcard = {addNewCard}
        autosave = {autosave}
      />
    </div>
  )
}

export default App
