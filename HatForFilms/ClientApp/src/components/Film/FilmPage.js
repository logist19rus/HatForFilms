import React, { useEffect, useState } from 'react';
import { CheckAccountCookies } from './.././.././cookies/accountCookies'
import { FilmRepository } from '../../Repository/FilmRepository'

export function FilmPage(modalInfo) {
    let filmRep = new FilmRepository();
    const [filmName, setFilmName] = useState('');
    const [filmDescript, setFilmDescript] = useState('');
    const [isOwner, setIsOwner] = useState(false);
    const [changeStatus, setChangeStatus] = useState(false);

    const formIds = {
        name: 'filmName',
        descr:'filmDescr'
    }

    let film = modalInfo.value.film;
    let closeFunc = modalInfo.value.closeFunc;
    let refreshFilms = modalInfo.value.refreshFilms;

    useEffect(() => {
        let accId = CheckAccountCookies().id;
        setFilmName(x => x = film.name);
        setFilmDescript(x => x = film.description);
        if (accId == film.ownerId) {
            console.log('isOwnre');
            setIsOwner(x => x = true);
        }
    }, []);

    function BacktrackChanges() {
        setFilmName(x => x = film.name);
        setFilmDescript(x => x = film.description);
        setChangeStatus(x => x = false);
    }

    function SetFilmState(e) {
        let t = e.target;
        if (t == null) {
            return;
        }

        if (t.id == formIds.name) {
            setFilmName(x => x = t.value);
        }
        else if (t.id == formIds.descr) {
            setFilmDescript(x => x = t.value);
        }
    }

    function UpdateFilm() {
        let updatedFilm = {
            Id: film.id,
            Name: filmName,
            Description: filmDescript
        };
        filmRep.updateFilm(updatedFilm).then((res) => {
            refreshFilms(film.id);
            setChangeStatus(x => x = false);
        });
    }

    return (
        <div className='filmModal'>
            {!changeStatus ?
                (
                    <div className='aboutFilm'>
                        <h2 className='filmName'>{film.name}</h2>
                        <div className='filmDescription'>{film.description}</div>
                        {isOwner ? (< input type='button' value='Change' onClick={() => { setChangeStatus(x => x = true) }} />) : null}
                    </div>
                ) : (
                    <form>
                        <label>Название</label>
                        <input id={formIds.name} type='text' value={filmName} onChange={SetFilmState} />
                        <label>Описание</label>
                        <input id={formIds.descr} type='text' value={filmDescript} onChange={SetFilmState} />
                        <input className='filmBtn' type='button' value='Обновить' onClick={UpdateFilm}/>
                        <input className='filmBtn' type='button' value='Отмена' onClick={BacktrackChanges } />
                    </form>
                )}
            <div onClick={closeFunc}>!!close</div>
        </div>
    )
}