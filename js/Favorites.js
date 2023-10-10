export class Favorites {
    constructor(root){
        this.root = document.querySelector(root)
        this.load()
    }

    load(){
        this.entries = [{
            login: 'maykbrito',
            name: 'Mayk Brtito',
            public_repos: '76',
            followers: '12000'
        },
    
        {
            login: 'diego3g',
            name: 'Diego Fernandes',
            public_repos: '89',
            followers: '12700'
        }
    ]
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
