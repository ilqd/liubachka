import $ from 'jquery';
import store from '@/store/store';
import {Promise} from 'es6-promise';
import {logout} from '@/store/useraccount.store';

const commonRequestFunction = (url, data, requestType, userContentType, showProgress) =>
 new Promise((resolve, reject) => {
     const csrf = store.getState().getIn(['session', 'csrf']);
     let formData;
     if (userContentType === false) {
         formData = data;
     } else {
         formData = JSON.stringify(data);
     }
     let lastResponseLength = false;
     $.ajax({
         xhr: () => {
             const xhr = new window.XMLHttpRequest();
             if (showProgress) {
                 xhr.upload.addEventListener('progress', evt => {
                     if (evt.lengthComputable) {
                         const percentComplete = evt.loaded / evt.total;
                         store.dispatch({type: 'UPLOAD_PROGRESS', progress: percentComplete * 50});
                     }
                 }, false);
             }
             return xhr;
         },
         xhrFields: {
            // Getting on progress streaming response
             onprogress: (e) => {
                 if (showProgress) {
                     let progressResponse;
                     const response = e.currentTarget.response;
                     if (lastResponseLength === false) {
                         progressResponse = response;
                         lastResponseLength = response.length;
                     } else {
                         progressResponse = response.substring(lastResponseLength);
                         lastResponseLength = response.length;
                     }
                     const responseArray = progressResponse.trim().split(' ');
                     const lastElem = responseArray[responseArray.length - 1];
                     store.dispatch({type: 'UPLOAD_PROGRESS', progress: lastElem.trim() / 2 + 50});
                 }
             }
         },
         url,
         headers: {
             'X-CSRF-TOKEN': csrf,
         },
         method: requestType,
         data: formData,
         processData: false,
     /* eslint no-unneeded-ternary: ["error", { "defaultAssignment": true }]*/
         contentType: userContentType !== undefined ? userContentType :
      'application/json; charset=utf-8'
     }).done((responseData, textStatus, response) => {
         if (response.getResponseHeader('sessionexpired')) {
             logout(store.dispatch);
         } else if (response && response.getResponseHeader('AuthSuccessful')) {
             const person = JSON.parse(responseData);
             resolve({ csrf: response.getResponseHeader('CSRF'),
            firstName: person.FirstName,
            lastName: person.LastName,
            userId: response.getResponseHeader('UserId'),
            roles: response.getResponseHeader('Roles') });
         } else {
             resolve(responseData);
         }
     }).fail((response) => {
         const error = response.responseText && response.responseText != ''
       ? JSON.parse(response.responseText)
       : response;
         const status = response.status;
         reject(
         { ...error, status }
       );
     });
 });

export const RestAPI = {
    get: (url, data, contentType) => commonRequestFunction(url, data, 'GET', contentType),
    postWithProgress: (url, data, contentType) => commonRequestFunction(url, data, 'POST', contentType, true),
    post: (url, data, contentType) => commonRequestFunction(url, data, 'POST', contentType),
    patch: (url, data, contentType) => commonRequestFunction(url, data, 'PATCH', contentType),
    put: (url, data, contentType) => commonRequestFunction(url, data, 'PUT', contentType),
    delete: (url, data, contentType) => commonRequestFunction(url, data, 'DELETE', contentType),
};
