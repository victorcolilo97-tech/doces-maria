var DoceController = {

  lista: [],

  init: async function() {
    this.lista = await StorageService.getDoces()
  },

  todos: function() {
    return this.lista
  },

  porCategoria: function(cat) {
    if (!cat || cat === 'todos') return this.lista
    return this.lista.filter(function(d) {
      return d.categoria === cat
    })
  },

  buscar: function(termo) {
    var t = termo.toLowerCase()
    return this.lista.filter(function(d) {
      return d.nome.toLowerCase().indexOf(t) >= 0 ||
             d.descricao.toLowerCase().indexOf(t) >= 0
    })
  },

  porId: function(id) {
    return this.lista.find(d => d.id === parseInt(id))
  },

  adicionar: function(form) {
    var erros = DoceModel.validar(form)
    if (erros.length > 0) return { ok: false, erros: erros }

    var doce = DoceModel.novo(form)
    this.lista.push(doce)
    StorageService.setDoces(this.lista)
    return { ok: true, doce: doce }
  },

  editar: function(id, form) {
    var erros = DoceModel.validar(form)
    if (erros.length > 0) return { ok: false, erros: erros }

    var idx = this.lista.findIndex(d => d.id === parseInt(id))
    if (idx === -1) return { ok: false, erros: ['nao encontrado'] }

    this.lista[idx] = DoceModel.novo({ ...form, id: parseInt(id) })
    StorageService.setDoces(this.lista)
    return { ok: true }
  },

  deletar: function(id) {
    var antes = this.lista.length
    this.lista = this.lista.filter(d => d.id !== parseInt(id))
    StorageService.setDoces(this.lista)
    return this.lista.length < antes
  },

  categorias: function() {
    var cats = []
    this.lista.forEach(function(d) {
      if (cats.indexOf(d.categoria) === -1) cats.push(d.categoria)
    })
    return cats
  }

}
