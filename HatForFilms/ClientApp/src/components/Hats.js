import React, { useEffect, useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import { OneHat } from '././Hat/HatModal'
import { Hats } from '././Hat/Hats'
import './Hat/hat.css'

export function myHatList() {
    return (
            <div>
                <Switch>
                    <Route exact path="/Hats" component={Hats} />
                    <Route path="/Hats/:id" component={OneHat} />
                </Switch>
            </div>
    );
}
