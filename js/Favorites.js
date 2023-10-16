import { GitHubUser } from "./GitUserApi.js"

export class Favorites {
    constructor(app){
        this.app = document.querySelector(app)
        this.load()            
    }

    load() {
        this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []
    }

    save() {
        localStorage.setItem('@github-favorites:', JSON.stringify(this.entries))
    }

    async add(username) {
        try {

            const userExists = this.entries.find(entry => entry.login == username)

            if(userExists) {
                throw new Error (`Esse usuário já se encontra em seus favoritos!`)
            }

            const user = await GitHubUser.search(username)

            if(user.login === undefined) {
                throw new Error('Usuário não existente')
            }

            this.entries = [user, ...this.entries]
            this.update()
            this.save()


        } catch(error) {
            alert(error.message)
        }

    }

    delete(user) {
        const filteredEntries = this.entries.filter(entry => entry.login !== user.login)

        this.entries = filteredEntries
        this.update()
        this.save()
    }


}

export class FavoritesView extends Favorites {
    constructor(app){
        super(app)

        this.tbody = this.app.querySelector('table tbody')

        this.update()
        this.onadd()
    }

    onadd() {
        const addButon = this.app.querySelector('.favorite')

        addButon.onclick= () => {
            const { value } = this.app.querySelector('.search input')

            this.add(value)
        }
    }

    verification() {
           const verifica = this.entries.length

           if(verifica === 0) {
                this.app.querySelector('tfoot').classList.remove('hide')
           } else {
            this.app.querySelector('tfoot').classList.add('hide')
           }
    }

    update() {      
        this.removeAllTr()
        this.verification()

        this.entries.forEach( user => {

            const row = this.createRow()
            
            row.querySelector('.users img').src = `https://github.com/${user.login}.png`
            row.querySelector('.users img').alt = `Imagem de ${user.name}`
            row.querySelector('.users p').textContent = user.name
            row.querySelector('.users span').textContent = user.login
            row.querySelector('.repositories').textContent = user.public_repos
            row.querySelector('.followers').textContent = user.followers

            row.querySelector('.remove').onclick = () => { 
                const isOk = confirm(`Tem certeza que desaja excluir ${user.name} de seus favoritos?`)

                if (isOk) {
                    this.delete(user)
                }
            }
            
            this.tbody.append(row)
        })


    }

    createRow() {
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
        return tr;
    }

    removeAllTr() {

        this.tbody.querySelectorAll('tr').forEach((tr) => {
            tr.remove()

        });
    }
}