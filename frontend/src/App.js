import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './App.css';

function App() {

  const[postits, setPostits] = useState([]);

  useEffect(() => {
    fetchPostits();
  }, []);

  const fetchPostits = async () => {
    try {
      const response = await axios.get('http://localhost:8080/postits');
      setPostits(response.data);
    } catch (error){
      console.error("Error: ", error);
    }
  };

  return (
    <div className="App">
      <h1>Post-its</h1>

      <div classname="wall">
      {postits.lenght === 0 ? (
        <p>No post-its found</p>
      ): (
        postits.map((p) => (
          <div key={p.id} className="postit-card" style={{backgroundColor: p.color}}>
            <p>{p.content}</p>
                  </div>
        ))
      )}
      </div>
    </div>
  );
}

export default App;