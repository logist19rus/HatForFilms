import React, { useEffect, useState } from 'react';
import { HatRepository } from '../../Repository/HatRepository'
import { FilmRepository } from '../../Repository/FilmRepository'
import { CheckAccountCookies} from './.././.././cookies/accountCookies'

export function OneHat(props) {
    let prodId = props.match.params.id;
    let hatRep = new HatRepository();
    let filmRep = new FilmRepository();
    let accId = CheckAccountCookies().id;

    const [hat, setHat] = useState({});
    const [searchStr, setSearchStr] = useState("");
    const [filmsToAdd, setFilmsToAdd] = useState([]);
    const [films, setFilms] = useState([]);
    const [isOwner, setIsOwner] = useState(false);
    const [member, setMember] = useState(-1);

    useEffect(() => {
        hatRep.getSingle(prodId).then(function (res) {
            if (res != null) {
                setHat(x => x = res);
                let filmMap = res.films.map(function (f, id) {
                    return (<li key={id}>{f.film.name}</li>)
                });
                setFilms(x => x = filmMap);
                console.log(hat);
                console.log(accId);
                setIsOwner(x => x = (res.creatorId == accId ? true : false));
                setMember(x => x = res.memberId);
            }
        });

        return;
    }, []);

    function onSearchChange(e) {
        let target = e.target;
        let val = '';
        if (target == null) {
            return;
        }
        val = target.value;

        setSearchStr(x => x = val);
    }

    function addToHat(id) {
        let hatId = prodId;
        let filmId = id;
        let msg = "Добавить в шляпу " + hatId + " фильм " + filmId + "?";
        hatRep.addNewFilm(hatId, filmId);
        console.log('add' + id);
        window.location.reload();
    }

    function searchFilm() {
        filmRep.searchByName(searchStr).then(function (res) {
            console.log(res);
            let filmsMap = res.map(function (f, id) {
                return (<li className='searchedFilm' key={id} onClick={() => addToHat(f.id)}>{f.name}</li>)
            });
            setFilmsToAdd(x => x = filmsMap);
        });
    }

    function onMemberChange(e) {
        let target = e.target;
        let val = '';
        if (target == null) {
            return;
        }
        val = target.value;

        setMember(x => x = val);
    }

    function changeMember() {
        hatRep.changeMember(hat.id, member);
        window.location.reload();
    }

    return (<div>
        <div>
            hat id - {hat.id}
        </div>
        {isOwner ?
            (<div className="isOwnerMenu">
                <p>Назначить второго участника для данной шляпы</p>
                <input type="text" onChange={onMemberChange} value={member} />
                <input type="button" value="Переназначить" onClick={changeMember} />
            </div>) :
            (<div className="isMemberMenu">
                Вы не можете назначать второго участника т.к. не являетесь создателем
            </div>)}
        <p>Ваши фильмы в шляпе</p>
        <ul className="filmsInHat">
            {films}
        </ul>
        <div className="searchBlok">
            <p>Добавить новый фильм</p>
            <input type='text' className='searchByName' value={searchStr} onChange={onSearchChange} />
            <input type='button' value='Найти' onClick={searchFilm} />
        </div>
        <ul className="filmsToAdd">
            {filmsToAdd}
        </ul>
    </div>);
}