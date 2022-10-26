import React from 'react';
import './categories-menu.styles.scss'
import DirectoryItem from '../directory-item/directory-item.component'

const CategoriesMenu = ({categories}) => {
        
          return (
            <div className="categories-menu-container">
              {categories.map((category) => (      
                <DirectoryItem key = {category.id} category={category}/>
              ))}
            </div>
          );
   
};

export default CategoriesMenu;