// import * as React from 'react';
import { useEffect, useState } from 'react';
import { loadModules } from 'esri-loader';

import config from '../../config';


import ISceneView from 'esri/views/SceneView';
// import IMap from 'esri/Map';
import IWebTileLayer from 'esri/layers/WebTileLayer';
import IWatchUtils from 'esri/core/watchUtils';
import { IGoesAvailableDate } from '../../types';

interface IProps {
    sceneView?:ISceneView,
    goesAvailableDates:Array<IGoesAvailableDate>,
    index4ActiveDate:number,
    isPlaying:boolean

    index4ActiveDateOnChange:(newIndex:number)=>void
}

const GoesLayer = ({
    sceneView = null,
    goesAvailableDates = [],
    index4ActiveDate = 0,
    isPlaying = false,

    index4ActiveDateOnChange = ()=>{}
}:IProps):null => {

    const [ goesLayersInSceneView, setGoesLayersInSceneView ] = useState([] as Array<IWebTileLayer>);

    const unshit2GoesLayersInSceneView = (layer:IWebTileLayer)=>{
        const layers = [layer, ...goesLayersInSceneView];
        setGoesLayersInSceneView(layers);
    };

    const popFromGoesLayersInSceneView = ()=>{
        const layers = [...goesLayersInSceneView];
        layers.pop();
        setGoesLayersInSceneView(layers);
    };

    const getUrlTemplate = (index=0)=>{
        const mVal = goesAvailableDates[index].mValue;
        const baseUrl = config["Goes-Layer-URL"];
        return `${baseUrl}/tile/${mVal}/{level}/{row}/{col}`;
    };

    const getGoesLayer = async(index=0)=>{

        try {
            type Modules = [
                typeof IWebTileLayer
            ];

            const [ WebTileLayer ] = await (loadModules([
                'esri/layers/WebTileLayer',
            ]) as Promise<Modules>);

            const urlTemplate = getUrlTemplate(index);

            const goesLayer = new WebTileLayer({
                // maxScale: 4000000,
                urlTemplate
            });

            return goesLayer;

        } catch(err){
            console.error(err);
            return null;
        }
        
    };

    const initGoesLayers = async()=>{

        try {

            const layers = [];

            for(let i = 2; i >=0 ; i--){
                const goesLayer = await getGoesLayer(i);

                sceneView.map.add(goesLayer);

                layers.push(goesLayer);
            }

            setGoesLayersInSceneView(layers);

        } catch(err){
            console.error(err);
        }
    };

    const preloadGoesLayer = async (): Promise<IWebTileLayer>=>{

        return new Promise(async(resolve, reject)=>{

            try {
                type Modules = [
                    typeof IWatchUtils
                ];
    
                const [ watchUtils ] = await (loadModules([
                    'esri/core/watchUtils',
                ]) as Promise<Modules>);
    
                const newGoesLayerToAdd = await getGoesLayer(index4ActiveDate + 2);
                // console.log('newGoesLayerToAdd', newGoesLayerToAdd);
    
                sceneView.map.add(newGoesLayerToAdd, 0);
    
                const layerView = await sceneView.whenLayerView(newGoesLayerToAdd);
                // console.log('layerView 4 goes layer', layerView);
    
                watchUtils.whenFalseOnce(layerView, 'updating', (updating)=>{
                    // console.log('preloadGoesLayer is ready');
                    resolve(newGoesLayerToAdd)
                });
    
            } catch(err){
                console.error('failed to add', err);
                reject(err);
            }
        });

    };

    const turnOffTopMostGoesLayer = ()=>{

        const goesLayerToTurnOff = goesLayersInSceneView[goesLayersInSceneView.length - 1];

        // console.log('goesLayerToTurnOff', goesLayerToTurnOff)

        sceneView.map.remove(goesLayerToTurnOff);

        popFromGoesLayersInSceneView();
    };

    const showNextGoesLayer = async()=>{

        try {
            const layer2Preload = await preloadGoesLayer();

            unshit2GoesLayersInSceneView(layer2Preload);

            const newIdx = index4ActiveDate + 1 < goesAvailableDates.length ? index4ActiveDate + 1 : 0;

            index4ActiveDateOnChange(newIdx);

        } catch(err){
            console.error(err);
        }
    }

    useEffect(() => {
        if( sceneView && goesAvailableDates.length ){
            initGoesLayers();
        }
    }, [ sceneView, goesAvailableDates ]);

    useEffect(() => {
        if( sceneView && goesAvailableDates.length ){
            console.log('index4ActiveDate', index4ActiveDate)
        }
    }, [ index4ActiveDate ]);

    useEffect(() => {
        if( sceneView && goesAvailableDates.length && isPlaying ){
            // console.log('isPlaying', isPlaying)
            showNextGoesLayer();
        }
    }, [ isPlaying ])

    useEffect(() =>{
        // console.log('goesLayersInSceneView is changed', goesLayersInSceneView)

        if(goesLayersInSceneView.length > 3){
            turnOffTopMostGoesLayer();
        } else {
            if(isPlaying){
                showNextGoesLayer();
            }
        }

    }, [ goesLayersInSceneView ])

    return null;
}

export default GoesLayer;