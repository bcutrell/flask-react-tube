from flask import Flask, request
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)

videos = []

class Videos(Resource):
  def get(self, name):
    print(videos)

    for vid in videos:
      if vid['name'] == name:
        return vid

    return {'name': None },404

  def post(self, name):
    vid = {'name':name}
    videos.append(vid)
    print(videos)
    return vid

  def delete(self,name):
    for ind, vid in enumerate(videos):
      if vid['name'] == name:
        delted_vid = videos.pop(ind)
        return { 'note': 'delete successful' }

class AllVideos(Resource):

  def get(self):
    return { 'videos': videos }


api.add_resource(PuppyNames, '/video/<string:name>')
api.add_resource(AllNames,'/videos')

if __name__ == '__main__':
  app.run(debug=True)

