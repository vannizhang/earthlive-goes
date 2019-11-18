import { urlFns } from 'helper-toolkit-ts';
import config from '../../config';

const urlQueryParam = urlFns.parseQuery();

const getServiceUrl = ()=>{
    return urlQueryParam['goesLayerUrl'] || config["Goes-Layer-URL"];
};

export {
    getServiceUrl
};