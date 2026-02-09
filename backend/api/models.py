from sqlalchemy import Column, Integer, String
from .database import Base

class PostItModel(Base):
    __tablename__ = "postits"
    
    id = Column(Integer, primary_key=True, index=True)
    content = Column(String, nullable=False)
    color = Column(String, default="yellow")
    x = Column(Integer, default=100)
    y = Column(Integer, default=100)