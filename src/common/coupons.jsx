import React from 'react';

const Coupons = () => {
    return ( 
<center>
        <div id="CouponCarousel" className="carousel slide m-3" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="/coupons/coupon1.jpg" className="d-block w-100" alt="..."/>
          </div>
          <div className="carousel-item">
            <img src="/coupons/coupon2.jpg" className="d-block w-100" alt="..."/>
          </div>
          <div className="carousel-item">
            <img src="/coupons/coupon3.jpg" className="d-block w-100" alt="..."/>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#CouponCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#CouponCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      </center>


     );
}
 
export default Coupons;