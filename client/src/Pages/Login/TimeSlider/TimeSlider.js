
import {Col ,Image} from "react-bootstrap"
import React, { useEffect, useState } from "react"

const TimeSlider = ()=>{

    // slider bilder...
    const [current, setCurrent] = useState(0)
    const sliderImage = ['login1.jpg', 'login2.jpg', 'login4.jpg', 'login3.png']
    const allImage = sliderImage ? sliderImage?.length : null
    useEffect(() => {

        if (allImage === current) {

            return setCurrent(0)
        }

        const inver = setInterval(() => {


            setCurrent(prev => prev + 1)

        }, 9000)




        return () => clearInterval(inver)


    }, [current, allImage])





    return (
        <Col  sm={6} md={6} lg={6} className="d-none d-lg-block" xs={{ order: 'first' }} >

        <div className="LoginIn_Slider">
            <h1>Login in</h1>
            <Image src={`./Image/${sliderImage[current]}`} className="ImageLoginSlider" alt="hello world" />
        </div>


    </Col>
    )
}


export default TimeSlider