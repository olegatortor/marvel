
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './comicsList.scss';
import useMarvelServices from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMassage from '../errorMassage/ErrorMassage';

const ComicsList = () => {

    const [comicsList, setComicsList] = useState([]);
    const [newComicsLoad, setNewComicsLoad] = useState(false);
    const [offset, setOffset] = useState(0);
    const [endedComics, setEndedComics] = useState(false);

    
    const {loading, error, getAllComics} = useMarvelServices();

    useEffect(() => {
        console.log('useEffect onRequest')
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        console.log('onRequest')
        initial ? setNewComicsLoad(false) : setNewComicsLoad(true);

        getAllComics(offset)
            .then(onChangeComicsList);
    }

    const onChangeComicsList = (newComicsList) => {
        let ended = false
        if(newComicsList.lenght < 8) {
            ended = true;
        }

        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setNewComicsLoad(false);
        setOffset(offset => offset + 8);
        setEndedComics(ended);
        console.log('onChangeComicsList')
    }

    const renderComicsList = (list) => {
        console.log('renderComicsList')
        const items = list.map((item, i) => {
            let contain = ''
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' || item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif') {
                contain = 'contain'
            };

            return (
                <li className="comics__item" key={item.id}>
                    <Link to={`/comics/${item.id}`}>
                        <img style={{objectFit: contain}} src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.prices}</div>
                    </Link>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const load = loading && !newComicsLoad ? <Spinner/> : null;
    const problem = error ? <ErrorMassage/> : null;
    const items = renderComicsList(comicsList);

    console.log('new component')

    return (
        <div className="comics__list">

            {load}
            {problem}
            {items}

            <button 
                className="button button__main button__long"
                disabled={newComicsLoad}
                onClick={() => onRequest(offset)}
                style={{display: endedComics ? 'none': 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;