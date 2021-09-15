import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { HatRepository } from '../../Repository/HatRepository'

export function Hats() {
    const [myHats, setHats] = useState([]);

    let hatRep = new HatRepository();

    useEffect(() => {
        hatRep.getMy().then(function (r) {
            console.log('start read');
            console.log(r);
            let hatsMap = r.map(function (item, idx) {
                return (<NavLink className="hatLink" to={`/Hats/${item.id}`} key={idx}>{item.id}</NavLink>)
            });
            setHats(x => x = hatsMap);
        });

        const hatsCreateBtn = document.getElementById("creator");
        hatsCreateBtn.addEventListener('click', createNewHat);

        return () => {
            hatsCreateBtn.removeEventListener('click', createNewHat);
        }

    }, []);

    function createNewHat() {
        hatRep.createHatForMe();
        window.location.reload();
    }

    return (
        <div id='workpls' className="hats">
            {myHats}
            <input id="creator" type='button' value='create new' />
        </div>
    );
}