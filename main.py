from flask import Flask
from flask import render_template

app = Flask(
    __name__,
    static_url_path="/dwts/static",
    static_folder="static",
    template_folder="templates"
)


@app.route("/")
def hello():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(port=3444, debug=True)