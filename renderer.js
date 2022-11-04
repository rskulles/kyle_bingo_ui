/*
const information  = document.getElementById('info')
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`

const func = async ()=>{
    const response = await window.versions.ping()
    console.log(response)
}

func()*/
let bingoElement = document.createElement('div')
bingoElement.setAttribute("class",'bingo-element')

const grid = document.getElementById('bingo-grid')

document.getElementById('button-new-board').addEventListener('click',async ()=>{
    grid.innerHTML='';
    const boardData = await window.bingoApi.requestBoardData()
})



window.bingoApi.handleBoardData((ev, board)=>{
    for(let i=0;i<25;++i){
        let newDiv = bingoElement.cloneNode()
        newDiv.textContent = i===12? 'FREE SPACE': board[i]
        newDiv.addEventListener('click', ()=>{
            newDiv.setAttribute('data-bingo-selected',true)
        })
        grid.appendChild(newDiv)
    }

})



