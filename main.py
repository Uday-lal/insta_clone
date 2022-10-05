from server import getApp 
from config import Config


app = getApp()
config = Config()

if __name__ == "__main__":
    app.run(debug=config.prod == "false")
