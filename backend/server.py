from flask import Flask
from pyresparser import ResumeParser


app = Flask(__name__)

# Details API Route
@app.route("/details")
def details():
    resume_data = ResumeParser(r'D:\React\Candetect\backend\Uploaded_Resumes\OmkarResume.pdf').get_extracted_data()
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
