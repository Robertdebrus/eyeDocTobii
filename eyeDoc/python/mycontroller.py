import cherrypy
import re, json
import socket
import math



class MyController(object):
    def eyecoords(self):
        TCP_IP = '127.0.0.1'
        TCP_PORT = 6555
        BUFFER_SIZE = 1024
        MESSAGE = "Hello, World!"

        # s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        # s.connect((TCP_IP, TCP_PORT))
        # s.send(MESSAGE)
        # data = s.recv(BUFFER_SIZE)
        # s.close()
        
        
        f = open("../apidocs/out.txt", "r")
        lines = f.readlines()
        f.close()
        # page += "<p>%s</p>" % (lines)
        # with open("../apidocs/out.txt", "r") as f:
            # page = "\n".join("<p>%s</p>" % line for line in f)
        
        # jsonmgs = data.split("\n")
        # parsed_json = json.loads(jsonmgs[0])
        # valuesdict = parsed_json["values"]
        # framedict = valuesdict["frame"]
        # avgdict = framedict["avg"]
        # righteyedict = framedict["righteye"]
        # lefteyedict = framedict["lefteye"]
        # psizeR = righteyedict["psize"]
        # psizeL= lefteyedict["psize"]
        # xval = avgdict["x"]
        # yval = avgdict["y"]
        # timeval = framedict["time"]
        # coordsdict = {"time":timeval,"y":yval,"x":xval,"pr":psizeR,"pl":psizeL}
        
        
        parsed_json = json.loads(lines[0])
        
        xval = round(parsed_json["x"])
        print xval
        yval = round(parsed_json["y"])
        print yval
        coordsdict = {"x":xval, "y":yval}
        return coordsdict


    def GET(self):
        output = {'result':'success'}
        
        valuesdict=self.eyecoords()
        returnvalues=json.dumps(valuesdict)

        return returnvalues


    def POST_INDEX(self):
        output = {'result':'success'}

        data = json.loads(cherrypy.request.body.read().decode())
        print data
        f1=open('eyeData.txt', 'a')
        print >>f1, data

        return json.dumps(output)
        