import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';

import SinglePage from "./SinglePage";

const SingleChar = () => {
    const {charId} = useParams()
    const [char, setChar] = useState([])
    return (
        <>
            <SinglePage 
                id={charId}
                name={char}
                setName={setChar}
                Component={View}
                props={{char}}
                getMethod={'getCharacterName'}
                />
        </>
    )
}

const View = (props) => {
    const {name, descr, thumbnail} = props.char

    let contain = '';

    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' || thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif') {
        contain = 'contain'
    };

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={name} className="single-comic__img" style={{objectFit: `${contain}`, height: 'auto'}}/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{descr}</p>
            </div>
            <Link to="/" className="single-comic__back">Back</Link>
        </div>
    )
}

export default SingleChar;