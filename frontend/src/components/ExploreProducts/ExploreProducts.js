import React from 'react';
import './ExploreProducts.css';
import { menu_list } from '../../assets/assets';

const ExploreProduct = ({ category, setCategory }) => {
  return (
    <div className='explore-products' id='explore-products'>
      <h1>Explore Our Water Collection</h1>
      <p className='explore-products-text'>
        Discover our refreshing range of Thirsti bottled water. 
        From sparkling to still, each bottle is filled with pure, natural goodness — 
        crafted to keep you hydrated, healthy, and refreshed every day.
      </p>
      <div className="explore-products-list">
        {menu_list.map((item, index) => {
          return (
            <div
              onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)}
              key={index}
              className='explore-products-list-item'
            >
              <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt={item.menu_name} />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreProduct;
