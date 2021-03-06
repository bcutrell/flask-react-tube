from flask_restful import Resource, reqparse
import os
from flask import url_for
from app.models import Video
from app import db, config
import werkzeug

class Upload(Resource):
  def post(self):
    parse = reqparse.RequestParser()
    parse.add_argument('file', type=werkzeug.datastructures.FileStorage, location='files')
    parse.add_argument('title')
    args = parse.parse_args()

    filepath = os.path.join(config.UPLOAD_FOLDER, args['file'].filename)
    if config.ENV == 'development':
      args['file'].save('client/' + filepath)
    else:
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
