#!/usr/bin/env python

import os
import readline
from pprint import pprint

from flask import *

from app import app, db
from app import Video

app.app_context().push()
os.environ['PYTHONINSPECT'] = 'True'