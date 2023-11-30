import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import ErrorMassage from '../errorMassage/ErrorMassage';
import Spinner from '../spinner/Spinner';
import MarvelServices from '../../services/MarvelServices';

import './charList.scss';

class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false,
        newLoadingChar: false,
        offset: 210,
        endedChar: false
    }


    marvelServices = new MarvelServices()

    componentDidMount() {
        this.onRequest()
    }

    onRequest = (offset) => {
        this.onLoadingCharList()

        this.marvelServices
            .getAllCharacters(offset)
            .then(this.onChangeCharList)
            .catch(this.onError)
    }

    onLoadingCharList = () => {
        this.setState({newLoadingChar: true})
    }

    onChangeCharList = (newCharList) => {
        let ended = false;
        if(newCharList.length < 9) {
            ended = true;
        }

        this.setState(({offset, charList}) => ({
            charList: [...charList, ...newCharList], 
            loading: false,
            newLoadingChar: false,
            offset: offset + 9,
            endedChar: ended
        }))
    }

    onError = () => {
        this.setState({loading: false, error: true})
    }
    // changeActive 

    renderList(arr) {
        const items = arr.map((item, i) => {
            let contain = ''
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' || item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif') {
                contain = 'contain'
            };

            
            const active = this.props.selectedChar === item.id;
            const clazz = active ? 'char__item_selected' : '';
            return (
                <li 
                    tabIndex={0}
                    // onFocus={this.props.selectedChar !== item.id ?  : }
                    onFocus={this.props.selectedChar === item.id ? () => this.props.onCharSelected('skeleton'): () => this.props.onCharSelected(item.id)}
                    className={'char__item ' + clazz} 
                    key={item.id}
                    ref={this.activeRef}>
                    <img src={item.thumbnail} alt="abyss" style={{objectFit: `${contain}`}}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        });

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    render() {
        const {charList, loading, error, offset, newLoadingChar, endedChar} = this.state

        const items = this.renderList(charList)

        const load = loading ? <Spinner /> : null;
        const problem = error ? <ErrorMassage /> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {load}
                {problem}
                {content}
                {/*<li className="char__item char__item_selected">
                //     <img src={abyss} alt="abyss"/>
                //     <div className="char__name">Abyss</div>
                // </li> */}
                <button 
                    className="button button__main button__long"
                    disabled={newLoadingChar}
                    onClick={() => this.onRequest(offset)}
                    style={{display: endedChar ? 'none': 'block'}}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired,
}

export default CharList;