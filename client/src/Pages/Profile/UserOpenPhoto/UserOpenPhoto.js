import { Row, Col } from "react-bootstrap"
import "./UserOpenPhoto.css"
import {LazyLoadImage} from "react-lazy-load-image-component"
const UserOpenPhoto = ({ imagePhoto, setImagePhoto ,openCloseImage, setOpenCloseImage }) => {





    return (
        <>
            {openCloseImage &&



                <div className="Add_Image_Ope open">
                    <Row className="justify-content-center">
                        <Col xs={10} sm={10} md={10} lg={10} >
                            <div className="top_navBar">
                                <div className="navBar_top">
                                    <i className="fas fa-times" onClick={() => {
                                        setImagePhoto('')
                                        setOpenCloseImage(false)

                                    }}></i>
                                    <span>Upp</span>

                                </div>

                                <div className="AAD_ZOOM_ut">
                                    <i className="fas fa-search-plus"></i>
                                    <i className="fas fa-search-minus"></i>
                                </div>

                            </div>


                        </Col>

                        <Col xs={10} sm={6} md={6} lg={6}>
                            <LazyLoadImage src={imagePhoto} alt="" className="image_test" />
                        </Col>
                    </Row>
                </div>

            }

        </>

    )
}


export default UserOpenPhoto