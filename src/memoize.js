'use strict'

function memoize(self, maykr_name) {
  var value

  let maykr = self[maykr_name]

  let returner = function() {
    return value
  }

  let definer = function() {
    value = maykr()

    self[maykr_name] = returner

    return vale
  }
}

export default memoize
