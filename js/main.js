const btnModal = document.querySelector("#adicionar")
const modal = document.querySelector(".modal")
const buttonClose = document.querySelector("#fechar")
const btnPesquisar = document.querySelector("#pesquisar")



//abrir modal
btnModal.addEventListener("click", evento => {
    modal.style.display = "flex"
}
)

//fechar modal
buttonClose.addEventListener("click", evento => {
    modal.style.display = "none"
}
)


const adicionarEvento = () => {
    const todosCards = document.querySelectorAll('.card')

    todosCards.forEach(elemento => {

        const btnRemove = elemento.querySelector('.excluir')

        btnRemove.addEventListener("click", evento => {
            const tag = evento.target.closest(".card") 

            tag.remove()

        })

        const btnEdit = elemento.querySelector('.editar')


        //tag = informação do card

        btnEdit.addEventListener("click", evento => {
            const tag = evento.target.closest(".card")
            const modalEdit = tag.querySelector(".modalEdit")
            const fato = tag.querySelector("#numeroFato")
            const descricao = tag.querySelector("p")

            const fatoEdit = modalEdit.querySelector("h2")
            const textArea = modalEdit.querySelector("textarea")

            fatoEdit.innerText = fato.innerText
            textArea.value = descricao.innerText

            modalEdit.style.display = "flex"



            const confirmar = modalEdit.querySelector("#confirmar")
            confirmar.addEventListener("click", evento => {

                descricao.innerText = textArea.value

                modalEdit.style.display = "none"
            })
            


            const modalExit = modalEdit.querySelector("#editExit")
            modalExit.addEventListener("click", evento => {
                modalEdit.style.display = "none"
            })
        })

        elemento.addEventListener("mouseenter", evento => {
            const tag = evento.target
            const body = document.querySelector('body')
            const url = tag.querySelector('#url').innerText

            body.style.backgroundImage = `url('${url}')`
            body.style.backgroundRepeat = `no-repeat`
            body.style.backgroundSize = `cover`
        })

        elemento.addEventListener("mouseleave", evento => {
            const tag = evento.target
            const body = document.querySelector('body')
            body.style.backgroundImage = 'none'

        })

    })
}


const fotosGatos = async () => {

    //api fotos
    const url = `https://cataas.com/cat?json=true`
    const response = await fetch(url)
    const data = await response.json()
    return data
}

const fatosSobreGatos = async (id) => {

    //api fatos
    const url = `https://meowfacts.herokuapp.com/?lang=por-br&id=${id}`
    const response = await fetch(url)
    const data = await response.json()
    return data
}

const objFatos = async (id) => {

    try {
        const data = await fatosSobreGatos(id)
        const dataFotos = await fotosGatos()
        console.log(dataFotos.url)


        const fatoAtual = {
            "fato": data.data[0],
            "id": id, 
            "url": `https://cataas.com/${dataFotos.url}`
        }


        criarElemento(fatoAtual)


    } catch (error) {

    }
}


function criarElemento(fato) {
    const novoFato = `
    
    <div class="card">
    <div id="url">${fato.url}</div>

    <div class="modalEdit">
        <div class="editFechar">
            <button id="editExit">X</button>
        </div>                    
        <h2></h2>
        <textarea></textarea>
        <button id="confirmar">Confirmar</button>
    </div>
    <h2 id="numeroFato">Fato número ${fato.id}</h2>
    <p>${fato.fato}</p>
    <div class="botoes">
        <button class="editar">Editar</button>
        <button class="excluir">Excluir</button>
    </div>  
 
    </div>   
    
    `

    const listaFundo = document.querySelector(".fundoCards")
    listaFundo.innerHTML = novoFato + listaFundo.innerHTML


    adicionarEvento() 
}






//submit do formulario
btnPesquisar.addEventListener("click", evento => {

    //evita o recarregamento da página (submit)
    evento.preventDefault()

    const input = document.querySelector(".formulario input")
    const button = document.querySelector(".formulario button")

    //capta o valor inserido
    const valorInput = input.value

    objFatos(valorInput)

    modal.style.display = "none"

    //limpa o valor anterior
    input.value = ""
})


