const buttonLogin = document.getElementById('buttonLogin')
const buttonSignUp = document.getElementById('buttonSignUp')
const inputUserNameRegister = document.getElementById('inputUserNameRegister')
const inputEmailRegister = document.getElementById('inputEmailRegister')
const inputPasswordRegister = document.getElementById('inputPasswordRegister')
const inputEmailLogin = document.getElementById('inputEmailLogin')
const inputPasswordLogin = document.getElementById('inputPasswordLogin')
const notifications = document.querySelector(".notifications")

const url = 'http://127.0.0.1:7903/'
const routesSignUp = 'duylt/api/v1/manager/signup'
const routesLogin = 'duylt/api/v1/manager/login'

const toastDetails = {
    timer: 5000,
    success: { icon: 'fa-circle-check', },
    error: { icon: 'fa-circle-xmark', },
    warning: { icon: 'fa-triangle-exclamation', },
    info: { icon: 'fa-circle-info', }
}

const removeToast = (toast) => {
    toast.classList.add("hide")
    if(toast.timeoutId) clearTimeout(toast.timeoutId)
    setTimeout(() => toast.remove(), 500)
}

const createToast = (id, message) => {
    const { icon } = toastDetails[id]
    const toast = document.createElement("li")
    toast.className = `toast ${id}`
    toast.innerHTML = `<div class="column">
                         <i class="fa-solid ${icon}"></i>
                         <span>${message}</span>
                      </div>
                      <i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>`
    notifications.appendChild(toast)
    toast.timeoutId = setTimeout(() => removeToast(toast), toastDetails.timer)
}

const validatePassword = (password) => { return String(password).length >= 6 }

const validateUserName = (userName) => {
    // Check if the user name contains any special characters
    const specialCharacters = /[!@#$%^&*(),.?":{}|<>]/
    if (specialCharacters.test(userName)) {
      return 'User name cannot contain special characters.'
    }
  
    // Check if the user name contains only letters, numbers, underscores, or hyphens
    const validCharacters = /^[a-zA-Z0-9_-]+$/
    if (!validCharacters.test(userName)) {
      return 'User name can only contain letters, numbers, underscores, or hyphens.'
    }
  
    // Check if the user name is too short or too long
    const minLength = 3
    const maxLength = 25
    if (userName.length < minLength || userName.length > maxLength) {
      return `User name must be between ${minLength} and ${maxLength} characters.`
    }
  
    // If all checks pass, return true
    return true
  }

buttonSignUp.addEventListener('click', async () => {
    const userName = String(inputUserNameRegister.value).trim()
    const email = String(inputEmailRegister.value).trim()
    const password = String(inputPasswordRegister.value).trim()
    const api = `${url}${routesSignUp}`
    const isUserName = validateUserName(userName)
    const isPassword = validatePassword(password)

    if (!userName || !email || !password) {
        createToast('error', 'Fields cannot be left blank!')
        return
    } if (isUserName !== true) {
        createToast('warning', isUserName)
        return
    } if (!isPassword) {
        createToast('warning', 'Passwords must be at least 6 characters!')
        return
    }

    fetch(api, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            user_name: userName,
            password: password
        }),
    })
    .then(res => { return res.json() })
    .then(res => {
        const {code, message, user} = res
        var idToast = 'error'
        if (code == 1) { 
            idToast = 'success'
            inputUserNameRegister.value = ""
            inputEmailRegister.value = ""
            inputPasswordRegister.value = ""
        }
        createToast(idToast, message)
    })
    .catch(err => {
        createToast('error', 'Something went wrong!')
        console.error(`ERROR WHEN SENT DATA FROM CLIENT <REGISTER>: ${err.message}`)
    })

})

buttonLogin.addEventListener('click', async () => {
    const email = String(inputEmailLogin.value).trim()
    const password = String(inputPasswordLogin.value).trim()
    const api = `${url}${routesLogin}`

    if (!email || !password) {
        createToast('error', 'Fields cannot be left blank!')
        return
    }

    fetch(api, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password
        }),
    })
    .then(res => { return res.json() })
    .then(res => {
        const {code, message, user} = res
        if (code == 0) {
            createToast('error', message)
            return
        }

        // Save account to cookie
        window.location.href = '/home'
    })
    .catch(err => {
        createToast('error', 'Something went wrong!')
        console.error(`ERROR WHEN SENT DATA FROM CLIENT <LOGIN>: ${err.message}`)
    })
})