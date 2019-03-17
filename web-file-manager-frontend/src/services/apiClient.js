import 'isomorphic-fetch';
import qs from 'query-string';

export default async function apiClient(
  method,
  options = { body: null, params: {}, method: 'GET' }
) {
  const paramsString = qs.stringify(options.params);
  const apiUrl = process.browser
    ? '/api'
    : `http://localhost:${process.env.PORT}/api`;

  let url = `${apiUrl}/${method}`;

  if (paramsString.length) {
    url += '?' + paramsString;
  }

  const fetchOptions = {
    method: options.method
  };

  if (options.body) {
    fetchOptions.headers = {
      'Content-Type': 'application/json'
    };

    fetchOptions.body = JSON.stringify(options.body);
  }

  const response = await fetch(url, fetchOptions);

  let json = {
    message: response.statusText
  };

  try {
    json = await response.json();
  } catch {}

  return response.ok
    ? json
    : Promise.reject({
        ...json,
        statusCode: response.status
      });
}
