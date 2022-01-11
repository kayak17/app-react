import { api } from '~/store';
import {
  FORM_INITIAL_ERROR,
  AppMessages,
  ResponseStatusTexts,
} from '~/constants';

export const setApiRequest = (url, data, config) => {
  if (data) {
    return api.post(url, data, config);
  } else {
    return api.get(url, config);
  }
};

export const sendRequest = ({
  config = undefined,
  data = undefined,
  onRequest = () => false,
  onSuccess = () => false,
  onError = () => false,
  responseStatusText = ResponseStatusTexts.OK,
  url,
}) => {
  onRequest();

  // setTimeout - for demo only
  setTimeout(() => {
    setApiRequest(url, data, config)
      .then((response) => {
        if (response.statusText === responseStatusText) {
          onSuccess(response);
        } else {
          onError(AppMessages.DATA_LOADING_ERROR);
        }
      })
      .catch(({ message }) => {
        onError(message || AppMessages.DATA_POSTING_ERROR);
      });
  }, 500);
};

export const sendFormRequest = ({
  config = undefined,
  data = undefined,
  resetForm = () => false,
  setError = () => false,
  setSubmitting = () => false,
  setSuccess = () => false,
  responseStatusText = ResponseStatusTexts.OK,
  url,
}) => {
  setError(FORM_INITIAL_ERROR);

  // setTimeout - for demo only
  setTimeout(() => {
    setApiRequest(url, data, config)
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
