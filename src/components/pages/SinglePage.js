import { useEffect } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMassage from '../errorMassage/ErrorMassage';
import useMarvelServices from '../../services/MarvelServices';

import './singleComicPage.scss';

const SinglePage = ({id, name, setName, Component, props, getMethod}) => {
    const {loading, error, getComic, getCharacterName, clearError} = useMarvelServices()

    useEffect(() => {
        onRequest();
    }, [id])
    const onRequest = () => {
        clearError();
        console.log()
        if(getMethod == 'getCharacterName') {
            return(
                getCharacterName(id)
                .then(onCreate)
            )
        } else if(getMethod == 'getComic') {
            return(
            getComic(id)
                .then(onCreate)
            )
        }
    }

    const onCreate = (newCreate) => {
        setName(newCreate)
    }

    const load = loading ? <Spinner /> : null;
    const problem = error ? <ErrorMassage/> : null;
    const view = !(loading || error) && name !== null ? <Component {...props}/> : null;
    return (
        <>
            {load}
            {problem}
            {view}
        </>
    )
}

export default SinglePage;