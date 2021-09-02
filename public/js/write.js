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
        alert('C\'est pas cool un message sans contenu...')
        return;
    }
    const formData = new FormData(e.target)

    if(window.confirm("Voulez vous envoyer ce message ?")) {
        const res = await fetch('/write', {
            method: "POST",
            body: formData
        })
        const data = await res.json()
    
        if (res.status === 200) {
            window.location.href = '/sended'
        } else {
            if(data.message) {
                alert(data.message)
            } else {
                alert('Il y a eu un problème lors de l\'envois')
            }
        }
    }
})

const modal = document.getElementById("myModal");
const btn = document.getElementById("myBtn");

btn.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}