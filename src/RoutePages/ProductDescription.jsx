// import React, { useState , useEffect } from "react";
// import "./ProductDescription.css";
// import { Link } from "react-router-dom";
// import { useNavigate ,useParams } from "react-router-dom";
// import axios from "axios";

// const ProductDescription = () => {
//   const [selectedWeight, setSelectedWeight] = useState("250 gm");
//   const [quantity, setQuantity] = useState(1);

//   const {_id} =  useParams();
// const [data , setData] = useState(
//     {
//       ProductName: '',
//       ProductDescription: '',
//       ProductIngredients: '',
//       ProductWeight: '',
//       Price: '',
//       ShelfLife: '',
//       Category: '',
//       StateOrigin: '',
//       ProductImage: [],
//       ProductNutritions: '',
//       StorageInstruction: '',
//     }
//   );



//   useEffect(()=>{
//     axios
//     .get(`http://localhost:5000/product/${_id}`)
//     .then((res) => {
//         setData(res.data);
//         if(res.data.ProductImage.length > 0){
//           setSelectedImage(res.data.ProductImage[0]);
//         }
//     })
//     .catch ((error) =>
//       console.error('Error fetching products:', error))

//   }, [_id])



//   const [selectedImage, setSelectedImage] = useState("");


//   const navigate = useNavigate();

//   // Sample product data
//   const product = {
    
//     weights: ["250 gm", "500 gm", "1 kg"],
//   };

//   return (
//     <div className='main-box'>
//       <div className="top-bar" style={{marginBottom:"15px"}}>
//         <button className="back-btn" onClick={() => navigate(-1)}>
//           <i className="fa-solid fa-chevron-left"></i>
//         </button>
//         <p>Order</p>
//         <div className="top-right">
//         <button className="btn-export" style={{width:"110px"}}> <i className="fa-solid fa-trash" style={{marginRight:"10px"}}></i>Delete</button>
//           <button>
//             <Link to="/add-product" style={{ color: "#fff" }}>
//                   <i className="fa-solid fa-pen" ></i> Edit Product
//             </Link>
//            </button>
//         </div>
//       </div>
//     <div className="product-container">
//       {/* Left: Image Gallery */}
//       <div className="image-gallery">
//         <div className="main-image">
//           <img src={selectedImage} alt="Product" />
//         </div>
        
//         <div className="thumbnail-gallery">
//           {data.ProductImage.map((img, index) => (
//             <img
//               key={index}
//               src={img}
//               alt={`Thumbnail ${index}`}
//               className={selectedImage === img ? "active" : ""}
//               onClick={() => setSelectedImage(img)}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Right: Product Info */}
//       <div className="product-info">
//         <h2 className="header-letter">{data.ProductName}  <button>published</button></h2>
//         <div className="rating">
//           <span>Sold : {product.sold}</span>|<span>Rating : {product.rating}/5</span> | <span>Stock :{" "} {product.stock}</span>
          
//         </div>
//         <h3 className="product-price">{data.Price}</h3>

//         {/* Weight Selection */}
//         <div className="weight-selection">
//           <p>Weight:</p>
//           <div className="weight-box">
//           {product.weights.map((weight, index) => (
//             <button
//               key={index}
//               className={selectedWeight === weight ? "active" : ""}
//               onClick={() => setSelectedWeight(weight)}
//             >
//               {data.ProductWeight}
//             </button>
//           ))}
//           </div>
//         </div>

//         {/* Description */}
//         <div className="description">
//           <h4>Description:</h4>
//           <p>{data.ProductDescription}</p>
//         </div>

//         {/* Quantity & SKU */}
//         <div className="quantity-sku">
//           <p>Shelf Life:</p>{data.ShelfLife}
         
//         </div>
//         <div className="footer-data">
//         <p style={{marginLeft:"10px"}}>SKU: {product.sku}</p>
//         <p style={{marginRight:"10px"}}>Created: {product.created}</p>
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default ProductDescription;

import React, { useState, useEffect } from "react";
import "./ProductDescription.css";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


const ProductDescription = () => {
  const [selectedWeight, setSelectedWeight] = useState("250 gm");
  // const [quantity, setQuantity] = useState(1);
  const { _id } = useParams();
  
  const [data, setData] = useState({
    ProductName: "",
    ProductDescription: "",
    ProductIngredients: "",
    ProductWeight: "",
    Price: "",
    ShelfLife: "",
    Category: "",
    StateOrigin: "",
    ProductImage: [],
    ProductNutritions: "",
    StorageInstruction: "",
  });

  const [selectedImage, setSelectedImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/product/${_id}`)
      .then((res) => {
        setData(res.data);
        if (res.data.ProductImage.length > 0) {
          setSelectedImage(res.data.ProductImage[0]);
        }
      })
      .catch((error) => console.error("Error fetching product:", error));
  }, [_id]);

  // Sample product data with weight options and different prices
  const cleanPrice = parseFloat(data.Price.replace(/[^\d.]/g, "")) || 0; 

  const product = {
    weights: ["250 gm", "500 gm", "1 kg"], 
    weightPriceMap: {
      "250 gm": cleanPrice.toFixed(2),
      "500 gm": (cleanPrice * 2).toFixed(2), 
      "1 kg": (cleanPrice * 4).toFixed(2),
    },
  };
   

  const [imgError, setImgError] = useState(false);

  const productImageUrl = data.ProductImage[0]?.startsWith('http')
    ? data.ProductImage[0]
    : `http://localhost:5000${data.ProductImage[0] || ''}`;



    

  return (
    <div className="main-box">
      <div className="top-bar" style={{ marginBottom: "15px" }}>
        <button className="back-btn" onClick={() => navigate(-1)}>
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <p>product Description</p>
        <div className="top-right">
          <button className="btn-export" style={{ width: "110px" }}>
            <i className="fa-solid fa-trash" style={{ marginRight: "10px" }}></i>Delete
          </button>
          <button onClick={()=>navigate(`/edit/${data._id}`)}>
            <Link  style={{ color: "#fff" }}>
              <i className="fa-solid fa-pen"></i> Edit Product
            </Link>
          </button>
        </div>
      </div>

      <div className="product-container">
        {/* Left: Image Gallery */}
        <div className="image-gallery">
          <div className="main-image">
            {/* <img src={selectedImage} alt="Product" />
            <img src={data.ProductImage[0]?.startsWith('http') ? data.ProductImage[0] : `http://localhost:5000${data.ProductImage || ''}`}
            alt={data.ProductName} className="product-image"/> */}

         {!imgError ? (
         <img
          src={selectedImage}
          alt="Product"
          onError={() => setImgError(true)}  // If this fails, switch to the second image
        />
       ) : (
        <img
          src={productImageUrl}
          alt={data.ProductName}
        />
      )}
          </div>

          <div className="thumbnail-gallery">
            {/* {data.ProductImage.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index}`}
                className={selectedImage === img ? "active" : ""}
                onClick={() => setSelectedImage(img)}
              />
            ))} */}

{data.ProductImage.length > 1 ? (
    data.ProductImage.map((img, index) => (
      <img
        key={index}
        src={img}
        alt={`Thumbnail ${index}`}
        className={selectedImage === img ? "active" : ""}
        onClick={() => {
          setSelectedImage(img);
          setImgError(false);  // Reset error state when selecting a new image
        }}
      />
    ))
  ) : (
    <img
      src={data.ProductImage[0] || data.ProductImage[0]?.startsWith('http') ? data.ProductImage[0] : `http://localhost:5000${data.ProductImage || ''}`} 
      alt="Thumbnail"
      className="active"
    />
  )}
            
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="product-info">
          <h2 className="header-letter">
            {data.ProductName} <button>Published</button>
          </h2>
          <div className="rating">
            <span>Sold: {data.sold || 0}</span> | <span>Rating: ⭐ {data.rating || 0}/5</span> |{" "}
            <span>Stock: {data.stock || 0}</span>
          </div>

          {/* Display Price based on Selected Weight */}
          <h3 className="product-price">₹ {product.weightPriceMap[selectedWeight]}</h3>

          {/* Weight Selection */}
          <div className="weight-selection">
            <p>Weight:</p>
            <div className="weight-box">
              {product.weights.map((weight, index) => (
                <button
                  key={index}
                  className={selectedWeight === weight ? "active" : ""}
                  onClick={() => setSelectedWeight(weight)}
                >
                  {weight}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="description">
            <h4>Description:</h4>
            <p>{data.ProductDescription}</p>
          </div>

          {/* Quantity & SKU */}
          <div className="quantity-sku">
            <p>Shelf Life:</p> {data.ShelfLife}
          </div>
          <div className="footer-data">
            <p style={{ marginLeft: "10px" }}>SKU: #302012</p>
            <p style={{ marginRight: "10px" }}>Created: 14 January 2023</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;

