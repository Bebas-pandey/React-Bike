import React from "react";

const harleyDavidsonBikes = [
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp-dVooGxPmaCcO4Bbj8IlEGVQISMjfQcPcw&usqp=CAU",
      variant: "Harley-Davidson X™",
      price: "INR. 2,29,000",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv_JqasCCHVozohxm_R76M5t7Zm_-NKMy7yg&usqp=CAU",
      variant: "NIGHTSTER™",
      price: "INR. 17,49,000",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSs1VwEtCYm-StmNYZcSo4Npj11J4vxyi__A&usqp=CAU",
      variant: "NIGHTSTER™ SPECIAL",
      price: "INR. 18,29,000",
    },
    {
      img: "https://www.revzilla.com/blog_content_image/image/77279/BJN72946_P.jpg",
      variant: "SPORTSTER™ S",
      price: "INR. 18,79,000",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_0cl2UAlRN7c-aN--jEgUXlldymqYA1-tLA&usqp=CAU",
      variant: "FAT BOB™ 114",
      price: "INR. 20,49,000",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkLEz2LnTkOzpA_mJu2HWYZEGV2zhxu8JOPA&usqp=CAU",
      variant: "FAT BOY™ 114",
      price: "INR. 24,49,000",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE859J0GeTqslfTtH4oTlKo6_G8gZCFy8WeA&usqp=CAU",
      variant: "Heritage Classic",
      price: "INR. 26,59,000",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ1-onN80XQLzrdz6XRYHsEGEEN2n2Vza5CQ&s",
      variant: "PAN AMERICA™ 1250 SPECIAL",
      price: "INR. 24,49,000",
    },
  ];
const HarleyDavidson = () => {
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
      Harley-Davidson Bikes
    </button>

    <div className="container mt-4">
      <div className="row">
        {harleyDavidsonBikes.map((bike, index) => (
          <div key={index} className="col-sm-3 biker mb-4">
            <img src={bike.img} className="img-fluid" alt={bike.variant} />
            <p>Bike model: Harley-Davidson</p>
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

export default HarleyDavidson;
