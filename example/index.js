import AnimationBus from '../src/animation-bus'

import './index.scss'

const scrollElements = document.querySelectorAll('[data-scroll-bus]')
const windowFactor = 0.5
const elementFactor = 0.5
let isTicking = false
let scrollTop, scrollBottom

// Define animation stops
const animations = [{
  name: 'backgroundColor',
  stops: [
    [-300, '#b4da55'],
    [0, '#2ea8ff'],
    [300, '#b4da55']
  ]
}, {
  name: 'scale',
  stops: [
    [-300, 0.25],
    [0, 1],
    [300, 0.25]
  ]
}, {
  name: 'opacity',
  stops: [
    [-300, 0],
    [0, 1],
    [300, 0]
  ]
}]

// Define animation stops
const origin = (element) => {
  const windowOffset = window.innerHeight * windowFactor
  const elementOffset = element.offsetHeight * elementFactor
  return scrollTop + windowOffset - elementOffset - element.offsetTop
}

// Instantiate a new animation bus
const animationBus = new AnimationBus(animations, origin)

// Listen for window scroll and apply transforms to elements
function scrollHandler() {
  for (let i = 0; i < scrollElements.length; i++) {
    animationBus.applyStyles(scrollElements[i])
  }
  isTicking = false
}

window.addEventListener('scroll', function () {
  scrollTop = pageYOffset
  if (!isTicking) {
    window.requestAnimationFrame(scrollHandler)
  }
  isTicking = true
}, false);
