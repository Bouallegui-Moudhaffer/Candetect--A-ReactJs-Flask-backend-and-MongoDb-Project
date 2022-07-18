from flask import Flask
from flask import request
from pyresparser import ResumeParser
import pyrebase

config = {
    "apiKey": "AIzaSyAVMKtmiL9Mxj9tK9lj4HppzKO09iLC6pE",
    "authDomain": "candetect-838ef.firebaseapp.com",
    "databaseURL": "https://candetect-838ef-default-rtdb.europe-west1.firebasedatabase.app",
    "projectId": "candetect-838ef",
    "storageBucket": "candetect-838ef.appspot.com",
    "messagingSenderId": "136984825672",
    "appId": "1:136984825672:web:034077fe53e3b58aa46d7d",
    "measurementId": "G-YWGBWPM5B2"
  }

firebase = pyrebase.initialize_app(config)
storage = firebase.storage()


app = Flask(__name__)


# File download Link
@app.route('/filePath', methods=['POST'])
def get_path():
    data = request.get_json()["path"]
    storage.child(f"files/{data}").download(f"files/Resume.pdf")
    return "Success.."
    
# Details API Get Route
@app.route("/details")
def details():
    path = r"D:\React\Candetect\backend\files\Resume.pdf"
    resume_data = ResumeParser(path).get_extracted_data()
    return {"college_name":resume_data.get('college_name'),
            "company_names":resume_data.get('company_names'),
            "degree":resume_data.get('degree'),
            "designation":resume_data.get('designation'),
            "email":resume_data.get('email'),
            "experience":resume_data.get('experience'),
            "mobile_number":resume_data.get('mobile_number'),
            "name":resume_data.get('name'),
            "no_of_pages":resume_data.get('no_of_pages'),
            "skills":resume_data.get('skills'),
            "total_experience":resume_data.get('total_experience')
    }

if __name__== "__main__":
    app.run(debug=True)
