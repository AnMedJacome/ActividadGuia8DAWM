let cargarDatos = () => {
    alert('Se está cargando los datos. Espere...')
    let url = "https://dataserverdaw.herokuapp.com/escritores/xml"
    fetch(url).then(response => response.text()).then(data => {
        const parser = new DOMParser()
        const xml = parser.parseFromString(data, "application/xml")
        let arreglo = xml.getElementsByTagName('escritor')
        for (let elemento of arreglo) {
            let id = elemento.querySelector('id').textContent

            let name = elemento.querySelector('nombre').textContent

            let option = `<option value="${id}">${name}</option>`
            document.querySelector('select').innerHTML += option
        }
    }).catch(console.error)
}

document.addEventListener('DOMContentLoaded', () => {
    cargarDatos()
})

let selector = document.querySelector('select')

selector.addEventListener('change', () => {
    let url = 'https://dataserverdaw.herokuapp.com/escritores/frases'
    fetch(url).then(response => response.json()).then(data =>{
        let filtro = selector.options[selector.selectedIndex].value
        let nombre = selector.options[selector.selectedIndex].text
        let arreglo = data['frases']
        document.querySelector('div#frases').innerHTML = ""
        for (let frase of arreglo) {
            if(frase["id_autor"] === parseInt(filtro)){
                let query = `
                    <div class="col-lg-3">
                        <div class="test-inner ">
                            <div class="test-author-thumb d-flex">
                                <div class="test-author-info">
                                    <h4>${nombre}</h4>                                            
                                </div>
                            </div>
                            <span>${frase["texto"]}</span>
                            <i class="fa fa-quote-right"></i>
                        </div>
                    </div>
                `
                document.querySelector('div#frases').innerHTML += query
            }
        }
    })
})