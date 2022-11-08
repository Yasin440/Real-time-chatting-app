import React, { useState } from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
const Registration = () => {
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
        <div className='register'>
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
            <form className={isBlind}>
                <div className="hand"></div>
                <div className="hand rgt"></div>
                <div className="foot">
                    <div className="finger"></div>
                </div>
                <div className="foot rgt">
                    <div className="finger"></div>
                </div>
                <h1>Registration</h1>
                <div className="form-group">
                    <input required="required" type="text" className="form-control" />
                    <label className="form-label">Username</label>
                </div>
                <div className="form-group">
                    <input required="required" type="email" className="form-control" />
                    <label className="form-label">Email</label>
                </div>
                <div className="form-group">
                    <input id="password" type="password" required="required" className="form-control"
                        onFocus={() => setIsBlind('up')}
                        onBlur={() => setIsBlind('')} />
                    <label className="form-label">Password</label>
                </div>
                <div className="form-group">
                    <input id="password" type="password" required="required" className="form-control"
                        onFocus={() => setIsBlind('up')}
                        onBlur={() => setIsBlind('')} />
                    <label className="form-label">Confirm Password</label>
                </div>
                <div className="form-group">
                    <input id="password" type="password" required="required" className="form-control"
                        onFocus={() => setIsBlind('up')}
                        onBlur={() => setIsBlind('')} />
                    <label className="form-label">Confirm Password</label>
                    <p className="alert">Invalid Credentials..!!</p>
                    <button className="btn">Sign up </button>
                </div>
                <div className='toggleAuth'>
                    <span>Already have an Account?
                        <Link to='/chat/login'>Login</Link>
                    </span></div>
            </form>
        </div>
    );
};

export default Registration;