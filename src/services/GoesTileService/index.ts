import { sendGetRequest } from '../../utils/HttpRequest';
import config from '../../config';

import { IGoesAvailableDate } from '../../types'

interface IGoesLayerMetadata {
    views: {
        columns: {
            date: Array<string>,
            select: Array<number>
        }
    }
};

// parse the date string "20191108T1820Z" from metadata into the actual date object
const parseDateString = (dateString:string)=>{
    const dateParts = dateString.substring(0, dateString.length - 1).split('T');

    const year = +dateParts[0].substring(0,4);
    const month = +dateParts[0].substring(4,6);
    const monthIdx = month - 1;
    const day = +dateParts[0].substring(6);

    const hour = +dateParts[1].substring(0,2);
    const minute = +dateParts[1].substring(2);

    return new Date(year, monthIdx, day, hour, minute);
}


const getAvailableDates = async (): Promise<Array<IGoesAvailableDate>>=>{
    const requestUrl = `${config["Goes-Layer-URL"]}?f=json`;
    
    try {
        const metadata = await sendGetRequest(requestUrl) as IGoesLayerMetadata;
        // console.log(metadata);

        if(!metadata.views || !metadata.views.columns){
            console.error('columns property is missing')
            return null;
        }

        const dates = metadata.views.columns.date;
        const select = metadata.views.columns.select;

        const avialableDates:Array<IGoesAvailableDate> = [];

        for (let i = 0, len = dates.length; i < len; i++){

            const mValue = select[i];
            const dateString = dates[i];
            const date = parseDateString(dateString);
            // console.log(date);

            const avialableDate:IGoesAvailableDate = {
                date,
                mValue
            };

            avialableDates.push(avialableDate);
        }

        return avialableDates;

    } catch(err){
        console.error(err);
        return null;
    }

};

export {
    getAvailableDates
}