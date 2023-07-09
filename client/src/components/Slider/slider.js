import { Component } from "react";
import Slider from "react-slick";
import SliderTile from "./sliderTile";


export default class SessionSlider extends Component {
    render() {
        const settings = {
            className: "center",
            dots: false,
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
                    <SliderTile
                        image={"https://images.pexels.com/photos/3265460/pexels-photo-3265460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
                        CardHeading={"Daily  Calm "}
                    />
                    <SliderTile
                        CardHeading={"Daily  Jay"}
                        CardSubHeading1={"Wisdom"}
                        CardSubHeading2={"Jay Shetty"}
                        CardSubHeading4={"Self View"}
                        image={"https://images.bauerhosting.com/celebrity/sites/3/2022/09/GettyImages-1369475529-e1662563431594.jpg?q=80&auto=format&w=1400&ar=16:9&fit=crop&crop=top"}
                    />
                    <SliderTile
                        image={"https://wildclinicandnaturaltreat.com/cdn/shop/articles/bodytight_73e09894-d6fa-46a1-b1cf-f6d0a40bb2c0.jpg?v=1617873300"}
                        CardHeading={"Daily  Move"}
                        CardSubHeading1={"Movement "}
                        CardSubHeading2={"Mia Meh"}
                        CardSubHeading4={"Daily Practice"}
                    />
                    <SliderTile
                        image={"https://renascent.ca/wp-content/uploads/2016/11/step-11-prayer-and-meditation.jpg"}
                    />
                </Slider>
            </div>
        );
    }
}

const cssstyle = `
.container {
  max-width: 210px;
}

@media screen and (max-width:585px){
    .container{
        max-width:200px;
        transform: scale(0.95);
    }
}
@media screen and (max-width:450px){
    .container{
        max-width:180px;
        transform: scale(0.85);
    }
}
@media screen and (max-width:405px){
    .container{
        max-width:160px;
        transform: scale(0.75);
    }
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