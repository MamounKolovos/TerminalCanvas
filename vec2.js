const re = /\((-?[.\d]+), (-?[.\d]+)\)/;

class Vec2 {
  constructor (x, y) {
    this.x = x
    this.y = y
  }

  set (x, y) {
    this.x = x
    this.y = y
    return this
  }

  update (other) {
    this.x = other.x
    this.y = other.y
    return this
  }

  rounded () {
    return new Vec2(Math.round(this.x), Math.round(this.y))
  }

  round () {
    this.x = Math.round(this.x)
    this.y = Math.round(this.y)
    return this
  }

  floored () {
    return new Vec2(Math.floor(this.x), Math.floor(this.y))
  }

  floor () {
    this.x = Math.floor(this.x)
    this.y = Math.floor(this.y)
    return this
  }

  offset (dx, dy) {
    return new Vec2(this.x + dx, this.y + dy)
  }

  translate (dx, dy, dz) {
    this.x += dx
    this.y += dy
    return this
  }

  add (other) {
    this.x += other.x
    this.y += other.y
    return this
  }

  subtract (other) {
    this.x -= other.x
    this.y -= other.y
    return this
  }

  multiply (other) {
    this.x *= other.x
    this.y *= other.y
    return this
  }

  divide (other) {
    this.x /= other.x
    this.y /= other.y
    return this
  }

  plus (other) {
    return this.offset(other.x, other.y)
  }

  minus (other) {
    return this.offset(-other.x, -other.y)
  }

  scaled (scalar) {
    return new Vec2(this.x * scalar, this.y * scalar)
  }

  abs () {
    return new Vec2(Math.abs(this.x), Math.abs(this.y))
  }

  volume () {
    return this.x * this.y
  }

  modulus (other) {
    return new Vec2(
      euclideanMod(this.x, other.x),
      euclideanMod(this.y, other.y)
    )
  }

  distanceTo (other) {
    const dx = other.x - this.x
    const dy = other.y - this.y
    return Math.sqrt(dx * dx + dy * dy)
  }

  distanceSquared (other) {
    const dx = other.x - this.x
    const dy = other.y - this.y
    return dx * dx + dy * dy
  }

  equals (other) {
    return this.x === other.x && this.y === other.y
  }

  toString () {
    return '(' + this.x + ', ' + this.y + ')'
  }

  clone () {
    return this.offset(0, 0)
  }

  min (other) {
    return new Vec2(Math.min(this.x, other.x), Math.min(this.y, other.y))
  }

  max (other) {
    return new Vec2(Math.max(this.x, other.x), Math.max(this.y, other.y))
  }

  norm () {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  dot (other) {
    return this.x * other.x + this.y * other.y
  }

//   cross (other) {
//     return new Vec2(this.y * other.z - this.z * other.y, this.z * other.x - this.x * other.z, this.x * other.y - this.y * other.x)
//   }

  unit () {
    const norm = this.norm()
    if (norm === 0) {
      return this.clone()
    } else {
      return this.scaled(1 / norm)
    }
  }

  normalize () {
    const norm = this.norm()
    if (norm !== 0) {
      this.x /= norm
      this.y /= norm
    }
    return this
  }

  scale (scalar) {
    this.x *= scalar
    this.y *= scalar
    return this
  }

  xyDistanceTo (other) {
    const dx = other.x - this.x
    const dy = other.y - this.y
    return Math.sqrt(dx * dx + dy * dy)
  }

//   xzDistanceTo (other) {
//     const dx = other.x - this.x
//     const dz = other.z - this.z
//     return Math.sqrt(dx * dx + dz * dz)
//   }

//   yzDistanceTo (other) {
//     const dy = other.y - this.y
//     const dz = other.z - this.z
//     return Math.sqrt(dy * dy + dz * dz)
//   }

  innerProduct (other) {
    return this.x * other.x + this.y * other.y
  }

  manhattanDistanceTo (other) {
    return Math.abs(other.x - this.x) + Math.abs(other.y - this.y)
  }

  toArray () {
    return [this.x, this.y]
  }
}

function v (x, y) {
  if (x == null) {
    return new Vec2(0, 0, 0)
  } else if (Array.isArray(x)) {
    return new Vec2(parseFloat(x[0]), parseFloat(x[1]))
  } else if (typeof x === 'object') {
    return new Vec2(parseFloat(x.x), parseFloat(x.y))
  } else if (typeof x === 'string' && y == null) {
    const match = x.match(re)
    if (match) {
      return new Vec2(
        parseFloat(match[1]),
        parseFloat(match[2]))
    } else {
      throw new Error('vec2: cannot parse: ' + x)
    }
  } else {
    return new Vec2(parseFloat(x), parseFloat(y))
  }
}

function euclideanMod (numerator, denominator) {
  const result = numerator % denominator
  return result < 0 ? result + denominator : result
}

module.exports = v
v.Vec2 = Vec2