import os
from flask import Flask, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config
from flask_cors import CORS
from datetime import datetime
from werkzeug.utils import secure_filename


app = Flask(__name__)
app.config.from_object(Config)

db = SQLAlchemy(app)
migrate = Migrate(app, db)

cors = CORS(app, resources={r"/*": {"origins": "*"}}, headers="Content-Type")

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
      'downvotes': self.downvotes,
      'file_url': os.path.join(app.config['UPLOAD_URL'], self.filepath)
    }

  def __str__(self):
    return f"{self.title}"

@app.route("/")
def root():
  return app.send_static_file('index.html')

@app.route('/videos', methods=['get'])
def videos():
  return jsonify([vid.json() for vid in Video.query.all()])

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/upload', methods=['POST'])
def upload():
  uploaded_file = request.files['file']

  if uploaded_file.filename != '':
    filename = secure_filename(uploaded_file.filename)
    uploaded_file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

    vid = Video(title=uploaded_file.name, filepath=filename)
    db.session.add(vid)
    db.session.commit()

  if db.session.query(Video).count() > 10:
    # Delete the video with the fewest likes
    vid = Video.query.order_by(Video.upvotes.desc(), Video.downvotes.asc(), Video.date.desc()).first()
    db.session.delete(vid)
    db.session.commit()

  response = jsonify([vid.json() for vid in Video.query.all()])
  response.headers.add('Access-Control-Allow-Origin', '*')

  return response

@app.route('/vote', methods=['POST'])
def vote():
  req = request.get_json()
  vid = Video.query.filter_by(id=req['id']).first()

  if req['type'] == 'DOWN':
    vid.downvotes += 1

  if req['type'] == 'UP':
    vid.upvotes += 1

  db.session.add(vid)
  db.session.commit()

  response = jsonify([vid.json() for vid in Video.query.all()])
  response.headers.add('Access-Control-Allow-Origin', '*')
  return response