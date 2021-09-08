import React, { useEffect, useState } from "react"
import "./Login.css"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { SingUp_action } from "../../redux/Action/Auth_action"

import { Col, Row, Container, Form,  ProgressBar } from "react-bootstrap"
import TimeSlider from "./TimeSlider/TimeSlider"
const SingUp = ({ history }) => {



    const [dataLogin, setDataLogin] = useState({ email: '', username: '', password: '' })
    const [now, setNow] = useState(20)
    const [loginSet, setLoginSet] = useState(false)
    const dispatch = useDispatch()

    const userLogin = useSelector((stata) => stata.userLogin)
    const { userInfo, error } = userLogin

    useEffect(() => {
        if (userInfo) {
            history.push('/')
        }

    }, [userInfo,history])


    // Progress bars
    useEffect(() => {

        if (loginSet === true) {

            if (now === 100) {

                setNow(0)
                dispatch(SingUp_action(dataLogin))
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
        setLoginSet(true)
    };





    // router HandleREGISTER
    const HandleREGISTER = (e) => {
        e.preventDefault(e)
        history.push('/login')
    }



    return (
        <Container >

            <div className={loginSet ? "onlyLoginUser open" : "onlyLoginUser"}>
                <ProgressBar animated   now={now} label={`${now}%`} visuallyHidden className="allt_login_d" />
            </div>



            <Row className="justify-content-center  row_login" >
                {error &&
                    <span className="error">

                        <Link className="class_likn" to={`/login`}>
                            {error}
                        </Link>
                    </span>

                }

                <TimeSlider />



                <Col xs={12} sm={12} md={8} lg={4} className="input_input">


                    <div className="Login_div">
                        <span className="login_div_xx">register</span>
                        <i className="fas fa-check"></i>
                    </div>





                    <div className="Login_div" onClick={(e) => HandleREGISTER(e)}>
                        <span className="font-six">
                            If you have an account, I can log in
                        </span>
                    </div>




                    <Form validated={validated} className="form_input" onSubmit={HandleLogin}>
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
                            <i className="fas fa-user icons_input"></i>
                            <Form.Label>User name</Form.Label>
                            <input
                                className="xp_input"
                                type="text"
                                placeholder="username"
                                required
                                onChange={(e) => setDataLogin({ ...dataLogin, username: e.target.value })}


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
                        <button className="button_login"
                            type="submit">
                            sing up
                        </button>
                    </Form>
                </Col>


            </Row>
        </Container>
    )


}


export default SingUp



/*
    const [postData, setPostData] = useState({username : '', email : '', password: ''})

    const dispatch = useDispatch()

    const userLogin = useSelector((stata)=>stata.userLogin)
     const {userInfo, error} = userLogin

     useEffect(()=>{
         if(userInfo){
             history.push('/')
         }
     },[userInfo,history])
    const HandeSingUp = e =>{

        dispatch(SingUp_action(postData))
    }
    return (

        <span className="Login_first">

               {error && <p>{error}</p>}

            <span className="claos">
                <span className="claos_first">
                    <i class="far fa-times-circle"></i>
                </span>
            </span>

            <span className="login_first_text">
                <i className="fas fa-fire"></i>
                <p>Register </p>
            </span>

            <span className="loagin_user">
            <input
            className="input"
             type="text"
              name="username"
               placeholder="Your UserName"
               onChange={e=>setPostData({...postData, username : e.target.value})}
               onKeyPress={e=>e.key === 'Enter' ? HandeSingUp(e): null}
               required
               />
                <input
                className="input"
                type="email"
                 name="email"
                 placeholder="Your Email"
                 onChange={e=>setPostData({...postData, email : e.target.value})}
                 onKeyPress={e=>e.key === 'Enter' ? HandeSingUp(e): null}
                 required
                 />
                <input
                className="input"
                type="password"
                placeholder="Your Password"
                onChange={e=>setPostData({...postData, password : e.target.value})}
                onKeyPress={e=>e.key === 'Enter' ? HandeSingUp(e): null}
                required
                />
                <button type="submit" className="button" onClick={HandeSingUp}>Login</button>
            </span>


            <span className="singUp">
                <p><Link className="link" to={`/login`}>If you have an account you can log in</Link></p>
            </span>

        </span>

    )
*/

