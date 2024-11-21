import React from "react";

function FlashcardComponent(props) {
    const [isFront, setIsFront] = React.useState(true);
    const [isFlipping, setIsFlipping] = React.useState(false);
    const [fadeLeft, setFadeLeft] = React.useState(false);
    const [fadeRight, setFadeRight] = React.useState(false);
    const flipAnimation = {
        animation: "flip 0.5s ease",
    };

    const leftFadeAnimation = {
        animation: "fadeLeft 0.5s ease forwards",
    };
    const rightFadeAnimation = {
        animation: "fadeRight 0.5s ease forwards",
    }

    function cardFadeLeft() {
        setFadeLeft(true); 
        setTimeout(() => {
            setFadeLeft(false); 
            props.nextCard(); 
        }, 210);
    }
    function cardFadeRight(){
        setFadeRight(true);
        setTimeout(()=>{
            setFadeRight(false);
            props.previousCard();
        }, 210);
    }
    function flipCard() {
        setIsFlipping(true); 
        setTimeout(() => {
            setIsFront(prevState => !prevState); 
            setIsFlipping(false); 
        }, 210); 
    }
    
    return (
        <div
            id="flashcard"
            className={`container flexbox ${props.isActive}`}
            style={isFlipping ? flipAnimation : fadeLeft ? leftFadeAnimation : fadeRight ? rightFadeAnimation : {} }
        >
            <div className="flashcard flexbox">
                <p className={`front-text ${!isFront ? "invisible" : ""}`}>{props.frontText}</p>
                <p className={`back-text ${isFront ? "invisible" : ""}`}>{props.backText}</p>
            </div>
            <div className="inputs">
                <button className="previous" 
                    onClick={cardFadeRight}
                    >
                        {` < Previous`}
                </button>

                <button className="show-answer" onClick={flipCard}>
                    {isFront ? "Show Answer" : "Hide Answer"}
                </button>

                <button
                    className="next"
                    onClick={cardFadeLeft} 
                >
                    {`Next >`}
                </button>
            </div>
        </div>
    );
}

export default FlashcardComponent;
