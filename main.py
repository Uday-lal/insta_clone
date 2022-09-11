from server import start_server
from config import Config


app = start_server()
config = Config()

if __name__ == "__main__":
    app.run(debug=config.prod == "false")
