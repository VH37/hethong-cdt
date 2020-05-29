const socket = io()

const shortProduct = document.getElementById('result-short')
const mediumProduct = document.getElementById('result-medium')
const tallProduct = document.getElementById('result-tall')

socket.on('data', (message) => {
  console.log(message)
  let type = message.type
  let quantity = message.quantity

  if (type === 's') {
    let currentQuantity = Number(shortProduct.textContent)
    currentQuantity += 1
    shortProduct.innerHTML = String(currentQuantity)
  } else if (type === 'm') {
    let currentQuantity = Number(mediumProduct.textContent)
    currentQuantity += 1
    mediumProduct.innerHTML = String(currentQuantity)
  } else if (type === 't') {
    let currentQuantity = Number(tallProduct.textContent)
    currentQuantity += 1
    tallProduct.innerHTML = String(currentQuantity)
  }
})


const buttonStart = document.getElementById('start-button')
const buttonStop = document.getElementById('stop-button')
const buttonReset = document.getElementById('reset-button')

buttonStart.addEventListener('click', (e) => {
  socket.emit('dataSend', '1')
})


buttonStop.addEventListener('click', (e) => {
  socket.emit('dataSend', '0')
})

buttonReset.addEventListener('click', (e) => {
  socket.emit('dataSend', '2')
})