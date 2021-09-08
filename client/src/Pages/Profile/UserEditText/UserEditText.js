import { Col } from "react-bootstrap"



const UserEditText = ({ userid, userInfo }) => {


    return (
        <Col xs={12} sm={4} md={6} lg={3}  >
            <div className="edit_information">
                <h1>Intro</h1>

                <span className="infromation_edit">
                    <i className="fas fa-university"></i>
                    <span> gaza {userid?.AddAddress?.[0]?.University}</span>
                </span>

                <span className="infromation_edit">
                    <i className="fas fa-home add_color_fem"></i>
                    <span> livs in {userid?.AddAddress?.[0]?.living}</span>
                </span>



                <span className="infromation_edit">
                    <i className="fas fa-clock"></i>
                    <span> job {userid?.AddAddress?.[0]?.job}</span>
                </span>


                {userInfo ?
                    userid?._id === userInfo._id &&
                    <span className="infromation_edit_xp">
                        Edit details
                    </span>
                    : null}


            </div>

        </Col>
    )
}


export default UserEditText