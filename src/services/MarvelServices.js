import { useHttp } from "../hooks/http.hooks";
import { key } from './api.js'

const useMarvelServices = () => {
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = `apikey=${key}`;
    const _baseOffset = 210;
    const _baseComicsOffset = 0;

    const {loading, error, request, clearError} = useHttp();

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformCharecter)
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`)
        return _transformCharecter(res.data.results[0])
    }

    const getAllComics = async (offset =_baseComicsOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformComics)
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`)
        return _transformComics(res.data.results[0])
    }

    const _transformCharecter = (char) => {
        return {
            id: char.id,
            name: char.name,
            descr: char.description ? `${char.description.slice(0, 215)}...`: 'Sorry, there is no description',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount ? comics.pageCount : 'no information',
            lang: comics.textObjects[0]?.language || 'en-us',
            prices: comics.prices[0].price ? `${comics.prices[0].price}$` : 'NOT AVAILABLE',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension
        }
    }



    return {
        loading, 
        error, 
        getAllCharacters, 
        getCharacter, 
        clearError,
        getAllComics,
        getComic
    }
}

export default useMarvelServices;