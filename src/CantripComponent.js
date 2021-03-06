import React, { Component } from 'react';
import { Button, Accordion, Panel } from 'react-bootstrap';
import HeaderTitle from './Header.js';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';
import SpellsAccordion from './SpellAccordion.js';


class CantripComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            path: '',
            cantripSpells: []
        };
    }
    handler = (event) => {
        let path = event.target.value;
        this.setState({ redirect: true, path: path });
        if (path === '/') {
            window.location.reload();
        }
    }
    componentWillMount() {
        if (Object.keys(this.props.classObject).length !== 0) {
            let cantrips = this.props.classObject.classObject.Cantrips;
            this.setState({ cantripSpells: cantrips });
        }
    };

    render() {
        if (this.state.redirect) {
            return <Redirect push to={this.state.path} />;
        }
        if (this.state.cantripSpells.length > 0) {
            var header = <div>
                <HeaderTitle classTitle={this.props.classObject.className} levelTitle={this.props.classObject.classLevel}
                    featureName='Step 5: Add a new Cantrip' /> </div>;
            let panelTitle = "Available Cantrips :";
            var panelsList = <Panel header={panelTitle} eventKey={panelTitle} bsStyle="success">
                <SpellsAccordion spellsObject={this.state.cantripSpells} /> </Panel>;
        }
        return (
            <div className='container'>
                {header}
                <Accordion>
                    {panelsList}
                </Accordion>
                <div>
                    <Button className='navButton' onClick={this.handler.bind(this)} value='/Spells' disabled={this.state.cantripSpells.length === 0}>Back Page</Button>
                    <Button className='navButton' onClick={this.handler.bind(this)} value='/Done' disabled={this.state.cantripSpells.length === 0}>Next Page</Button>
                </div>
            </div>
        );
    }
}

export default CantripComponent;