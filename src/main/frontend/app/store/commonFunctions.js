import {RestAPI} from '@/net.js';

export const commonRESTRequest = (method, dispatch, url, loadingStartedType, loadingDoneType, loadingFailedType, id) =>{
    dispatch({ type: loadingStartedType });
    method(url).then((data)=>
      dispatch({ type: loadingDoneType, data, id}))
      .catch((data)=>
      dispatch({ type: loadingFailedType, data, id})
);
};
export const commonLoadData = (dispatch, url, loadingStartedType, loadingDoneType, loadingFailedType) =>{
    commonRESTRequest(RestAPI.get, dispatch, url, loadingStartedType, loadingDoneType, loadingFailedType);
};

export const commonDeleteData = (dispatch, url, loadingStartedType, loadingDoneType, loadingFailedType, id) =>{
    commonRESTRequest(RestAPI.delete, dispatch, url, loadingStartedType, loadingDoneType, loadingFailedType, id);
};
