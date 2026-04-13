import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext';

function ListNotes({handleDelete}) {

  const { notes, setEditId, setTitle, setContent, setIsModalOpen} = useAuth ();

  const [search, setSearch] = useState("");
  return (
    <div>
     
       <div>
          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full mt-8 mb-4 p-2 border rounded"
          />
        </div>

        {/* Notes List */}
        <ul className="mt-6 space-y-3">
          {(notes || [])
            .filter((note) => {
              const title = note.title || "";
              const content = note.content || "";
              return (
                title.toLowerCase().includes(search.toLowerCase()) ||
                content.toLowerCase().includes(search.toLowerCase())
              );
            })

            .map((note) => (
              <li
                className="border p-3 rounded shadow-sm bg-gray-50"
                key={note._id}
              >
                <h4 className="font-semibold">{note.title}</h4>
                <p className="text-gray-600"> {note.content}</p>
                <div className="mt-2 flex gap-2">
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    onClick={() => {
                      setEditId(note._id);
                      setTitle(note.title);
                      setContent(note.content);
                      setIsModalOpen(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(note._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
        </ul>

    </div>
  )
}

export default ListNotes
