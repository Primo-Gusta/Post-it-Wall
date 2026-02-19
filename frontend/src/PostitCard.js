import React, { useState, useEffect } from 'react';

const PostitCard = ({ postit, onDelete, onUpdate }) => {
  const [localContent, setLocalContent] = useState(postit.content);
  useEffect(() => {
    setLocalContent(postit.content);
  }, [postit.content]);
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (localContent !== postit.content) {
        onUpdate(postit.id, { ...postit, content: localContent });
      }
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [localContent]);

  const handleColorChange = (newColor) => {
    onUpdate(postit.id, { ...postit, color: newColor });
  };

  return (
    <div className="postit-card" style={{ backgroundColor: postit.color }}>
      <button className="delete-btn" onClick={() => onDelete(postit.id)}>x</button>
      
      <textarea
        className="postit-input"
        value={localContent}
        onChange={(e) => setLocalContent(e.target.value)}
      />

      <div className="color-picker">
        {['yellow', 'red', 'lightblue', 'pink'].map((c) => (
          <div
            key={c}
            className={`color-dot ${postit.color === c ? 'active' : ''}`}
            style={{ backgroundColor: c }}
            onClick={() => handleColorChange(c)}
          />
        ))}
      </div>
    </div>
  );
};

export default PostitCard;