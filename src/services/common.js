import { api } from '~/store';
import {
  FORM_INITIAL_ERROR,
  AppMessages,
  AppTitles,
  ResponseStatusTexts,
} from '~/constants';
import {
  getBadResponseMsg,
} from '~/utils';

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
  requestTitle = AppTitles.NO_TITLE_EXIST,
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
          onError(
            getBadResponseMsg(requestTitle, response.statusText)
          );
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
  requestTitle = AppTitles.NO_TITLE_EXIST,
  responseStatusText = ResponseStatusTexts.OK,
}) => {
  setError(FORM_INITIAL_ERROR);

  // setTimeout - for demo only
  setTimeout(() => {
    setApiRequest({ url, data, config, requestType })
      .then((response) => {
        if (response.statusText === responseStatusText) {
          setSuccess(true);
          resetForm();
        } else {
          setError(AppMessages.DATA_POSTING_ERROR);

          throw new Error(
            getBadResponseMsg(requestTitle, response.statusText)
          );
        }
      })
      .finally(() => {
        setSubmitting(false);
      })
      .catch(({ message }) => {
        setError(message || AppMessages.DATA_POSTING_ERROR);
      });
  }, 500);
};
