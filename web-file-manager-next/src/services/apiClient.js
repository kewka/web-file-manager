import 'isomorphic-fetch';

export default async function apiClient(method, params = {}) {
  const apiUrl = process.browser
    ? '/api'
    : `http://localhost:${process.env.PORT}/api`;

  const url = `${apiUrl}/${method}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(params)
  });

  const json = await response.json();
  return response.ok ? json : Promise.reject(json);
}
