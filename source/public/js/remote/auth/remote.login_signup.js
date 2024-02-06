const buttonLogin = document.getElementById('buttonLogin')
const buttonSignUp = document.getElementById('buttonSignUp')
const inputUserNameRegister = document.getElementById('inputUserNameRegister')
const inputEmailRegister = document.getElementById('inputEmailRegister')
const inputPasswordRegister = document.getElementById('inputPasswordRegister')
const notifications = document.querySelector(".notifications")

const url = 'http://127.0.0.1:7903/'
const routesSignUp = 'duylt/api/v1/manager/signup'
const routesLogin = ''

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

buttonSignUp.addEventListener('click', async () => {
    const userName = String(inputUserNameRegister.value).trim()
    const email = String(inputEmailRegister.value).trim()
    const password = String(inputPasswordRegister.value).trim()
    const api = `${url}${routesSignUp}`

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
        console.error(`ERROR WHEN SENT DATA FROM CLIENT: ${err.message}`)
    })

})