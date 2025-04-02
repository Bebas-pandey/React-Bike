import React from "react";
// import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
   
import "../components/style.css";
const bikes = [
  {
    img: "https://www.royalenfield.com/content/dam/royal-enfield/india/motorcycles/classic-350/gallery/thumbnail/gallery-5.jpg",
    variant: "Classic-350",
    price: "Rs. 4,99,999",
  },
  {
    img: "http://images.overdrive.in/wp-content/uploads/2023/10/2023-RE-Meteor-350-4-900x506.jpg",
    variant: "Meteor-350",
    price: "Rs. 8,30,000 - 8,70,000",
  },
  {
    img: "https://www.royalenfield.com/content/dam/royal-enfield/hunter-350/home/motorcycle/hunter-350-motorcycle-home.jpg",
    variant: "Hunter-350",
    price: "Rs. 1.5 lakh INR",
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsp4gC5ugJmHoBJFJUMTx2mc6K_ekRNVEvDA&s",
    variant: "Himalayan",
    price: "Rs. 8,99,999",
  },
  {
    img: "https://www.royalenfield.com/content/dam/royal-enfield/india/motorcycles/scram-411/gallery/thumbnail/gallery-1-thumbnail.jpg",
    variant: "Scram-411",
    price: "Rs. 6,59,999",
  },
  {
    img: "https://images.carandbike.com/cms/blog-feed/2023/3/25/articles/2023/3/3205535/articles/2023/3/3206186/articles/2023/3/3206211/articles/2023/3/3206217/2023_RE_Interceptor_650_1_ebb75c306f.jpg",
    variant: "Interceptor",
    price: "Rs. 12,50,000",
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGSag2yei4BHMjcib4Uv0iffZLLB4C8WcuUg&s",
    variant: "Continental-GT",
    price: "Rs. 7,21,000",
  },
  {
    img: "https://images.timesdrive.in/photo/msid-151059652,thumbsize-606953,width-560,height-250,false/151059652.jpg",
    variant: "Bullet",
    price: "Rs. 4,99,999",
  },
];

const RoyalEnfield = () => {
  return (
    <div className="container-fluid text-center p-3">
      <button
        className="btn btn-link py-3 py-4"
        style={{
          width: "100%",
          color: "black",
          fontStyle: "italic",
          fontSize: "xxx-large",
        }}
      >
        Royal-Enfield Bikes
      </button>

      <div className="container mt-4">
        <div className="row">
          {bikes.map((bike, index) => (
            <div key={index} className="col-sm-3 biker mb-4">
              <img src={bike.img} className="img-fluid" alt={bike.variant} />
              <p>Bike model: Royal-Enfield</p>
              <p>Variant: {bike.variant}</p>
              <p>Price: {bike.price}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="container-fluid text-center p-3">
        <button
          className="btn btn-success py-3 px-5"
          style={{
            width: "fit-content",
            alignItems: "center",
            color: "black",
            fontSize: "larger",
          }}
        >
          Explore More
        </button>
      </div>
    </div>
  );
};

export default RoyalEnfield;
