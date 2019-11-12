import './style.scss';
import * as React from 'react';
import { loadModules, loadCss } from 'esri-loader';

import config from './config';

import ISceneView from 'esri/views/SceneView';
import IMap from 'esri/Map';

interface IProps {

}

interface IState {
    sceneView:ISceneView
}

export default class SceneView extends React.PureComponent<IProps, IState> {

    private sceneViewContainerRef = React.createRef<HTMLDivElement>();

    constructor(props:IProps){
        
        super(props);

        this.state = {
            sceneView: null
        };

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

            sceneView.when(()=>{
                this.setSecenView(sceneView);
            })

        } catch(err){
            console.error(err);
        }

    }

    setSecenView(sceneView:ISceneView){
        this.setState({
            sceneView
        });
    }

    render(){

        const { sceneView } = this.state;

        const childrenElements = React.Children.map(
            this.props.children,
            (child) => {
                return React.cloneElement(child as React.ReactElement<any>, {
                    sceneView,
                });
            }
        );

        return (
            <div
                className='secene-view-wrap'
            >
                <div 
                    className='scene-view-container'
                    ref={this.sceneViewContainerRef}
                ></div>
                { childrenElements }
            </div>

        );
    }

    componentDidMount(){
        this.initSceneView();
    }
}