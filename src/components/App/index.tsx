import './style.scss'
import * as React from 'react';

import SceneView from '../SceneView';

export default class App extends React.PureComponent {

    render(){
        return (
            <div className='app-content'>
                <SceneView />
            </div>
        );
    }
}