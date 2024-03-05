import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMassage from '../errorMassage/ErrorMassage';
import useMarvelServices from '../../services/MarvelServices';

import './singleComicPage.scss';

const SingleComic = () => {
    const {comicId} = useParams()
    const {loading, error, getComic, clearError} = useMarvelServices()

    const [comic, setComic] = useState([])

    useEffect(() => {
        onRequest();
    }, [comicId])

    const onRequest = () => {
        clearError();

        getComic(comicId)
            .then(onCreateComic)
    }

    const onCreateComic = (newComic) => {
        setComic(newComic)
    }

    const load = loading ? <Spinner /> : null;
    const problem = error ? <ErrorMassage/> : null;
    const view = !(loading || error) && comic !== null ? <View comic={comic}/> : null;
    return (
        <>
            {load}
            {problem}
            {view}
        </>
    )
}

const View = (props) => {
    const {title, description, pageCount, lang, prices, thumbnail} = props.comic

    let contain = '';

    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' || thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif') {
        contain = 'contain'
    };

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img" style={{objectFit: `${contain}`}}/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount} pages</p>
                <p className="single-comic__descr">Language: {lang}</p>
                <div className="single-comic__price">{prices}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComic;