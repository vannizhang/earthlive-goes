import axios from 'axios';

const sendGetRequest = (requestUrl:string)=>{
    return new Promise((resolve, reject)=>{

        axios.get(requestUrl).then(res=>{
            if(res.data){
                resolve(res.data);
            } else {
                reject({error: 'request failed'});
            }
        }).catch(err=>{
            reject(err);
        });
    })
};

export {
    sendGetRequest
};