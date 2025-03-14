
const pokemonCount = 386;
let pokeDex = { };  

window.onload = async function( ) {
    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemon(i);
    
    let pokemon = document.createElement('div');
    pokemon.id = i;
    pokemon.innerText = i.toString() +  ". " + pokeDex[i]["name"].toUpperCase();
    pokemon.classList.add("pokemon-name");
    pokemon.addEventListener("click", updatePokemon);
    document.getElementById("pokemon-list").append(pokemon);
    }

    document.getElementById('pokemon-description').innerText = pokeDex[1]['desc'];
    document.getElementById('pokemon-abilities').innerText = pokeDex[1]['ability'];
console.log(pokeDex);

}

async function getPokemon(num) {
    let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString( );
    let response = await fetch(url);
    let pokemon = await response.json();
    // console.log(pokemon)

    let pokemonName = pokemon["name"];
    let pokemonType = pokemon["types"];
    let pokemonImg = pokemon["sprites"]["front_default"];
    let pokemonAbility = pokemon["ability"];
    let pokemonMoves = pokemon["moves"];
    let pokemonEggs = pokemon["eggs"]

    response = await fetch(pokemon["species"]["url"]);
    let pokemonDesc = await response.json( );
    
    // console.log(pokemonDesc);
    pokemonDesc = pokemonDesc["flavor_text_entries"][12]["flavor_text"]

    pokeDex[num] =  {"name": pokemonName, "img" : pokemonImg, "types" : pokemonType, "desc" : pokemonDesc, "ability": pokemonAbility, "moves": pokemonMoves, "eggs": pokemonEggs}
}

function updatePokemon ( ) {
    document.getElementById("pokemon-img").src = pokeDex[this.id]["img"];
    
    let typesDiv = document.getElementById('pokemon-types');
    while (typesDiv.firstChild) {
        typesDiv.firstChild.remove( );
    }

    let types = pokeDex[this.id]['types'];
    for(let i = 0 ;  i < types.length; i++) {
        let type = document.createElement("span");
        type.innerText = types[i]['type']['name'].toUpperCase( );
        type.classList.add("type-box");
        type.classList.add(types[i]['type']['name']);
        typesDiv.append(type);
    }
    document.getElementById('pokemon-description').innerText = pokeDex[this.id]["desc"]
    document.getElementById('pokemon-abilities').innerText = pokeDex[1]['ability'];
}