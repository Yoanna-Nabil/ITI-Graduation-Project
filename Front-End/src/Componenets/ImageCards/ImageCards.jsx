import React, { useEffect } from 'react';
import Swiper from 'swiper'
import 'swiper/swiper-bundle.css'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './ImageCards.css'; // Ensure the correct path to your CSS file

const ImageCards = () => {
  useEffect(() => {
    const swiper = new Swiper('.swiper-container', {
      slidesPerView: 4, // Show 4 photos at a time
      spaceBetween: 30,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });

    const fetchImages = async () => {
      try {
        const response = await axios.get('https://api.escuelajs.co/api/v1/products');
        const products = response.data.slice(0, 6); // Limit to 6 products
        const swiperWrapper = document.querySelector('.swiper-wrapper');

        products.forEach(product => {
          if (product.images.length > 0) {
            const image = product.images[0]; // Use first image of each product
            const slide = document.createElement('div');
            slide.classList.add('swiper-slide');
            slide.innerHTML = `
              <div class="card" style="width: 18rem;">
                <img src="${image}" class="card-img-top" alt="${product.title}">
                <div class="card-body">
                  <h5 class="card-title">${product.title}</h5>
                  <p class="card-text">$${product.price}</p>
                </div>
              </div>
            `;
            swiperWrapper.appendChild(slide);
          }
        });

        // Update Swiper instance after adding new slides
        swiper.update();
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="slider-container">
      <div className="swiper-container">
        <div className="swiper-wrapper">
          {/* Slides will be injected here */}
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </div>
  );
};

export default ImageCards;
