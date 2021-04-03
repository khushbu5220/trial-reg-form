

// Register form 
      const form = document.getElementById('reg-form')
      form.addEventListener('submit', registerUser)

      async function registerUser(event) {
        event.preventDefault()
        const username = document.getElementById('username').value
        const email = document.getElementById('email').value
        const phone = document.getElementById('phone').value
        const address = document.getElementById('address').value
        const password = document.getElementById('password').value

        

		// Fetching data from body 
        const result = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username,
            email,
            phone,
            address,
            password
          })
        }).then((res) => res.json())

        if (result.status === 'ok') {
          // everythign went fine
          alert('Successfully registered')
        } else {
          alert(result.error)
        }
      }


   

    
    