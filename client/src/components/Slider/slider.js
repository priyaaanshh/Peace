import { Component } from "react";
import Slider from "react-slick";
import SliderTile from "./sliderTile";


export default class SessionSlider extends Component {
    render() {
        const settings = {
            className: "center",
            dots: true,
            centerMode: true,
            infinite: true,
            centerPadding: "0px",
            slidesToShow: 1,
            speed: 500
        };
        return (
            <div className="container">
                <link
                    rel="stylesheet"
                    type="text/css"
                    charSet="UTF-8"
                    href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
                />
                <link
                    rel="stylesheet"
                    type="text/css"
                    href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
                />
                <style>{cssstyle}</style>
                <Slider {...settings}>
                    <SliderTile />
                    <SliderTile />
                    <SliderTile />
                    <SliderTile />
                    <SliderTile />
                </Slider>
            </div>
        );
    }
}

const cssstyle = `
.container {
  padding: 38px 0px 0px 30px;
  max-width: 210px;
}

.slick-next:before, .slick-prev:before {
    color: #113F67;
}
.center .slick-center {
    color: #113F67;
    opacity: 1;
    transform: scale(1.08);
}
.center {
    transition: all .10s ease;
}
`;