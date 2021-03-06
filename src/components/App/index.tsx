import './style.scss'
import * as React from 'react';

import SceneView from '../SceneView';
import GoesLayer from '../GoesLayer';
import TimeControl from '../TimeControl'; 

import { getAvailableDates } from '../../services/GoesTileService';

import { IGoesAvailableDate } from '../../types'

interface IProps {

}

interface IState {
    goesAvailableDates:Array<IGoesAvailableDate>,
    index4ActiveDate:number,
    isPlaying:boolean
}

export default class App extends React.PureComponent<IProps, IState> {

    constructor(props:IProps){
        super(props);

        this.state = {
            goesAvailableDates: [],
            index4ActiveDate:0,
            isPlaying:false
        };

        this.index4ActiveDateOnChange = this.index4ActiveDateOnChange.bind(this);
        this.toggleIsPlaying = this.toggleIsPlaying.bind(this);
        this.move2NextOrPrevDate = this.move2NextOrPrevDate.bind(this);
    }

    index4ActiveDateOnChange(newIndex:number){
        this.setState({
            index4ActiveDate: newIndex
        });
    }

    move2NextOrPrevDate(isDecrement:false){
        const { index4ActiveDate, goesAvailableDates } = this.state;

        let newIdx = index4ActiveDate;

        if(isDecrement){
            newIdx = newIdx - 1 >= 0 ? newIdx - 1 : goesAvailableDates.length - 1;
        } else {
            newIdx = newIdx + 1 < goesAvailableDates.length ? newIdx + 1 : 0;
        }

        this.index4ActiveDateOnChange(newIdx);
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

    toggleIsPlaying(){
        const { isPlaying } = this.state;

        this.setState({
            isPlaying: !isPlaying
        });
    }

    render(){
        const { goesAvailableDates, index4ActiveDate, isPlaying } = this.state;

        return (
            <div className='app-content'>
                <SceneView>
                    <GoesLayer 
                        goesAvailableDates={goesAvailableDates}
                        index4ActiveDate={index4ActiveDate}
                        isPlaying={isPlaying}

                        index4ActiveDateOnChange={this.index4ActiveDateOnChange}
                    />
                </SceneView>

                <div className='time-control-wrap'>
                    <TimeControl 
                        goesAvailableDates={goesAvailableDates}
                        index4ActiveDate={index4ActiveDate}
                        isPlaying={isPlaying}
                        onTogglePlay={this.toggleIsPlaying}
                        nextAndPreviousBtnOnClick={this.move2NextOrPrevDate}
                    />
                </div>
            </div>
        );
    }

    componentDidMount(){
        this.setGoesAvailableDates();
    }
}