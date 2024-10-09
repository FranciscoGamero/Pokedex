$(document).ready(function () {
    getPokemonListV2();

    
    function getPokemonListV2() {
    $('#listaPokemon');
        $.ajax({
            url: "https://pokeapi.co/api/v2/pokemon",
            method: "GET",
        }).done(function (resp) {            
            var listadoPokemon = resp.results;
            listadoPokemon.forEach(function (pokemon) {
                var pokemonId = pokemon.url.split("/")[6];
                var template = `
                    <div class="card m-2 planta text-light" style="width: 18rem;" id="${pokemonId}">
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png" class="card-img-top" alt="..."></img>
                        <div class="card-body">
                            <button type="button" class="btn-ver-pokemon btn btn-danger text-warning" data-id="${pokemonId}" data-bs-toggle="modal" data-bs-target="#pokemonModal${pokemonId}">
                                Ver Pokemon
                            </button>
                            <h3 class="mt-4">${pokemon.name.toUpperCase()}</h3>
                            <h4>#${pokemonId}</h4>
                        </div>
                    </div>`;
                $('#listaPokemon').append(template);
            });
        });
    }
    $(document).on('click', '.btn-ver-pokemon', function () {
      var pokemonId = $(this).data('id');
      $.ajax({
          url: `https://pokeapi.co/api/v2/pokemon/${pokemonId}`,
          method: "GET",
          success: function (data) {
            $.ajax({
                url: `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`,
                method: "GET",
                success: function (speciesData) {
                    // Variables para almacenar las traducciones
                    let habilidad = '';
                    let habilidadOculta = '';

                    // Buscar habilidades en español
                    speciesData.flavor_text_entries.forEach(entry => {
                        if (entry.language.name === "es") {
                            habilidad = entry.flavor_text;
                        }
                    });
                }
            })
              $('#pokemon-name').text(data.name.toUpperCase());
              $('#pokemon-image').attr('src',data.sprites.other['official-artwork'].front_default);
              $('#habilidad-pokemon').text(data.abilities[0].ability.name.toUpperCase());
              $('#pokemon-habilidad-oculta').text(data.abilities[1]?.ability.name.toUpperCase() || 'Ninguna');
              $('#altura-pokemon').text(`${data.height / 10} m`);
              $('#peso-pokemon').text(`${data.weight / 10} kg`);
              $('#tipo-pokemon-1').text(data.types[0].type.name.toUpperCase());
              $('#tipo-pokemon-2').text(data.types[1] ? data.types[1].type.name.toUpperCase() : ''); 
              $('#pokemonModal').modal('show');
          }
        })
        $.ajax({
            url: `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`,
            method: "GET",
            success: function (data) {
                const descripcionEs = data.flavor_text_entries.find(entry => entry.language.name === 'es');
                $('#descripcion-pokemon').text(descripcionEs ? descripcionEs.flavor_text : 'Descripción no disponible');
            }
        });
  });
  
});
