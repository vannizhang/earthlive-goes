import './style.scss'
import * as React from 'react';

import SceneView from '../SceneView';
import GoesLayer from '../GoesLayer';

import { getAvailableDates } from '../../services/GoesTileService';

import { IGoesAvailableDate } from '../../types'

interface IProps {

}

interface IState {
    goesAvailableDates:Array<IGoesAvailableDate>,
    index4ActiveDate:number
}

export default class App extends React.PureComponent<IProps, IState> {

    constructor(props:IProps){
        super(props);

        this.state = {
            goesAvailableDates: [],
            index4ActiveDate:0
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
        const { goesAvailableDates, index4ActiveDate } = this.state;

        return (
            <div className='app-content'>
                <SceneView>
                    <GoesLayer 
                        goesAvailableDates={goesAvailableDates}
                        index4ActiveDate={index4ActiveDate}
                    />
                </SceneView>
            </div>
        );
    }

    componentDidMount(){
        this.setGoesAvailableDates();
    }
}