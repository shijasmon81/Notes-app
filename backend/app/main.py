from fastapi import FastAPI
from .api import auth, notes
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Notes App API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development, restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(notes.router)

@app.get("/")
async def root():
    return {"message": "Notes App API Running"}
