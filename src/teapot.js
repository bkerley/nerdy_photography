'use strict'

import { Mesh,
         SphereBufferGeometry,
         MeshStandardMaterial,
         WebGLCubeRenderTarget,
         RGBFormat, LinearMipMapLinearFilter,
         CubeCamera } from '../node_modules/three/build/three.module.js'

import { TeapotBufferGeometry } from
  '../node_modules/three/examples/jsm/geometries/TeapotBufferGeometry.js'

import Element from './element.js'

export default class Teapot extends Element {
  add() {
    super.add()
    this.mesh().position.set(2, .5, -2)
  }

  geometry() {
    if (this._geometry) return this._geometry

    const tpt = new TeapotBufferGeometry(2)

    return this._geometry = tpt
  }

  material() {
    if (this._material) return this._material

    const mat = new MeshStandardMaterial({
      color: 0xcc8844,
      envMap: this.environment_map(),
      roughness: 0.5
    })

    return this._material = mat
  }

  update(timestamp) {
    super.update(timestamp)
    if (0 == this.prev) this.prev = timestamp
    let elapsed = timestamp - this.prev
    this.prev = timestamp

    this.mesh().rotation.y += 0.0005 * elapsed
  }
}
