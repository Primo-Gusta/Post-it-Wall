import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import PostitCard from './PostitCard';

function App() {
  const [postits, setPostits] = useState([]);
  const [content, setContent] = useState('');
  const [color, setColor] = useState('yellow');

  useEffect(() => {
    fetchPostits();
  }, []);

  const fetchPostits = async () => {
    try {
      const response = await axios.get('http://localhost:8080/postits');
      setPostits(response.data);
    } catch (error) {
      console.error("Erro ao buscar:", error);
    }
  };

  const addPostit = async () => {
    try {
    const centerX = window.innerWidth / 2 - 100;
    const centerY = window.innerHeight / 2 - 100;
      await axios.post('http://localhost:8080/postits', null, {
        params: { content: '', x: centerX, y: centerY, color: 'yellow' }
      });
      setContent('');
      fetchPostits();
    } catch (error) {
      console.error("Erro ao adicionar:", error);
    }
  };

  const deletePostit = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/postits/${id}`);
      fetchPostits();
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  };

  const editPostit = async (id, updatedData) => {
  if (!id) return;
  try {
    await axios.put(`http://localhost:8080/edit-postit/${id}`, null, {
      params: {
        content: updatedData.content,
        x: updatedData.x,
        y: updatedData.y,
        color: updatedData.color,
      }
    });
    fetchPostits();
  } catch (error) {
    console.error("Erro detalhado:", error.response);
  }
};

  return (
    <div className="App">
    <header className="app-header">
      <button className="add-button-top" onClick={addPostit}>
        + Add Post-it
      </button>
      <h1 className="app-title">Mural Interativo</h1>
    </header>

    <div className="mural">
      {postits.map((p) => (
        <PostitCard 
          key={p.id} 
          postit={p} 
          onDelete={deletePostit} 
          onUpdate={editPostit} 
        />
      ))}
    </div>
    </div>
  );
}

export default App;