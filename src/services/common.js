import { api } from '~/store';
import {
  FORM_INITIAL_ERROR,
  AppMessages,
  ResponseStatusTexts,
} from '~/constants';

export const REQUEST_TYPES = {
  GET: 'get',
  DELETE: 'delete',
  PATCH: 'patch',
  POST: 'post',
  PUT: 'put',
};

export const setApiRequest = ({
  url, data, config, requestType,
}) => {
  switch (requestType) {
    case REQUEST_TYPES.DELETE:
      return api.delete(url, config);
    case REQUEST_TYPES.PATCH:
      return api.patch(url, data, config);
    case REQUEST_TYPES.POST:
      return api.post(url, data, config);
    case REQUEST_TYPES.PUT:
      return api.put(url, data, config);
    default:
      return api.get(url, config);
  }
};

export const sendRequest = ({
  url,
  data,
  config,
  onRequest = () => false,
  onSuccess = () => false,
  onError = () => false,
  requestType = REQUEST_TYPES.GET,
  responseStatusText = ResponseStatusTexts.OK,
}) => {
  onRequest();

  // setTimeout - for demo only
  setTimeout(() => {
    setApiRequest({ url, data, config, requestType })
      .then((response) => {
        if (response.statusText === responseStatusText) {
          onSuccess(response);
        } else {
          onError(AppMessages.DATA_LOADING_ERROR);
        }
      })
      .catch(({ message }) => {
        onError(message || AppMessages.DATA_LOADING_ERROR);
      });
  }, 500);
};

export const sendFormRequest = ({
  url,
  data,
  config,
  resetForm = () => false,
  setError = () => false,
  setSubmitting = () => false,
  setSuccess = () => false,
  requestType = REQUEST_TYPES.POST,
  responseStatusText = ResponseStatusTexts.OK,
}) => {
  setError(FORM_INITIAL_ERROR);

  // setTimeout - for demo only
  setTimeout(() => {
    setApiRequest({ url, data, config, requestType })
      .then((response) => {
        if (response.statusText === responseStatusText) {
          setSuccess(true);
          setSubmitting(false);
          resetForm();
        } else {
          setError(AppMessages.DATA_POSTING_ERROR);
          setSubmitting(false);
          throw new Error(AppMessages.DATA_POSTING_ERROR);
        }
      })
      .catch(({ message }) => {
        setError(message || AppMessages.DATA_POSTING_ERROR);
        setSubmitting(false);
      });
  }, 500);
};
