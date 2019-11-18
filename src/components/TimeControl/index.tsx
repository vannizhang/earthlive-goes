import './style.scss';
import * as React from 'react';
import { IGoesAvailableDate } from '../../types';
import { format } from 'date-fns'

interface IProps {
    isPlaying:boolean
    goesAvailableDates:Array<IGoesAvailableDate>,
    index4ActiveDate:number,
    onTogglePlay:()=>void,
    nextAndPreviousBtnOnClick:(isClickOnPrevBtn?:boolean)=>void
}

export default class TimeControl extends React.PureComponent<IProps> {
    constructor(props:IProps){
        super(props);
    }

    render(){
        const { isPlaying, goesAvailableDates, index4ActiveDate, onTogglePlay, nextAndPreviousBtnOnClick } = this.props;

        if(!goesAvailableDates || !goesAvailableDates.length){
            return null;
        }

        const activeDate = goesAvailableDates[index4ActiveDate];

        const activeDateLabel = format(activeDate.date, 'yyyy-MM-dd HH:mm aaa')
        // const activeDateDayLabel = format(activeDate.date, 'yyyy-MM-dd')
        // const activeDateTimeLabel = format(activeDate.date, 'HH:mm aaa')

        return (
            <div className='time-control'>
                
                <div className="play-btn widget-btn" onClick={onTogglePlay}>
                    {isPlaying ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            height="32"
                            width="32"
                        >
                            <path d="M11 6H8a2.006 2.006 0 0 0-2 2v15a2.006 2.006 0 0 0 2 2h3a2.006 2.006 0 0 0 2-2V8a2.006 2.006 0 0 0-2-2zm1 17a1.001 1.001 0 0 1-1 1H8a1.001 1.001 0 0 1-1-1V8a1.001 1.001 0 0 1 1-1h3a1.001 1.001 0 0 1 1 1zM23 6h-3a2.006 2.006 0 0 0-2 2v15a2.006 2.006 0 0 0 2 2h3a2.006 2.006 0 0 0 2-2V8a2.006 2.006 0 0 0-2-2zm1 17a1.001 1.001 0 0 1-1 1h-3a1.001 1.001 0 0 1-1-1V8a1.001 1.001 0 0 1 1-1h3a1.001 1.001 0 0 1 1 1z" />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            height="32"
                            width="32"
                        >
                            <path d="M9 5v21l16-10.498zm1 1.853l13.177 8.65L10 24.147z" />
                        </svg>
                    )}
                </div>

                <div className="info-window">
                    <span className="font-size-0 avenir-light">{activeDateLabel}</span>
                </div>

                <div className="previous-btn widget-btn" onClick={nextAndPreviousBtnOnClick.bind(this, true)}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        height="24"
                        width="24"
                    >
                        <path d="M6.675 12L15 3.675v16.65z" />
                    </svg>
                </div>

                <div className="next-btn widget-btn" onClick={nextAndPreviousBtnOnClick.bind(this, false)}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        height="24"
                        width="24"
                    >
                        <path d="M9 3.675L17.325 12 9 20.325z" />
                    </svg>
                </div>

            </div>
        )
    }
}