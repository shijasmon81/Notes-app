import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchNotes, addNote, updateNote, deleteNote } from "../redux/slices/notesSlice";
import NoteCard from "../components/NoteCard";
import NoteEditor from "../components/NoteEditor";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import SEO from "../utils/seo";

export default function Home() {
  const dispatch = useDispatch();
  const { notes, loading } = useSelector(state => state.notes);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => { dispatch(fetchNotes()); }, [dispatch]);

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
      <SEO 
        title="My Notes App - Home"
        description="View, create, edit and delete your notes easily."
        keywords="notes, productivity, todo, tasks"
      />
      <Navbar />
      {loading && <Loader />}
      <NoteEditor note={editingNote} onSave={handleSave} />
      {notes.map(note => (
        <NoteCard key={note.note_id} note={note} onEdit={handleEdit} onDelete={handleDelete} />
      ))}
    </div>
  );
}
