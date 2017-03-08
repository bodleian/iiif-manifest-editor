from flask import Flask, send_from_directory
app = Flask(__name__)


@app.route("/")
def serve_index():
    return send_from_directory('public', 'index.html')


@app.route("/<path:filename>")
def serve_files(filename):
    return send_from_directory('public', filename)

if __name__ == "__main__":
    app.run()

