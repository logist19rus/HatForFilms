import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { HatRepository } from '../../Repository/HatRepository'

export function Hats() {
    const [myHats, setHats] = useState([]);

    let hatRep = new HatRepository();

    function refreshHatList() {
        hatRep.getMy().then(function (r) {
            let hatsMap = r.map(function (item, idx) {
                return (<NavLink className="hatLink" to={`/Hats/${item.id}`} key={idx}>{item.id}</NavLink>)
            });
            setHats(x => x = hatsMap);
        });
    }

    useEffect(() => {
        refreshHatList();   
    }, []);
    

    function createNewHat() {
        hatRep.createHatForMe().then(() => { refreshHatList(); });
    }

    return (
        <div id='workpls' className="hats">
            {myHats}
            <input id="creator" type='button' value='create new' onClick={createNewHat} />
        </div>
    );
}