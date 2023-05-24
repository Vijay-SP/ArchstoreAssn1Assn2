const axios = require('axios');

const payload = {
  str: 'xyz xyz xyz xyz xyz xyz xyz xyz'
};

axios.post('http://localhost:3000/', payload)
.then(response => {
  console.log('Response:', response.status, response.statusText);
})
.catch(error => {
  console.error('Error:', error.response.status, error.response.data);
});
 