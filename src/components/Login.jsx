import React, { useState } from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
const Login = () => {
    // $(".btn").click(function () {
    //     $("form").addClass("wrong-entry");
    //     setTimeout(function () {
    //       $("form").removeClass("wrong-entry");
    //     }, 3000);
    //   });
    const [isBlind, setIsBlind] = useState('');
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
                <div className="foot">
                    <div className="finger"></div>
                </div>
                <div className="foot rgt">
                    <div className="finger"></div>
                </div>
            </div>
            <form className={isBlind}>
                <div className="hand"></div>
                <div className="hand rgt"></div>
                <h1>Please Login</h1>
                <div className="form-group">
                    <input required="required" type="email" className="form-control" />
                    <label className="form-label">Email</label>
                </div>
                <div className="form-group">
                    <input id="password" type="password" required="required" className="form-control"
                        onFocus={() => setIsBlind('up')}
                        onBlur={() => setIsBlind('')} />
                    <label className="form-label">Password</label>
                    <p className="alert">Invalid Credentials..!!</p>
                    <button className="btn">Login </button>
                </div>
                <div className='toggleAuth'>
                    <span>Have no Account?
                        <Link to='/chat/registration'>Register</Link>
                    </span></div>
            </form>
        </div>
    );
};

export default Login;