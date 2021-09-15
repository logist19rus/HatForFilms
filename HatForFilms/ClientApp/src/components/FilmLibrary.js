import React, { useEffect, useState } from 'react'
import { FilmRepository } from '../Repository/FilmRepository'

export function Library() {
    let filmRep = new FilmRepository();
    let onCreateInputClasses = {
        name: "FilmName"
    };

    const [visibleCreator, setVisability] = useState(false);
    const [newFilmName, setNewFilmName] = useState('');
    const [films, setFilms] = useState([]);

    useEffect(() => {
        filmRep.getAll().then(function (res) {
            let filmsMap = res.map(function (f, id) {
                return (<li key={id}>{f.name}</li>)
            })
            setFilms(x => x = filmsMap);
        })
    }, []);

    function onCreateInputChange(e) {
        let target = e.target;
        let val = '';
        if (target == null) {
            return;
        }
        val = target.value;

        var targetClass = target.className;

        if (targetClass == onCreateInputClasses.name) {
            setNewFilmName(x => x = val);
        }
    }

    function CreateNewFilm() {
        filmRep.createNew(newFilmName);
        window.location.reload();
    }

    function changeVisabilityVreator() {
        setVisability(x => x = !x);
        console.log(visibleCreator);
    }

    return (
        <div>
            library
            <ul>
                {films}
            </ul>
            <br />
            <input type='button' value='Add New Menu' onClick={changeVisabilityVreator} />
            {visibleCreator ? (<div id="createNewFilm">
                <form>
                    <input className={onCreateInputClasses.name} type="text" value={newFilmName} onChange={onCreateInputChange} />
                    <input type="button" value='add' onClick={CreateNewFilm} />
                </form>
            </div>) : null}
        </div>
    );
}