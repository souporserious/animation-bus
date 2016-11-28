import polylinearScale from './polylinear-scale'

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
  constructor({ animations, element, origin }) {
    this.animations = animations
    this.element = element
    this.origin = origin
  }

  getStyles(element = this.element) {
    const origin = this.origin(element)
    const transformValues = []
    const styles = {}

    this.animations.forEach(animation => {
      const prop = animation.prop
      const unit = animation.unit || transformUnits[prop] || ''
      const value = polylinearScale(animation.stops)(origin)

      if (transformKeys.indexOf(prop) > -1) {
        transformValues.push(`${prop}(${value}${unit})`)
      } else {
        styles[prop] = `${value}${unit}`
      }
    })

    if (transformValues.length) {
      styles.transform = transformValues.join(' ')
    }

    return styles
  }

  applyStyles(element = this.element) {
    const styles = this.getStyles(element)
    Object.keys(styles).forEach(key =>
      element.style[key] = styles[key]
    )
  }
}

export default AnimationBus
