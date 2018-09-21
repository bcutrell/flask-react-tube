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

    assert response.get_json() == {'name': 'new_video'}
    assert json.loads(response.data) == {'name': 'new_video'}

  def test_get(self):
    # first create the object
    cast = Video('Cast Away')
    db.session.add(cast)
    db.session.commit()

    response = self.test_client.get('/video/Cast Away')
    assert json.loads(response.data) == { 'name': 'Cast Away' }

  def test_upvote(self):
    pass

  def test_downvote(self):
    pass

if __name__ == '__main__':
  unittest.main()
