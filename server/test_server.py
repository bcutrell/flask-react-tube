import unittest
import server
import json

class TestIntegrations(unittest.TestCase):
  def setUp(self):
    self.app = server.app.test_client()

  def test_post(self):
    response = self.app.post('/video/new_video')
    assert response.get_json() == {'name': 'new_video'}
    assert json.loads(response.data) == {'name': 'new_video'}

  def test_get(self):
    pass

if __name__ == '__main__':
  unittest.main()
