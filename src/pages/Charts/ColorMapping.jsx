import { useEffect, useState, React } from 'react';
import axios from 'axios';

const ColorMapping = () => {

  const [recruitList, setRecruitList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/read').then((res) => {
      setRecruitList(res.data);
    });
  }, []);

  return (
    <div className="App">
      <hr></hr>
      {recruitList.map((val, key) => {
        return (
          <div key={key}>
            <h4> {val.name} </h4>
            <h4> {val.email} </h4> <br/>
          </div>
          );
      })}
    </div>
  );
};

export default ColorMapping;
