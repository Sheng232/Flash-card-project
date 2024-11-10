import "./CreateCard.css"
import CardInput from "./CardInput"
import {useState, useEffect} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
function CreateCard(props){
    //a state keeping track of the child component to then
    //pass to to app component for full render
    const [childComponentCard, setComponentChildCard] = useState(props.deck);
    //state to keep track of the rotation of the caret button
    const [rotated, setRotated] = useState(false);
    function updateToParent(updatedCard) {
        setComponentChildCard(prevCards => {
            return prevCards.map(card =>
                card.id === updatedCard.id ? updatedCard : card
            );
        });
    }
    
    function deleteCard(id){
        const deletedState = childComponentCard.filter(card =>{
            return card.id !== id;
        });
        //loop through the array and correct the id when the delete is called
        const correctId = deletedState.map((card, index)=>{
            return {
                ...card,
                id : index + 1,
            }
        })
        setComponentChildCard(correctId);
        props.autosave(childComponentCard);
    }

    //sync up deleteCard with save
    useEffect(() => {
        props.autosave(childComponentCard); 
    }, [childComponentCard]);

    function matchCard(){
        setComponentChildCard(prevState=>{
            return([
                ...prevState,
                {frontText: "",
                 backText: "",
                 id: prevState.length + 1
                }
            ])
        })
    }
    function hasRotated(){
        setRotated(prevState=>{
            return !prevState;
        })
    }

    //map the whole deck and return a CardInput component
    const displayInputCard = props.deck.map(card=>{
        return(
            <CardInput 
                key={card.id}
                num={card.id}
                front={card.frontText}
                back={card.backText}
                updateToParent = {updateToParent}
                deleteCard = {deleteCard}  
            />
        )
    })
    //animation for the dropdown button
    const flipAnimation = {
        animation: "rotate 0.5s ease forwards",
    };
    const backflipAnimation = {
        animation: "rotateBack 0.5s ease forwards",
    }

    return(
        <>
            <h1 className="title center"> Edit existing flashcard set</h1>
            {/* <div className="flexbox">
                <button className="save-button" onClick={
                        (event)=>{
                            props.save(childComponentCard, event)
                        }
                    }>Save</button>
            </div> */}
        
            <FontAwesomeIcon icon={faCaretDown}
                onClick = {hasRotated} 
                className= {`dropdown-button`} 
                style={rotated ? flipAnimation : backflipAnimation}
            />
            
            <form 
                style = {{ display: rotated ? "none" : "block" }}
            >
                {/*to  be implemented */}
                {/* <label className="title-label" htmlFor = "title">Flashcard Title</label>
                <input type="text" id="title" className ="flashcard-title-input" name="title" />
                <label className="description-label" htmlFor = "description">Flashcard Description</label>
                <input id="description" className = "flashcard-description-input"/> */}
                
                {displayInputCard}
                <button className="add-button" onClick={
                    (event)=>{
                        props.addNewcard(event);
                        matchCard()
                    }
                    }>
                        <span>Add A Card</span>
                </button>

            </form>
        </>
    )
}


export default CreateCard