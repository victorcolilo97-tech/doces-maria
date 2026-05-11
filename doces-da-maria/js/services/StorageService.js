var StorageService = {

  KEY: 'doces_maria',

  getDoces: async function() {
    var salvo = localStorage.getItem(this.KEY)

    if (salvo) {
      return JSON.parse(salvo)
    }

    // primeira vez carrega do arquivo json
    var resp = await fetch('./data/doces.json')
    var lista = await resp.json()
    this.setDoces(lista)
    return lista
  },

  setDoces: function(lista) {
    localStorage.setItem(this.KEY, JSON.stringify(lista))
  },

  exportar: function(lista) {
    var txt = JSON.stringify(lista, null, 2)
    var blob = new Blob([txt], { type: 'application/json' })
    var url = URL.createObjectURL(blob)
    var a = document.createElement('a')
    a.href = url
    a.download = 'doces.json'
    a.click()
  }

}
