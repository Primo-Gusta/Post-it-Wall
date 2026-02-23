import React, { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';

const PostitCard = ({ postit, onDelete, onUpdate }) => {
  const textareaRef = useRef(null);
  useEffect(() => {
    if(postit.content === '') {
      textareaRef.current.focus();
    }
  }, []);
  const nodeRef = useRef(null);
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
    <Draggable
    nodeRef={nodeRef}
    defaultPosition ={{ x: postit.x, y: postit.y}}
    onStop={(e, data) => 
      onUpdate(postit.id, {...postit, x: data.x, y: data.y})
      }
      >
      <div ref={nodeRef} className="postit-card" style={{ backgroundColor: postit.color }}>
      <button className="delete-btn" onClick={() => onDelete(postit.id)}>x</button>
      <textarea
        ref={textareaRef}
        className="postit-input"
        value={localContent}
        onChange={(e) => setLocalContent(e.target.value)}
      />

      <div className="color-picker">
        {['#fff9aa', '#c1e7ff', '#ffcce5', '#d4f1be', '#ffd8b1', '#e7d1ff'].map((c) => (
          <div
            key={c}
            className={`color-dot ${postit.color === c ? 'active' : ''}`}
            style={{ backgroundColor: c }}
            onClick={() => handleColorChange(c)}
          />
        ))}
      </div>
    </div>
    </Draggable>
  );
};

export default PostitCard;