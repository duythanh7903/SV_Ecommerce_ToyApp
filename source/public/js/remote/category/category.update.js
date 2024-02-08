const buttonAddCategory = document.getElementById('buttonAddCategory')
const inputCategoryName = document.getElementById('inputCategoryName')
const inputId = document.getElementById('id')
const notifications = document.querySelector(".notifications")

buttonAddCategory.addEventListener('click', async () => {
    const name = String(inputCategoryName.value).trim()
    const id = String(inputId.value).trim()
    const url = `http://127.0.0.1:7903/`
    const routesAddCategory = `duylt/api/v1/manager/categories/update`
    const api = `${url}${routesAddCategory}`

    if (!name) {
        alert('Fields cannot be left blank!')
        return
    }

    fetch(api, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            id: id
        }),
    })
    .then(res => { return res.json() })
    .then(res => {
        const {code, message, category} = res
        if (code == 0) {
            alert(message)
        } else {
            window.location.href = '/categories'
        }
    })
    .catch(err => {
        alert('Error! Please try again later.')
        console.log(err)
    })
})