import os
from flask import Flask,  request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api,Resource
from flask_migrate import Migrate
from datetime import datetime

app = Flask(__name__)

# Config
app.config['SECRET_KEY'] = 'mysecretkey'
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'data.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
Migrate(app,db)
api = Api(app)

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
    return {'name': self.name}

  def __str__(self):
    return f"{self.name} "

class Videos(Resource):

  def get(self, name):
    vid = Video.query.filter_by(name=name).first()
    if vid:
      return vid.json()
    else:
      return {'name': None },404

  def post(self, name):
    vid = Video(name=name)
    db.session.add(vid)
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


api.add_resource(Videos, '/video/<string:name>')
api.add_resource(AllVideos,'/videos')

if __name__ == '__main__':
  app.run(debug=True)

