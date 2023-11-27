import { Component } from 'react';
import ErrorMassage from '../errorMassage/ErrorMassage';
import Spinner from '../spinner/Spinner';
import MarvelServices from '../../services/MarvelServices';

import './charList.scss';

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false,
        newCharsList: false,
        offset: 210,
        endedChar: false
    }

    marvelServices = new MarvelServices()

    componentDidMount() {
        this.onRequest()
    }

    onRequest = (offset) => {
        this.onUpateCharList()

        this.marvelServices
            .getAllCharacters(offset)
            .then(this.onChangeCharList)
            .catch(this.onError)
    }

    onUpateCharList = () => {
        this.setState({newCharsList: true})
    }

    onChangeCharList = (newCharList) => {
        let ended = false;
        if(newCharList.length < 9) {
            ended = true;
        }

        this.setState(({offset, charList}) => ({
            charList: [...charList, ...newCharList], 
            loading: false,
            newCharsList: false,
            offset: offset + 9,
            endedChar: ended
        }))
    }

    onError = () => {
        this.setState({loading: false, error: true})
    }

    renderList(arr) {
        const items = arr.map(item => {
            let contain = ''
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' || item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif') {
                contain = 'contain'
            };

            return (
                <li 
                    onClick={() => this.props.onCharSelected(item.id)}
                    className="char__item" 
                    key={item.id}>
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
        const {charList, loading, error, offset, newCharsList, endedChar} = this.state

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
                    disabled={newCharsList}
                    onClick={() => this.onRequest(offset)}
                    style={{display: endedChar ? 'none': 'block'}}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;