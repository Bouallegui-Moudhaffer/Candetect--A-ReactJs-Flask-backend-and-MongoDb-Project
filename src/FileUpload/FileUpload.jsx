import { useState, useEffect, React } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import './FileUpload.scss'
import ProgressBar from "./Progress";
import axios from 'axios';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "./firebase";


const FileUpload = () => {
    const [initialData, setInitialData] = useState([{}])
    const [progress, setProgress] = useState(0);
    const formHandler = (e) => {
      e.preventDefault();
      const file = e.target.files[0];
      uploadFiles(file);
      update();
    };

    const update = () => {
      axios.get('http://localhost:3000/details').then((res) => {
        setInitialData(res.data);
      });
    };

    useEffect(update, []);
  
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
          getDownloadURL(uploadTask.snapshot.ref).then(() => {
            axios.post('http://localhost:3000/filePath', {
              'path': file.name
            }).then(() => console.log(file.name));
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
            <div>
              <h3>Hello {initialData.name}</h3>
            </div>
        </>
    )
}

export default FileUpload
