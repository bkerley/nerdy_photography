'use strict'

import * as THREE from '../node_modules/three/build/three.module.js'
import { BufferGeometryUtils } from
  '../node_modules/three/examples/jsm/utils/BufferGeometryUtils.js'

export default class Lens {
  geometry() {
    if (this._geometry) return this._geometry

    const top_half = new THREE.SphereBufferGeometry(2, 32, 16,
                                                    0, Math.PI * 2,
                                                    0, 0.5)
    top_half.translate(0, -1.5, 0)

    const bottom_half = top_half.clone()
    bottom_half.rotateX(Math.PI)
    bottom_half.translate(0, 0.51, 0)

    this.geometry = BufferGeometryUtils.
      mergeBufferGeometries([top_half, bottom_half])

    return this._geometry
  }

  material() {
    if (this._material) return this._material


  }
}

const half_lens = new THREE.SphereBufferGeometry(15, 32, 16,
                                                 0, Math.PI * 2,
                                                 0, 0.5)
