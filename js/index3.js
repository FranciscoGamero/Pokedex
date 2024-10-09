$(document).ready(function () {
    getPokemonListV2();

    function capitalize(text) {
        const primeraLetra = text.charAt(0);
        const resto = text.slice(1);
        return primeraLetra.toUpperCase() + resto.toLowerCase();
      }

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
                success: function (data) {
                    var descripcionEs = data.flavor_text_entries.find(entry => entry.language.name === 'es');
                    $('#descripcion-pokemon').text(descripcionEs ? descripcionEs.flavor_text : 'Descripción no disponible');
                }
            });
           // var habilidades = data.abilities;
            var habilidadesVisibles = data.abilities
            .filter(ability => !ability.is_hidden)
            .map(ability => capitalize(ability.ability.name))
            var habilidadesOcultas = data.abilities
            .filter(ability => ability.is_hidden) 
            .map(ability => capitalize(ability.ability.name))
/*
              $('#pokemon-name').text(data.name.toUpperCase());
              $('#pokemon-image').attr('src',data.sprites.other['official-artwork'].front_default);
               $('#habilidad-pokemon').text(habilidadesVisibles.join(', '));
              $('#pokemon-habilidad-oculta').text(habilidadesOcultas.join(`, `));
              $('#altura-pokemon').text(`${data.height / 10} m`);
              $('#peso-pokemon').text(`${data.weight / 10} kg`);
              $('#tipo-pokemon-1').text(habilidades.forEach(habilidad => $.ajax({
                url: `https://pokeapi.co/api/v2/type`,
                method: "GET",
                success: function (data) {
                    // Obtener todos los tipos y sus nombres
                    var tipos = data.results.map(tipo => tipo.name);
            
                    // Aquí podrías usar los nombres para buscar las imágenes manualmente
                    tipos.forEach(tipo => {
                        // Asumamos que tienes las URLs de las imágenes de tipos
                        var spriteUrl = `/path/to/sprites/${tipo}.png`; // Reemplaza con la ruta real de tus imágenes
                        console.log(`Tipo: ${tipo}, Sprite URL: ${spriteUrl}`);
                    });
                }
            })));
              */
              if(data.types[1]){
                $('#tipo-pokemon-2').text(data.types[1] ? data.types[1].type.name.toUpperCase() : '')
                $('#tipo-pokemon-2').show(); 
              } else{
                $('#tipo-pokemon-2').hide();
              }; 
              $('#pokemonModal').modal('show');
          }
        })
  });
});
