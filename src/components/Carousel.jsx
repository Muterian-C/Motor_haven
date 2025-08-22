import React from 'react'

const Carousel = () => {
  return (
    <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="images/carousel_honda.avif" className="d-block w-100 carous_img" alt="Honda" />
          <div className="carousel-caption d-none d-md-block text-white">
            <h2>Honda</h2>
            <p><b>Precision engineering meets everyday reliability—Honda delivers smooth performance for every road and every rider.</b></p>
          </div>
        </div>
        <div className="carousel-item">
          <img src="images/pngtree-the-harley-davidson-softail-parked-in-front-of-a-building-picture-image_2884806.jpg" className="d-block  carous_img " width='1500' alt="Harley Davidson" />
          <div className="carousel-caption d-none d-md-block text-info">
            <h5>Harley-Davidson</h5>
            <p>"Unmistakable roar, timeless design—Harley-Davidson defines freedom on the open road."</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src="images/kawasaki-removebg-preview.png" className="d-block w-100 carous_img" alt="Kawasaki" />
          <div className="carousel-caption d-none d-md-block text-black">
            <h5>Kawasaki</h5>
            <p><b>Built for thrill-seekers—Kawasaki fuses speed, power, and style into every ride.</b></p>
          </div>
        </div>
        <div className="carousel-item">
          <img src="images/speeding-motorcycle-racer-in-full-gear-on-high-performance-bike-on-a-racetrack-concept-of-speed-motorsport-racing-competition-thrill-photo.jpeg" className="d-block w-100 carous_img" alt="Racing" />
          <div className="carousel-caption d-none d-md-block text-black">
            <h5>Racing</h5>
            <p><b>Engineered for adrenaline—racing bikes deliver raw speed, razor-sharp handling, and podium-ready performance.</b></p>
          </div>
        </div>
        <div className="carousel-item">
          <img src="images/yamaha-removebg-preview.png" className="d-block w-100 carous_img" alt="Yamaha" />
          <div className="carousel-caption d-none d-md-block text">
            <h5>Yamaha</h5>
            <p><b>Yamaha blends innovation and reliability—crafted for riders who crave performance, precision, and long-lasting adventure.</b></p>
          </div>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  )
}

export default Carousel
