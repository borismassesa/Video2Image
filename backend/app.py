import os
import cv2
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
OUTPUT_FOLDER = 'output'
ALLOWED_EXTENSIONS = {'mp4', 'avi', 'mov'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['OUTPUT_FOLDER'] = OUTPUT_FOLDER

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def process_video(video_path, output_folder):
    video = cv2.VideoCapture(video_path)
    frame_count = int(video.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = int(video.get(cv2.CAP_PROP_FPS))
    
    images = []
    for i in range(0, frame_count, fps):  # Extract one frame per second
        video.set(cv2.CAP_PROP_POS_FRAMES, i)
        ret, frame = video.read()
        if ret:
            image_name = f"frame_{i}.jpg"
            image_path = os.path.join(output_folder, image_name)
            cv2.imwrite(image_path, frame)
            images.append(image_name)
            yield {"progress": int((i / frame_count) * 100), "image": image_name}
    
    video.release()

@app.route('/api/process-video', methods=['POST'])
def process_video_route():
    if 'video' not in request.files:
        return jsonify({"error": "No video file provided"}), 400
    
    file = request.files['video']
    
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        
        def generate():
            for result in process_video(file_path, app.config['OUTPUT_FOLDER']):
                yield f"data: {jsonify(result).data.decode()}\n\n"
        
        return app.response_class(generate(), mimetype='text/event-stream')
    
    return jsonify({"error": "Invalid file type"}), 400

@app.route('/api/images/<path:filename>')
def serve_image(filename):
    return send_from_directory(app.config['OUTPUT_FOLDER'], filename)

if __name__ == '__main__':
    app.run(debug=True)
