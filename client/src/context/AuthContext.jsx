import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getNotes, updateNote, createNote } from "../api/notes";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [editId, setEditId] = useState(null);
      const [isModalOpen, setIsModalOpen] = useState(false);
        const [error, setError] = useState("");

  // check token on app load
  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    setIsLoggedIn(!!storedToken);
    setToken(storedToken);
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
   setIsLoggedIn(false);
   setToken(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

   const fetchNotes = async () => {
      if (!token) return;
      try {
        setLoading(true);
        const data = await getNotes(token);
        setNotes(Array.isArray(data) ? data : data.notes || []);
      } catch (err) {
        toast.error("Failed to load notes ❌");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    const handleAdd = async () => {
        // console.log("ADD CLICKED");
        // console.log("TOKEN:", token);
        if (!token) return;
    
        //validation
        if (!title.trim() || !content.trim()) {
          toast.error("Title and content are required ❌");
          return;
        }
    
        try {
          setLoading(true);
          setError("");
          if (editId) {
            await updateNote(editId, { title, content }, token);
            toast.success("Note updated ✅");
            setEditId(null);
            setIsModalOpen(false);
          } else {
            await createNote({ title, content }, token);
            toast.success("Note added ✅");
          }
          setTitle("");
          setContent("");
          fetchNotes();
        } catch (err) {
          toast.error("Failed to save note ❌");
          console.log(err);
        } finally {
          setLoading(false);
        }
      };


  return(
    <AuthContext.Provider value={{isLoggedIn, login, handleLogout, token, notes, setNotes, content, setContent, title, setTitle, loading, setLoading, editId, setEditId, isModalOpen, setIsModalOpen, fetchNotes, handleAdd}}>
      {children}
    </AuthContext.Provider>
  )
};

// custom hook

export const useAuth = () => useContext(AuthContext);