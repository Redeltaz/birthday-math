const checkbox = document.querySelector('.anonyme')
const form = document.querySelector('form')

const identifiantInput = document.querySelector('.identifiant')
const messageInput = document.querySelector('textarea')
const fileInput = document.querySelector('input[type="file"]')

checkbox.addEventListener('change', () => {
    if(checkbox.checked) {
        identifiantInput.value = ''
        identifiantInput.style.display = 'none'
    } else {
        identifiantInput.style.display = 'block'
    }
})

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    if (!messageInput.value.trim()) {
        alert('C\'est pas fou un message sans contenu...')
        return;
    }
    const formData = new FormData(e.target)

    const res = await fetch('/write', {
        method: "POST",
        body: formData
    })
    const data = await res.json()

    alert(data.message)
})