import './style.scss';
import * as React from 'react';

interface IProps {
    isPlaying:boolean
    onTogglePlay:()=>void
}

export default class TimeControl extends React.PureComponent<IProps> {
    constructor(props:IProps){
        super(props);
    }

    render(){
        const { isPlaying, onTogglePlay } = this.props;

        return (
            <div className='time-control'>
                <div onClick={onTogglePlay}>{ !isPlaying ? 'Play' : 'Stop' }</div>
            </div>
        )
    }
}