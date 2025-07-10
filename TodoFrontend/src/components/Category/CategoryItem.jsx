import React, { useState } from "react";

const CategoryItem = ({ category, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(category.name);

  const handleSave = () => {
    if (editedName.trim() === "" || editedName === category.name) {
      setIsEditing(false);
      return;
    }
    onEdit(category.name, editedName); // parent expects (oldName, newName)
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col justify-between min-h-[130px]">
      <div>
        {isEditing ? (
          <div className="mb-2">
            <input
              className="w-full text-lg font-semibold text-gray-800 border border-gray-300 rounded px-2 py-1"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
          </div>
        ) : (
          <h3
            className="text-lg font-semibold text-gray-800 truncate"
            title={category.name}
          >
            {category.name}
          </h3>
        )}

        <p className="text-sm text-gray-500">
          {category.todoCount || 0} todos
        </p>
      </div>

      <div className="mt-3 flex justify-between items-center">
        {isEditing ? (
          <>
            <button
              type="save"
              onClick={handleSave}
              className="text-green-600 hover:underline text-sm"
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditedName(category.name);
              }}
              className="text-gray-500 hover:underline text-sm"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-500 hover:underline text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(category.name)}
              className="text-red-500 hover:underline text-sm"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryItem;
