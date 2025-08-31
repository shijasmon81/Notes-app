import dynamic from "next/dynamic";
import { useState } from "react";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";


export default function NoteEditor({ note, onSave }) {
  const [title, setTitle] = useState(note?.note_title || "");
  const [content, setContent] = useState(note?.note_content || "");

  const handleSave = () => {
    onSave({ note_title: title, note_content: content });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Note title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <ReactQuill value={content} onChange={setContent} />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}
