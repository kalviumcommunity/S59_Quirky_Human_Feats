import React from 'react';
import { useHistory } from 'react-router-dom';

const EntityList = ({ entities, onUpdate, onDelete }) => {
  const history = useHistory();

  const handleUpdate = (id) => {
    // Navigate to the update page with the entity ID as a parameter
    history.push(`/update/${id}`);
  };

  return (
    <div>
      {entities.map((entity) => (
        <div key={entity._id}>
            
          <h2>{entity.Category}</h2>
          <p>Name: {entity.Name}</p>
          <p>Quirk: {entity.Quirk}</p>
          <p>Level: {entity.Level}</p>
          <button onClick={() => handleUpdate(entity._id)}>Update</button>
          <button onClick={() => onDelete(entity._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default EntityList;
