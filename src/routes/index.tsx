import { createFileRoute } from "@tanstack/react-router";
import heroBurger from "../assets/hero-burger.jpg";
import pastelImg from "../assets/pastel.jpg";
import pratoImg from "../assets/prato.jpg";
import bebidaImg from "../assets/bebida.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lanchonete do Ruan — Hambúrguer, Pastel e Muito Mais" },
      {
        name: "description",
        content:
          "Hambúrguer artesanal, pastel crocante, refeições completas e bebidas geladas na Lanchonete do Ruan. Faça seu pedido pelo WhatsApp.",
      },
      { property: "og:title", content: "Lanchonete do Ruan" },
      {
        property: "og:description",
        content:
          "O sabor do bairro: hambúrguer, pastel, pratos feitos e bebidas. Peça agora pelo WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const whatsappNumber = "5511999999999";
const whatsappMessage = "Olá! Quero fazer um pedido na Lanchonete do Ruan.";
const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  whatsappMessage,
)}`;

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
        <a href="/" className="flex flex-col leading-none">
          <span className="font-display text-2xl tracking-wider text-brand">
            LANCHONETE DO RUAN
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Hamburgueria · Pastelaria · Refeições
          </span>
        </a>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="hidden rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground transition-transform hover:scale-105 active:scale-95 sm:inline-flex"
        >
          Pedir no WhatsApp
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-dark px-5 py-12 text-brand-foreground sm:py-20">
      <div className="mx-auto grid max-w-5xl items-center gap-8 sm:grid-cols-2 sm:gap-12">
        <div className="order-2 sm:order-1">
          <span className="mb-3 inline-block rounded-full bg-brand-gold px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-dark">
            Desde 2012 no bairro
          </span>
          <h1 className="font-display text-5xl leading-[0.9] tracking-wide sm:text-6xl">
            O SABOR DA
            <br />
            <span className="text-brand-gold">NOSSA ESQUINA</span>
          </h1>
          <p className="mt-5 max-w-md text-base text-white/80 sm:text-lg">
            Hambúrguer artesanal na chapa, pastel crocante na hora, pratos feitos
            com carinho e bebidas geladas.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-bold text-brand-foreground transition-transform hover:scale-105 active:scale-95"
            >
              Fazer Pedido
            </a>
            <a
              href="#cardapio"
              className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/20"
            >
              Ver Cardápio
            </a>
          </div>
        </div>
        <div className="order-1 sm:order-2">
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-brand-gold/20 shadow-2xl">
            <img
              src={heroBurger}
              alt="Hambúrguer artesanal duplo com queijo derretido, alface e tomate"
              width={1024}
              height={1024}
              className="h-full w-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

const highlights = [
  {
    title: "Hambúrguer Artesanal",
    description: "Blend 180g, pão brioche e molhos da casa.",
    image: heroBurger,
    alt: "Hambúrguer artesanal duplo com queijo derretido",
    price: "R$ 28",
  },
  {
    title: "Pastel Crocante",
    description: "Massa sequinha com recheios generosos.",
    image: pastelImg,
    alt: "Pastel brasileiro recheado com carne e queijo",
    price: "R$ 12",
  },
  {
    title: "Refeições Completas",
    description: "Arroz, feijão, proteína, fritas e salada.",
    image: pratoImg,
    alt: "Prato brasileiro com arroz, feijão, bife e salada",
    price: "R$ 32",
  },
  {
    title: "Bebidas Geladas",
    description: "Refrigerantes, sucos naturais e cervejas.",
    image: bebidaImg,
    alt: "Copo de refrigerante gelado com cubos de gelo",
    price: "R$ 6",
  },
];

function Highlights() {
  return (
    <section className="px-5 py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-10 text-center font-display text-4xl tracking-wide text-foreground">
          OS DESTAQUES DA CASA
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="group overflow-hidden rounded-2xl bg-card shadow-sm transition-transform hover:-translate-y-1"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.alt}
                  width={600}
                  height={450}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <div className="mb-2 flex items-start justify-between">
                  <h3 className="font-display text-xl tracking-wide text-foreground">
                    {item.title}
                  </h3>
                  <span className="rounded-md bg-brand-gold/20 px-2 py-1 text-sm font-bold text-brand-dark">
                    {item.price}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const menuItems = [
  { name: "X-Burguer Ruan", description: "Hambúrguer 150g, queijo, alface, tomate e maionese da casa.", price: "R$ 24" },
  { name: "X-Bacon Supremo", description: "Blend 180g, bacon crocante, cheddar e cebola caramelizada.", price: "R$ 32" },
  { name: "X-Tudo do Bairro", description: "Hambúrguer, ovo, bacon, presunto, milho, ervilha e batata palha.", price: "R$ 35" },
  { name: "Pastel de Carne com Queijo", description: "Carne moída temperada, queijo e azeitona.", price: "R$ 12" },
  { name: "Pastel de Frango com Catupiry", description: "Frango desfiado, catupiry cremoso e tempero verde.", price: "R$ 13" },
  { name: "Pastel de Palmito", description: "Palmito com queijo e orégano.", price: "R$ 11" },
  { name: "Prato de Alcatra", description: "Arroz, feijão, alcatra grelhada, fritas e salada.", price: "R$ 34" },
  { name: "Prato de Frango Grelhado", description: "Arroz, feijão, frango temperado, fritas e salada.", price: "R$ 29" },
  { name: "Porção de Batata Rústica", description: "Batatas fritas temperadas com páprica e alecrim.", price: "R$ 18" },
  { name: "Porção de Calabresa", description: "Calabresa acebolada com pimentão e limão.", price: "R$ 32" },
  { name: "Suco Natural 500ml", description: "Laranja, limão, abacaxi com hortelã ou maracujá.", price: "R$ 10" },
  { name: "Refrigerante Lata", description: "Coca-Cola, Guaraná, Fanta ou Sprite.", price: "R$ 6" },
];

function Menu() {
  return (
    <section id="cardapio" className="bg-secondary px-5 py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-10 text-center font-display text-4xl tracking-wide text-foreground">
          NOSSO CARDÁPIO
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {menuItems.map((item) => (
            <div
              key={item.name}
              className="flex flex-col justify-between rounded-xl bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div>
                <div className="mb-1 flex items-start justify-between gap-2">
                  <h3 className="font-display text-lg tracking-wide text-foreground">
                    {item.name}
                  </h3>
                  <span className="whitespace-nowrap font-bold text-brand">
                    {item.price}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Location() {
  return (
    <section className="bg-brand-dark px-5 py-16 text-brand-foreground">
      <div className="mx-auto grid max-w-5xl gap-10 sm:grid-cols-2">
        <div>
          <h2 className="mb-6 font-display text-4xl tracking-wide">
            ONDE ESTAMOS
          </h2>
          <p className="mb-6 text-lg text-white/80">
            Rua das Flores, 123 — Vila Maria, São Paulo - SP
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="mb-1 font-semibold uppercase tracking-wider text-white/60">
                Terça a Sábado
              </h4>
              <p>18h às 23h30</p>
            </div>
            <div>
              <h4 className="mb-1 font-semibold uppercase tracking-wider text-white/60">
                Domingo
              </h4>
              <p>17h às 22h</p>
            </div>
            <div>
              <h4 className="mb-1 font-semibold uppercase tracking-wider text-white/60">
                Segunda
              </h4>
              <p>Fechado</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-4">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-4 text-lg font-bold text-white transition-transform hover:scale-105 active:scale-95"
          >
            <WhatsAppIcon className="size-5" />
            Chamar no WhatsApp
          </a>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Rua+das+Flores%2C+123%2C+São+Paulo%2C+SP"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-4 text-lg font-semibold text-white transition-colors hover:bg-white/20"
          >
            <MapPinIcon className="size-5" />
            Ver no Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-background px-5 py-10">
      <div className="mx-auto max-w-5xl text-center">
        <p className="font-display text-3xl tracking-wider text-brand">
          LANCHONETE DO RUAN
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Feito com carinho no bairro desde 2012.
        </p>
        <p className="mt-4 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Lanchonete do Ruan. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function Index() {
  return (
    <div className="flex min-h-screen flex-col font-body">
      <Header />
      <main className="flex-1">
        <Hero />
        <Highlights />
        <Menu />
        <Location />
      </main>
      <Footer />
    </div>
  );
}
