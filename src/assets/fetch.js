export async function fetchResponse(endpoint, fetchMethod, data) {
  const url = `https://hap-app-api.azurewebsites.net${endpoint}`;

  const options = {
    method: fetchMethod,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  };

  return await fetch(url, options);
}
