export default function piecewise(xs, ys) {
  return (x) => {
    // out of bounds
    if (x <= xs[0]) {
      return ys[0]
    } else if (x >= xs[xs.length - 1]) {
      return ys[xs.length - 1]
    }

    // bisect
    let lo = 0
    let hi = xs.length - 1

    while (hi - lo > 1) {
      let mid = (lo + hi) >> 1
      if (x < xs[mid]) {
        hi = mid
      } else {
        lo = mid
      }
    }

    // project
    return ys[lo] + (ys[hi] - ys[lo]) / (xs[hi] - xs[lo]) * (x - xs[lo])
  }
}
