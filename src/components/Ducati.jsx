import React from "react";
const ducatiBikes = [
    {
      img: "https://images.ctfassets.net/x7j9qwvpvr5s/5WBzVCXJoJA4pvroIBJboJ/6ff7b41ed1e9dfbde87bef82f7262487/Ducati-Diavel-V4-MY23-overview-hero-1600x1000.jpg?fm=webp&q=90",
      variant: "Diavel-V4",
      price: "Rs. 42,00,000",
    },
    {
      img: "https://images.ctfassets.net/x7j9qwvpvr5s/6uhJWbWu6kZWq7S2NyVjOS/18838c8d876b48c53444abc82e04a676/XDiavel-nera-hero-01-1600x1000.jpg?fm=webp&q=90",
      variant: "XDiavel Nera",
      price: "Rs. 56,90,000 - 71,90,000",
    },
    {
      img: "https://imgd.aeplcdn.com/664x374/n/cw/ec/129361/streetfighter-v2-right-front-three-quarter.jpeg?isig=0&q=75",
      variant: "Streetfighter V2",
      price: "Rs. 1,971,420",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVCpoHxKtjATB3I-RjLJS9leZ_sEflfi0-QA&usqp=CAU",
      variant: "Multistrada V4 Rally",
      price: "Rs. 3,348,800",
    },
    {
      img: "https://images.ctfassets.net/x7j9qwvpvr5s/5ezu25mBGdGSPpLUrFc9Yo/263ffe13b5ca934bf3c78177206f9ec3/Ducati-Panigale-V4R-MY23-overview-banner-wide-663x249.jpg",
      variant: "Panigale V4 R",
      price: "Rs. 47,00,000",
    },
    {
      img: "https://images.ctfassets.net/x7j9qwvpvr5s/4K6UfbNTM0JC14I1lRkDqW/b9190b47890450bfc63cc6856901f294/Supersport-950-overview-hero-1600x1000.jpg?fm=webp&q=90",
      variant: "SuperSport 950",
      price: "Rs. 1,553,820",
    },
    {
      img: "https://images.ctfassets.net/x7j9qwvpvr5s/4mgEGgEM7EDGBDAMzA6RKu/b1910478956707aae1fd286742451862/Ducati-Hypermotard-950-RVE-MY24-overview-hero-1600x1000-01.jpg?fm=webp&q=90",
      variant: "Hypermotard 950 RVE",
      price: "Rs. 47,90,000",
    },
    {
      img: "https://www.hlj.com/productimages/tam/tam14140_0.jpg",
      variant: "Superleggera V4",
      price: "Rs. 14,99,999",
    },
  ];

const Ducati = () => {
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
        Ducati Bikes
      </button>

      <div className="container mt-4">
        <div className="row">
          {ducatiBikes.map((bike, index) => (
            <div key={index} className="col-sm-3 biker mb-4">
              <img src={bike.img} className="img-fluid" alt={bike.variant} />
              <p>Bike model: Ducati</p>
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

export default Ducati;
