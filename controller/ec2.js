// const { exec } = require('child_process');
const {
  CreateTagsCommand,
  RunInstancesCommand,
  CreateKeyPairCommand,
  StartInstancesCommand,
  StopInstancesCommand,
  DescribeInstancesCommand,
} = require('@aws-sdk/client-ec2');
const { ec2Client } = require('../libs/ec2Client');

exports.createEc2 = (req, res) => {
  // console.log(req);
  const { imageId, instanceType, KeyName, instanceName, mincnt, maxcnt } =
    req.body.modal;
  // console.log(imageId, instanceType, KeyName, instanceName, mincnt, maxcnt);
  // res.json({ imageId, instanceType, KeyName, instanceName, mincnt, maxcnt });

  const createKeyPair = async () => {
    try {
      const data = await ec2Client.send(new CreateKeyPairCommand({ KeyName }));
      console.log(JSON.stringify(data));
      res.send(data);
    } catch (err) {
      console.log('Error', err);
    }
  };

  createKeyPair();

  const createInstance = async () => {
    try {
      const instanceParams = {
        ImageId: imageId, //AMI_ID ami-04505e74c0741db8d
        InstanceType: instanceType, // t2.micro
        KeyName: KeyName,
        MinCount: mincnt,
        MaxCount: maxcnt,
      };

      const data = await ec2Client.send(
        new RunInstancesCommand(instanceParams)
      );
      console.log(data.Instances[0].InstanceId);
      const instanceId = data.Instances[0].InstanceId;
      console.log('Created instance', instanceId);
      // Add tags to the instance
      const tagParams = {
        Resources: [instanceId],
        Tags: [
          {
            Key: 'Name',
            Value: instanceName,
          },
        ],
      };
      try {
        const data = await ec2Client.send(new CreateTagsCommand(tagParams));
        console.log('Instance tagged');
        res.json(data);
      } catch (err) {
        console.log('Error', err);
      }
    } catch (err) {
      console.log('Error', err);
    }
  };

  createInstance();
};

exports.showEc2 = (req, res) => {
  const run = async () => {
    try {
      const data = await ec2Client.send(new DescribeInstancesCommand({}));

      return res.status(200).json(data);
    } catch (err) {
      console.log('Error', err);
    }
  };
  run();
};

exports.pauseEc2 = (req, res) => {
  const { instanceIds, cmd } = req.body;
  const params = { InstanceIds: instanceIds }; // Array of INSTANCE_IDs
  const command = cmd; // STATE i.e. "START" or "STOP"

  const run = async () => {
    if (command.toUpperCase() === 'START') {
      try {
        const data = await ec2Client.send(new StartInstancesCommand(params));
        console.log('Success', data.StartingInstances);
        return res.json(data);
      } catch (err) {
        console.log('Error2', err);
      }
    } else if (command.toUpperCase() === 'STOP') {
      try {
        const data = await ec2Client.send(new StopInstancesCommand(params));
        console.log('Success', data.StoppingInstances);
        return res.json(data);
      } catch (err) {
        console.log('Error', err);
      }
    }
  };
  run();
};
