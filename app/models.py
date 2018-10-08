from app import db
from datetime import datetime


class Video(db.Model):

  __tablename__ = 'videos'

  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(80), nullable=False)
  filepath = db.Column(db.String(80))
  date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
  upvotes = db.Column(db.Integer, default=0)
  downvotes = db.Column(db.Integer, default=0)

  def __init__(self,title, filepath):
    self.title=title
    self.filepath=filepath

  def json(self):
    return {
      'title': self.title,
      'filepath': self.filepath,
      'id': self.id,
      'upvotes': self.upvotes,
      'downvotes': self.downvotes
    }

  def __str__(self):
    return f"{self.title} "
