#!/usr/bin/env python

import socket
import json
import cherrypy
	  

def eyecoords():
	TCP_IP = '127.0.0.1'
	TCP_PORT = 6555
	BUFFER_SIZE = 1024
	MESSAGE = "Hello, World!"

	s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
	s.connect((TCP_IP, TCP_PORT))
	s.send(MESSAGE)
	data = s.recv(BUFFER_SIZE)
	s.close()

	jsonmgs = data.split("\n")
	parsed_json = json.loads(jsonmgs[0])
	valuesdict = parsed_json["values"]
	framedict = valuesdict["frame"]
	avgdict = framedict["avg"]
	righteyedict = framedict["righteye"]
	lefteyedict = framedict["lefteye"]
	psizeR = righteyedict["psize"]
	psizeL= lefteyedict["psize"]
	xval = avgdict["x"]
	yval = avgdict["y"]
	timeval = framedict["time"]
	coordsdict = {"time":timeval,"y":yval,"x":xval,"pr":psizeR,"pl":psizeL}
	
	return coordsdict
#eyecoords()
	

class TribeCoords(object):
	@cherrypy.expose
	@cherrypy.tools.json_out()
	def index(self):
		valuesdict=eyecoords()
		returnvalues=json.dumps(valuesdict)
		return returnvalues
	index.exposed = True

cherrypy.quickstart(TribeCoords())