import React from 'react'
import { useAuth } from '../context/AuthContext'

function AddNote() {

  const { title, setTitle, content, setContent, loading, handleAdd} = useAuth();
  return (
    <div>
    
    <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full mb-3 p-2 border rounded h-24 resize-none"
        />
        <button
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          onClick={handleAdd}
          // to disable button - disabled={!title.trim() || !content.trim()}
        >
          {loading ? "Processing..." :  "Add Note"}
        </button>

    </div>
  )
}

export default AddNote;