import { useState, React } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './FileUpload.scss';
import axios from 'axios';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from './firebase';
import ProgressBar from './Progress';

const FileUpload = () => {
  const [initialData, setInitialData] = useState([{}]);
  const [progress, setProgress] = useState(0);

  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    uploadFiles(file);
  };

  const addRecruit = () => {
    axios.post("http://localhost:8080/insert", {
      college_name:initialData.college_name, company_names:initialData.company_names,
          degree:initialData.degree, designation:initialData.designation,
          email:initialData.email, experience:initialData.experience,
          mobile_number:initialData.mobile_number, name:initialData.name,
          no_of_pages:initialData.no_of_pages, skills:initialData.skills,
          total_experience:initialData.total_experience,
    });
  }

  const update = async () => {
    await axios.get('/details').then((res) => {
      setInitialData(res.data);
    });
    addRecruit();
  };

  const uploadFiles = (file) => {
    //
    if (!file) return;
    if (!initialData) return null;
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
          await axios.post('/filePath', {
            'path': file.name
          }).then(() => console.log(file.name));
          update();
        });
      }
    );
  };

    return (
        <>
          <div className="file-card">
              <div className="file-inputs">
                  <input type="file" onChange={formHandler} />
                  <button>
                      <i>
                          <FontAwesomeIcon icon={faPlus} />
                      </i>
                      Upload
                  </button>
              </div>
              <ProgressBar color={"#ff7979"} width={"150px"} value={Math.round(progress)} max={100} />
              <p className="main">Supported files</p>
              <p className="info">PDF, JPG, PNG</p>
          </div>
        </>
    );
};

export default FileUpload;
