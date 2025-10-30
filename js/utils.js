class utils {
    static randomPokemonNumber() {
        return(Math.floor(Math.random()*1025)+1)
    }
    static async  pokeAPI(url) {
        const response = await fetch(url);
        if (!response.ok) {
            // BAD
            console.error('ERROR fetching data');
            return null;
        } else {
            // GOOD
            return await response.json();
    
        }
    }
    
    
}