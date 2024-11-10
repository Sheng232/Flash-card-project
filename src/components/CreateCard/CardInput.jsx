import { useState, useEffect } from "react";
import "./CreateCard.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function CardInput(props) {
    const [textareaState, setTextareaState] = useState({
        frontText: props.front,
        backText: props.back,
        id: props.num,
    });

    function linkTextareaState(event) {
        const { name, value } = event.target;
        setTextareaState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    useEffect(() => {
        props.updateToParent(textareaState);
    }, [textareaState]);


    return (
        <div className="question-input">
            <div className="input-num">
                {props.num}.
                <FontAwesomeIcon 
                    className="trash" 
                    icon={faTrash} 
                    onClick={
                        ()=>{
                            props.deleteCard(textareaState.id)
                        }}
                />

            </div>
            <div className="input-description">
                <span htmlFor="frontText">Front</span>
                <span htmlFor="backText">Back</span>
            </div>
            <textarea
                id="frontText"
                name="frontText"
                className="question"
                onChange={linkTextareaState}
                value={textareaState.frontText}
            />
            <textarea
                id="backText"
                name="backText"
                className="answer"
                onChange={linkTextareaState}
                value={textareaState.backText}
            />
        </div>
    );
}
