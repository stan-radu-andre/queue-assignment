import axios from 'axios';
import Timeout from 'await-timeout';

export const fetchUsers = async () => {
  await Timeout.set(2000); // for testing loading design
  const response = await axios.get(
    'https://voicetest20202.s3.amazonaws.com/users.json'
  );
  const users = response.data;
  // throw new Error('Error!'); // for test error message
  return users;
};
