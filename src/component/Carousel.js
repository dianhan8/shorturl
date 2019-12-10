import React from 'react'
import { Carousel } from 'antd'
import './../assets/css/carousel.less'
import {Link} from 'react-router-dom'
import image1 from './../assets/image/1.png'
import image2 from './../assets/image/2.png'
import image3 from './../assets/image/3.png'

export default function Banner() {
    return (
        <Carousel autoplay>
            <div className="banner">
                <Link to='/1'>
                    <img className="card" src={image1} alt="image1" />
                </Link>
            </div>
            <div className="banner">
                <Link to='/1'>
                    <img className="card" src={image2} alt="image2" />
                </Link>
            </div>
            <div className="banner">
                <Link to='/1'>
                    <img className="card" src={image3} alt="image3"/>
                </Link>
            </div>
        </Carousel>
    )
}