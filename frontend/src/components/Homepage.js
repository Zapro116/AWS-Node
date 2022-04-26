import React from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <>
      <div className='row'>
        <div className='col-2'></div>
        <div className='card mt-5 col-3'>
          <img
            src='data:image/png;base64,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'
            className='card-img-top'
            alt='Fissure in Sandstone'
          />
          <div className='card-body'>
            <h5 className='card-title'>Amazon EC2</h5>
            <p className='card-text'>
              EC2 setup involves creating an Amazon Machine Image (AMI), which
              includes an operating system, apps, and configurations
            </p>
            <Link to='/ec2' className='btn btn-primary'>
              Go to EC2 --{'>'}
            </Link>
          </div>
        </div>

        <div className='col-2'></div>
        <div className='card mt-5 col-3'>
          <img
            src='https://cdn-blog.lawrencemcdaniel.com/wp-content/uploads/2021/01/30083957/aws-s3-logo.png'
            className='card-img-top'
            alt='Fissure in Sandstone'
          />
          <div className='card-body'>
            <h5 className='card-title'>Amazon S3</h5>
            <p className='card-text'>
              Amazon Simple Storage Service (Amazon S3) is an object storage
              service that offers industry-leading scalability, data
              availability, security, and performance.
            </p>
            <Link to='/s3' className='btn btn-primary'>
              Go to S3 --{'>'}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
