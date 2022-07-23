import './App.scss';
import FileUpload from './FileUpload/FileUpload';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  
  const [recruitList, setRecruitList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/read").then((res) => {
      setRecruitList(res.data);
    });
  }, []);

  return (
    <div className="App">
      <div className="title">Upload file</div>
      <FileUpload/>
      <hr></hr>
      {recruitList.map((val, key) => {
        return (
          <div key={key}>
            <h4> {val.name}</h4>
            <h4> {val.email} </h4><br/>
          </div>
        );
      })}
    </div>
  );
}

export default App;
