import { useEffect, useState } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMassage from '../errorMassage/ErrorMassage';
import useMarvelServices from '../../services/MarvelServices';
import Skeleton from '../skeleton/Skeleton'

import './charInfo.scss';

const CharInfo = ({selectedChar}) => {
    const [char, setChar] = useState(null);
    
    useEffect(() => {
        updateChar()
    }, [selectedChar])

    const {loading, error, getCharacter, clearError} = useMarvelServices();

    const updateChar = () => {
        if (!selectedChar) {
            return;
        }

        if(selectedChar === 'skeleton') {
            return setChar(null)
        }

        clearError()

        getCharacter(selectedChar)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char)
    }
 
    const skeleton = !(loading || error) && char === null ? <Skeleton/> : null;
    const load = loading ? <Spinner/> : null;
    const problem = error ? <ErrorMassage /> : null;
    const view = !(loading || error) && char !== null ? <View char={char}/> : null;

    return (
        <div className="char__info">
            {skeleton}
            {load}
            {problem}
            {view}

        </div>
    )
}

const View = ({char}) => {
    const {thumbnail, name, descr, homepage, wiki, comics} = char;

    let contain = ''
    
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' || thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif') {
        contain = 'contain'
    };

    const comicsList = (length, arr) => {
        if (!arr.length) return 'There is no comics with this character';

        if (length === 'all') {
            return comics.map((item, i ) => {
                return(
                    <li className="char__comics-item" key={i}>
                        {item.name}
                    </li>
                )
            })
        } else {
            const newArr = []
            for (let i = 0; i < length; i++) {
                if (arr.length === i) break
                newArr.push(
                    <li className="char__comics-item" key={i}>
                        {arr[i].name}
                    </li>
                )
            }
            return newArr;
        }
    } 


    return(
        <>
            <div className="char__basics">
                <img src={thumbnail} alt="abyss" style={{objectFit: `${contain}`}}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {descr}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list"> 
                {comicsList(10, comics)}
            </ul>
        </>
    )
}
export default CharInfo;