/*
-----------------------------------------------------------------------------------
|
| Imports
|
-----------------------------------------------------------------------------------
*/

import Peer from 'simple-peer'

/*
-----------------------------------------------------------------------------------
|
| Simple peer connection
|
-----------------------------------------------------------------------------------
*/

var p = new Peer({ initiator: window.location.hash === '#1', trickle: false })

// Peer receives a signal
// A signal is fired if:
// 1. Peer is the initiator
// 2. Peer receives a signal from another peer
p.on('signal', (data) => {
  console.log('SIGNAL', JSON.stringify(data))
  document.querySelector('#outgoing').textContent = JSON.stringify(data)
})

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault()
  p.signal(JSON.parse(document.querySelector('#incoming').value))
})

// Peer establishes a connection after answering to a connection offer
p.on('connect', () => {
  p.send(`Random data: ${Math.random()}`)
})

// Peer receives data after establishing a connection
p.on('data', (data) => {
  console.log('data: ' + data)
})

// Error handler
p.on('error', (err) => console.log('error', err))
