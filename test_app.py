import unittest
from app import create_app, db
from app.models import Video
import json
from config import Config

import io
import werkzeug
from werkzeug.datastructures import FileStorage


# import code; # code.interact(local=dict(globals(), **locals()))

class TestConfig(Config):
  TESTING = True
  SQLALCHEMY_DATABASE_URI = 'sqlite://'

class TestIntegrations(unittest.TestCase):
  def setUp(self):
    self.app = create_app(TestConfig)
    self.app_context = self.app.app_context()
    self.app_context.push()

    self.test_client = self.app.test_client()
    db.create_all()

  def tearDown(self):
    db.session.remove()
    db.drop_all()
    self.app_context.pop()

  def test_upload(self):
    f = FileStorage(filename='test.mp4')
    response = self.test_client.post('/upload', data={ 'file': f, 'title': 'new_video'})

    assert response.get_json() == [{'title': 'new_video', 'filepath': 'static/uploads/test.mp4', 'id': 1, 'upvotes': 0, 'downvotes': 0}]
    assert json.loads(response.data) == [{'title': 'new_video', 'filepath': 'static/uploads/test.mp4', 'id': 1, 'upvotes': 0, 'downvotes': 0}]

if __name__ == '__main__':
  unittest.main()


