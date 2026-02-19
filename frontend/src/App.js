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

  const addPostit = async (e) => {
    e.preventDefault();
    if (!content) return;
    try {
      await axios.post('http://localhost:8080/postits', null, {
        params: { content, x: 100, y: 100, color }
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
      <h1>Post-its</h1>
      <form onSubmit={addPostit} className="postit-form">
        <input
          type="text"
          placeholder="Escreva sua ideia"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <select value={color} onChange={(e) => setColor(e.target.value)}>
          <option value="yellow">Amarelo</option>
          <option value="red">Vermelho</option>
          <option value="lightblue">Azul</option>
          <option value="pink">Rosa</option>
        </select>
        <button type="submit">Adicionar</button>
      </form>

      <div className="mural">
        {postits.map((p) => (
          <PostitCard key={p.id} postit={p} onDelete={deletePostit} onUpdate={editPostit} />
        ))}
      </div>
    </div>
  );
}

export default App;