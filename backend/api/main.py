from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from . import models, database

app = FastAPI()

models.Base.metadata.create_all(bind=database.engine)


@app.get("/postits")
def get_all_postits(db: Session = Depends(database.get_db)):
    return db.query(models.PostItModel).all()

@app.post("/postits")
def create_postit(
    content: str, 
    x: int, 
    y: int, 
    color: str = "yellow", 
    db: Session = Depends(database.get_db)):
    postit = models.PostItModel(content=content, x=x, y=y, color=color)
    db.add(postit)
    db.commit()
    db.refresh(postit)
    return postit

@app.delete("/postits")
def delete_all_postit(db: Session = Depends(database.get_db)):
    db.query(models.PostItModel).delete()
    db.commit()
    return {"message": "Clear"}

@app.delete("/postits/{postit_id}")
def delete_postit(postit_id: int, db: Session = Depends(database.get_db)):
    deleted_count = db.query(models.PostItModel).filter(models.PostItModel.id == postit_id).delete()
    if deleted_count == 0:
        raise HTTPException(status_code=404, detail="Post-it não encontrado")

    db.commit()
    return {"message": "PostIt Deleted"}