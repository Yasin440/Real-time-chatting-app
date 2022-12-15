import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/actions/authAction';
import { SUCCESS_MESSAGE_CLEAR } from '../store/types/authTypes';
import { useAlert } from 'react-alert';
const Login = () => {
    // $(".btn").click(function () {
    //     $("form").addClass("wrong-entry");
    //     setTimeout(function () {
    //       $("form").removeClass("wrong-entry");
    //     }, 3000);
    //   });
    const initialInput = {
        email: '',
        password: ''
    }
    const dispatch = useDispatch()
    const [isBlind, setIsBlind] = useState('');
    const alert = useAlert();
    const [inputData, setInputData] = useState(initialInput);
    const navigate = useNavigate()
    const { error, success, authenticate } = useSelector(state => state.authReducer);

    $(document).on("mousemove", function (event) {
        var dw = $(document).width() / 15;
        var dh = $(document).height() / 15;
        var x = event.pageX / dw;
        var y = event.pageY / dh;
        $(".eye-ball").css({
            width: x,
            height: y
        });
    });
    const handleInput = e => {
        setInputData({
            ...inputData,
            [e.target.name]: e.target.value
        })
    }
    const handleLogin = e => {
        e.preventDefault();
        dispatch(loginUser(inputData));
    }
    useEffect(() => {
        if (success) {
            alert.success(success.message);
            //clear form
            setInputData(initialInput);

            dispatch({ type: SUCCESS_MESSAGE_CLEAR })
        }
        if (error?.message) {
            alert.error(error.message);
        }
        if (authenticate) {
            navigate("/");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [success, error, authenticate])
    return (
        <div className='login'>
            <div className="panda">
                <div className="ear"></div>
                <div className="face">
                    <div className="eye-shade"></div>
                    <div className="eye-white">
                        <div className="eye-ball"></div>
                    </div>
                    <div className="eye-shade rgt"></div>
                    <div className="eye-white rgt">
                        <div className="eye-ball"></div>
                    </div>
                    <div className="nose"></div>
                    <div className="mouth"></div>
                </div>
                <div className="body"> </div>
            </div>
            <form className={isBlind} onSubmit={handleLogin}>
                <div className="hand"></div>
                <div className="hand rgt"></div>
                <div className="foot">
                    <div className="finger"></div>
                </div>
                <div className="foot rgt">
                    <div className="finger"></div>
                </div>
                <h1>Please Login</h1>
                <div className="form-group">
                    <input
                        onChange={handleInput}
                        value={inputData.email}
                        name="email"
                        // required="required"
                        type="email"
                        className="form-control"
                    />
                    <label className="form-label">Email</label>
                    {error?.email && <span className='errorMessage'>{error.email}</span>}
                </div>
                <div className="form-group">
                    <input
                        onChange={handleInput}
                        value={inputData.password}
                        name="password"
                        id="password"
                        type="password"
                        // required="required"
                        className="form-control"
                        onFocus={() => setIsBlind('up')}
                        onBlur={() => setIsBlind('')}
                    />
                    <label className="form-label">Password</label>
                    {error?.password && <span className='errorMessage'>{error.password}</span>}
                    {/* <p className="alert">Invalid Credentials..!!</p> */}
                    <button type="submit" className="btn">Login </button>
                </div>
                <div className='toggleAuth'>
                    <span>Have no Account?
                        <Link to='/user/registration'>Register</Link>
                    </span></div>
            </form>
        </div>
    );
};

export default Login;