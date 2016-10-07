import SimplePeer from 'simple-peer'

var peer1 = new SimplePeer({ initiator: true })
var peer2 = new SimplePeer()

peer1.on('signal', function (data) {
  // when peer1 has signaling data, give it to peer2 somehow
  console.log('Recived signal on peer2: ' + data)
  peer2.signal(data)
})

peer2.on('signal', function (data) {
  // when peer2 has signaling data, give it to peer1 somehow
  console.log('Recived signal on peer2: ' + data)
  peer1.signal(data)
})

peer1.on('connect', function () {
  // wait for 'connect' event before using the data channel
  peer1.send('hey peer2, how is it going?')
})

peer2.on('data', function (data) {
  // got a data channel message
  console.log('got a message from peer1: ' + data)
})
// var p = new Peer({ initiator: window.location.hash === '#1', trickle: false })
//
// p.on('error', (err) => console.log('error', err))
//
// p.on('signal', (data) => {
//   console.log('SIGNAL', JSON.stringify(data))
//   document.querySelector('#outgoing').textContent = JSON.stringify(data)
// })
//
// document.querySelector('form').addEventListener('submit', function (ev) {
//   ev.preventDefault()
//   p.signal(JSON.parse(document.querySelector('#incoming').value))
// })
//
// p.on('connect', function () {
//   console.log('CONNECT')
//   p.send('whatever' + Math.random())
// })
//
// p.on('data', function (data) {
//   console.log('data: ' + data)
// })
