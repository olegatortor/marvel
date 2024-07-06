import { useEffect, useState } from 'react';
import {Formik, Field, ErrorMessage, Form} from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import Spinner from '../spinner/Spinner';
import ErrorMassageCustom from '../errorMassage/ErrorMassage';
import useMarvelServices from '../../services/MarvelServices';
import Skeleton from '../skeleton/Skeleton'

import './charInfo.scss';

const CharInfo = ({selectedChar}) => {
    const [char, setChar] = useState(null);
    
    useEffect(() => {
        updateChar()
    }, [selectedChar])


    const {loading, error, getCharacter, clearError, getCharacterName} = useMarvelServices();

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
    const problem = error ? <ErrorMassageCustom /> : null;
    const view = !(loading || error) && char !== null ? <View char={char}/> : null;

    return (
        <div>
            <div className="char__info">
                {skeleton}
                {load}
                {problem}
                {view}
            </div>
            <div className="char__info">
                <FormFind findChar={getCharacterName}/>
            </div>
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

const FormFind = ({findChar}) => {
    const [char, setChar] = useState(null);
    const [redirect, setRedirect] = useState(null);

    useEffect(() => {
        if (char) {
            checkCharName(char);
        }
    }, [char])

    const showRedirect = (values) => {
        console.log(values)
        return(
            <div className='char__form'>
                <div className="char__comics" style={{color:'#03710E'}}>There is! Visit {values} page?</div>
                <Link 
                    to={`/char/${values}`} 
                    className="button button__secondary">
                            <div className="inner">TO PAGE</div>
                </Link>
            </div>
        )
    }

    const checkCharName = (char) => {
        findChar(char)
            .then((res) => {
                setRedirect(showRedirect(res.name));
            })
            .catch(() => {
                return(
                    setRedirect(<div className="char__comics" style={{color:'#9F0013'}}>The character was not found. Check the name and try again</div>)
                )
            })
    }
    return(
        <>
            <div className="char__comics">Or find a character by name:</div>
            <Formik
                initialValues={{ name: '' }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .required('This field is required')
                })
                }
                onSubmit={
                    values => setChar(values.name)
                }>
                <Form>
                    <div className='char__form'>
                        <Field type="text" name="name" placeholder='Enter name' className='char__input'/>
                        <button href='#' className="button button__main" type="submit">
                            <div className="inner">FIND</div>
                        </button>
                    </div>
                    <ErrorMessage className='error__form' name='name' component='div'/>
                    {redirect}
                </Form>
            </Formik>
        </>
    )
}

export default CharInfo;