import React from 'react'
import { useAuth } from '../context/AuthContext';

function Edit({handleAdd}) {

  const {title, setTitle, content, setContent, setIsModalOpen, setEditId} = useAuth();
  return (
    
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Edit Note</h3>

            <input
              type="text"
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

            <div className="flex justify-end gap-2">
              <button
                onClick={() =>  { setIsModalOpen(false);
                  setContent("");
                  setTitle("");
                  setEditId(null);
                }
                }
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleAdd}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )
  
}

export default Edit