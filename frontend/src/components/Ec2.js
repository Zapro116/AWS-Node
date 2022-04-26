import React, { useState, useEffect } from 'react';
import { getEc2, toggleEc2 } from '../functions';
import Modalbtn from './Modalbtn';

const Ec2 = () => {
  const [ec2, setEc2] = useState([]);

  const getData = () => {
    setEc2([]);
    getEc2().then((res) => {
      const data = res.Reservations;
      // console.log(data);
      setEc2((dat) => [...dat, ...data]);
      // setEc2(data);
    });
  };

  useEffect(() => {
    console.log(ec2);
  }, [ec2]);

  //   res[0].Instances[0].
  // ImageId, InstanceId, InstanceType, KeyName, State.Name, Tags[0].Value

  //   imageId, instanceType, KeyName, instanceName, mincnt, maxcnt

  const [contentModal, setContentModal] = useState({
    imageId: 'ami-04505e74c0741db8d',
    instanceType: 't2.micro',
    KeyName: '',
    instanceName: '',
    mincnt: 1,
    maxcnt: 1,
  });

  const handleChange = (e) => {
    // console.log(e);
    setContentModal({ ...contentModal, [e.target.name]: e.target.value });
  };

  const ContentModal = () => {
    return (
      <>
        <div className='form-outline'>
          Image Id :{' '}
          <input
            onChange={handleChange}
            value={contentModal.imageId}
            name='imageId'
          />
        </div>
        <br />
        <div className='form-outline'>
          Instance Type :{' '}
          <input
            onChange={handleChange}
            value={contentModal.instanceType}
            name='instanceType'
          />
        </div>
        <br />

        <div className='form-outline'>
          KeyName :{' '}
          <input
            onChange={handleChange}
            value={contentModal.KeyName}
            name='KeyName'
          />
        </div>
        <br />
        <div className='form-outline'>
          Instance Name :{' '}
          <input
            onChange={handleChange}
            value={contentModal.instanceName}
            name='instanceName'
          />
        </div>
        <br />
        <div className='form-outline'>
          Minimum Count :{' '}
          <input
            onChange={handleChange}
            value={contentModal.mincnt}
            name='mincnt'
          />
        </div>
        <br />
        <div className='form-outline'>
          Maximum Count :{' '}
          <input
            onChange={handleChange}
            value={contentModal.maxcnt}
            name='maxcnt'
          />
        </div>
      </>
    );
  };

  const handleToggle = (e) => {
    // console.log(e);
    const instanceIds = [e.target.accessKey];
    const cmd = e.target.name;
    toggleEc2(instanceIds, cmd).then((res) => {
      //   console.log(res.data);
      if (cmd === 'start') {
        alert(
          cmd +
            'ing instance with Id : ' +
            res.data.StartingInstances[0].InstanceId
        );
      } else {
        alert(
          cmd +
            'ing instance with Id : ' +
            res.data.StoppingInstances[0].InstanceId
        );
      }
    });
  };

  return (
    <div className='row w-100'>
      <div className='col-9 disp'>
        {ec2.length === 0 && (
          <center>
            <h1 className='mt-5'>No data available.</h1>
            <p>Click on Get Data Button</p>
          </center>
        )}
        {ec2.length > 0 &&
          ec2.map((d) => {
            return (
              <div
                key={d.Instances[0].InstanceId}
                className='card text-light crd'
              >
                <div className='row'>
                  <div
                    className={`col-3 cl cl-1 mt-4 pt-3  ${
                      d.Instances[0].State.Name === 'stopped'
                        ? 'bg-danger'
                        : 'bg-success'
                    }`}
                  >
                    {d.Instances[0].Tags[0].Value}
                    <div>Status : {d.Instances[0].State.Name}</div>
                  </div>
                  <div className='col-6 cl cl-2'>
                    <div>
                      InstanceType : {d.Instances[0].InstanceType.toUpperCase()}
                    </div>
                    <div>InstanceId : {d.Instances[0].InstanceId}</div>
                    <div>ImageId : {d.Instances[0].ImageId}</div>
                    <div>KeyName : {d.Instances[0].KeyName}</div>
                  </div>
                  <div className='col-3 cl cl-3'>
                    {d.Instances[0].State.Name === 'stopped' && (
                      <button
                        type='button'
                        onClick={handleToggle}
                        name='start'
                        accessKey={d.Instances[0].InstanceId}
                        className='btn btn-success mt-5 '
                      >
                        Start
                      </button>
                    )}
                    {d.Instances[0].State.Name === 'running' && (
                      <button
                        type='button'
                        accessKey={d.Instances[0].InstanceId}
                        name='stop'
                        onClick={handleToggle}
                        className='btn btn-danger mt-5'
                      >
                        Stop
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className='col-3'>
        <div className='cp-ec2'>
          <button
            type='button'
            onClick={getData}
            className='btn btn-primary btn-lg btn-block btn-ec2'
          >
            {' '}
            Get Data
          </button>

          <Modalbtn
            btnName='Add Instance'
            title='Add Instance'
            click={contentModal}
            content={ContentModal()}
          />
        </div>
      </div>
    </div>
  );
};

export default Ec2;
