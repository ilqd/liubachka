import $ from 'jquery';
import store from './store/store';
import {Promise} from 'es6-promise';

const commonRequestFunction = (url, data, requestType, userContentType) =>
 new Promise((resolve, reject) => {
     const csrf = store.getState().getIn(['session', 'csrf']);
     let formData;
     if (userContentType === false) {
         formData = data;
     } else {
         formData = JSON.stringify(data);
     }
     $.ajax({
         url,
         headers: {
             'X-CSRF-TOKEN': csrf,
         },
         method: requestType,
         data: formData,
         processData: false,
     /* eslint no-unneeded-ternary: ["error", { "defaultAssignment": true }]*/
         contentType: userContentType !== undefined ? userContentType :
      'application/json; charset=utf-8',
     }).done((responseData, textStatus, response) => {
         if (response && response.getResponseHeader('AuthSuccessful')) {
             resolve({ csrf: response.getResponseHeader('CSRF'),
            firstName: response.getResponseHeader('FirstName'),
            lastName: response.getResponseHeader('LastName'),
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
    post: (url, data, contentType) => commonRequestFunction(url, data, 'POST', contentType),
    patch: (url, data, contentType) => commonRequestFunction(url, data, 'PATCH', contentType),
    put: (url, data, contentType) => commonRequestFunction(url, data, 'PUT', contentType),
    delete: (url, data, contentType) => commonRequestFunction(url, data, 'DELETE', contentType),
};
