import piecewise from './piecewise'

export default function polylinearScale(stops) {
  const xs = []
  const ys_r = []
  const ys_g = []
  const ys_b = []

  stops.forEach(([domain, range]) => {
    xs.push(domain)
    if (isNaN(range)) {
      ys_r.push(parseInt(range.substr(1, 2), 16))
      ys_g.push(parseInt(range.substr(3, 2), 16))
      ys_b.push(parseInt(range.substr(5, 2), 16))
    } else {
      ys_r.push(range)
    }
  })

  const pw_r = piecewise(xs, ys_r)

  if (ys_g.length && ys_b.length) {
    const pw_g = piecewise(xs, ys_g)
    const pw_b = piecewise(xs, ys_b)
    return x => `rgb(${Math.round(pw_r(x))}, ${Math.round(pw_g(x))}, ${Math.round(pw_b(x))})`
  } else {
    return x => pw_r(x)
  }
}
