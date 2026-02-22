from sqlalchemy import Column, Float, String, Integer
from .database import Base

class PostItModel(Base):
    __tablename__ = "postits"
    
    id = Column(Integer, primary_key=True, index=True)
    content = Column(String, nullable=False)
    color = Column(String, default="yellow")
    x = Column(Float, default=0.0)
    y = Column(Float, default=0.0)