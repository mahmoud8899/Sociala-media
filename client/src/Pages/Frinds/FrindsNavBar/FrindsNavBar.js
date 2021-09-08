import { Col } from "react-bootstrap"

const FrindsNavBar = ({ setNavBarRequires, setOpenConfim }) => {



    return (
        <Col xs={12} sm={6} md={4} lg={3} className="test_nw">
            <div className="add_bottom">
                <div className="top_navBar_friendss">
                    <span>
                        Friends
                    </span>
                    <i className="fas fa-cog icons_color"></i>

                </div>
                <ul className="List_navBar_frinds">
                    <li onClick={() => {
                        setNavBarRequires(false)
                        setOpenConfim(false)

                    }}>

                        <i className="fas fa-user-friends"></i>
                        <span>Home</span>
                        <span className="xosppp" >
                            <i className="fas fa-angle-right"></i>
                        </span>

                    </li>



                    <li onClick={() => {
                        setNavBarRequires(true)
                        setOpenConfim(false)
                    }}>
                        <i className="fas fa-user-times"></i>
                        <span>Wait for approval</span>
                        <span className="xosppp" >
                            <i className="fas fa-angle-right"></i>
                        </span>
                    </li>



                    <li onClick={() => setOpenConfim(true)}>
                        <i className="fas fa-user-times"></i>
                        <span>wait for Conmfirm</span>
                        <span className="xosppp" >
                            <i className="fas fa-angle-right"></i>
                        </span>
                    </li>


                </ul>
            </div>
        </Col>
    )
}


export default FrindsNavBar