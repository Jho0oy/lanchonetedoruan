// Lanchonete do Ruan — JS puro com sistema de pedidos
(function () {
  "use strict";

  var WHATSAPP_NUMERO = "5599991914230";
  var ENTREGA_TAXA = 0;

  var destaques = [
    { titulo: "HAMBÚRGUERES", desc: "Tradicional ou artesanal, do X-Burguer ao X-Tudão.", img: "img/hero-burger.jpg", alt: "Hambúrguer artesanal com queijo derretido", preco: "a partir de R$ 10" },
    { titulo: "PASTELÃO", desc: "Massa sequinha e recheio generoso.", img: "img/pastel.jpg", alt: "Pastel crocante recheado", preco: "R$ 10" },
    { titulo: "PORÇÕES", desc: "Batata M, G ou turbinada com bacon, calabresa e cheddar.", img: "img/prato.jpg", alt: "Porção de batata frita", preco: "a partir de R$ 10" },
    { titulo: "BEBIDAS GELADAS", desc: "Escolha sua bebida ao finalizar o pedido.", img: "img/bebida.jpg", alt: "Copo de refrigerante gelado", preco: "Consulte" }
  ];

  function burger(id, nome, desc, t, a) {
    return { id: id, cat: "Hambúrgueres", nome: nome, desc: desc, vars: [{ n: "Tradicional", p: t }, { n: "Artesanal", p: a }], adicionais: true };
  }
  var cardapio = [
    burger("xburguer", "X-BURGUER", "Pão, carne, queijo e molho.", 10, 15),
    burger("xsalada", "X-SALADA", "Pão, carne, queijo, alface, tomate e molho.", 14, 18),
    burger("xtopzinho", "X-TOPZINHO", "Pão, carne, queijo, calabresa, cheddar, alface, tomate e molho.", 17, 20),
    burger("xcalabresa", "X-CALABRESA", "Pão, carne, queijo, calabresa, alface, tomate e molho.", 17, 20),
    burger("xbacon", "X-BACON", "Pão, carne, queijo, bacon, alface, tomate e molho.", 18, 20),
    burger("xtopduplo", "X-TOP DUPLO", "Pão, 2 carnes, queijo, calabresa, ovo, cheddar, alface, tomate e molho.", 20, 24),
    burger("xtudo", "X-TUDO", "Pão, carne, queijo, calabresa, bacon, cheddar, ovo, alface, tomate, batata palha e molho.", 20, 22),
    burger("xtudao", "X-TUDÃO", "Pão, carne, queijo, calabresa, bacon, cheddar, alface, tomate, batata palha, catupiry, ovo, salsicha, milho e molho.", 22, 24),
    { id: "batatam", cat: "Porções", nome: "BATATA M", desc: "Porção média de batata frita.", vars: [{ n: "", p: 10 }] },
    { id: "batatag", cat: "Porções", nome: "BATATA G", desc: "Porção grande de batata frita.", vars: [{ n: "", p: 15 }] },
    { id: "batatagt", cat: "Porções", nome: "BATATA G TURBINADA", desc: "Bacon, calabresa e cheddar.", vars: [{ n: "", p: 20 }] },
    { id: "pastelao", cat: "Porções", nome: "PASTELÃO", desc: "Pastel grande, crocante e recheado.", vars: [{ n: "", p: 10 }] }
  ];

  var adicionais = [
    { id: "carneart", n: "Carne artesanal", p: 5 },
    { id: "calabresa", n: "Calabresa", p: 3 },
    { id: "cheddar", n: "Cheddar", p: 2 },
    { id: "bacon", n: "Bacon", p: 3 },
    { id: "carne", n: "Carne", p: 3 },
    { id: "ovo", n: "Ovo", p: 2 }
  ];

  // ---------- helpers ----------
  function $(id) { return document.getElementById(id); }
  function el(tag, className, html) {
    var n = document.createElement(tag);
    if (className) n.className = className;
    if (html !== undefined) n.innerHTML = html;
    return n;
  }
  function brl(v) { return "R$ " + v.toFixed(2).replace(".", ","); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function findProd(id) { for (var i = 0; i < cardapio.length; i++) if (cardapio[i].id === id) return cardapio[i]; }

  // ---------- estado ----------
  var cart = [];
  try { cart = JSON.parse(localStorage.getItem("ruan_cart") || "[]") || []; } catch (e) { cart = []; }
  var checkout = { nome: "", receb: "", end: "", num: "", comp: "", ref: "", querBebida: "", bebidas: [], pag: "", troco: "", trocoValor: "" };

  function unitPrice(l) { return l.base + l.adds.reduce(function (s, a) { return s + a.p; }, 0); }
  function cartTotal() { return cart.reduce(function (s, l) { return s + unitPrice(l) * l.qty; }, 0) + ENTREGA_TAXA; }
  function cartCount() { return cart.reduce(function (s, l) { return s + l.qty; }, 0); }
  function save() { try { localStorage.setItem("ruan_cart", JSON.stringify(cart)); } catch (e) {} }

  // ---------- overlay/modals ----------
  var overlay = $("overlay"), drawer = $("drawer"), itemModal = $("item-modal"), coModal = $("checkout-modal");
  function lock() { document.body.classList.toggle("lock", !drawer.hidden || !itemModal.hidden || !coModal.hidden); }
  function openDrawer() { renderCart(); drawer.hidden = false; overlay.hidden = false; lock(); }
  function closeDrawer() { drawer.hidden = true; overlay.hidden = true; lock(); }
  function closeModal(m) { m.hidden = true; lock(); }
  overlay.addEventListener("click", closeDrawer);
  [itemModal, coModal].forEach(function (m) {
    m.addEventListener("click", function (e) { if (e.target === m) closeModal(m); });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (!itemModal.hidden) closeModal(itemModal);
    else if (!coModal.hidden) closeModal(coModal);
    else if (!drawer.hidden) closeDrawer();
  });
  document.querySelectorAll("[data-open-cart]").forEach(function (b) { b.addEventListener("click", openDrawer); });
  drawer.querySelector("[data-close]").addEventListener("click", closeDrawer);

  var toastTimer;
  function toast(msg) {
    var t = $("toast");
    t.textContent = msg; t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.hidden = true; }, 2000);
  }

  // ---------- destaques ----------
  var destaquesEl = $("destaques");
  destaques.forEach(function (d) {
    var card = el("article", "item");
    card.innerHTML =
      '<div class="thumb"><img src="' + d.img + '" alt="' + d.alt + '" loading="lazy" /></div>' +
      '<div class="body"><div class="row"><h3>' + d.titulo + '</h3><span class="price">' + d.preco + "</span></div>" +
      "<p>" + d.desc + "</p></div>";
    destaquesEl.appendChild(card);
  });

  // ---------- cardápio ----------
  var listaEl = $("cardapio-lista"), filtrosEl = $("filtros");
  var categorias = ["Todos"];
  cardapio.forEach(function (i) { if (categorias.indexOf(i.cat) === -1) categorias.push(i.cat); });

  function render(cat) {
    listaEl.innerHTML = "";
    cardapio.filter(function (i) { return cat === "Todos" || i.cat === cat; }).forEach(function (item) {
      var card = el("article", "menu-item");
      var priceHtml = item.vars.length > 1
        ? '<div class="vars">' + item.vars.map(function (v) { return v.n + ": <b>" + brl(v.p) + "</b>"; }).join(" · ") + "</div>"
        : "";
      card.innerHTML =
        '<div><div class="row"><h3>' + item.nome + '</h3><span class="price">' +
        (item.vars.length > 1 ? "a partir de " : "") + brl(item.vars[0].p) + "</span></div>" +
        "<p>" + item.desc + "</p></div>" + priceHtml +
        '<button class="btn btn-primary" type="button">+ Adicionar ao pedido</button>';
      card.querySelector("button").addEventListener("click", function () { openItem(item); });
      listaEl.appendChild(card);
    });
    listaEl.appendChild(el("p", "menu-note", "🥤 Bebidas: escolha na hora de finalizar o pedido."));
  }
  categorias.forEach(function (cat, idx) {
    var btn = el("button", "filter" + (idx === 0 ? " active" : ""), cat);
    btn.type = "button";
    btn.addEventListener("click", function () {
      filtrosEl.querySelectorAll(".filter").forEach(function (f) { f.classList.remove("active"); });
      btn.classList.add("active");
      render(cat);
    });
    filtrosEl.appendChild(btn);
  });
  render("Todos");

  // ---------- modal do produto ----------
  function openItem(item) {
    var body = $("item-modal-body");
    var qty = 1;
    var html = '<div class="row"><h3>' + item.nome + '</h3><button class="icon-btn" type="button" data-x aria-label="Fechar">✕</button></div>' +
      '<p class="desc">' + item.desc + "</p>";
    if (item.vars.length > 1) {
      html += '<div class="group"><span class="group-title">Escolha o tipo</span>' +
        item.vars.map(function (v, i) {
          return '<label class="opt"><input type="radio" name="var" value="' + i + '"' + (i === 0 ? " checked" : "") + " /><span>" + v.n + "</span><b>" + brl(v.p) + "</b></label>";
        }).join("") + "</div>";
    }
    if (item.adicionais) {
      html += '<div class="group"><span class="group-title">Adicionais (opcional)</span>' +
        adicionais.map(function (a) {
          return '<label class="opt"><input type="checkbox" name="add" value="' + a.id + '" /><span>' + a.n + "</span><b>+ " + brl(a.p) + "</b></label>";
        }).join("") + "</div>";
    }
    html += '<div class="group row" style="align-items:center"><span class="group-title" style="margin:0">Quantidade</span>' +
      '<div class="qty"><button type="button" data-q="-1" aria-label="Diminuir">−</button><b data-qv>1</b><button type="button" data-q="1" aria-label="Aumentar">+</button></div></div>' +
      '<button class="btn btn-primary btn-block btn-lg" type="button" data-add></button>';
    body.innerHTML = html;

    function selection() {
      var vi = item.vars.length > 1 ? +body.querySelector('input[name="var"]:checked').value : 0;
      var adds = [];
      body.querySelectorAll('input[name="add"]:checked').forEach(function (c) {
        adicionais.forEach(function (a) { if (a.id === c.value) adds.push({ n: a.n, p: a.p }); });
      });
      return { v: item.vars[vi], adds: adds };
    }
    function update() {
      var s = selection();
      var unit = s.v.p + s.adds.reduce(function (t, a) { return t + a.p; }, 0);
      body.querySelector("[data-qv]").textContent = qty;
      body.querySelector("[data-add]").textContent = "Adicionar ao pedido · " + brl(unit * qty);
    }
    body.addEventListener("change", update);
    body.querySelectorAll("[data-q]").forEach(function (b) {
      b.addEventListener("click", function () { qty = Math.max(1, qty + +b.getAttribute("data-q")); update(); });
    });
    body.querySelector("[data-x]").addEventListener("click", function () { closeModal(itemModal); });
    body.querySelector("[data-add]").addEventListener("click", function () {
      var s = selection();
      var key = item.id + "|" + s.v.n + "|" + s.adds.map(function (a) { return a.n; }).sort().join(",");
      var found = null;
      cart.forEach(function (l) { if (l.key === key) found = l; });
      if (found) found.qty += qty;
      else cart.push({ key: key, id: item.id, nome: item.nome, variacao: s.v.n, base: s.v.p, adds: s.adds, qty: qty });
      save(); updateBadges(); closeModal(itemModal);
      toast("✅ " + qty + "x " + item.nome + " adicionado!");
    });
    update();
    itemModal.hidden = false; lock();
  }

  // ---------- carrinho ----------
  function updateBadges() {
    var c = cartCount(), t = brl(cartTotal());
    document.querySelectorAll("[data-cart-count]").forEach(function (n) { n.textContent = c; });
    document.querySelectorAll("[data-cart-total]").forEach(function (n) { n.textContent = t; });
    document.querySelector(".fab").classList.toggle("has-items", c > 0);
    $("btn-checkout").disabled = c === 0;
  }

  function renderCart() {
    var box = $("cart-lines");
    box.innerHTML = "";
    if (!cart.length) {
      box.innerHTML = '<div class="empty"><p>Seu carrinho está vazio.</p><a class="btn btn-ghost btn-sm" href="#cardapio" data-go>Ver cardápio</a></div>';
      box.querySelector("[data-go]").addEventListener("click", closeDrawer);
    }
    cart.forEach(function (l, idx) {
      var u = unitPrice(l);
      var d = el("div", "line");
      d.innerHTML = "<h4>" + l.nome + (l.variacao ? " — " + l.variacao : "") + "</h4>" +
        (l.adds.length ? "<small>+ " + l.adds.map(function (a) { return a.n; }).join(", ") + "</small>" : "") +
        "<small>Unitário: " + brl(u) + "</small>" +
        '<div class="line-foot"><div class="qty"><button type="button" data-d aria-label="Diminuir">−</button><b>' + l.qty +
        '</b><button type="button" data-i aria-label="Aumentar">+</button></div><b>' + brl(u * l.qty) + "</b></div>" +
        '<button class="remove" type="button" data-r>Remover</button>';
      d.querySelector("[data-d]").addEventListener("click", function () { if (l.qty > 1) l.qty--; else cart.splice(idx, 1); changed(); });
      d.querySelector("[data-i]").addEventListener("click", function () { l.qty++; changed(); });
      d.querySelector("[data-r]").addEventListener("click", function () { cart.splice(idx, 1); changed(); });
      box.appendChild(d);
    });
  }
  function changed() { save(); updateBadges(); renderCart(); }

  $("btn-checkout").addEventListener("click", function () {
    if (!cart.length) return;
    closeDrawer(); renderForm(); coModal.hidden = false; lock();
  });

  // ---------- checkout ----------
  function radio(name, val, label, cur) {
    return '<label class="opt"><input type="radio" name="' + name + '" value="' + val + '"' + (cur === val ? " checked" : "") + " /><span>" + label + "</span></label>";
  }
  function input(name, ph, val, extra) {
    return '<input class="field" name="' + name + '" placeholder="' + ph + '" value="' + esc(val || "") + '" ' + (extra || "") + " />";
  }

  function renderForm() {
    var c = checkout, b = $("checkout-body");
    var html = '<div class="row"><h3>FINALIZAR PEDIDO</h3><button class="icon-btn" type="button" data-x aria-label="Fechar">✕</button></div>' +
      '<p class="desc">Total dos itens: <b>' + brl(cartTotal()) + "</b> · Entrega grátis</p>" +
      '<div class="group"><label for="f-nome">1. Seu nome</label>' + input("nome", "Ex: Maria Silva", c.nome, 'id="f-nome" maxlength="60" autocomplete="name"') + '<div class="err" data-err="nome" hidden></div></div>' +
      '<div class="group"><span class="group-title">2. Forma de recebimento</span><div class="opts-inline">' +
      radio("receb", "Entrega", "🛵 Entrega", c.receb) + radio("receb", "Retirar no local", "🏪 Retirar", c.receb) +
      '</div><div class="err" data-err="receb" hidden></div>' +
      '<div data-addr' + (c.receb === "Entrega" ? "" : " hidden") + ' style="margin-top:10px">' +
      input("end", "Endereço (rua / bairro)", c.end, 'maxlength="120" autocomplete="street-address"') + '<div class="err" data-err="end" hidden></div>' +
      input("num", "Número", c.num, 'maxlength="10" inputmode="numeric"') + '<div class="err" data-err="num" hidden></div>' +
      input("comp", "Complemento (opcional)", c.comp, 'maxlength="60"') +
      input("ref", "Ponto de referência (opcional)", c.ref, 'maxlength="100"') +
      '<p class="hint">Taxa de entrega: R$ 0,00</p></div></div>' +
      '<div class="group"><span class="group-title">3. Bebidas — Você deseja alguma bebida?</span><div class="opts-inline">' +
      radio("querBebida", "sim", "Sim", c.querBebida) + radio("querBebida", "nao", "Não", c.querBebida) +
      '</div><div class="err" data-err="querBebida" hidden></div>' +
      '<div data-drinks' + (c.querBebida === "sim" ? "" : " hidden") + ' style="margin-top:10px">' +
      '<p class="hint">O valor das bebidas será informado pela lanchonete (não entra no total).</p><div data-drink-list></div>' +
      '<button class="btn btn-ghost btn-sm" type="button" data-add-drink>+ Adicionar bebida</button><div class="err" data-err="bebidas" hidden></div></div></div>' +
      '<div class="group"><span class="group-title">4. Como você deseja pagar?</span>' +
      radio("pag", "Pix", "Pix", c.pag) + radio("pag", "Dinheiro", "Dinheiro", c.pag) + radio("pag", "Cartão", "Cartão", c.pag) +
      '<div class="err" data-err="pag" hidden></div>' +
      '<div data-cash' + (c.pag === "Dinheiro" ? "" : " hidden") + ' style="margin-top:10px"><span class="group-title">Precisa de troco?</span><div class="opts-inline">' +
      radio("troco", "sim", "Sim", c.troco) + radio("troco", "nao", "Não", c.troco) + '</div><div class="err" data-err="troco" hidden></div>' +
      '<div data-troco-val' + (c.troco === "sim" ? "" : " hidden") + ' style="margin-top:10px"><label class="group-title">Troco para quanto?</label>' +
      input("trocoValor", "Ex: 50", c.trocoValor, 'inputmode="decimal" maxlength="8"') + '<div class="err" data-err="trocoValor" hidden></div></div></div></div>' +
      '<div class="modal-actions"><button class="btn btn-ghost" type="button" data-back>Voltar ao carrinho</button><button class="btn btn-primary" type="button" data-next>Revisar pedido</button></div>';
    b.innerHTML = html;
    b.scrollTop = 0;

    var list = b.querySelector("[data-drink-list]");
    function drinkRow(d) {
      var r = el("div", "drink-row");
      r.innerHTML = '<input class="field" type="number" min="1" max="50" value="' + (d.qty || 1) + '" aria-label="Quantidade" data-k="qty" />' +
        '<input class="field" placeholder="Tipo (ex: Coca-Cola lata)" maxlength="50" value="' + esc(d.tipo || "") + '" data-k="tipo" />' +
        '<input class="field" placeholder="Tamanho (opcional)" maxlength="20" value="' + esc(d.tam || "") + '" data-k="tam" />' +
        '<button class="icon-btn" type="button" aria-label="Remover bebida">✕</button>';
      r.querySelector("button").addEventListener("click", function () { r.remove(); });
      list.appendChild(r);
    }
    (c.bebidas.length ? c.bebidas : [{}]).forEach(drinkRow);
    b.querySelector("[data-add-drink]").addEventListener("click", function () { drinkRow({}); });

    b.addEventListener("change", function (e) {
      var n = e.target.name;
      if (n === "receb") b.querySelector("[data-addr]").hidden = e.target.value !== "Entrega";
      if (n === "querBebida") b.querySelector("[data-drinks]").hidden = e.target.value !== "sim";
      if (n === "pag") b.querySelector("[data-cash]").hidden = e.target.value !== "Dinheiro";
      if (n === "troco") b.querySelector("[data-troco-val]").hidden = e.target.value !== "sim";
    });
    b.querySelector("[data-x]").addEventListener("click", function () { collect(b); closeModal(coModal); });
    b.querySelector("[data-back]").addEventListener("click", function () { collect(b); closeModal(coModal); openDrawer(); });
    b.querySelector("[data-next]").addEventListener("click", function () {
      collect(b);
      if (validate(b)) renderSummary();
    });
  }

  function collect(b) {
    var c = checkout;
    function v(n) { var i = b.querySelector('[name="' + n + '"]'); return i ? i.value.trim() : ""; }
    function r(n) { var i = b.querySelector('input[name="' + n + '"]:checked'); return i ? i.value : ""; }
    c.nome = v("nome"); c.end = v("end"); c.num = v("num"); c.comp = v("comp"); c.ref = v("ref"); c.trocoValor = v("trocoValor");
    c.receb = r("receb"); c.querBebida = r("querBebida"); c.pag = r("pag"); c.troco = r("troco");
    c.bebidas = [];
    b.querySelectorAll(".drink-row").forEach(function (row) {
      var d = {};
      row.querySelectorAll("[data-k]").forEach(function (i) { d[i.getAttribute("data-k")] = i.value.trim(); });
      d.qty = Math.max(1, Math.min(50, parseInt(d.qty, 10) || 1));
      if (d.tipo) c.bebidas.push(d);
    });
  }

  function parseMoney(s) { return parseFloat(String(s).replace(/[^\d,.]/g, "").replace(",", ".")); }

  function validate(b) {
    var c = checkout, errs = {};
    b.querySelectorAll(".err").forEach(function (e) { e.hidden = true; });
    b.querySelectorAll(".invalid").forEach(function (e) { e.classList.remove("invalid"); });
    if (c.nome.length < 2) errs.nome = "Informe seu nome.";
    if (!c.receb) errs.receb = "Escolha entrega ou retirada.";
    if (c.receb === "Entrega") {
      if (c.end.length < 3) errs.end = "Informe o endereço.";
      if (!c.num) errs.num = "Informe o número.";
    }
    if (!c.querBebida) errs.querBebida = "Responda se deseja bebida.";
    if (c.querBebida === "sim" && !c.bebidas.length) errs.bebidas = "Informe ao menos uma bebida ou marque \"Não\".";
    if (!c.pag) errs.pag = "Escolha a forma de pagamento.";
    if (c.pag === "Dinheiro") {
      if (!c.troco) errs.troco = "Informe se precisa de troco.";
      if (c.troco === "sim") {
        var t = parseMoney(c.trocoValor);
        if (!t || isNaN(t)) errs.trocoValor = "Informe o valor para o troco.";
        else if (t < cartTotal()) errs.trocoValor = "O valor deve ser maior que o total (" + brl(cartTotal()) + ").";
      }
    }
    var first = null;
    Object.keys(errs).forEach(function (k) {
      var e = b.querySelector('[data-err="' + k + '"]');
      if (e) { e.textContent = errs[k]; e.hidden = false; if (!first) first = e; }
      var f = b.querySelector('input.field[name="' + k + '"]');
      if (f) f.classList.add("invalid");
    });
    if (first) first.scrollIntoView({ behavior: "smooth", block: "center" });
    return !first;
  }

  function addrText() {
    var c = checkout;
    return c.end + ", " + c.num + (c.comp ? " — " + c.comp : "") + (c.ref ? " (Ref: " + c.ref + ")" : "");
  }
  function trocoText() {
    var c = checkout;
    if (c.pag !== "Dinheiro") return "";
    return c.troco === "sim" ? "Troco para " + brl(parseMoney(c.trocoValor)) : "Não precisa";
  }
  function lineText(l) {
    return l.qty + "x " + l.nome + (l.variacao ? " - " + l.variacao : "") + " - " + brl(unitPrice(l) * l.qty);
  }

  function renderSummary() {
    var c = checkout, b = $("checkout-body");
    var adds = cart.filter(function (l) { return l.adds.length; });
    var html = '<div class="row"><h3>CONFIRME SEU PEDIDO</h3><button class="icon-btn" type="button" data-x aria-label="Fechar">✕</button></div>' +
      '<p class="desc">Confira tudo antes de enviar.</p><div class="summary">' +
      "<h4>Nome</h4><p>" + esc(c.nome) + "</p>" +
      "<h4>Recebimento</h4><p>" + (c.receb === "Entrega" ? "🛵 Entrega (taxa R$ 0,00)" : "🏪 Retirar no local") + "</p>" +
      (c.receb === "Entrega" ? "<h4>Endereço</h4><p>" + esc(addrText()) + "</p>" : "") +
      "<h4>Produtos</h4>" + cart.map(function (l) { return "<p>" + esc(lineText(l)) + "</p>"; }).join("") +
      (adds.length ? "<h4>Adicionais</h4>" + adds.map(function (l) {
        return "<p>" + l.nome + ": " + l.adds.map(function (a) { return a.n + " (+" + brl(a.p) + ")"; }).join(", ") + "</p>";
      }).join("") : "") +
      "<h4>Bebidas</h4>" + (c.querBebida === "sim" ? c.bebidas.map(function (d) {
        return "<p>" + d.qty + "x " + esc(d.tipo) + (d.tam ? " " + esc(d.tam) : "") + "</p>";
      }).join("") + '<p class="hint">Valor a combinar com a lanchonete.</p>' : "<p>Nenhuma</p>") +
      "<h4>Pagamento</h4><p>" + c.pag + "</p>" +
      (c.pag === "Dinheiro" ? "<h4>Troco</h4><p>" + trocoText() + "</p>" : "") +
      '<h4>Total</h4><p style="font-size:20px;font-weight:700">' + brl(cartTotal()) + (c.querBebida === "sim" ? ' <span class="hint">+ bebidas</span>' : "") + "</p></div>" +
      '<div class="modal-actions"><button class="btn btn-ghost" type="button" data-edit>Voltar e editar</button>' +
      '<button class="btn btn-primary" type="button" data-send>Enviar pedido pelo WhatsApp</button></div>';
    b.innerHTML = html;
    b.scrollTop = 0;
    b.querySelector("[data-x]").addEventListener("click", function () { closeModal(coModal); });
    b.querySelector("[data-edit]").addEventListener("click", renderForm);
    b.querySelector("[data-send]").addEventListener("click", function () {
      window.open("https://wa.me/" + WHATSAPP_NUMERO + "?text=" + encodeURIComponent(buildMessage()), "_blank", "noopener");
      toast("Abrindo o WhatsApp...");
    });
  }

  function buildMessage() {
    var c = checkout, m = [];
    m.push("🍔 *NOVO PEDIDO - LANCHONETE DO RUAN*", "");
    m.push("👤 *Cliente:* " + c.nome, "");
    m.push("📦 *Pedido:*");
    cart.forEach(function (l) { m.push(lineText(l)); });
    m.push("");
    var adds = cart.filter(function (l) { return l.adds.length; });
    m.push("➕ *Adicionais:*");
    if (adds.length) adds.forEach(function (l) {
      m.push(l.nome + ": " + l.adds.map(function (a) { return a.n + " (+" + brl(a.p) + ")"; }).join(", "));
    });
    else m.push("Nenhum");
    m.push("");
    m.push("🥤 *Bebidas:*");
    if (c.querBebida === "sim") {
      c.bebidas.forEach(function (d) { m.push(d.qty + "x " + d.tipo + (d.tam ? " " + d.tam : "")); });
      m.push("(valor a combinar)");
    } else m.push("Nenhuma");
    m.push("");
    m.push("🚚 *Entrega/Retirada:*", c.receb === "Entrega" ? "Entrega (taxa R$ 0,00)" : "Retirar no local", "");
    if (c.receb === "Entrega") m.push("📍 *Endereço:*", addrText(), "");
    m.push("💳 *Pagamento:*", c.pag, "");
    if (c.pag === "Dinheiro") m.push("💵 *Troco:*", trocoText(), "");
    m.push("💰 *TOTAL:*", brl(cartTotal()) + (c.querBebida === "sim" ? " + bebidas" : ""));
    return m.join("\n");
  }

  // ---------- geral ----------
  document.querySelectorAll("[data-whatsapp]").forEach(function (a) {
    a.href = "https://wa.me/" + WHATSAPP_NUMERO + "?text=" + encodeURIComponent("Olá! Gostaria de falar com a Lanchonete do Ruan.");
    a.target = "_blank"; a.rel = "noreferrer";
  });
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var alvo = document.querySelector(a.getAttribute("href"));
      if (alvo) { e.preventDefault(); alvo.scrollIntoView({ behavior: "smooth" }); }
    });
  });
  $("ano").textContent = new Date().getFullYear();
  updateBadges();
})();
