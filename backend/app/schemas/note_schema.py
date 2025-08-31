from pydantic import BaseModel

class NoteCreate(BaseModel):
    note_title: str
    note_content: str

class NoteUpdate(BaseModel):
    note_title: str
    note_content: str

class NoteResponse(BaseModel):
    note_id: str
    note_title: str
    note_content: str
    user_id: str
