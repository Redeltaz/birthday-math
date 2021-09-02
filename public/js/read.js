const deleteButtons = document.querySelectorAll('.delete')

deleteButtons.forEach(button => {
    button.addEventListener("click", async () => {
        if(window.confirm("Voulez vous supprimer ce message ?")) {

            const res = await fetch(`/delete/${button.id}`,{
                method: "DELETE"
            })
            const data = await res.json()
            console.log(data)

            window.location.reload()
        }
    })
});