###*
 J$ Helpers - I am test helpers
###
j$ =
  element: (selector, label) ->
    console.warn('finding', label) if label
    $(selector)
  input: (name) ->
    $('#'+name)

module.exports = j$
