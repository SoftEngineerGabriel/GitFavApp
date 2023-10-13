
export class Favorites {
    constructor(app){
        this.app = document.querySelector(app)
        
    }
}

export class FavoritesView extends Favorites {
    constructor(app){
        super(app)

        this.update()
    }

    update() {
        this.removeAllTr()
    }

    removeAllTr() {
        const tbody = this.app.querySelector('table tbody')

        tbody.querySelectorAll('tr').forEach((tr) => {
            tr.remove()

        });
    }
}