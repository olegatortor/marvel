import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';

import ErrorMassage from '../errorMassage/ErrorMassage';
import Spinner from '../spinner/Spinner';
import useMarvelServices from '../../services/MarvelServices';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './charList.scss';

const CharList = ({onCharSelected, selectedChar}) => {

    const [charList, setCharList] = useState([]);
    const [newLoadingChar, setNewLoadingChar] = useState(false);
    const [offset, setOffset] = useState(210);
    const [endedChar, setEndedChar] = useState(false);


    const {loading, error, getAllCharacters, clearError} = useMarvelServices()

    useEffect(() => {
        onRequest(offset, true)
    }, []) 

    const onRequest = (offset, initial) => {
        clearError()

        initial ? setNewLoadingChar(false) : setNewLoadingChar(true);
        getAllCharacters(offset)
            .then(onChangeCharList);
    }
    const onChangeCharList = async (newCharList) => {
        let ended = false;
        if(newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]);
        setNewLoadingChar(false)
        setOffset(offset => offset + 9)
        setEndedChar(ended)
    }

    const renderList = (arr) =>  {
        const items = arr.map((item, i) => {
            let contain = ''
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' || item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif') {
                contain = 'contain'
            };
            
            const active = selectedChar === item.id;
            const clazz = active ? 'char__item_selected' : '';

            const changeElement = () => {
                const func = selectedChar === item.id ? onCharSelected('skeleton'): onCharSelected(item.id)
                return func
            }
            return (
                <CSSTransition 
                    timeout={300}
                    classNames='charr'
                    key={item.id}>

                    <li 
                    tabIndex={0}
                    onClick={changeElement}
                    className={'char__item ' + clazz} 
                    onKeyDown={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            onCharSelected(item.id);
                            changeElement()
                        }
                    }}
                    >
                        <img src={item.thumbnail} alt="abyss" style={{objectFit: `${contain}`}}/>
                        <div className="char__name">{item.name}</div>
                    </li>
                    
                </CSSTransition>
                
            )
        });

        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
        )
    };

    const items = renderList(charList)

    const load = loading && !newLoadingChar ? <Spinner /> : null;
    const problem = error ? <ErrorMassage /> : null;

    return (
        <div className="char__list">
            {load}
            {problem}
            {items}

            <button 
                className="button button__main button__long"
                disabled={newLoadingChar}
                onClick={() => onRequest(offset)}
                style={{display: endedChar ? 'none': 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired,
}

export default CharList;