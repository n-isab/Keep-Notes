import { useEffect } from "react";
import { toast } from "react-toastify";
import { deleteNote } from "../api/notes";
import { useAuth } from "../context/AuthContext";
import Edit from "../components/Edit";
import ListNotes from "../components/ListNotes";
const Dashboard = () => {
  const {
    token,
    setTitle,
    setContent,
    setLoading,
    setEditId,
    isModalOpen,
    fetchNotes,
    handleAdd,
  } = useAuth();

  useEffect(() => {
    if (!token) return;

    fetchNotes();
  }, [token]);

  const handleDelete = async (id) => {
    if (!token) return;
    try {
      await deleteNote(id, token);
      toast.success("Note deleted 🗑️");
      setTitle("");
      setContent("");
      setEditId(null);
      fetchNotes();
    } catch (err) {
      toast.error("Failed to delete ❌");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
          <h2 className="text-2xl  font-bold mb-4 text-center">Dashboard</h2>

          {/* Add Note */}

          {/*<AddNote handleAdd={handleAdd} /> */}

          {/* List Notes */}

          <ListNotes handleDelete={handleDelete} />

        {isModalOpen && <Edit handleAdd={handleAdd} />}
    
     </>
  );
};

export default Dashboard;
