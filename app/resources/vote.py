from flask_restful import Resource, reqparse
from app.models import Video
from app import db

class Vote(Resource):
  def post(self):
    parse = reqparse.RequestParser()
    parse.add_argument('id')
    parse.add_argument('type')
    args = parse.parse_args()
    vid = Video.query.filter_by(id=args['id']).first()
    if args['type'] == 'DOWN':
      vid.downvotes += 1

    if args['type'] == 'UP':
      vid.upvotes += 1

    db.session.add(vid)
    db.session.commit()
    return [vid.json() for vid in Video.query.all()]
