from app import create_app

app = create_app()

@app.route("/")
def index():
  return app.send_static_file('index.html')

@app.shell_context_processor
def make_shell_context():
  return {'db': db, 'Video': Video }

if __name__ == '__main__':
  app.run(debug=True)
