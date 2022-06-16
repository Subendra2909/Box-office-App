const API_BASE_URL = 'https://api.tvmaze.com';

export async function apiUrl(queryString) {
  const response = await fetch(`${API_BASE_URL}${queryString}`).then(re =>
    re.json()
  );

  return response;
}
