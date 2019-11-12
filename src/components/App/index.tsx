import './style.scss'
import * as React from 'react';

import SceneView from '../SceneView';

import { getAvailableDates } from '../../services/GoesTileService';

import { IGoesAvailableDate } from '../../types'

interface IProps {

}

interface IState {
    goesAvailableDates:Array<IGoesAvailableDate>
}

export default class App extends React.PureComponent<IProps, IState> {

    constructor(props:IProps){
        super(props);

        this.state = {
            goesAvailableDates: []
        }
    }

    async setGoesAvailableDates(){

        try {
            const goesAvailableDates = await getAvailableDates();
            console.log('goesAvailableDates', goesAvailableDates)

            this.setState({
                goesAvailableDates
            });

        } catch(err){
            console.error(err);
        }
    }

    render(){
        return (
            <div className='app-content'>
                <SceneView />
            </div>
        );
    }

    componentDidMount(){
        this.setGoesAvailableDates();
    }
}