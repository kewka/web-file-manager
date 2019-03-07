import 'isomorphic-fetch';
import qs from 'query-string';

export default async function apiClient(
  method,
  options = { body: {}, params: {}, method: 'GET' }
) {
  const paramsString = qs.stringify(options.params);
  let url = `${process.env.API_URL}/${method}`;

  if (paramsString.length) {
    url += '?' + paramsString;
  }

  const fetchOptions = {
    method: options.method,
    strictSSL: false
  };

  if (options.method === 'POST') {
    fetchOptions.headers = {
      'Content-Type': 'application/json'
    };

    fetchOptions.body = JSON.stringify(options.body);
  }

  if (!process.browser) {
    fetchOptions.agent = new (require('https')).Agent({
      rejectUnauthorized: false
    });
  }

  const response = await fetch(url, fetchOptions);

  let json = {
    message: response.statusText
  };

  try {
    json = await response.json();
  } catch {}

  return response.ok ? json : Promise.reject(json);
}
