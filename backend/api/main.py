from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from . import models, database

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.put("/edit-postit/{postit_id}")
def update_postit(
    postit_id: int,    
    content: str = Query(...), 
    x: int = Query(...), 
    y: int = Query(...), 
    color: str = Query("yellow"), 
    db: Session = Depends(database.get_db)
):
    postit = db.query(models.PostItModel).filter(models.PostItModel.id == postit_id).first()
    
    if not postit:
        raise HTTPException(status_code=404, detail="Postit não encontrado")
    
    postit.content = content
    postit.x = x
    postit.y = y
    postit.color = color
    
    db.commit()
    db.refresh(postit)
    return postit

@app.delete("/postits/{postit_id}")
def delete_postit(postit_id: int, db: Session = Depends(database.get_db)):
    deleted_count = db.query(models.PostItModel).filter(models.PostItModel.id == postit_id).delete()
    if deleted_count == 0:
        raise HTTPException(status_code=404, detail="Post-it não encontrado")
    db.commit()
    return {"message": "Deletado"}

@app.get("/postits")
def get_all_postits(db: Session = Depends(database.get_db)):
    return db.query(models.PostItModel).all()

@app.post("/postits")
def create_postit(
    content: str, x: int, y: int, color: str = "yellow", 
    db: Session = Depends(database.get_db)):
    postit = models.PostItModel(content=content, x=x, y=y, color=color)
    db.add(postit)
    db.commit()
    db.refresh(postit)
    return postit

@app.delete("/postits-admin/clear-all")
def delete_all_postit(db: Session = Depends(database.get_db)):
    db.query(models.PostItModel).delete()
    db.commit()
    return {"message": "Mural limpo"}