/* global hljs*/

// initialize highlight.js for JavaScript code highlighting
hljs.initHighlightingOnLoad()

$(() => {
  // initialize Bootstrap popovers
  $('[data-toggle="popover"]').popover()
})
