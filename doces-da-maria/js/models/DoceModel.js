var DoceModel = {

  novo: function(d) {
    return {
      id: d.id || Date.now(),
      nome: d.nome,
      descricao: d.descricao,
      preco: parseFloat(d.preco),
      categoria: d.categoria,
      img: d.img || 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop',
      destaque: d.destaque || false
    }
  },

  validar: function(d) {
    var erros = []

    if (!d.nome || d.nome.trim() == '') erros.push('Nome obrigatorio')
    if (!d.descricao || d.descricao.trim() == '') erros.push('Descricao obrigatoria')
    if (!d.preco || isNaN(d.preco) || d.preco <= 0) erros.push('Preco invalido')
    if (!d.categoria) erros.push('Escolha uma categoria')

    return erros
  },

  formatarPreco: function(v) {
    return 'R$ ' + parseFloat(v).toFixed(2).replace('.', ',')
  }

}
