import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./CategoryProducts.css";
import Category from "./Category";

const CategoryProducts = () => {
  const { name } = useParams(); // Get category name from URL
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/product/category/${name}`);
        setProducts(response.data);
        console.log(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    console.log(name);

    fetchProducts();
  }, [name]);

  
  

  return (
    <div className="category-products-container">
        <div className="top-bar">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <p>{name}</p>
          <div className="top-right">
           
          </div>
        </div>
  

      <div className="products-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="product-card">
              <img src={product.ProductImage[0]?.startsWith('http') ? product.ProductImage[0] : `http://localhost:5000${product.ProductImage || ''}`}
                  alt={product.ProductImage} />
              <h3 style={{marginTop:"20px"}}>{product.ProductName}</h3>
              <div className="price-section">
              <p>Price: {product.Price}</p>
              <p>Quantity : 19</p>
              </div>
            </div>
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;
