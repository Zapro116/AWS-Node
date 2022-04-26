import axios from 'axios';

export const getEc2 = async () => {
  return await axios.get('/ec2').then((res) => {
    return res.data;
  });
};

export const createEc2 = async (modal) => {
  return await axios.post('/ec2', { modal }).then((res) => {
    return res;
  });
};

export const toggleEc2 = async (instanceIds, cmd) => {
  return await axios.post('/ec2/pause', { instanceIds, cmd }).then((res) => {
    return res;
  });
};
