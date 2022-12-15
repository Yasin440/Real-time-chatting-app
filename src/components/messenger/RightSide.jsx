import React from 'react';
import { BsCameraVideoFill, BsThreeDots } from 'react-icons/bs';
import { IoCall } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import Message from './Message';

const RightSide = () => {
  const { myInfo } = useSelector(state => state.authReducer);
  return (
    <div className='right-side'>
      <div className="row">
        <div className="col-8">
          <div className="messaging">
            <div className="messaging-header">
              <div className="top-user">
                <div className="user">
                  <div className="active">
                    <div className="imgBox">
                      <div className="img">
                        <img src={`./image/${myInfo.image}`} alt="" />
                      </div>
                    </div>
                    <div className="active-sign"></div>
                  </div>
                  <div className="user-name">{myInfo.userName}</div>
                </div>
                <ul className="icons">
                  <li className="icon"><IoCall />
                  </li>
                  <li className="icon"><BsCameraVideoFill /></li>
                  <li className="icon"><BsThreeDots /></li>
                </ul>
              </div>
            </div>
            <div className="messaging-body">
              <Message />
            </div>
            <div className="messaging-footer"></div>
          </div>
        </div>
        <div className="col-4">

        </div>
      </div>
    </div>
  );
};

export default RightSide;