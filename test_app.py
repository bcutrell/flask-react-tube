import unittest
import io
import json

from app import app, db
from config import Config

class TestConfig(Config):
  TESTING = True
  SQLALCHEMY_DATABASE_URI = 'sqlite://'

class TestIntegrations(unittest.TestCase):
  def setUp(self):
    app.config.from_object(TestConfig)
    self.app_context = app.app_context()
    self.app_context.push()

    self.test_client = app.test_client()
    db.create_all()

  def tearDown(self):
    db.session.remove()
    db.drop_all()
    self.app_context.pop()

  def test_upload(self):
    with open('./static/uploads/test.mp4', 'rb') as f:
      # create a file-like object
      f = io.BytesIO(f.read())
    
    # post request to upload endpoint
    data = {}
    data['file'] = (io.BytesIO(b"abcdef"), 'test.mp4')
    
    response = self.test_client.post('/upload', data=data, content_type='multipart/form-data')

    expected = {
      'title': 'file', 
      'filepath': app.config['UPLOAD_FOLDER'] + '/test.mp4', 
      'id': 1, 
      'upvotes': 0, 
      'downvotes': 0
    }
    
    assert response.get_json() == [expected]
    assert json.loads(response.data) == [expected]

if __name__ == '__main__':
  unittest.main() 