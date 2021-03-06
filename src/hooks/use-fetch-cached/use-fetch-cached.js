import { useCallback, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import parse from 'parse-link-header';
import { sendRequest } from '~/services';
import { AppActionTypes, FetchingStatuses, HttpHeaders } from '~/constants';
import { throwUnknownActionError } from '~/utils';

/**
 * Object with data from server response
 * @typedef {Object} payloadObject
 * @property {array} data - data from server response
 * @property {Object} headerLink - link header from server response
 * @property {string} totalCount - x-total-count header from server response
 */

/**
 * Object with useRef .current property
 * @typedef {Object} cacheObjectCurrent
 * @property {...Object.<string, payloadObject>} - objects that have request url as key and payloadObject as value
 */

/**
 * Object with server response cached data (mutable ref object from useRef hook)
 * @typedef {Object} cacheObject
 * @property {cacheObjectCurrent} current - useRef .current property
 */

/**
 * Function to send request manually
 * @function fetchDataFunction
 * @param {string} url - request url
 */

/**
 * Object with data from server response and useFetch hook status
 * @typedef {Object} stateObject
 * @property {string} url - request url
 * @property {array} data - data from server response
 * @property {Object} headerLink - link header from server response
 * @property {string} totalCount - x-total-count header from server response
 * @property {string} status - useFetch hook status, can be one of FetchingStatuses enum constants
 */

/**
 * Callback to run if request was successful
 * @callback onSuccessCallback
 * @param {payloadObject} payload - contains data from server response
 */

/**
 * Callback to run if request failed
 * @callback onErrorCallback
 * @param {message} string - error message
 */

/**
 * Object with output data of useFetch hook
 * @typedef {Object} Output
 * @property {cacheObject} cache - object with server response cached data
 * @property {fetchDataFunction} fetchData - function to send request manually
 * @property {stateObject} state - data from server response and useFetch hook status
 */

/**
 * Custom React hook for data fetching with caching
 * @param {string} [url] - if not transfered, request won't start automatically, call fetchData to send request manually
 * @param {function} [onRequest=()=>false] - callback to run before request was sent
 * @param {onSuccessCallback} [onSuccess=()=>false] - callback to run if request was successful
 * @param {onErrorCallback} [onError=()=>false] - callback to run if request failed
 * @return {Output} - output object
 */

const useFetchCached = (props) => {
  const HOOK_NAME = 'useFetchCached';

  const propTypes = {
    url: PropTypes.string,
    onRequest: PropTypes.func,
    onSuccess: PropTypes.func,
    onError: PropTypes.func,
  };

  PropTypes.checkPropTypes(propTypes, props, 'prop', HOOK_NAME);

  const {
    url,
    onRequest = () => false,
    onSuccess = () => false,
    onError = () => false,
  } = props;

  const cache = useRef({});

  const initialState = {
    url,
    data: [],
    headerLink: {},
    totalCount: '',
    status: FetchingStatuses.IDLE,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case AppActionTypes.IDLE:
        return { ...initialState };
      case AppActionTypes.START:
        return {
          ...initialState,
          status: FetchingStatuses.START,
          url: action.payload,
        };
      case AppActionTypes.LOADING:
        return {
          ...state,
          status: FetchingStatuses.LOADING,
        };
      case AppActionTypes.LOADED:
        return {
          ...state,
          status: FetchingStatuses.LOADED,
          data: action.payload.data,
          headerLink: action.payload.headerLink,
          totalCount: action.payload.totalCount,
        };
      case AppActionTypes.ERROR:
        return {
          ...state,
          status: FetchingStatuses.ERROR,
        };
      default:
        throwUnknownActionError(HOOK_NAME);
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = useCallback((newUrl) => {
    dispatch({
      type: AppActionTypes.START,
      payload: newUrl,
    });
  }, []);

  useEffect(() => {
    const onRequestSuccess = (response) => {
      const { data, headers } = response;
      const payload = {
        data,
        headerLink: parse(headers.link),
        totalCount: headers[HttpHeaders.X_TOTAL_COUNT],
      };

      onSuccess(payload);
      cache.current[state.url] = payload;

      dispatch({
        type: AppActionTypes.LOADED,
        payload,
      });
    };

    const onRequestError = (message) => {
      onError(message);

      dispatch({
        type: AppActionTypes.ERROR,
        payload: message,
      });

      throw new Error(message);
    };

    const startRequest = () => {
      onRequest();

      dispatch({ type: AppActionTypes.LOADING });

      if (cache.current[state.url]) {
        const payload = cache.current[state.url];

        onSuccess(payload);

        dispatch({
          type: AppActionTypes.LOADED,
          payload,
        });
      } else {
        sendRequest({
          onSuccess: onRequestSuccess,
          onError: onRequestError,
          requestTitle: HOOK_NAME,
          url: state.url,
        });
      }
    };

    if (state.url && state.url.length && (
      state.status === FetchingStatuses.IDLE ||
      state.status === FetchingStatuses.START
    )) {
      startRequest();
    }
  }, [
    url,
    state,
    onRequest,
    onSuccess,
    onError,
  ]);

  return {
    cache,
    state,
    fetchData,
    isError: state.status === FetchingStatuses.ERROR,
    isLoaded: state.status === FetchingStatuses.LOADED,
    isLoading: state.status === FetchingStatuses.LOADING,
  };
};

export default useFetchCached;
