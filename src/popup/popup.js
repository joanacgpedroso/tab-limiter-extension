/* global browser */

// function Teste () {
//   fetch(url)
//     .then((html) => {
//       console.log(html)
//       // let modal = document.createElement('div')
//       // modal.innerHTML = html
//       // document.body.appendChild(modal)
//     })
// }

// Teste()

browser.runtime.onMessage.addListener(request => {
  console.log(request.message)
})

console.log('popup js loaded')

// document.body.textContent = ''

// var header = document.createElement('h1')
// header.textContent = 'This page has been eaten'
// document.body.appendChild(header)
