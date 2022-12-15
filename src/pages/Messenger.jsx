import React from 'react';
import LeftSide from '../components/messenger/LeftSide';
import RightSide from '../components/messenger/RightSide';

const Messenger = () => {
  return (
    <div className='Messenger'>
      <div className="row">
        <div className="col-3">
          <LeftSide />
        </div>
        <div className="col-9">
          <RightSide />
        </div>
      </div>
    </div>
  );
};

export default Messenger;