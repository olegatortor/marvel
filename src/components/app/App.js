
import { Component } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';

class App extends Component {
    state = {
        selectedChar: null
    }

    onCharSelected = (selectedChar) => {
        this.setState({selectedChar: selectedChar})
    }
    
    render() {
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <ErrorBoundary> 
                        <RandomChar/>
                    </ErrorBoundary>
                    <div className="char__content">
                        <ErrorBoundary>
                            <CharList
                                onCharSelected={this.onCharSelected}
                                selectedChar={this.state.selectedChar}/>
                        </ErrorBoundary>

                        <ErrorBoundary>
                            <CharInfo
                                selectedChar={this.state.selectedChar}/>
                        </ErrorBoundary>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
}


export default App;