// Lanchonete do Ruan — JS puro
(function () {
  "use strict";

  var WHATSAPP_NUMERO = "5599991914230";
  var WHATSAPP_MSG = "Olá! Quero fazer um pedido na Lanchonete do Ruan.";
  var whatsappHref =
    "https://wa.me/" + WHATSAPP_NUMERO + "?text=" + encodeURIComponent(WHATSAPP_MSG);

  var destaques = [
    { titulo: "HAMBÚRGUER ARTESANAL", desc: "Blend 180g, pão brioche e molhos da casa.", img: "img/hero-burger.jpg", alt: "Hambúrguer artesanal duplo com queijo derretido", preco: "R$ 28" },
    { titulo: "PASTEL CROCANTE", desc: "Massa sequinha com recheios generosos.", img: "img/pastel.jpg", alt: "Pastel brasileiro recheado com carne e queijo", preco: "R$ 12" },
    { titulo: "REFEIÇÕES COMPLETAS", desc: "Arroz, feijão, proteína, fritas e salada.", img: "img/prato.jpg", alt: "Prato brasileiro com arroz, feijão, bife e salada", preco: "R$ 32" },
    { titulo: "BEBIDAS GELADAS", desc: "Refrigerantes, sucos naturais e cervejas.", img: "img/bebida.jpg", alt: "Copo de refrigerante gelado com cubos de gelo", preco: "R$ 6" }
  ];

  var cardapio = [
    { cat: "Hambúrgueres", nome: "X-BURGUER RUAN", desc: "Hambúrguer 150g, queijo, alface, tomate e maionese da casa.", preco: "R$ 24" },
    { cat: "Hambúrgueres", nome: "X-BACON SUPREMO", desc: "Blend 180g, bacon crocante, cheddar e cebola caramelizada.", preco: "R$ 32" },
    { cat: "Hambúrgueres", nome: "X-TUDO DO BAIRRO", desc: "Hambúrguer, ovo, bacon, presunto, milho, ervilha e batata palha.", preco: "R$ 35" },
    { cat: "Pastéis", nome: "PASTEL DE CARNE COM QUEIJO", desc: "Carne moída temperada, queijo e azeitona.", preco: "R$ 12" },
    { cat: "Pastéis", nome: "PASTEL DE FRANGO COM CATUPIRY", desc: "Frango desfiado, catupiry cremoso e tempero verde.", preco: "R$ 13" },
    { cat: "Pastéis", nome: "PASTEL DE PALMITO", desc: "Palmito com queijo e orégano.", preco: "R$ 11" },
    { cat: "Refeições", nome: "PRATO DE ALCATRA", desc: "Arroz, feijão, alcatra grelhada, fritas e salada.", preco: "R$ 34" },
    { cat: "Refeições", nome: "PRATO DE FRANGO GRELHADO", desc: "Arroz, feijão, frango temperado, fritas e salada.", preco: "R$ 29" },
    { cat: "Porções", nome: "PORÇÃO DE BATATA RÚSTICA", desc: "Batatas fritas temperadas com páprica e alecrim.", preco: "R$ 18" },
    { cat: "Porções", nome: "PORÇÃO DE CALABRESA", desc: "Calabresa acebolada com pimentão e limão.", preco: "R$ 32" },
    { cat: "Bebidas", nome: "SUCO NATURAL 500ML", desc: "Laranja, limão, abacaxi com hortelã ou maracujá.", preco: "R$ 10" },
    { cat: "Bebidas", nome: "REFRIGERANTE LATA", desc: "Coca-Cola, Guaraná, Fanta ou Sprite.", preco: "R$ 6" }
  ];

  function el(tag, className, html) {
    var n = document.createElement(tag);
    if (className) n.className = className;
    if (html !== undefined) n.innerHTML = html;
    return n;
  }

  // Links do WhatsApp
  var links = document.querySelectorAll("[data-whatsapp]");
  for (var i = 0; i < links.length; i++) {
    links[i].href = whatsappHref;
    links[i].target = "_blank";
    links[i].rel = "noreferrer";
  }

  // Destaques
  var destaquesEl = document.getElementById("destaques");
  destaques.forEach(function (d) {
    var card = el("article", "item");
    card.innerHTML =
      '<div class="thumb"><img src="' + d.img + '" alt="' + d.alt + '" loading="lazy" /></div>' +
      '<div class="body">' +
      '<div class="row"><h3>' + d.titulo + '</h3><span class="price">' + d.preco + "</span></div>" +
      "<p>" + d.desc + "</p></div>";
    destaquesEl.appendChild(card);
  });

  // Cardápio com filtros
  var listaEl = document.getElementById("cardapio-lista");
  var filtrosEl = document.getElementById("filtros");
  var categorias = ["Todos"];
  cardapio.forEach(function (item) {
    if (categorias.indexOf(item.cat) === -1) categorias.push(item.cat);
  });

  function render(cat) {
    listaEl.innerHTML = "";
    cardapio
      .filter(function (item) { return cat === "Todos" || item.cat === cat; })
      .forEach(function (item) {
        var card = el("article", "menu-item");
        card.innerHTML =
          '<div class="row"><h3>' + item.nome + '</h3><span class="price">' + item.preco + "</span></div>" +
          "<p>" + item.desc + "</p>";
        listaEl.appendChild(card);
      });
  }

  categorias.forEach(function (cat, idx) {
    var btn = el("button", "filter" + (idx === 0 ? " active" : ""), cat);
    btn.type = "button";
    btn.addEventListener("click", function () {
      var todos = filtrosEl.querySelectorAll(".filter");
      for (var j = 0; j < todos.length; j++) todos[j].classList.remove("active");
      btn.classList.add("active");
      render(cat);
    });
    filtrosEl.appendChild(btn);
  });

  render("Todos");

  // Rolagem suave para âncoras
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var alvo = document.querySelector(a.getAttribute("href"));
      if (alvo) {
        e.preventDefault();
        alvo.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Ano no rodapé
  document.getElementById("ano").textContent = new Date().getFullYear();
})();
