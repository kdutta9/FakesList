from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/get-results", methods=["POST"])
def get_results():
    request_json = request.get_json(force=True)
    # check if json
    url = request_json["url"]
    from main import get_listing
    results = get_listing(url)
    return jsonify(results)
