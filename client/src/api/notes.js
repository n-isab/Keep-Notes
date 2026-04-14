import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL ;

const API = axios.create({
  baseURL: API_URL,
});

console.log("API_URL", API_URL);

// Get all notes
export const getNotes = async (token) => {
  const response = await API.get("/notes", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Create note
export const createNote = async (data, token) => {
  const response = await API.post("/notes", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Update note
export const updateNote = async (id, data, token) => {
  const response = await API.put(`/notes/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Delete note
export const deleteNote = async (id, token) => {
  const response = await API.delete(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export default API;

 
