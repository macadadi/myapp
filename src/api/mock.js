// mockApi.js

const studentData = []

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const mockApiResponse = (data, status = 200) => ({
  json: async () => data,
  status,
});

const mockFetch = async (url, options = {}) => {
  await delay(500);
  const data = localStorage.getItem('users')
  if (url === '/api' && options.method === 'GET') {
   
    return mockApiResponse(JSON.parse(data));
   } else if (url === '/api' && options.method === 'POST') {

    const requestBody = await JSON.parse(options?.body);
    const response = data !== null && Object.keys(data).length !== 0 ? [...JSON?.parse(data),{...requestBody}] :[{...requestBody}]
    localStorage.setItem('users',JSON.stringify(response))
    return mockApiResponse(response, 201);
  } else {
    return mockApiResponse({ error: 'Not Found' }, 404);
  }
};

export default mockFetch;
