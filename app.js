const pokemonsQuantity = 151;

//preloading images
let images = [];
let preload = new Image();
for (let i = 0; i <=pokemonsQuantity; i++) {
  let imgUrl = 'https://pokeres.bastionbot.org/images/pokemon/'+i+'.png';
  preload.src=imgUrl;
  images.push(preload.src);  
}

const reqPokeAPI = new XMLHttpRequest(),method='GET',url='https://pokeapi.co/api/v2/pokemon?limit='+pokemonsQuantity+'';
reqPokeAPI.addEventListener('load',(event) => {
  event.preventDefault();
  if(reqPokeAPI.status===200&&reqPokeAPI.readyState===4){
    console.log(`${reqPokeAPI.status} ${reqPokeAPI.statusText}`);
    const allPokemons = JSON.parse(reqPokeAPI.response);
    allPokemons.results.forEach((pokemon)=>{
      const pokemonData = new XMLHttpRequest(),method='GET',url=pokemon.url;
      pokemonData.addEventListener('load',(event)=>{
        event.preventDefault();
        if(pokemonData.status===200&&pokemonData.readyState===4){
          const pokemonReq = JSON.parse(pokemonData.response);
          getAllPokemons(pokemonReq);
        }else{
          console.log(`Erro ${pokemonData.status} ${pokemonData.statusText}. A solicitação não obteve retorno.`); 
        }
      })
      pokemonData.open(method,url,true);
      pokemonData.send();
    })
  }else{
    console.log(`Erro ${reqPokeAPI.status} ${reqPokeAPI.statusText}. A solicitação não obteve retorno.`);
  } 
  
})
reqPokeAPI.open(method,url,true);
reqPokeAPI.send();

const cardContainer = document.querySelector('.container');

const getAllPokemons = (pokemonsList)=>{
  cardContainer.innerHTML +=`
  <div class="pokemon-card">
      <img src=${images[pokemonsList.id]} alt="a pokemon image">
      <section class="pokemon-infos">
        <h4 class="pokemon-name">${pokemonsList.name}</h4>
        <h4 class="pokemon-id">#${pokemonsList.id}</h4>
        <ul class="pokemon-skills">
        ${pokemonsList.abilities.map(ability => `
          <li class="skill">
            ${ability.ability.name} 
          </li>
        `.trim()).join('')}
        </ul>
      </section>
    </div>
  `
}