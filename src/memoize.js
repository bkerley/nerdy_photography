'use strict'

function memoize(self, maykr_name) {
  var value

  let maykr = self[maykr_name]

  let returner = function() {
    return value
  }

  let definer = function() {
    value = maykr.apply(self)

    self[maykr_name] = returner

    return value
  }

  self[maykr_name] = definer
}

export default memoize
