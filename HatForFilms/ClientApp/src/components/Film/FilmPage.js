import React, { useEffect, useState } from 'react';
import { CheckAccountCookies } from './.././.././cookies/accountCookies'
import { FilmRepository } from '../../Repository/FilmRepository'
import '../Film/filmStyle.css'

export function FilmPage(modalInfo) {
    let filmRep = new FilmRepository();
    const [filmName, setFilmName] = useState('');
    const [filmDescript, setFilmDescript] = useState('');
    const [filmWatchLink, setWatchLink] = useState('');
    const [filmImageLink, setImageLink] = useState('');
    const [filmSeriesCount, setSeriesCount] = useState(0);
    const [isOwner, setIsOwner] = useState(false);
    const [changeStatus, setChangeStatus] = useState(false);

    const formIds = {
        name: 'filmName',
        descr: 'filmDescr',
        link: 'watchLink',
        series: 'countSeries',
        image: 'imageLink'
    }

    let film = modalInfo.value.film;
    let closeFunc = modalInfo.value.closeFunc;
    let refreshFilms = modalInfo.value.refreshFilms;

    console.log(film);

    useEffect(() => {
        let accId = CheckAccountCookies().id;
        LoadDefaultValues();
        if (accId == film.ownerId) {
            console.log('isOwnre');
            setIsOwner(x => x = true);
        }
    }, []);

    function BacktrackChanges() {
        LoadDefaultValues();
        setChangeStatus(x => x = false);
    }

    function LoadDefaultValues() {
        setFilmName(x => x = film.name);
        setFilmDescript(x => x = film.description);
        setWatchLink(x => x = film.linkForWatch);
        setSeriesCount(x => x = film.countOfSeries);
        setImageLink(x => x = film.photoSrc);
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
        else if (t.id == formIds.link) {
            setWatchLink(x => x = t.value);
        }
        else if (t.id == formIds.image) {
            setImageLink(x => x = t.value);
        }
        else if (t.id == formIds.series) {
            if (t.value > 0) {
                setSeriesCount(x => x = t.value);
            }
            else {
                setSeriesCount(x => x = 1);
            }
        }
    }

    function UpdateFilm() {
        let updatedFilm = {
            Id: film.id,
            Name: filmName,
            Description: filmDescript,
            Link: filmWatchLink,
            Count: parseInt(filmSeriesCount),
            Image: filmImageLink
        };
        filmRep.updateFilm(updatedFilm).then((res) => {
            refreshFilms(film.id);
            setChangeStatus(x => x = false);
        });
    }

    return (
        <div className='filmModal'>
            <div className='close' onClick={closeFunc}>close</div>
            {!changeStatus ?
                (
                    <div className='filmContent'>
                        <div className='filmLeftSide'>
                            <img src={film.photoSrc} width='700px' height='1000px' alt='avoid' />
                            <a href={film.linkForWatch}>Смотреть</a>
                        </div>
                        <div className='filmRightSide'>
                            <h2 className='filmName'>{film.name}</h2>
                            <div className='filmDescription'>{film.description}</div>
                            {film.countOfSeries > 1 ? (<p>Серий: {film.countOfSeries}</p>) : null}
                        </div>
                        <div className='filmBottomSide'>
                            {isOwner ? (< input type='button' value='Изменить информацию о фильме' onClick={() => { setChangeStatus(x => x = true) }} />) : null}
                        </div>
                    </div>
                ) : (
                    <form className='filmContent filmForm'>
                        <div className='filmInputs'>
                            <label>Название</label>
                            <input id={formIds.name} type='text' value={filmName} onChange={SetFilmState} />
                            <label>Описание</label>
                            <textarea id={formIds.descr} onChange={SetFilmState}>
                                {filmDescript}
                            </textarea>
                            <label>Ссылка на постер</label>
                            <input id={formIds.image} type='text' value={filmImageLink} onChange={SetFilmState} />
                            <label>Ссылка на просмотр</label>
                            <input id={formIds.link} type='text' value={filmWatchLink} onChange={SetFilmState} />
                            <label>Количество серий</label>
                            <input id={formIds.series} type='text' value={filmSeriesCount} onChange={SetFilmState} />
                        </div>
                        <div className='filmActionBlock'>
                            <input className='filmBtn' type='button' value='Обновить' onClick={UpdateFilm} />
                            <input className='filmBtn' type='button' value='Отмена' onClick={BacktrackChanges} />
                        </div>
                    </form>
                )}
        </div>
    )
}