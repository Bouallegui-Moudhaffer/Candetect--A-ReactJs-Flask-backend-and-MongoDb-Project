import { useState, useEffect } from 'react'
import './App.scss';
import FileUpload from './FileUpload/FileUpload';
import FileList from './FileList/FileList';

function App() {
  const [files, setFiles] = useState([])
  const [initialData, setInitialData] = useState([{}])

  const removeFile = (filename) => {
    setFiles(files.filter(file => file.name !== filename))
  }

  useEffect(() => {
    fetch('/details').then(
      response => response.json()
    ).then(data => setInitialData(data))
  }, []);

  return (
    <div className="App">
      <div className="title">Upload file</div>
      <FileUpload files={files} setFiles={setFiles}
        removeFile={removeFile} />
      <FileList files={files} removeFile={removeFile} />
      <div>
        <h3>Hello {initialData.name}</h3>
        <h4>Email: {initialData.email}</h4>
        <h4>Email: {initialData.degree}</h4>
      </div>
    </div>
  );
}

export default App;
