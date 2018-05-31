import cherrypy
from mycontroller import MyController

def start_service():
    dispatcher = cherrypy.dispatch.RoutesDispatcher()

    myController = MyController()

    dispatcher.connect('get_index', '/', controller=myController, action = 'GET', conditions=dict(method=['GET']))
    dispatcher.connect('post_index', '/', controller=myController, action = 'POST_INDEX', conditions=dict(method=['POST']))

    conf = {
        'global': {
            'server.socket_host': 'localhost',
            'server.socket_port': 8080,
            },
        '/': {
            'request.dispatch': dispatcher,
            }
    }
    
    cherrypy.config.update(conf)
    app = cherrypy.tree.mount(None, config=conf)
    cherrypy.quickstart(app)

if __name__ == '__main__':
    start_service()