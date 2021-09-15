import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
    static displayName = Layout.name;
    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        return (
            <div>
                <NavMenu />
                <Container value={'asd'}>
                    {this.props.children}
                </Container>
            </div>
        );
    }
}
