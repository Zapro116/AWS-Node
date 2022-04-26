import React from 'react';
import { createEc2 } from '../functions';

const Modalbtn = ({ btnName, title, click, content }) => {
  const handleClick = () => {
    // console.log(click);
    createEc2(click).then((res) =>
      alert(
        'Created Ec2 instance with Request Id : ' + res.data.$metadata.requestId
      )
    );
  };

  return (
    <>
      <button
        type='button'
        className='btn btn-dark btn-lg btn-block mt-5 btn-ec2'
        data-mdb-toggle='modal'
        data-mdb-target='#exampleModal'
      >
        {btnName}
      </button>

      <div
        className='modal fade'
        id='exampleModal'
        tabIndex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                {title}
              </h5>
              <button
                type='button'
                className='btn-close'
                data-mdb-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>{content}</div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-mdb-dismiss='modal'
              >
                Close
              </button>
              <button
                type='button'
                data-mdb-dismiss='modal'
                onClick={handleClick}
                className='btn btn-primary'
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modalbtn;
