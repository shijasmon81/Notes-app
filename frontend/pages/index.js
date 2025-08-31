import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchNotes, addNote, updateNote, deleteNote } from "../redux/slices/notesSlice";
import NoteCard from "../components/NoteCard";
import NoteEditor from "../components/NoteEditor";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import SEO from "../utils/seo";
import { motion } from "framer-motion";

export default function Home() {
  const dispatch = useDispatch();
  const { notes, loading } = useSelector(state => state.notes);
  const { token } = useSelector(state => state.auth); // ✅ get token
  const [editingNote, setEditingNote] = useState(null);

  // Fetch notes when component mounts OR token changes
  useEffect(() => {
    if (token) dispatch(fetchNotes());
  }, [dispatch, token]); // ✅ dependency includes token

  const handleSave = (noteData) => {
    if (editingNote) {
      dispatch(updateNote({ note_id: editingNote.note_id, data: noteData }));
    } else {
      dispatch(addNote(noteData));
    }
    setEditingNote(null);
  };

  const handleEdit = (note) => setEditingNote(note);
  const handleDelete = (id) => dispatch(deleteNote(id));

  return (
    <div className="container">
      <SEO title="My Notes App - Home" description="View, create, edit and delete your notes easily." keywords="notes, productivity, todo, tasks"/>
      <Navbar />
      {loading && <Loader />}
      <NoteEditor note={editingNote} onSave={handleSave} />

      {notes.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "20px" }}>No notes found. Create your first note!</p>
      ) : (
        <div style={gridStyle}>
          {notes.map(note => (
            <motion.div
              key={note.note_id}
              style={cardStyle}
              whileHover={{ scale: 1.03, boxShadow: "0 8px 20px rgba(0,0,0,0.2)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3>{note.note_title}</h3>
              <div dangerouslySetInnerHTML={{ __html: note.note_content }} />
              <small style={{ display: "block", marginTop: "10px", color: "#555" }}>
                Created: {new Date(note.created_on).toLocaleDateString()} | Updated: {new Date(note.last_update).toLocaleDateString()}
              </small>
              <div style={{ marginTop: "10px" }}>
                <button style={buttonStyle} onClick={() => handleEdit(note)}>Edit</button>
                <button style={buttonStyleDelete} onClick={() => handleDelete(note.note_id)}>Delete</button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

// Styles
const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px",
  marginTop: "20px",
};

const cardStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  transition: "all 0.3s ease",
};

const buttonStyle = {
  padding: "5px 10px",
  marginRight: "5px",
  border: "none",
  borderRadius: "5px",
  backgroundColor: "#4f46e5",
  color: "white",
  cursor: "pointer",
};

const buttonStyleDelete = {
  ...buttonStyle,
  backgroundColor: "#ef4444",
};
