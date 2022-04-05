const express = require('express')

const router = express.Router()

// check if user is logged in (by cookie)
router.get('/', (request, response) => {
  const username = request.cookies.username

  // render home page
  return response.render('home', {
    username,
  })
})

// check if there's a query
router.get('/login', (request, response) => {
  let badAuth = request.query.msg ? true : false

  if (badAuth) {
    return response.render('login', {
      error: 'Invalid username or password',
    })
  }
  
  else {
    // render login
    return response.render('login')
  }
})

// get username from cookies and render
router.get('/welcome', (request, response) => {
  const username = request.cookies.username;

  return response.render('welcome', {
    username,
  })
})

// check login and sabe data to cookies
router.post('/process_login', (request, response) => {
  const { username, password } = request.body

  // fake test data
  // use this to login
  const userDetails = {
    username: 'brunodev',
    password: '00000000',
  }

  // basic check
  if (
    username === userDetails['username'] &&
    password === userDetails['password']
  ) {
    // saving the data to the cookies
    response.cookie('username', username)
    // redirect
    return response.redirect('/welcome')
  } 
  
  else {
    // redirect with a fail message
    return response.redirect('/login?msg=fail')
  }
})

// clear cookie and redirect
router.get('/logout', (request, response) => {
  response.clearCookie('username')
  return response.redirect('/login')
})

module.exports = router