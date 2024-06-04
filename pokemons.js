const API_pokemons = "https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0";
const API_DE_imagens = "https://raw.githubusercontent.com/pokeAPI/sprites/master/sprites/pokemon";

let apiPaginaProximo = "";
let apiPaginaAnterior = "";

let pokemons = [];

const loading = document.createElement("div")

loading.classList.add("loader")

document.addEventListener("DOMContentLoaded", function () {

    const caixaPokemons = document.getElementById("caixaPokemons");
    const btnAnterior = document.getElementById("btnAnterior");
    const btnProximo = document.getElementById("btnProximo");

    buscarPokemons(API_pokemons)

    btnAnterior.addEventListener("click", () => {
        if (apiPaginaAnterior) buscarPokemons(apiPaginaAnterior)
    })
    btnProximo.addEventListener("click", () => {
        if (apiPaginaProximo) buscarPokemons(apiPaginaProximo)
    });

function buscarPokemons(url){

        pokemons = [];
        caixaPokemons.innerText = "";
        caixaPokemons.append(loading);

        fetch(url,{headers: {accept: "*"   }})
        .then(resposta => resposta.json())
        .then(respostaApi =>{
            caixaPokemons.innerText = "";
        
        const {count, next, previous, results} = respostaApi;


        if(previous){
            apiPaginaAnterior = previous
        }else{
            apiPaginaAnterior = ""
        }
        if(next){
          apiPaginaProximo = next
        }else{
            apiPaginaProximo = ""
        }

        if(results.length){
            pokemons = results
        }

        pokemons.forEach(pokemon =>{

            const urlImagempokemon = API_DE_imagens + pokemon.url.split("pokemon")[1].slice(0,-1) + ".png"

         const divDoPokemom = document.createElement('div');
         const nomeDoPokemon = document.createElement('h3');
         const imagemDoPokemom = document.createElement('img');

         imagemDoPokemom.width = 96;
         imagemDoPokemom.height = 96;
         imagemDoPokemom.src = urlImagempokemon

         nomeDoPokemon.innerText = pokemon.name
         divDoPokemom.append(nomeDoPokemon)
         divDoPokemom.append(imagemDoPokemom)

         caixaPokemons.append(divDoPokemom)

        }) ;
        });
}
});
