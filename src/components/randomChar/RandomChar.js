import { useEffect, useState } from 'react';
import useMarvelServices from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMassage from '../errorMassage/ErrorMassage'

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png'

const RandomChar = () => {
    const {loading, error, getCharacter, clearError} = useMarvelServices();

    const [char, setChar] = useState({});

    useEffect(() => {
        updateChar()

        // const timerId = setInterval(updateChar, 10000)

        // return () => {
        //     clearInterval(timerId);
        // }
    }, [])

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

        getCharacter(id)
            .then(onCharLoaded)
    }
        
    const load = loading ? <Spinner/> : null;
    const problem = error ? <ErrorMassage /> : null;
    const view = !(loading || error) ? <View char={char}/> : null;

    return (
        <div className="randomchar">
            
            {load}
            {problem}
            {view}

            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={updateChar}>
                    <div 
                        className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const View = ({char}) => {
    const {thumbnail, name, descr, homepage, wiki} = char;
    let contain = ''
    
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' || thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif') {
        contain = 'contain'
    };

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={{objectFit: `${contain}`}}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {descr}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;