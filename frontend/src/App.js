import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './App.css';

function App() {

  const[postits, setPostits] = useState([]);
  const [content, setContent] = useState('');
  const [color, setColor] = useState('yellow');

  useEffect(() => {
    fetchPostits();
  }, []);

  const fetchPostits = async () => {
    try {
      const response = await axios.get('http://localhost:8080/postits');
      setPostits(response.data);
    } catch (error){
      console.error("Error on getting postits: ", error);
    }
  };

  const addPostit = async (e) => {
    e.preventDefault();
    if(!content) return;

    try{
      await axios.post('http://localhost:8080/postits', null, {
        params: {
          content: content,
          x: 100,
          y: 100,
          color: color,
        }
      });
      setContent('');
      fetchPostits();
    } catch (error){
      console.error("Error on adding postit:", error);
    }
  };

  const deletePostit = async(id) => {
    try{
      await axios.delete('http://localhost:8080/postits/' + id);
      fetchPostits();
    } catch (error){
      console.error("Failed to Delete:", error)
    }
  }

  return (
    <div className="App">
      <h1>Post-its</h1>

    {/* Create a post-it */}
    <form onSubmit={addPostit} className="postit-form">
      <input
        type="text"
        placeholder='Write your idea'
        value={content}
        onChange={(e) => setContent(e.target.value)}
        />
      <select value={color} onChange={(e) => setColor(e.target.value)}>
        <option value="yellow">Yellow</option>
        <option value="red">Red</option>
        <option value="lightblue">Blue</option>
        <option value="pink">Pink</option>
      </select>
      <button type="submit">Add Post-it</button>
    </form>

      <div className="mural">
      {postits.lenght === 0 ? (
        <p>No post-its found</p>
      ): (
        postits.map((p) => (
          <div key={p.id} className="postit-card" style={{backgroundColor: p.color}}>
            <button className="delete-btn" onClick={() => deletePostit(p.id)}>x</button>
            <p>{p.content}</p>
                  </div>
        ))
      )}
      </div>
    </div>
  );
}

export default App;