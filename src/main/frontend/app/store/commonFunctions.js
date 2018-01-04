import {RestAPI} from '@/net.js';

export const commonLoadData = (dispatch, url, loadingStartedType, loadingDoneType, loadingFailedType) =>{
    dispatch({ type: loadingStartedType });
    RestAPI.get(url).then((data)=>
        dispatch({ type: loadingDoneType, data}))
      .catch((data)=>
        dispatch({ type: loadingFailedType, data})
      );
};
