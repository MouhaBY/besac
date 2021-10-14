const serverAddress = "192.168.1.15:3001";

export async function loginUser(credentials) {
  return fetch('http://'+serverAddress+'/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
  .then(data => data.json())
  .catch(error => { error.json() })
}

export async function signupUser(credentials) {
  return fetch('http://'+serverAddress+'/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  }).then(data => data.json())
  .catch(error => { error.json() })
}

export async function getUser(id) {
  return new Promise(async (resolve, reject) => {
    try{
      const response = await fetch('http://'+serverAddress+'/api/auth/user/'+id)
      if (response.ok) {
        const results = await response.json() 
        resolve (results)
      }
      else {
        const error = await response.json() 
        reject(error)
      }
    }
    catch(error){
      reject(error)
    }
  })
}

export async function getUsersList() {
  return new Promise(async (resolve, reject) => {
    try{
      const response = await fetch('http://'+serverAddress+'/api/auth/all')
      if (response.ok) {
        const results = await response.json() 
        resolve (results)
      }
      else {
        const error = await response.json() 
        reject(error)
      }
    }
    catch(error){
      reject(error)
    }
  })
}

export async function deleteUser(id) {
  return fetch('http://'+serverAddress+'/api/auth/user/'+id, {
      method: 'DELETE',
    }).then(data => data.json())
}

export async function editUser(id, credentials){
  return fetch('http://'+serverAddress+'/api/auth/user/'+id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    }).then(data => data.json())
    .catch(error => error.json())
}