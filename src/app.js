import Peer from 'simple-peer'

var p = new Peer({ initiator: window.location.hash === '#1', trickle: false })

p.on('error', (err) => console.log('error', err))

p.on('signal', (data) => {
  console.log('SIGNAL', JSON.stringify(data))
  document.querySelector('#outgoing').textContent = JSON.stringify(data)
})

document.querySelector('form').addEventListener('submit', function (ev) {
  ev.preventDefault()
  p.signal(JSON.parse(document.querySelector('#incoming').value))
})

p.on('connect', function () {
  console.log('CONNECT')
  p.send('whatever' + Math.random())
})

p.on('data', function (data) {
  console.log('data: ' + data)
})
