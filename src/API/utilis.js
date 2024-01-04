import {HTTP_CODES, BASE_URL} from './constants';

class UnauthorizedAccessError extends Error {
  constructor(message) {
    super(message);
    this.name = 'Unauthorized Access Error';
    this.code = HTTP_CODES.UNAUTHORIZED;
  }
}

class ParsingError extends Error {
  constructor(message) {
    super(message);
    this.name = 'Parsing Error';
  }
}

class HTTPResponseError extends Error {
  constructor(response) {
    console.log('err', response);
    super('Something went wrong');
    this.name = 'Server Error';
    this.response = response;
    this.code = response.status;
  }
}

class InteractionRequiredError extends Error {
  constructor(response) {
    super('Interaction Required Error Occurred');
    this.name = 'Interaction Required Error';
    this.data = response;
  }
}

export const textParsing = response => response.text();

export const jsonParsing = async response => {
  try {
    const json = await response;    
    return Promise.resolve(json);
  } catch (error) {
    return Promise.reject(new ParsingError(error.message));
  }
};

export const statusParsing = async response => {
  // console.log('respoens---', response);
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  } else if (response.status === 401) {
    return jsonParsing(response).then(json => {
      return Promise.reject(new InteractionRequiredError(json));
    });
  } else {
    console.log('respoens---', response.err.slice(39, 42));
  }

  return Promise.reject(new HTTPResponseError(response));
};

export const getApiUrl = endPoint => {
  return `${BASE_URL}${endPoint}`;
};

export const buildUrl = (url, parameters) => {
  let qs = '';
  for (const key in parameters) {
    if (parameters.hasOwnProperty(key)) {
      const value = parameters[key];
      qs += key + '=' + value + '&';
    }
  }
  if (qs.length > 0) {
    qs = qs.substring(0, qs.length - 1); //chop off last "&"
    url = url + '?' + qs;
  }

  return url;
};
