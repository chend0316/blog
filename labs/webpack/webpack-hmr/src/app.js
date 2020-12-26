require('./main.css')

function renderDataToDom({ data, onClick }, el) {
  with (data) {
    const template = `
      <span>${cnt}</span>
      <button id="btn">increase</button>
    `
    console.log(template)
    el.innerHTML = template
    el.querySelector('#btn').addEventListener('click', () => {
      onClick()
    })
  }
}

const rootEl = document.createElement('div')
document.body.appendChild(rootEl)

const data = {
  cnt: 1
}

function onClick() {
  data.cnt++
  renderDataToDom({ data, onClick }, rootEl)
}

renderDataToDom({ data, onClick }, rootEl)
