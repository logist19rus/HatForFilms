﻿import React, { useEffect, useState } from 'react'
import { FilmRepository } from '../Repository/FilmRepository'
import { FilmPage } from '../components/Film/FilmPage'
import '../components/Film/filmStyle.css'

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
                return (<li key={id} className='filmLink' onClick={() => { setFilmModal(x => x = f) }}>{f.name}</li>)
            })
            setFilms(x => x = filmsMap);
        })
    }

    function refreshAfterUpdate(filmId) {
        filmRep.getAll().then(function (res) {
            let filmsMap = res.map(function (f, id) {
                return (<li key={id} className='filmLink' onClick={() => { setFilmModal(x => x = f) }}>{f.name}</li>)
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
            <div className='filmListHead'>
                <h3>Библиотека фильмов</h3>
                <svg onClick={changeVisabilityVreator} height="512px" viewBox="0 0 512 512" width="512px" xmlns="http://www.w3.org/2000/svg"><path d="m368 272h-224c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h224c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" /><path d="m256 384c-8.832031 0-16-7.167969-16-16v-224c0-8.832031 7.167969-16 16-16s16 7.167969 16 16v224c0 8.832031-7.167969 16-16 16zm0 0" /><path d="m453.332031 512h-394.664062c-32.363281 0-58.667969-26.304688-58.667969-58.667969v-394.664062c0-32.363281 26.304688-58.667969 58.667969-58.667969h394.664062c32.363281 0 58.667969 26.304688 58.667969 58.667969v394.664062c0 32.363281-26.304688 58.667969-58.667969 58.667969zm-394.664062-480c-14.699219 0-26.667969 11.96875-26.667969 26.667969v394.664062c0 14.699219 11.96875 26.667969 26.667969 26.667969h394.664062c14.699219 0 26.667969-11.96875 26.667969-26.667969v-394.664062c0-14.699219-11.96875-26.667969-26.667969-26.667969zm0 0" /></svg>
            </div>
            {visibleCreator ? (
                <form className='filmAddMenu'>
                    <div>
                        <label>Название фильма</label>
                        <input className={onCreateInputClasses.name} type="text" value={newFilmName} onChange={onCreateInputChange} />
                    </div>
                    <input type="button" value='Добавить' onClick={CreateNewFilm} />
                </form>) : null}
            <ul className='filmList'>
                {films}
            </ul>
            <br />
        </div>
    );
}