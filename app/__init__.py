import os
from flask import Flask,  request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from flask_migrate import Migrate
from config import Config
from flask_cors import CORS

db = SQLAlchemy()
migrate = Migrate()
api = Api()
config = Config()

def create_app(config_class=Config):
  # os.getcwd() needs to be a global config
  app = Flask(__name__, static_folder='')

  app.config.from_object(config_class)

  cors = CORS(app, resources={r"/*": {"origins": "*"}}, headers="Content-Type")

  db.init_app(app)
  migrate.init_app(app, db)

  from app.resources.all_videos import AllVideos
  from app.resources.vote import Vote
  from app.resources.upload import Upload
  api.add_resource(AllVideos,'/videos')
  api.add_resource(Upload, '/upload')
  api.add_resource(Vote, '/vote')

  api.init_app(app)

  return app
