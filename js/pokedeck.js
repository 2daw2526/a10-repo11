class PokeDeck {
    //add
    static async addCarta( pokemonId = utils.randomPokemonNumber()){
        //desactivar boton añadir carta
        document.querySelector('.addcard').disabled = true;
        let deck = document.querySelector(".deck");

        deck.innerHTML +=`  <!-- CARD  https://getbootstrap.com/docs/5.3/components/card/ -->
        <!-- CARD -->
        <div data-id="" class=" pokemon m-3 card shadow-lg d-inline-block border-0 rounded-3 overflow-hidden" style="width: 16rem;background: #f8f9fa;">
            <img src="#" class="card-img-top  p-1 bg-light rounded-circle mx-auto d-block style="width: 150px; height: 150px; object-fit: cover;" alt="...">
            <div class="card-body text-center ">
                <h5 class="card-title fw-bold text-uppercase text-primary">Card title</h5>
                <p class="card-text text-muted">Some quick example text to build on the card title and make up the bulk of the
                    card's content.</p>
            </div>
            <div class="card-body text-center">
                <p class= " atack fw-bold text-danger fs-5"></p>
                <div class="tipo-container d-flex justify-content-center gap-2"></div>
            </div>

            <div class="card-body">
                <h6 class="card-subtitle mb-2 text-body-secondary text-light text-center">Habilidades</h6>
                <ul class="list-group list-group-flush text-center">
                    <li class="list-group-item">An item</li>
                    <li class="list-group-item">A second item</li>
                    <li class="list-group-item">A third item</li>
                </ul>
            </div>
            <div class="card-body d-flex justify-content-around p-1">
                    <a href="#" class=" btn btn-info card-link" onclick="PokeDeck.rellenaCarta(this.parentNode.parentNode, utils.randomPokemonNumber());">Recharge</a>
                    <button class="btn btn-danger card-link" onclick="this.parentNode.parentNode.remove()">Remove</button>
                    <button data-id="0" data-name="#" data-img="#" class="cart-button btn btn-warning card-link" onclick="Mano.addpokemon(this.dataset)">+</button>
            </div>
        <!-- END CARD -->`;
        let cards = document.querySelectorAll('.pokemon');
        await PokeDeck.rellenaCarta(cards[cards.length - 1], pokemonId);
        //reactivar el boton
        document.querySelector('.addcard').disabled = false;
        
    }

   
    static async rellenaCarta(card, pokemon) {
        // let language = document.querySelector("#Idioma")
        let url = "https://pokeapi.co/api/v2/pokemon/" + pokemon;
        let pokemonData = await utils.pokeAPI(url);
        console.log(pokemonData);

        let buttoncarrito= card.querySelector('.cart-button')
        buttoncarrito.dataset.id = pokemonData.id;
        buttoncarrito.dataset.name = pokemonData.name;
        buttoncarrito.dataset.img = pokemonData.sprites.front_default;

        // querySelector(selector CSS) --> devuelve la PRIMERA etiqueta que cumple con el selector
    
        // Imagen
        let img = card.querySelector('img');
        img.src = pokemonData.sprites.front_default;
    
        // Nombre
        card.querySelector('h5').innerHTML = pokemonData.name;
    
        // Descripción, accede a los textos en species y filtra por idioma
        let species = await utils.pokeAPI(pokemonData.species.url); // nueva llamada a la API
        card.style.backgroundColor = species.color.name;

        card.style.borderColor = species.color.name; // cambio el CSS desde Javascript--> https://www.w3schools.com/jsref/dom_obj_style.asp
    
    
        let texts = species.flavor_text_entries; // Array de descripciones (las hay en muchos idiomas)
        let filtrados = texts.filter((text) => text.language.name == 'es'); // se queda con las que tengan el código de idioma que queremos
    
    
        if (filtrados.length > 0) {
            card.querySelector('.card-text').innerHTML = filtrados[0].flavor_text; // mete el primero en el HTML
        } else {
            // si no hay traducción en el idioma deseado mete el primero que haya
            card.querySelector('.card-text').innerHTML = texts[0].flavor_text;
        }
    
        // Lista UL de habilidades
        let abilitiesList = card.querySelector('.list-group');
        abilitiesList.innerHTML = '';
    
    
        for (let a of pokemonData.abilities) {
            // OPCION 1: Crear un string con el HTML y añadirlo al elemento padre
            // abilitiesList.innerHTML += '<li class="list-group-item">' + a.ability.name + '</li>'
    
            // OPCION 2:  Crear etiquetas desde Javascript
            let item = document.createElement('li'); // crea una etiqueta y la guarda en una variable
            item.className = "list-group-item"; // asigna class
            item.innerHTML = a.ability.name; // añade content
    
            abilitiesList.appendChild(item); // la mete dentro del padre (para que aparezca en el documento)
        }
        let attacker = pokemonData.stats.find(stat => stat.stat.name === "attack").base_stat;
        card.querySelector('.atack').innerHTML = "Ataque: " + attacker;

        let tipoContainer = card.querySelector('.tipo-container');
        tipoContainer.innerHTML = '';
        
        pokemonData.types.forEach(typeInfo => {
            let type = typeInfo.type.name;
            let tipo = document.createElement('span');
            tipo.textContent = type.toUpperCase();
            tipo.classList.add('px-2', 'py-1', 'rounded-pill', 'text-white', 'mx-1');

            let typeColors = {
                fire: '#F08030', water: '#6890F0', grass: '#78C850', poison: '#A040A0', bug: '#A8B820',
                flying: '#A890F0', normal: '#A8A878', electric: '#F8D030', ground: '#E0C068', fighting: '#C03028',
                psychic: '#F85888', steel: '#B8B8D0', ghost: '#705898', ice: '#98D8D8', rock: '#B8A038',
                dragon: 'linear-gradient(to bottom, #7038F8 50%, #F08030 50%)',
                default: '#68A090'
            };
            tipo.style.background = typeColors[type] || typeColors.default;
            
            tipoContainer.appendChild(tipo);
        });

    };

    //update
    static async reloadCartas( pokemonId){

        let cards = document.querySelectorAll('.card');
        for (let i = 0; i < cards.length; i++) {
            await PokeDeck.rellenaCarta(cards[i], pokemonId = utils.randomPokemonNumber());
            
        }
    }
    static async rechargeCarta( pokemonId= utils.randomPokemonNumber()){

        let cards = document.querySelector('.card');
            await PokeDeck.rellenaCarta(cards, pokemonId );
    }
    static async addcarditem() {
        let container = document.querySelector(".item-list");
        for (let i = 0; i < 10; i++) {
            // Creamos un contenedor de columna (mitad de ancho)
            let col = document.createElement('div');
            col.className = "col-6 mb-3";
    
            // Creamos el contenido de la carta
            col.innerHTML = `
                <div class="cosa card shadow-sm border-0" style="width: 100%;">
                    <img src="..." class="card-img-top p-2" style="height: 80px; object-fit: contain;" alt="...">
                    <div class="card-body p-2 text-center">
                        <h6 class="card-title text-primary text-capitalize fw-semibold mb-1"></h6>
                        <p class="card-text small text-muted mb-2">Cargando efecto...</p>
                        <button data-id="0" data-name="#" data-img="#" class="cart-button btn btn-warning btn-sm" onclick="Mano.addpokemon(this.dataset)">+</button>
                    </div>
                </div>
            `;
    
            container.appendChild(col);
    
            // Rellenar la carta con datos reales
            let card = col.querySelector('.cosa');
            await PokeDeck.rellenaItem(card, utils.randomPokemonNumber());
        }
    }
    
    

    static async rellenaItem(card, item) {
        let url = "https://pokeapi.co/api/v2/item/" + item;
        let itemData = await utils.pokeAPI(url);
        
        card.querySelector('img').src = itemData.sprites.default;
        card.querySelector('h6').innerHTML = itemData.name;
    
        let efecto = itemData.effect_entries.find(e => e.language.name === "es") || itemData.effect_entries.find(e => e.language.name === "en");

        card.querySelector('.card-text').innerHTML = efecto ? efecto.short_effect : "No description available.";

    
        let button = card.querySelector('.cart-button');
        button.dataset.id = itemData.id;
        button.dataset.name = itemData.name;
        button.dataset.img = itemData.sprites.default;
    }

}