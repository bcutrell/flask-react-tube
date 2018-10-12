#!/usr/bin/env python

import os
import readline
from pprint import pprint

from flask import *

from app import create_app, db
from app.models import Video

app = create_app()
app.app_context().push()

os.environ['PYTHONINSPECT'] = 'True'