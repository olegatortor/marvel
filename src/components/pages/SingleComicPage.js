import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';

import SinglePage from "./SinglePage";

const SingleComic = () => {
    const {comicId} = useParams()
    const [comic, setComic] = useState([])
    
    return (
        <>
            <SinglePage 
                id={comicId}
                name={comic}
                setName={setComic}
                Component={View}
                props={{comic}}
                getMethod={'getComic'}
                />
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