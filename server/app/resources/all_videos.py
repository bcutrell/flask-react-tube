from flask_restful import Resource
from app.models import Video

class AllVideos(Resource):
  def get(self):
    return [vid.json() for vid in Video.query.all()]
