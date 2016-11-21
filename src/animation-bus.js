import polylinearScale from 'polylinear-scale'

const transformUnits = {
  perspective: 'px',
  rotate: 'deg',
  rotateX: 'deg',
  rotateY: 'deg',
  rotateZ: 'deg',
  scale: '',
  scaleX: '',
  scaleY: '',
  scaleZ: '',
  skew: 'deg',
  skewX: 'deg',
  skewY: 'deg',
  translateX: 'px',
  translateY: 'px',
  translateZ: 'px'
}
const transformKeys = Object.keys(transformUnits)

class AnimationBus {
  constructor(animations, origin) {
    this.animations = animations
    this.origin = origin
    this.createScaleFunctions()
  }

  createScaleFunctions() {
    this.animations.forEach(animation => {
      const domain = []
      const range = []

      animation.stops.forEach(stop => {
        domain.push(stop[0])
        range.push(stop[1])
      })

      animation.scale = (value) => (
        polylinearScale(domain, range, true)(value)
      )
    })
  }

  getStyles(element) {
    const origin = this.origin(element)
    const transformValues = []
    const styles = {}

    this.animations.forEach(animation => {
      const name = animation.name
      const unit = animation.unit || transformUnits[name] || ''
      const value = animation.scale(origin)

      if (transformKeys.indexOf(name) > -1) {
        transformValues.push(`${name}(${value}${unit})`)
      } else {
        styles[name] = `${value}${unit}`
      }
    })

    if (transformValues.length) {
      styles.transform = transformValues.join(' ')
    }

    return styles
  }

  applyStyles(element) {
    const styles = this.getStyles(element)
    Object.keys(styles).forEach(key =>
      element.style[key] = styles[key]
    )
  }
}

export default AnimationBus
