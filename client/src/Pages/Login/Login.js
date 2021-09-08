
import "./Login.css"
import { Col, Row, Container, Form, Image, ProgressBar } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { Login_action } from "../../redux/Action/Auth_action"
import { Link } from "react-router-dom"
import TimeSlider from "./TimeSlider/TimeSlider"
import { useEffect, useState } from "react"
const Login = ({ history }) => {


    const [dataLogin, setDataLogin] = useState({ email: '', password: '' })
    const [now, setNow] = useState(20)
    const [loginSet, setLoginSet] = useState(false)
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo, error } = userLogin


    useEffect(() => {

        if (userInfo) {

            history.push('/')

        }

    }, [history, userInfo])


    // Progress bars
    useEffect(() => {

        if (loginSet === true) {

            if (now === 100) {

                setNow(0)
                dispatch(Login_action(dataLogin))
                return setLoginSet(false)
            }


            const conv = setInterval(() => {
                setNow(prev => prev + 20)


            }, 1000)

            return () => clearInterval(conv)

        }

    }, [loginSet, now, dataLogin, dispatch])



    const [validated, setValidated] = useState(false);
    const HandleLogin = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
        //  console.log('dataLogin', dataLogin)
        setLoginSet(true)
    };





    // router HandleREGISTER
    const HandleREGISTER = (e) => {
        e.preventDefault(e)
        history.push('/singup')
    }



    return (
        <Container >

            <div className={loginSet ? "onlyLoginUser open" : "onlyLoginUser"}>
                <ProgressBar animated   now={now} label={`${now}%`} visuallyHidden className="allt_login_d" />
            </div>


            {error &&
                <span className="error">

                    <Link className="class_likn" to={`/login`}>
                        {error}
                    </Link>
                </span>

            }



            <Row className="justify-content-center  row_login" >


                <TimeSlider />



                <Col xs={12} sm={12} md={8} lg={4} className="input_input">


                    <div className="Login_div">
                        <span className="login_div_xx" >Login</span>
                        <i className="fas fa-check"></i>
                    </div>



                    <div className="Login_goog_facbook">

                        <span >
                            <Image src={`../Image/fac.png`} className="image_png" />
                            feacbook
                        </span>


                        <span>
                            <Image src={`../Image/4444.png`} className="image_png" />

                            Google
                        </span>

                    </div>


                    <div className="Login_div" onClick={(e) => HandleREGISTER(e)}>
                        <span className="font-six">
                            I do not have an account you can register on the site
                        </span>
                    </div>




                    <Form validated={validated} className="form_input" onSubmit={(e) => HandleLogin(e)}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <i className="far fa-envelope icons_input"></i>
                            <Form.Label>Email address</Form.Label>
                            <input
                                className="xp_input"
                                type="email"
                                placeholder="Enter email"
                                required
                                onChange={(e) => setDataLogin({ ...dataLogin, email: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <i className="fas fa-unlock-alt icons_input"></i>
                            <Form.Label>Password</Form.Label>
                            <input
                                className="xp_input"
                                type="password"
                                placeholder="Password"
                                required
                                onChange={(e) => setDataLogin({ ...dataLogin, password: e.target.value })}


                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                        <button
                            className="button_login"
                            type="submit">
                            login
                        </button>
                    </Form>
                </Col>


            </Row>
        </Container>
    )


}


export default Login





/*

    const [postData, setPostData] = useState({ email: '', password: '' })

    //dispatch
    const dispatch = useDispatch()

    // redirect ....  to hom.
 //   const redirect = location.search ? location.search.split('=')[1] : '/login'

    const userLogin = useSelector((state) => state.userLogin)
    const { error, userInfo } = userLogin

    useEffect(() => {

        if (userInfo) {
            history.push('/')
        }

    }, [ userInfo,history])


    const HandleLogin = (e) => {
        e.preventDefault()
        dispatch(Login_action(postData))
    }

    return (

        <span className="Login_first">

            {error && <span>{error}</span>}
            <span className="claos">
                <span className="claos_first">
                    <i class="far fa-times-circle"></i>
                </span>
            </span>

            <span className="login_first_text">
                <i className="fas fa-fire"></i>
                <p>Login </p>
            </span>

            <span className="loagin_user">
                <input
                    className="input"
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    onChange={(e) => setPostData({ ...postData, email: e.target.value })}
                    onKeyPress={e => e.key === 'Enter' ? HandleLogin(e) : null}
                />
                <input
                    className="input"
                    type="password"
                    placeholder="Your Password"
                    onChange={(e) => setPostData({ ...postData, password: e.target.value })}
                    onKeyPress={e => e.key === 'Enter' ? HandleLogin(e) : null}

                />
                <button type="submit" className="button" onClick={HandleLogin}>Login</button>
            </span>


            <span className="google">
                <span className="google_first">
                    <img src="https://png.monster/wp-content/uploads/2020/11/b64cc812d68e951149b3e1a21c9a49e7-12019a02.png" alt="" className="image" />
                    <p className="googl_text">Login With Google</p>
                </span>
            </span>

            <span className="feacbook">
                <span className="feacbook_first">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/480px-Facebook_Logo_%282019%29.png" alt="" className="image" />
                    <p className="googl_text">Login With Facebook</p>
                </span>
            </span>


            <span className="singUp">
                <p><Link className="link" to={`/singup`}>I do not have an account, you can register from here</Link></p>
            </span>

        </span>

    )

*/