import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import banner1 from '../assets/images5.jpg';
import banner2 from '../assets/images2.jpg';
import banner3 from '../assets/images3.jpeg';
import banner4 from '../assets/images4.jpg';
import banner5 from '../assets/images.jpeg';

const Bannar = () => {
  return (
    <div>
      <Carousel
        showThumbs={false}
        infiniteLoop
        autoPlay
        interval={4000}
        showStatus={false}
        showArrows={true}
        swipeable={true}
        emulateTouch={true}
      >
        {[banner1, banner2, banner3, banner4, banner5].map((img, index) => (
          <div key={index}>
            <img
              src={img}
              alt={`Banner ${index + 1}`}
              className="w-full h-[50vh] md:h-[100vh] mb-0 object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Bannar;