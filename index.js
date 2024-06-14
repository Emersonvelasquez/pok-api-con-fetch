
const selectTypes = document.querySelector('#typeoptiones')
const cargarpokemones = (selecvalue) => {
    const pokemones = fetch('https://pokeapi.co/api/v2/pokemon')
    let pokes = []
    let habilidadesTexto = ""
    const columna = document.querySelector('.columna')
    let html = ''
    let contador = 0
    pokemones
        .then((response) => response.json())
        .then((data) => {
            pokes = data.results
            pokes.forEach(pokemon => {
                let habilidades = fetch(pokemon.url)
                habilidades.then((respuesta) => respuesta.json())
                    .then((minidata) => {
                        let abilities = minidata.abilities
                        let imagenes = minidata.sprites.other.dream_world.front_default
                        let imaes = minidata.sprites.other.showdown.front_default
                        abilities.forEach((item) => {
                            habilidadesTexto += item.ability.name + ", "
                        })
                        habilidadesTexto = habilidadesTexto.slice(0, habilidadesTexto.length - 2)
                        contador++
                        if (minidata.types.find((item) => item.type.name == selecvalue) || selecvalue == undefined) {
                            html += `<div class=" fondo card m-1 " style="width: 20rem;">
                             <div class="card-body">
                                <img src="${imaes}" alt=""> <img src="${imagenes}" alt="" style="height: 300px; width: 300px;"> 
                                <p>nombre del pokemon: ${pokemon.name}</p>
                                <p>habilidades: ${habilidadesTexto}</p> 
                                <a class="btn btn-danger" href=" ${pokemon.url}">detalles</a> 
                  
                            </div>
                            </div>`
                        } else if (contador == 20 && html == '') {
                            html = `<div class="card" id="fondo2" style="width: 25rem;">
                                     <div class="card-body">
                                     <div class='col-12'><h1>No hay pokemones</h1></div>
                                    </div>
                                     </div>`
                        } else {
                            columna.insertAdjacentHTML('afterbegin', html)
                        }
                        habilidadesTexto = " "
                        if (contador == pokes.length) {
                            columna.replaceChildren('')
                            columna.insertAdjacentHTML('afterbegin', html)
                        }

                    })
            })
        })
        .catch((Error) => console.log(Error))
}
const types = fetch('https://pokeapi.co/api/v2/type/')
types.then((response) => response.json())
    .then((data) => {
        let tipos = data.results
        tipos.forEach((tipo) => {
            selectTypes.insertAdjacentHTML('afterbegin', `<option value="${tipo.name}">${tipo.name}</option>`)
        })
    })
selectTypes.addEventListener('change', (e) => {
    if (e.target.value == 'filtrar') {
        cargarpokemones()
    } else {
        cargarpokemones(e.target.value)
    }
})
cargarpokemones()

