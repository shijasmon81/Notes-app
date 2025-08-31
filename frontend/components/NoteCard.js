import { motion } from "framer-motion";

export default function NoteCard({ note, onEdit, onDelete }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}
    >
      <h3>{note.note_title}</h3>
      <p dangerouslySetInnerHTML={{ __html: note.note_content }}></p>
      <button onClick={() => onEdit(note)}>Edit</button>
      <button onClick={() => onDelete(note.note_id)}>Delete</button>
    </motion.div>
  );
}
