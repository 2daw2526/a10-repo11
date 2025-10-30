class Mano{
    
    static loadStorage(){
        //carga el carrito del localstorage
        this.cards= JSON.parse(localStorage.getItem("Mano"))|| []; 
        this.display();
    }
    static  savestorage(){
        localStorage.setItem("Mano",JSON.stringify(this.cards));

    }
    static addpokemon(data){
        if (!this.cards) this.cards = [];
    
        let index = this.cards.findIndex(card => card.id == data.id);
    
        // Detectamos si es un Pokémon o un ítem (según si la imagen viene de la ruta de Pokémon)
        let isPokemon = data.img.includes("pokemon");
    
        if (index === -1) {
            this.cards.push({
                id: data.id,
                name: data.name,
                img: data.img,
                quantity: 1,
                type: isPokemon ? 'pokemon' : 'item'
            });
        } else {
            if (this.cards[index].type === 'pokemon') {
                alert(`${data.name.toUpperCase()} ya está en tu equipo`);
                return;
            } else {
                this.cards[index].quantity++;
            }
        }
    
        this.savestorage();
        this.display();
    }
    
    static display(){
        let carrito = document.querySelector('#Carrito');
        carrito.innerHTML = "";
    
        for (let card of this.cards){
            carrito.innerHTML += `
            <div class="d-flex align-items-center gap-2 mb-2">
                <img src="${card.img}" width="40" height="40" title="${card.name}">
                <span class="text-capitalize">${card.name}</span>
                ${card.quantity > 1 ? `<span class="badge bg-secondary">${card.quantity}</span>` : ""}
                <button class="btn btn-sm btn-danger" onclick="Mano.removePokemon('${card.id}')">X</button>
            </div>
            `;
        }
    }
    
    
    static removeALL(){
        this.cards = []; 
        localStorage.removeItem("Mano"); 
        this.display(); 
    }
    

    static removePokemon(id){
        let index = this.cards.findIndex(card => Number(card.id) === Number(id));
    
        if (index !== -1) {
            if (this.cards[index].type === 'item' && this.cards[index].quantity > 1) {
                this.cards[index].quantity--; 
            } else {
                this.cards.splice(index, 1); 
            }
    
            this.savestorage();
            this.display();
        }
    }
    
    
}