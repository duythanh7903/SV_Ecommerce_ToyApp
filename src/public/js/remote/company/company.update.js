const inputName = document.getElementById('inputCompanyName')
const inputLink = document.getElementById('inputCompanyLink')
const inputCountries = document.getElementById('inputCompanyCountries')
const imagePreview = document.getElementById('imagePreview')
const buttonAdd = document.getElementById('buttonAddCategory')
const inputId = document.getElementById('inputId')

inputLink.addEventListener('input', () => {
    const url = String(inputLink.value).trim()
    imagePreview.src = url
})

buttonAdd.addEventListener('click', async () => {
    const name = String(inputName.value).trim()
    const link = String(inputLink.value).trim()
    const countries = String(inputCountries.value).trim()
    const id = String(inputId.value).trim()
    const url = 'http://127.0.0.1:7903/duylt/api/v1/manager/companies/update'

    if (!name || !link || !countries) {
        alert('Fields cannot be left blank!')
        return
    }

    fetch(url, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            link: link,
            countries: countries,
            id: id
        }),
    })
    .then(res => { return res.json() })
    .then(res => {
        const { code, message, company } = res
        if (code == 0) {
            alert(message)
        } else {
            window.location.href = `/companies`
        }
    })
    .catch(err => {
        console.error(`ERROR WHEN REQUEST DATA FROM CLIENT | <INSERT COMPANY>: ${err.mssage}`)
        alert('Error! Please try again later.')
    })
})