// import * as React from 'react';
import { useEffect, useState } from 'react';
import { loadModules } from 'esri-loader';

import config from '../../config';


import ISceneView from 'esri/views/SceneView';
import IMap from 'esri/Map';
import IWebTileLayer from 'esri/layers/WebTileLayer';
import { IGoesAvailableDate } from '../../types';

interface IProps {
    sceneView?:ISceneView,
    goesAvailableDates:Array<IGoesAvailableDate>,
    index4ActiveDate:number
}

const GoesLayer = ({
    sceneView = null,
    goesAvailableDates = [],
    index4ActiveDate = 0
}:IProps):null => {

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
        
    }

    const addEventsWatcher2GoesLayer = async(goesLayer:IWebTileLayer)=>{
        try {
            const layerView = await sceneView.whenLayerView(goesLayer);
            console.log('layerView 4 goes layer', layerView);
        } catch(err){
            console.error('failed to add', err);
        }
    }

    const initGoesLayers = async ()=>{
        try {
            const goesLayer = await getGoesLayer(index4ActiveDate);
            sceneView.map.add(goesLayer);

            addEventsWatcher2GoesLayer(goesLayer);
        } catch(err){
            console.error(err);
        }
    };

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

    return null;
}

export default GoesLayer;