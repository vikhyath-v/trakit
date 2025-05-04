import datetime
import requests
import urllib.parse
import os
from flask import Flask, request, jsonify, redirect, session, send_from_directory, make_response
from flask_cors import CORS

app = Flask(__name__, static_folder='client/build', static_url_path='')
# Get environment variables or use default values
CLIENT_ID = os.environ.get("SPOTIFY_CLIENT_ID", "a0b66d1ecaca4d8f9bbac1dc94b03f49")
CLIENT_SECRET = os.environ.get("SPOTIFY_CLIENT_SECRET", "a6c84e5c4048473cb648dc1ab09094de")
FRONTEND_URL = os.environ.get("FRONTEND_URL", "http://localhost:3000")
BACKEND_URL = os.environ.get("BACKEND_URL", "http://localhost:5000")
REDIRECT_URI = f"{FRONTEND_URL}/callback"

# Configure CORS for development or production
if os.environ.get("ENVIRONMENT") == "production":
    CORS(app, supports_credentials=True, origins=[FRONTEND_URL])
else:
    CORS(app, supports_credentials=True, origins=["http://localhost:3000"])

# Use a secret key from environment variable in production
app.secret_key = os.environ.get("SECRET_KEY", "53d453d453d453d453d453d453d453d4")

AUTH_URL = "https://accounts.spotify.com/authorize"
TOKEN_URL = "https://accounts.spotify.com/api/token"
API_BASE_URL = "https://api.spotify.com/v1"

@app.route('/api/login-url')
def get_login_url():
    scope = "user-read-private user-read-email user-top-read"
    params = {
        "response_type": "code",
        "client_id": CLIENT_ID,
        "scope": scope,
        "redirect_uri": REDIRECT_URI,
        "show_dialog": True
    }
    
    auth_url = f"{AUTH_URL}?{urllib.parse.urlencode(params)}"
    return jsonify({"loginUrl": auth_url})

@app.route('/api/callback')
def callback():
    if 'error' in request.args:
        return jsonify({"error": request.args['error']}), 400
    
    if 'code' in request.args:
        req_body = {
            "grant_type": "authorization_code",
            "code": request.args['code'],
            "redirect_uri": REDIRECT_URI,
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET
        }
        response = requests.post(TOKEN_URL, data=req_body)
        token_info = response.json()

        if 'access_token' in token_info:
            session['access_token'] = token_info['access_token']
            session['refresh_token'] = token_info['refresh_token']
            session['expires_at'] = int((datetime.datetime.now() + datetime.timedelta(seconds=token_info['expires_in'])).timestamp())
            
            return jsonify({
                "success": True,
                "access_token": token_info['access_token'],
                "expires_in": token_info['expires_in']
            })
        else:
            error_msg = token_info.get('error', 'Unknown error during authentication')
            return jsonify({"error": error_msg}), 400
    
    return jsonify({"error": "No code provided"}), 400

@app.route('/api/me')
def get_user_profile():
    if 'access_token' not in session:
        return jsonify({"error": "Not logged in"}), 401
    
    if datetime.datetime.now().timestamp() > session.get('expires_at', 0):
        if not refresh_token_internal():
            return jsonify({"error": "Session expired"}), 401
    
    headers = {
        "Authorization": f"Bearer {session['access_token']}"
    }
    response = requests.get(f"{API_BASE_URL}/me", headers=headers)
    user_profile = response.json()
    return jsonify(user_profile)

@app.route('/api/top-artists')
def top_artists():
    if 'access_token' not in session:
        return jsonify({"error": "Not logged in"}), 401
    
    if datetime.datetime.now().timestamp() > session.get('expires_at', 0):
        if not refresh_token_internal():
            return jsonify({"error": "Session expired"}), 401
    
    headers = {
        "Authorization": f"Bearer {session['access_token']}"
    }
    
    time_range = request.args.get('time_range', 'short_term')
    limit = request.args.get('limit', 10, type=int)
    
    if time_range not in ['short_term', 'medium_term', 'long_term']:
        time_range = 'short_term'
    
    params = {
        "time_range": time_range,
        "limit": limit
    }
    response = requests.get(f"{API_BASE_URL}/me/top/artists", headers=headers, params=params)
    top_artists = response.json()
    return jsonify(top_artists)

@app.route('/api/top-tracks')
def top_tracks():
    if 'access_token' not in session:
        return jsonify({"error": "Not logged in"}), 401
    
    if datetime.datetime.now().timestamp() > session.get('expires_at', 0):
        if not refresh_token_internal():
            return jsonify({"error": "Session expired"}), 401
    
    headers = {
        "Authorization": f"Bearer {session['access_token']}"
    }
    
    time_range = request.args.get('time_range', 'short_term')
    limit = request.args.get('limit', 20, type=int)
    
    if time_range not in ['short_term', 'medium_term', 'long_term']:
        time_range = 'short_term'
    
    params = {
        "time_range": time_range,
        "limit": limit
    }
    response = requests.get(f"{API_BASE_URL}/me/top/tracks", headers=headers, params=params)
    top_tracks = response.json()
    return jsonify(top_tracks)

def refresh_token_internal():
    if 'refresh_token' not in session:
        return False
    
    req_body = {
        "grant_type": "refresh_token",
        "refresh_token": session['refresh_token'],
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET
    }
    response = requests.post(TOKEN_URL, data=req_body)
    new_token_info = response.json()
    
    if 'access_token' in new_token_info:
        session['access_token'] = new_token_info['access_token']
        session['expires_at'] = int((datetime.datetime.now() + datetime.timedelta(seconds=new_token_info['expires_in'])).timestamp())
        return True
    
    return False

@app.route('/api/refresh-token')
def refresh_token():
    if not refresh_token_internal():
        return jsonify({"success": False, "error": "Could not refresh token"}), 401
    
    return jsonify({
        "success": True,
        "access_token": session['access_token'],
        "expires_in": session['expires_at'] - int(datetime.datetime.now().timestamp())
    })

@app.route('/api/auth-status')
def auth_status():
    if 'access_token' in session:
        if datetime.datetime.now().timestamp() > session.get('expires_at', 0):
            if refresh_token_internal():
                return jsonify({"authenticated": True})
            else:
                return jsonify({"authenticated": False})
        return jsonify({"authenticated": True})
    return jsonify({"authenticated": False})

@app.route('/api/test')
def test():
    return jsonify({"status": "ok", "message": "API is working"})

# Serve React App in production
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if os.environ.get("ENVIRONMENT") == "production":
        if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
            return send_from_directory(app.static_folder, path)
        else:
            return send_from_directory(app.static_folder, 'index.html')
    else:
        return jsonify({"message": "API is running. Frontend is served separately in development mode."})

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=os.environ.get("ENVIRONMENT") != "production") 