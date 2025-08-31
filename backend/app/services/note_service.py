from ..db.mongodb import notes_collection
from ..models.note_model import Note
from datetime import datetime
from typing import List

async def create_note(note: Note):
    note_dict = note.dict()
    await notes_collection.insert_one(note_dict)
    return note_dict

async def get_notes(user_id: str):
    notes = []
    cursor = notes_collection.find({"user_id": user_id})
    async for note in cursor:
        notes.append(note)
    return notes

async def get_note_by_id(note_id: str):
    return await notes_collection.find_one({"note_id": note_id})

async def update_note(note_id: str, title: str, content: str):
    result = await notes_collection.update_one(
        {"note_id": note_id},
        {"$set": {"note_title": title, "note_content": content, "last_update": datetime.utcnow()}}
    )
    return result.modified_count > 0

async def delete_note(note_id: str):
    result = await notes_collection.delete_one({"note_id": note_id})
    return result.deleted_count > 0
