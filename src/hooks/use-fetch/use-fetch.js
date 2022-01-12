import { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import parse from 'parse-link-header';
import { sendRequest } from '~/services';
import {
  AppActionTypes,
  FetchingStatuses,
  ResponseStatusTexts,
} from '~/constants';
import { getUnknownActionTypeMsg } from '~/utils';

/**
 * Object with data from server request
 * @typedef {Object} payloadObject
 * @property {array} data - data from server response
 * @property {Object} headerLink - link header from server response
 * @property {string} totalCount - x-total-count header from server response
 */

/**
 * Function to send request manually
 * @function fetchDataFunction
 * @param {string} url - request url
 */

/**
 * Object with data from server response and useFetch hook status
 * @typedef {Object} stateObject
 * @property {string} status - useFetch hook status, can be one of FetchingStatuses enum constants
 * @property {array} data - data from server response
 * @property {Object} headerLink - link header from server response
 * @property {string} totalCount - x-total-count header from server response
 * @property {undefined|string} error - request error message
 * @property {string} url - request url
 */

/**
 * Callback to run if request was successful
 * @callback onSuccessCallback
 * @param {payloadObject} payload - contains data from server request
 */

/**
 * Callback to run if request failed
 * @callback onFailCallback
 * @param {message} string - error message
 */

/**
 * Object with output data of useFetch hook
 * @typedef {Object} Output
 * @property {fetchDataFunction} fetchData - function to send request manually
 * @property {stateObject} state - data from server response and useFetch hook status
 */

/**
 * Custom React hook for data fetching without caching
 * @param {string} [url] - if not transfered, request won't start automatically, call fetchData to send request manually
 * @param {Object} [post] - if transfered, request type will be "post"
 * @param {function} [onRequest=()=>false] - callback to run before request was sent
 * @param {onSuccessCallback} [onSuccess=()=>false] - callback to run if request was successful
 * @param {onFailCallback} [onFail=()=>false] - callback to run if request failed
 * @return {Output} - output object
 */

const useFetch = (props) => {
  const HOOK_NAME = 'useFetch';

  const propTypes = {
    url: PropTypes.string,
    post: PropTypes.object,
    onRequest: PropTypes.func,
    onSuccess: PropTypes.func,
    onFail: PropTypes.func,
  };

  PropTypes.checkPropTypes(propTypes, props, 'prop', HOOK_NAME);

  const {
    url,
    post,
    onRequest = () => false,
    onSuccess = () => false,
    onFail = () => false,
  } = props;

  const initialState = {
    status: FetchingStatuses.IDLE,
    data: [],
    headerLink: {},
    totalCount: '',
    error: undefined,
    url,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case AppActionTypes.IDLE:
        return Object.assign({}, initialState);
      case AppActionTypes.START:
        return Object.assign({}, initialState, {
          status: FetchingStatuses.START,
          url: action.payload,
        });
      case AppActionTypes.LOADING:
        return Object.assign({}, state, {
          status: FetchingStatuses.LOADING,
        });
      case AppActionTypes.LOADED:
        return Object.assign({}, state, {
          status: FetchingStatuses.LOADED,
          data: action.payload.data,
          headerLink: action.payload.headerLink,
          totalCount: action.payload.totalCount,
        });
      case AppActionTypes.ERROR:
        return Object.assign({}, state, {
          status: FetchingStatuses.ERROR,
          error: action.payload,
        });
      default:
        throw new Error(getUnknownActionTypeMsg(HOOK_NAME));
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = (newUrl) => {
    dispatch({
      type: AppActionTypes.START,
      payload: newUrl,
    });
  };

  useEffect(() => {
    const onRequestSuccess = (response) => {
      const { data, headers } = response;
      const payload = {
        data,
        headerLink: parse(headers.link),
        totalCount: headers['x-total-count'],
      };

      onSuccess(payload);

      dispatch({
        type: AppActionTypes.LOADED,
        payload,
      });
    };

    const onRequestError = (message) => {
      onFail(message);

      dispatch({
        type: AppActionTypes.ERROR,
        payload: message,
      });
    };

    const startRequest = () => {
      onRequest();

      dispatch({ type: AppActionTypes.LOADING });

      sendRequest({
        data: post,
        onSuccess: onRequestSuccess,
        onError: onRequestError,
        responseStatusText: ResponseStatusTexts.OK,
        url: state.url,
      });
    };

    if (state.url && state.url.length && (
      state.status === FetchingStatuses.IDLE ||
      state.status === FetchingStatuses.START
    )) {
      startRequest();
    }
  }, [
    url,
    post,
    state,
    onRequest,
    onSuccess,
    onFail,
  ]);

  return { fetchData, state };
};

export default useFetch;