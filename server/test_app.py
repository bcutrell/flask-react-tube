import unittest
from app import create_app, api, db, Video
import json
from config import Config

# import code; # code.interact(local=dict(globals(), **locals()))

class TestConfig(Config):
  TESTING = True
  SQLALCHEMY_DATABASE_URI = 'sqlite://'

class TestIntegrations(unittest.TestCase):
  def setUp(self):
    self.app = create_app(TestConfig)
    api.init_app(self.app)
    self.app_context = self.app.app_context()
    self.app_context.push()

    self.test_client = self.app.test_client()
    db.create_all()

  def tearDown(self):
    db.session.remove()
    db.drop_all()
    self.app_context.pop()

  def test_post(self):
    response = self.test_client.post('/video/new_video')

    assert response.get_json() == {'name': 'new_video', 'filepath': '1_new_video'}
    assert json.loads(response.data) == {'name': 'new_video', 'filepath': '1_new_video'}

  def test_get(self):
    vid = self.create_video()

    response = self.test_client.get('/video/%s' % vid.name)
    assert json.loads(response.data) == { 'name': vid.name, 'filepath': vid.filepath() }

  def test_upvote(self):
    vid = self.create_video()
    assert vid.upvotes == 0

    response = self.test_client.post('/upvote/%s' % vid.id)
    assert json.loads(response.data) == { 'name': vid.name, 'upvotes': 1, 'downvotes': 0 }

  def test_downvote(self):
    vid = self.create_video()
    assert vid.upvotes == 0

    response = self.test_client.post('/downvote/%s' % vid.id)
    assert json.loads(response.data) == { 'name': vid.name, 'upvotes': 0, 'downvotes': 1 }

  def test_post_delete_if_more_than_10(self):
    # create 10 videos
    [ self.create_video() for n in range(10) ]

    response = self.test_client.post('/video/new_video')
    assert response.get_json() == {'name': 'new_video',  'filepath': '11_new_video'}
    assert json.loads(response.data) == {'name': 'new_video',  'filepath': '11_new_video'}

    # There are still only 10 videos
    assert db.session.query(Video).count() == 10

  def create_video(self):
    cast = Video('Cast Away')
    db.session.add(cast)
    db.session.commit()
    return cast

if __name__ == '__main__':
  unittest.main()
