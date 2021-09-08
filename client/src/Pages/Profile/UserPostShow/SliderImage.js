
import { Row, Col } from "react-bootstrap"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {LazyLoadImage} from "react-lazy-load-image-component"
const SliderImage = ({ currentSoffa, imageSave, setImageSave, arrayList, setOpenOpenImage }) => {

    // slider Image............
    const [current, setCurrent] = useState(0)
    // const [oppenClick, arrayList] = useState(false)

 //   console.log('current', current)

    useEffect(() => {

        if (current) {
          return  setImageSave(arrayList?.[current])
        }

    }, [current, setImageSave, arrayList])
    


    const HandleLeft = () => {



        if (current === 0) return null
        return setCurrent((prev) => prev - 1)


    }

    // slider Image............
    const HandleRight = () => {

        if (current === currentSoffa - 1) return null
        return setCurrent((prev) => prev + 1)


    }






    return (
        <div className="add_Image_open open">



            <Row className="justify-content-center" >



                <Col xs={11} sm={11} md={11} lg={11} className="postionx" >
                    <div className="close_photo">
                        <i className="fas fa-times" onClick={() => setOpenOpenImage(false)}></i>
                        <Link className="add_Link_Profile" to={`/`}>
                            <span>Upp</span>
                        </Link>

                        <div className="Zoom_ut">
                            <i className="fas fa-search-plus"></i>
                            <i className="fas fa-search-minus"></i>
                        </div>
                    </div>
                </Col>





                <Col xs={10} sm={9} md={6} lg={6} className="postion_xp" >
                    <LazyLoadImage src={`/${imageSave}`} className="imag_whidth" alt="" />



                  <i className="fas fa-chevron-left " onClick={(e) => HandleLeft(e)}></i>





                    <i className="fas fa-chevron-right " onClick={(e) => HandleRight(e)}></i>


                </Col>

            </Row>
        </div>

    )
}


export default SliderImage