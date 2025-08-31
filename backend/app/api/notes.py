from fastapi import APIRouter, Depends, HTTPException, Header
from typing import List
from ..schemas.note_schema import NoteCreate, NoteUpdate, NoteResponse
from ..services.note_service import create_note, get_notes, get_note_by_id, update_note, delete_note
from ..models.note_model import Note
from ..core.security import decode_access_token

router = APIRouter(prefix="/notes", tags=["Notes"])

async def get_current_user(authorization: str = Header(...)):
    token = authorization.split(" ")[1]
    payload = decode_access_token(token)
    if payload is None:
        raise HTTPException(status_code=401, detail="Invalid token")
    return payload["user_id"]

@router.post("/", response_model=NoteResponse)
async def create_user_note(note: NoteCreate, user_id: str = Depends(get_current_user)):
    new_note = Note(note_title=note.note_title, note_content=note.note_content, user_id=user_id)
    created = await create_note(new_note)
    return created

@router.get("/", response_model=List[NoteResponse])
async def list_user_notes(user_id: str = Depends(get_current_user)):
    notes = await get_notes(user_id)
    return notes

@router.put("/{note_id}")
async def edit_note(note_id: str, note: NoteUpdate, user_id: str = Depends(get_current_user)):
    db_note = await get_note_by_id(note_id)
    if not db_note or db_note["user_id"] != user_id:
        raise HTTPException(status_code=404, detail="Note not found")
    updated = await update_note(note_id, note.note_title, note.note_content)
    return {"success": updated}

@router.delete("/{note_id}")
async def remove_note(note_id: str, user_id: str = Depends(get_current_user)):
    db_note = await get_note_by_id(note_id)
    if not db_note or db_note["user_id"] != user_id:
        raise HTTPException(status_code=404, detail="Note not found")
    deleted = await delete_note(note_id)
    return {"success": deleted}
