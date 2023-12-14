import './App.css';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'


export default function App() {
  const [data, setData] = useState<any[]>([]);

  useEffect(()=>{
    axios.get('/notifications')
    .then(res=>res.data)
    .then(data=> setData(data))
    .catch(error => {
      console.error('Error fetching data from notifications:', error);
    });
  }, []);

    return (
      <div className='container my-5' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>ID</th>
              <th>PUP ID</th>
              <th>TYPE OF REQUEST</th>
              <th>FRIEND REQUEST ID</th>
              <th>PARTY REQUEST ID</th>
              <th>TIME CREATED</th>
            </tr>
          </thead>
            <tbody>
              { data.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.pup_id}</td>
                  <td>{item.type_of_request}</td>
                  <td>{item.friend_request_id}</td>
                  <td>{item.party_request_id}</td>
                  <td>{item.time_created}</td>
                </tr>
              ))}
            </tbody>
          </table> 
        </div>
    );
  }

