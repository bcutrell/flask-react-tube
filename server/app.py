import os
from flask import Flask,  request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api, Resource, reqparse
from flask_migrate import Migrate
from datetime import datetime

import werkzeug

from flask_cors import CORS
from config import Config

db = SQLAlchemy()
api = Api()

def create_app(config_class=Config):
  app = Flask(__name__)
  app.config.from_object(config_class)
  cors = CORS(app, resources={r"/*": {"origins": "*"}}, headers="Content-Type")
  db.init_app(app)
  Migrate(app,db)
  return app

# Models
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
    return {'title': self.title, 'filepath': self.filepath }

  def __str__(self):
    return f"{self.title} "

class Videos(Resource):

  def get(self, title):
    vid = Video.query.filter_by(title=title).first()
    if vid:
      return vid.json()
    else:
      return {'title': None }, 404

  def delete(self,title):
    vid = Video.query.filter_by(title=title).first()
    db.session.delete(vid)
    db.session.commit()
    return {'note':'delete successful'}

class AllVideos(Resource):
  def get(self):
    return [vid.json() for vid in Video.query.all()]

# TODO Refactor this into a more reasonable rest structure...
class UpVote(Resource):
  def post(self, id):
    vid = Video.query.filter_by(id=id).first()
    vid.upvotes += 1
    return { 'title': vid.title, 'upvotes': vid.upvotes, 'downvotes': vid.downvotes }

class DownVote(Resource):
  def post(self, id):
    vid = Video.query.filter_by(id=id).first()
    vid.downvotes += 1
    return { 'title': vid.title, 'upvotes': vid.upvotes, 'downvotes': vid.downvotes }

class Upload(Resource):
  def post(self):
    parse = reqparse.RequestParser()
    parse.add_argument('file', type=werkzeug.datastructures.FileStorage, location='files')
    parse.add_argument('title')
    args = parse.parse_args()

    filepath = '../src/assets/' + args['file'].filename
    args['file'].save(filepath)
    vid = Video(title=args['title'], filepath=filepath)
    db.session.add(vid)
    db.session.commit()

    if db.session.query(Video).count() > 10:
      # Delete the video with the fewest likes
      vid = Video.query.order_by(Video.upvotes.desc(), Video.downvotes.asc(), Video.date.desc()).first()
      db.session.delete(vid)
      db.session.commit()
    
    return [vid.json() for vid in Video.query.all()]

api.add_resource(Videos, '/video/<string:title>')
api.add_resource(AllVideos,'/videos')

api.add_resource(UpVote, '/upvote/<int:id>')
api.add_resource(DownVote, '/downvote/<int:id>')

api.add_resource(Upload, '/upload')

if __name__ == '__main__':
  app = create_app()
  api.init_app(app)
  
  app.run(debug=True)

