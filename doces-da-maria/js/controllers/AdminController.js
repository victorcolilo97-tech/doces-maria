var AdminController = {

  editando: false,
  idEdit: null,
  idDel: null,

  init: async function() {
    await DoceController.init()
    this.renderLista()
    this.atualizaStats()
    this.eventos()
  },

  renderLista: function(lista) {
    var el = document.getElementById('lista-admin')
    var doces = lista || DoceController.todos()

    if (doces.length === 0) {
      el.innerHTML = '<p class="vazio">Nada cadastrado ainda.</p>'
      return
    }

    var html = ''
    doces.forEach(function(d) {
      html += '<div class="item-lista">'
      html +=   '<img src="' + d.img + '" class="img-mini" onerror="this.src=\'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=80&h=80&fit=crop\'">'
      html +=   '<div class="item-info">'
      html +=     '<strong>' + d.nome + (d.destaque ? ' [Destaque]' : '') + '</strong>'
      html +=     '<small>' + d.categoria + ' | ' + DoceModel.formatarPreco(d.preco) + '</small>'
      html +=   '</div>'
      html +=   '<div class="item-acoes">'
      html +=     '<button class="btn btn-ed" onclick="AdminController.carregarEdicao(' + d.id + ')">Editar</button>'
      html +=     '<button class="btn btn-rm" onclick="AdminController.abrirModal(' + d.id + ', \'' + d.nome.replace(/'/g, '') + '\')">Remover</button>'
      html +=   '</div>'
      html += '</div>'
    })

    el.innerHTML = html
  },

  atualizaStats: function() {
    var todos = DoceController.todos()
    document.getElementById('s-total').textContent = todos.length
    document.getElementById('s-dest').textContent = todos.filter(d => d.destaque).length
    document.getElementById('s-cats').textContent = DoceController.categorias().length
  },

  salvar: function() {
    var dados = {
      nome:      document.getElementById('f-nome').value.trim(),
      descricao: document.getElementById('f-desc').value.trim(),
      preco:     document.getElementById('f-preco').value,
      categoria: document.getElementById('f-cat').value,
      img:       document.getElementById('f-img').value.trim(),
      destaque:  document.getElementById('f-dest').checked
    }

    var res
    if (this.editando) {
      res = DoceController.editar(this.idEdit, dados)
    } else {
      res = DoceController.adicionar(dados)
    }

    if (!res.ok) {
      this.mostraErro(res.erros.join(' | '))
      return
    }

    this.mostraSucesso(this.editando ? 'Atualizado!' : 'Cadastrado!')
    this.limpaForm()
    this.renderLista()
    this.atualizaStats()
  },

  carregarEdicao: function(id) {
    var d = DoceController.porId(id)
    if (!d) return

    this.editando = true
    this.idEdit = id

    // preenche o form com os dados
    document.getElementById('form-titulo').textContent = 'Editando doce'
    document.getElementById('f-nome').value  = d.nome
    document.getElementById('f-desc').value  = d.descricao
    document.getElementById('f-preco').value = d.preco
    document.getElementById('f-cat').value   = d.categoria
    document.getElementById('f-img').value   = d.img
    document.getElementById('f-dest').checked = d.destaque

    document.querySelector('.form-card').scrollIntoView({ behavior: 'smooth' })
  },

  limpaForm: function() {
    this.editando = false
    this.idEdit = null
    document.getElementById('form-titulo').textContent = 'Novo Doce'
    document.getElementById('f-nome').value   = ''
    document.getElementById('f-desc').value   = ''
    document.getElementById('f-preco').value  = ''
    document.getElementById('f-cat').value    = ''
    document.getElementById('f-img').value    = ''
    document.getElementById('f-dest').checked = false
    this.escondeMsgs()
  },

  abrirModal: function(id, nome) {
    this.idDel = id
    document.getElementById('modal-txt').textContent = 'Deletar "' + nome + '"?'
    document.getElementById('modal').classList.add('aberto')
  },

  fecharModal: function() {
    document.getElementById('modal').classList.remove('aberto')
    this.idDel = null
  },

  confirmarDelete: function() {
    if (!this.idDel) return
    DoceController.deletar(this.idDel)
    this.fecharModal()
    this.renderLista()
    this.atualizaStats()
    if (this.idEdit === this.idDel) this.limpaForm()
  },

  mostraErro: function(msg) {
    var el = document.getElementById('msg-erro')
    el.textContent = msg
    el.style.display = 'block'
    document.getElementById('msg-ok').style.display = 'none'
  },

  mostraSucesso: function(msg) {
    var el = document.getElementById('msg-ok')
    el.textContent = msg
    el.style.display = 'block'
    document.getElementById('msg-erro').style.display = 'none'
    setTimeout(() => el.style.display = 'none', 2500)
  },

  escondeMsgs: function() {
    document.getElementById('msg-erro').style.display = 'none'
    document.getElementById('msg-ok').style.display   = 'none'
  },

  eventos: function() {
    var self = this

    document.getElementById('btn-salvar').addEventListener('click', () => self.salvar())
    document.getElementById('btn-limpar').addEventListener('click', () => self.limpaForm())
    document.getElementById('btn-export').addEventListener('click', () => StorageService.exportar(DoceController.todos()))
    document.getElementById('btn-confirma-del').addEventListener('click', () => self.confirmarDelete())
    document.getElementById('btn-cancela').addEventListener('click', () => self.fecharModal())

    document.getElementById('modal').addEventListener('click', function(e) {
      if (e.target === this) self.fecharModal()
    })

    // debounce no filtro pra nao ficar chamando toda hora
    var timer
    document.getElementById('filtro-lista').addEventListener('input', function(e) {
      clearTimeout(timer)
      timer = setTimeout(function() {
        var v = e.target.value.trim()
        self.renderLista(v ? DoceController.buscar(v) : null)
      }, 250)
    })
  }

}

document.addEventListener('DOMContentLoaded', () => AdminController.init())
