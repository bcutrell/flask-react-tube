import unittest
from app import app 
import json

# TODO setup testing DB
class TestIntegrations(unittest.TestCase):
  def setUp(self):
    self.app = app.test_client()

  def test_post(self):
    response = self.app.post('/video/new_video')
    assert response.get_json() == {'name': 'new_video'}
    assert json.loads(response.data) == {'name': 'new_video'}

  def test_get(self):
    response = self.app.get('/video/new_video')
    assert json.loads(response.data) == {'name': 'new_video'}

  def test_upvote(self):
    pass

  def test_downvote(self):
    pass

if __name__ == '__main__':
  unittest.main()
