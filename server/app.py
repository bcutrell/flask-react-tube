import os
from flask import Flask,  request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api,Resource
from flask_migrate import Migrate
from datetime import datetime

from flask_cors import CORS

from config import Config


db = SQLAlchemy()
api = Api()

def create_app(config_class=Config):
  app = Flask(__name__)
  app.config.from_object(config_class)
  db.init_app(app)
  Migrate(app,db)
  return app

# Models
class Video(db.Model):

  __tablename__ = 'videos'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(80), nullable=False)
  date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
  upvotes = db.Column(db.Integer, default=0)
  downvotes = db.Column(db.Integer, default=0)

  def __init__(self,name):
    self.name=name

  def json(self):
    return {'name': self.name, 'filepath': self.filepath()}

  def __str__(self):
    return f"{self.name} "

  def filepath(self):
    return f"{self.id}_{self.name.strip()}"

class Videos(Resource):

  def get(self, name):
    vid = Video.query.filter_by(name=name).first()
    if vid:
      return vid.json()
    else:
      return {'name': None }, 404

  def post(self, name):
    print(name)
    vid = Video(name=name)
    db.session.add(vid)
    db.session.commit()

    if db.session.query(Video).count() > 10:
      # Delete the video with the fewest likes
      vid = Video.query.order_by(Video.upvotes.desc(), Video.downvotes.asc(), Video.date.desc()).first()
      db.session.delete(vid)
      db.session.commit()

    return vid.json()

  def delete(self,name):
    vid = Video.query.filter_by(name=name).first()
    db.session.delete(vid)
    db.session.commit()
    return {'note':'delete successful'}

class AllVideos(Resource):
  def get(self):
    videos = Video.query.all()
    return [vid.json() for vid in videos]

# TODO Refactor this into a more reasonable rest structure...
class UpVote(Resource):
  def post(self, id):
    vid = Video.query.filter_by(id=id).first()
    vid.upvotes += 1
    return { 'name': vid.name, 'upvotes': vid.upvotes, 'downvotes': vid.downvotes }

class DownVote(Resource):
  def post(self, id):
    vid = Video.query.filter_by(id=id).first()
    vid.downvotes += 1
    return { 'name': vid.name, 'upvotes': vid.upvotes, 'downvotes': vid.downvotes }

api.add_resource(Videos, '/video/<string:name>')
api.add_resource(AllVideos,'/videos')

api.add_resource(UpVote, '/upvote/<int:id>')
api.add_resource(DownVote, '/downvote/<int:id>')

if __name__ == '__main__':
  app = create_app()
  api.init_app(app)
  cors = CORS(app, resources={r"/*": {"origins": "*"}})
  app.run(debug=True)

