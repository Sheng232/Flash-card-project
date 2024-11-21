import { useState, useEffect } from 'react'
import Topbar from "../components/Topbar"
import FlashcardComponent from "../components/FlashcardComponent"
import CreateCard from '../components/CreateCard/CreateCard'

function Flashcard() {
  const [isActive, setIsActive] = useState(1);
  const [title, setTitle] = useState(JSON.parse(localStorage.getItem("title")) || "Flash Card");
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
    ()=>{
      localStorage.setItem("deck", JSON.stringify(deck)), [deck]
    }
  );

  useEffect(
    ()=>{
      localStorage.setItem("title", JSON.stringify(title)), [title]
    }
  );

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
  function setDeckTitle(event){
    setTitle(event.target.value);
    localStorage.setItem("title", JSON.stringify(title));
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