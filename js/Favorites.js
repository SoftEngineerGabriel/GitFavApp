export class Favorites {
    constructor(root){
        this.root = document.querySelector(root)
        this.load()
    }

    load(){
        this.entries = JSON.parse(localStorage.getItem
        ('github-favorites:'))  || []
    }

    delete(user){
        const filterEntries = this.entries.filter(entry => entry.login != user.login)

        this.entries = filterEntries
        this.update()
    }

    
}

export class FavoritesView extends Favorites {
    constructor(root) {
        super(root)
        this.tbody = this.root.querySelector('table tbody')

        this.update()
    }

    update(){
        this.removeAllTr()

        this.entries.forEach((user => {
            const row = this.createRow()
            
            row.querySelector('.users img').src = `https://github.com/${user.login}.png`
            row.querySelector('.users img').alt = `Foto de perfil do Github de ${user.name}`
            row.querySelector('.users p').textContent = user.name
            row.querySelector('.users span').textContent = user.login
            row.querySelector('.users p').textContent = user.name
            row.querySelector('.repositories').textContent = user.public_repos
            row.querySelector('.followers').textContent = user.followers

            row.querySelector('.remove').onclick = () => {
                const isOk = confirm('Tem certeza que deseja excluir?')

                if(isOk){
                    this.delete(user)
                }
            }

            this.tbody.append(row)
        }))
    }

    createRow(){
        const tr = document.createElement('tr')

        tr.innerHTML = `
        <tr>
            <td class="users">
                <img src="https://github.com/maykbrito.png" alt="Foto do perfil do Usuário no Github">
                <a href="https://github.com/maykbrito">
                    <p>Mayk Brito</p>
                    <span>/maykbrito</span>
                </a>
                </td>
                <td class="repositories">1234</td>
                <td class="followers">43321</td>
                <td>
                <button class="remove"><i class="ph-fill ph-trash"></i></button>
            </td>
        </tr>
        `
        return tr
    }

    removeAllTr(){        
        this.tbody.querySelectorAll('tr').forEach((tr) => {
            tr.remove()
        })
    }
}
