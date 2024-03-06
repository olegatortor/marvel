import { useState } from "react";

import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';

const MainPage = () => {
    const [selectedChar, setSelectedChar] = useState(null)
    const onCharSelected = (selectedChar) => {
        setSelectedChar(selectedChar)
    }

    return(
        <>
            <ErrorBoundary> 
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList
                        onCharSelected={onCharSelected}
                        selectedChar={selectedChar}/>
                </ErrorBoundary>

                <ErrorBoundary>
                    <CharInfo
                        selectedChar={selectedChar}/>
                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage;