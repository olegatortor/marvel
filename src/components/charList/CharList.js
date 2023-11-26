import { Component } from 'react';
import ErrorMassage from '../errorMassage/ErrorMassage';
import Spinner from '../spinner/Spinner';
import MarvelServices from '../../services/MarvelServices';

import './charList.scss';

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false
    }

    marvelServices = new MarvelServices()

    componentDidMount() {
        this.marvelServices
            .getAllCharacters()
            .then(this.onChangeCharList)
            .catch(this.onError)
    }

    onChangeCharList = (charList) => {
        this.setState({charList, loading: false})
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
        const {charList, loading, error} = this.state

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
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;