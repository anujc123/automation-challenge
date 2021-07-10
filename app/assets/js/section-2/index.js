$(() => {
  const root = 'http://localhost:8889'

  const getTodo = () => {
    $.ajax({
      url: `${root}/todos/1`,
      method: 'GET',
    }).then((data) => {
      alert(data.title)
    })
  }

  $('[data-test=network-call-button]').on('click', (e) => {
    e.preventDefault()
    getTodo(e)
  })
})
