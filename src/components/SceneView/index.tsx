import './style.scss';
import * as React from 'react';
import { loadModules, loadCss } from 'esri-loader';

import config from './config';

import ISceneView from 'esri/views/SceneView';
import IMap from 'esri/Map';

interface IProps {

}

interface IState {

}

export default class SceneView extends React.PureComponent<IProps, IState> {

    private sceneViewContainerRef = React.createRef<HTMLDivElement>();

    constructor(props:IProps){
        super(props);

        loadCss();
    }

    async initSceneView(){

        try {

            const container = this.sceneViewContainerRef.current;

            type Modules = [
                typeof ISceneView,
                typeof IMap,
            ];

            const [SceneView, Map] = await (loadModules([
                'esri/views/SceneView',
                'esri/Map',
            ]) as Promise<Modules>);

            const map = new Map({
                ground: "world-elevation"
            });
      
            const sceneView = new SceneView({
                container,
                map,
                scale: config["secene-view"].scale,
                center: config["secene-view"].center
            });

        } catch(err){
            console.error(err);
        }

    }

    render(){
        return (
            <div 
                className='scene-view-container'
                ref={this.sceneViewContainerRef}
            >
            </div>
        );
    }

    componentDidMount(){
        this.initSceneView();
    }
}