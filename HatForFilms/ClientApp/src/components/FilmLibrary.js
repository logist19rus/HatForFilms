import React, { useEffect, useState } from 'react'
import { FilmRepository } from '../Repository/FilmRepository'
import { FilmPage } from '../components/Film/FilmPage'

export function Library() {
    let filmRep = new FilmRepository();
    let onCreateInputClasses = {
        name: "FilmName"
    };

    const [visibleCreator, setVisability] = useState(false);
    const [newFilmName, setNewFilmName] = useState('');
    const [films, setFilms] = useState([]);
    const [filmModal, setFilmModal] = useState({});

    function refreshFilms() {
        filmRep.getAll().then(function (res) {
            let filmsMap = res.map(function (f, id) {
                return (<li key={id} onClick={() => { setFilmModal(x => x = f) }}>{f.name}</li>)
            })
            setFilms(x => x = filmsMap);
        })
    }

    function refreshAfterUpdate(filmId) {
        filmRep.getAll().then(function (res) {
            let filmsMap = res.map(function (f, id) {
                return (<li key={id} onClick={() => { setFilmModal(x => x = f) }}>{f.name}</li>)
            })
            setFilms(x => x = filmsMap);
            for (var i in res) {
                console.log(res[i]);
                if (res[i].id == filmId) {
                    console.log(res[i]);
                    setFilmModal(x => x = res[i]);
                    break;
                }
            }
        })
    }

    useEffect(() => {
        refreshFilms();
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
        filmRep.createNew(newFilmName).then(() => { refreshFilms(); });
        setNewFilmName(x => x = '');
    }

    function changeVisabilityVreator() {
        setVisability(x => x = !x);
    }

    return (
        <div>
            {
                Object.keys(filmModal) == 0 ? null :
                    <FilmPage value={
                        {
                            film: filmModal,
                            closeFunc: () => { setFilmModal(x => x = {}); },
                            refreshFilms: refreshAfterUpdate
                        }
                    } />
            }
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