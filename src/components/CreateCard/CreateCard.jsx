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
        // const correctId = deletedState.map((card, index)=>{
        //     return {
        //         ...card,
        //         id : index + 1,
        //     }
        // })
        setComponentChildCard(deletedState);
        console.log(deletedState);
    }

    useEffect(() => {
        setComponentChildCard(props.deck);
    }, [props.deck]);
    
    //sync up deleteCard with save
    useEffect(() => {
        props.autosave(childComponentCard); 
    }, [childComponentCard]);

    // function matchCard(){
    //     setComponentChildCard(prevState=>{
    //         return([
    //             ...prevState,
    //             {frontText: "",
    //              backText: "",
    //              id: Date.now()
    //             }
    //         ])
    //     })
    // }
    function hasRotated(){
        setRotated(prevState=>{
            return !prevState;
        })
    }

    //map the whole deck and return a CardInput component
    const displayInputCard = childComponentCard.map((card, index)=>{
        return(
            <CardInput 
                key={card.id}
                num={index + 1}
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
        <div id="create-card">
            <h1 className="title center"> Edit existing flash card set</h1>
        
            <FontAwesomeIcon icon={faCaretDown}
                onClick = {hasRotated} 
                className= {`dropdown-button`} 
                style={rotated ? flipAnimation : backflipAnimation}
            />
            
            <form 
                style = {{ display: rotated ? "none" : "block" }}
            >

                <label className="title-label" htmlFor = "title">Flashcard Title</label>
                <input type="text" id="title" className ="flashcard-title-input" name="title" 
                    onChange = {(event)=>{props.setDeckTitle(event)}}
                    value={props.title}
                />
                
                {displayInputCard}
                <button className="add-button" onClick={
                    (event)=>{
                        props.addNewcard(event);
                        // matchCard()
                    }
                    }>
                        <span>Add A Card</span>
                </button>

            </form>
        </div>
    )
}


export default CreateCard