// const apiUrl = process.env.REACT_APP_API_URL;
const storeToken = (response) => {
  const token = response.headers.get("Authorization");
  window.localStorage.setItem("token", token);
};
const appendHeaders = () => {
  const token = window.localStorage.getItem("token");
  const headers = { "Content-Type": "application/json", Authorization: token };
  return headers;
};

export const signUp = (user) => {
  return fetch(`/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  }).then((response) => {
    storeToken(response);
    return response.json();
  });
};

export const fetchPilots = () => {
  return fetch(`/api/pilots`)
    .then((repsonse) => repsonse.json())
    .catch((err) => console.log(err));
};

export const fetchInstitutions = () => {
  return fetch(`/api/institutions`)
    .then((repsonse) => repsonse.json())
    .catch((err) => console.log(err));
};

export const searchRegistry = (accountType, searchQuery) => {
  return fetch(`api/${accountType}/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(searchQuery),
  }).then((response) => response.json());
};

export const filterRegistryBy = (accountType, filterQuery) => {
  return fetch(`api/${accountType}/filter`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(filterQuery),
  }).then((response) => response.json());
};

export const fetchProfile = (accountType, id) => {
  return fetch(`/api/${accountType}/${id}`)
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const editProfile = (accountType, id, editValues) => {
  return fetch(`/api/${accountType}/${id}`, {
    method: "PATCH",
    headers: appendHeaders(),
    body: JSON.stringify(editValues),
  }).then((response) => response.json());
};

export const Login = (loginDetails) => {
  return fetch(`/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginDetails),
  }).then((response) => {
    storeToken(response);
    return response.json();
  });
};

export const logout = () => {
  window.localStorage.removeItem("token");
  return fetch("/auth/logout", {
    method: "DELETE",
    headers: appendHeaders(),
  }).then((response) => response);
};

export const fetchCurrentUser = () => {
  return fetch("/auth/current-user", {
    headers: appendHeaders(),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const getQuotes = (quoteRequest) => {
  return fetch(`api/quotes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(quoteRequest),
  }).then((response) => response.json());
};
