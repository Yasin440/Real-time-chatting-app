import React from 'react';
import { useSelector } from 'react-redux';
import { BsThreeDots } from 'react-icons/bs';
import { FaRegEdit } from 'react-icons/fa';
import { BiSearch } from 'react-icons/bi';
import ActiveFriend from './ActiveFriend';
import Friends from './Friends';

const LeftSide = () => {
  const { myInfo } = useSelector(state => state.authReducer);
  console.log(myInfo);
  return (
    <div className='left-side'>
      <div className="top-user">
        <div className="user">
          <div className="imgBox">
            <div className="img">
              <img src={`./image/${myInfo.image}`} alt="" />
            </div>
          </div>
          <div className="user-name">{myInfo.userName}</div>
        </div>
        <ul className="icons">
          <li className="icon"><BsThreeDots />
          </li>
          <li className="icon"><FaRegEdit /></li>
        </ul>
      </div>
      <div className="searchBox">
        <div className="search">
          <button><BiSearch /></button>
          <input type="text" placeholder='Search' />
        </div>
      </div>
      <ActiveFriend />
      <Friends />
    </div>
  );
};

export default LeftSide;