import axios from 'axios'

export default function(url) {
  return axios
    .get(url)
    .then(response => {
      if (response.status == 200 && response.data.status == 'success') {
        return response.data.message
      }
      return null
    })
    .catch(error => {
      console.error(error)
    })
}
