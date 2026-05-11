var CatalogoController = {

  catAtiva: 'todos',
  termoBusca: '',

  init: async function() {
    await DoceController.init()
    this.renderFiltros()
    this.renderCards(DoceController.todos())
    this.eventos()
  },

  renderFiltros: function() {
    var el = document.getElementById('filtros')

    var cats = DoceController.categorias()
    var html = '<button class="filtro ativo" data-cat="todos">Todos</button>'

    cats.forEach(function(c) {
      html += '<button class="filtro" data-cat="' + c + '">' + c + '</button>'
    })

    el.innerHTML = html
  },

  renderCards: function(doces) {
    var grid = document.getElementById('grid')

    if (doces.length === 0) {
      grid.innerHTML = '<p class="vazio">Nenhum doce encontrado</p>'
      return
    }

    var html = ''
    doces.forEach(function(d, i) {
      var preco = DoceModel.formatarPreco(d.preco)
      var dest = d.destaque ? '<span class="badge">[Destaque]</span>' : ''
      var wpp = 'https://wa.me/5551993705432?text=Oi%20Dona%20Maria!%20Quero%20pedir:%20' + encodeURIComponent(d.nome)

      html += '<div class="card" style="animation-delay:' + (i * 0.07) + 's">'
      html +=   '<div class="card-img">'
      html +=     '<img src="' + d.img + '" alt="' + d.nome + '" onerror="this.src=\'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop\'">'
      html +=     dest
      html +=   '</div>'
      html +=   '<div class="card-info">'
      html +=     '<div class="card-top">'
      html +=       '<h3>' + d.nome + '</h3>'
      html +=       '<strong class="preco">' + preco + '</strong>'
      html +=     '</div>'
      html +=     '<p>' + d.descricao + '</p>'
      html +=     '<div class="card-bottom">'
      html +=       '<span class="tag">' + d.categoria + '</span>'
      html +=       '<a href="' + wpp + '" target="_blank" rel="noopener noreferrer" class="btn btn-wpp">Pedir</a>'
      html +=     '</div>'
      html +=   '</div>'
      html += '</div>'
    })

    grid.innerHTML = html
  },

  filtrar: function() {
    var res
    if (this.termoBusca) {
      res = DoceController.buscar(this.termoBusca)
    } else {
      res = DoceController.porCategoria(this.catAtiva)
    }
    this.renderCards(res)
  },

  eventos: function() {
    var self = this

    document.getElementById('filtros').addEventListener('click', function(e) {
      var btn = e.target.closest('.filtro')
      if (!btn) return

      document.querySelectorAll('.filtro').forEach(b => b.classList.remove('ativo'))
      btn.classList.add('ativo')
      self.catAtiva = btn.dataset.cat
      self.termoBusca = ''
      document.getElementById('busca').value = ''
      self.filtrar()
    })

    // timeout pra nao buscar a cada tecla digitada
    var t
    document.getElementById('busca').addEventListener('input', function(e) {
      clearTimeout(t)
      t = setTimeout(function() {
        self.termoBusca = e.target.value
        if (self.termoBusca) {
          document.querySelectorAll('.filtro').forEach(b => b.classList.remove('ativo'))
          document.querySelector('[data-cat="todos"]').classList.add('ativo')
          self.catAtiva = 'todos'
        }
        self.filtrar()
      }, 300)
    })
  }

}

document.addEventListener('DOMContentLoaded', function() {
  CatalogoController.init()
})
