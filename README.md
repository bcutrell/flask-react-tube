# Flask React Tube
This is a simple web application that allows users to upload and vote on videos. The application is built using Flask, React, and sqlite. This is not a production-ready application. It is intended to be used as a learning tool.

![flask-react-tube-gif](https://github.com/bcutrell/flask-react-tube/blob/master/flask_react_tube.gif)

### Setup
Clone the repository to your local machine.

Install the dependencies using the following commands:
```bash
$ python -m venv env
$ source env/bin/activate.
$ pip install -r requirements.txt.
$ npm install
```
Setup the Database
```bash
$ python manage.py db init
$ python manage.py db migrate
$ python manage.py db upgrade
$ alembic init alembic
$ flask db init
$ flask db migrate -m "video"
$ flask db upgrade
```

Run the application using
```bash
honcho start -f Procfile
```

Database shell
```bash
$ python shell.py
```

Commands
```python
# Create a video
v = Video(title='Hello', filepath='static')
db.session.add(v)
db.session.commit()

# Get all videos
Video.query.all()

# Delete all videos
db.session.query(Video).delete()
db.session.commit()
```