# Home Assistant add-on entrypoint — maps Supervisor's /data/options.json to
# the env vars services/embedding/app.py reads, then hands off to the
# unmodified service (same pattern as vinory-api/run.js).
import json
import os

OPTIONS_PATH = "/data/options.json"

try:
    with open(OPTIONS_PATH) as fh:
        options = json.load(fh)
except FileNotFoundError:
    options = {}

api_key = options.get("api_key")
if api_key:
    os.environ["EMBED_API_KEY"] = str(api_key)

os.environ.setdefault("PORT", "8801")

os.execvp("python", ["python", "/srv/app.py"])
