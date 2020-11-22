'use strict'

import { Mesh,
         SphereBufferGeometry,
         MeshStandardMaterial,
         WebGLCubeRenderTarget,
         RGBFormat, LinearMipMapLinearFilter,
         CubeCamera } from '../node_modules/three/build/three.module.js'

// import { Mesh } from '../node_modules/three/src/objects/Mesh.js'
// import { SphereBufferGeometry } from '../node_modules/three/src/geometries/SphereBufferGeometry.js'
// import { MeshStandardMaterial } from '../node_modules/three/src/materials/MeshStandardMaterial.js'
// import { WebGLCubeRenderTarget } from '../node_modules/three/src/renderers/WebGLCubeRenderTarget.js'
// import {RGBFormat, LinearMipmapLinearFilter} from '../node_modules/three/src/constants.js'
// import { CubeCamera } from '../node_modules/three/src/cameras/CubeCamera.js'

import { BufferGeometryUtils } from
  '../node_modules/three/examples/jsm/utils/BufferGeometryUtils.js'

import Element from './element.js'

export default class Lens extends Element {
  add() {
    super.add()
    this.mesh().position.set(-2, 0, 0)
  }

  geometry() {
    if (this._geometry) return this._geometry

    const top_half = new SphereBufferGeometry(2, 32, 16,
                                                    0, Math.PI * 2,
                                                    0, 0.5)
    top_half.translate(0, -1.5, 0)

    const bottom_half = top_half.clone()
    bottom_half.rotateX(Math.PI)
    bottom_half.translate(0, 0.5101, 0)

    const geom = BufferGeometryUtils.
      mergeBufferGeometries([top_half, bottom_half])

    return this._geometry = geom
  }

  material() {
    if (this._material) return this._material

    const mat = new MeshStandardMaterial({
      color: 0xccccff,
      envMap: this.environment_map(),
      opacity: 0.95,
      roughness: 0.0,
      transparent: true
    })

    return this._material = mat
  }

  update(timestamp) {
    super.update(timestamp)
    if (0 == this.prev) this.prev = timestamp

    let elapsed = timestamp - this.prev
    this.prev = timestamp

    this.mesh().rotation.x += 0.0005 * elapsed
    this.mesh().rotation.z += 0.0005 * elapsed
  }
}

const half_lens = new SphereBufferGeometry(15, 32, 16,
                                                 0, Math.PI * 2,
                                                 0, 0.5)
