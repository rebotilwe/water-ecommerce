import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about" id="about">
      <div className="about-content">
        <h1>About Thirsti</h1>
        <p>
          At <strong>Thirsti</strong>, we believe that every drop of water should be as pure and refreshing 
          as nature intended. Our bottled water is sourced from pristine natural springs and carefully 
          filtered to deliver unmatched freshness in every sip.
        </p>

        <p>
          Since our beginning, we’ve been committed to sustainability, wellness, and hydration. 
          We pride ourselves on offering premium bottled water that nourishes your body and helps 
          you live life to the fullest — naturally.
        </p>

        <p>
          Whether you prefer still, sparkling, or flavoured water, Thirsti is your perfect companion 
          for an active and healthy lifestyle.
        </p>

        <button className="learn-more-btn">Learn More</button>
      </div>
    </div>
  );
};

export default About;
