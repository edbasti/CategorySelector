import React, { useState, useEffect } from 'react';
import { getCategoriesByParentId } from '../services/categoryService';

const CategorySelector = () => {
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    // Load top-level categories initially
    loadCategories(null, 0);
  }, []);

  const loadCategories = async (parentId, levelIndex) => {
    const categories = await getCategoriesByParentId(parentId);
    if (categories.length > 0) {
      setLevels(prevLevels => {
        const newLevels = prevLevels.slice(0, levelIndex); // Keep previous selects till the parent
        newLevels.push({ parentId, categories, selectedId: '' });
        return newLevels;
      });
    } else {
      // No more children, just cut off beyond current level
      setLevels(prevLevels => prevLevels.slice(0, levelIndex));
    }
  };

  const handleSelectChange = (e, levelIndex) => {
    const selectedId = parseInt(e.target.value);
    setLevels(prevLevels => {
      const newLevels = [...prevLevels];
      newLevels[levelIndex].selectedId = selectedId;
      return newLevels;
    });
    loadCategories(selectedId, levelIndex + 1);
  };

  return (
    <div>
      {levels.map((level, index) => (
        <select
          key={index}
          value={level.selectedId}
          onChange={(e) => handleSelectChange(e, index)}
          style={{ marginBottom: '10px', display: 'block' }}
        >
          <option value="">Select...</option>
          {level.categories.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      ))}
    </div>
  );
};

export default CategorySelector;