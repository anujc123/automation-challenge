$(() => {
  $('#table-toggle-button').on('click', () => {
    $('#alaya-table').toggle()
  })

  $('#form-toggle-button').on('click', () => {
    $('#alaya-form').toggle()
  })

  document.getElementById('submit').addEventListener('click', (event) => {
    event.preventDefault()
    alert('Form submitted!')
  })
})
