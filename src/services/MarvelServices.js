class MarvelServices {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=';

    getResurses = async (url) => {
        let res = await fetch(url);

        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }

        return res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResurses(`${this._apiBase}characters?limit=9&offset=100&${this._apiKey}`)
        return res.data.results.map(this._transformCharecter)
    }

    getCharacter = async (id) => {
        const res = await this.getResurses(`${this._apiBase}characters/${id}?${this._apiKey}`)
        return this._transformCharecter(res.data.results[0])
    }

    _transformCharecter = (char) => {
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
}

export default MarvelServices;