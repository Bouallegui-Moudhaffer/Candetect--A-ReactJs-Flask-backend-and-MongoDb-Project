import { useState, useEffect } from 'react'
import './App.scss';
import FileUpload from './FileUpload/FileUpload';

function App() {

  const [initialData, setInitialData] = useState([{}])


  useEffect(() => {
    fetch('/details').then(
      response => response.json()
    ).then(data => setInitialData(data))
  }, []);
  
  return (
    <div className="App">
      <div className="title">Upload file</div>
      <FileUpload/>
      <div>
        <h3>Hello {initialData.name}</h3>
      </div>
    </div>
  );
}

export default App;
