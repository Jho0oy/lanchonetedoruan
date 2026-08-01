import { createFileRoute } from "@tanstack/react-router";
import heroBurger from "../assets/hero-burger.jpg";
import pastelImg from "../assets/pastel.jpg";
import pratoImg from "../assets/prato.jpg";
import bebidaImg from "../assets/bebida.jpg";
import logoAsset from "../assets/logo-ruan.png.asset.json";

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

const whatsappNumber = "5599991914230";
const whatsappMessage = "Olá! Quero fazer um pedido na Lanchonete do Ruan.";
const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  whatsappMessage,
)}`;

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <a href="/" className="flex items-center gap-3">
          <img
            src={logoAsset.url}
            alt="Lanchonete do Ruan"
            width={48}
            height={48}
            className="size-12 rounded-full object-contain"
            loading="eager"
          />
          <span className="hidden font-display text-lg tracking-wide text-foreground sm:block">
            DO RUAN
          </span>
        </a>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition-transform hover:scale-105 active:scale-95"
        >
          Pedir Agora
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-darker px-5 py-14 sm:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 sm:grid-cols-2 sm:gap-12">
        <div className="order-2 flex flex-col items-start sm:order-1">
          <span className="mb-3 inline-block rounded-full bg-primary/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
            Hamburgueria & Lanchonete
          </span>
          <h1 className="font-display text-4xl leading-[0.95] tracking-wide text-foreground sm:text-5xl lg:text-6xl">
            O SABOR QUE
            <br />
            <span className="text-primary">ACENDE A NOITE</span>
          </h1>
          <p className="mt-5 max-w-md text-base text-muted-foreground sm:text-lg">
            Hambúrguer artesanal na chapa, pastel crocante na hora, refeições
            completas e bebidas geladas. Tudo com o jeitinho do bairro.
          </p>
          <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground transition-transform hover:scale-105 active:scale-95"
            >
              <WhatsAppIcon className="size-5" />
              Fazer Pedido
            </a>
            <a
              href="#cardapio"
              className="inline-flex flex-1 items-center justify-center rounded-full border border-border bg-secondary px-6 py-3.5 text-sm font-bold text-secondary-foreground transition-colors hover:bg-muted"
            >
              Ver Cardápio
            </a>
          </div>
          <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <ClockIcon className="size-4 text-primary" />
              <span>Terça a Domingo</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPinIcon className="size-4 text-primary" />
              <span>Vila Maria, SP</span>
            </div>
          </div>
        </div>
        <div className="order-1 sm:order-2">
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-border bg-card shadow-2xl shadow-primary/10">
            <img
              src={heroBurger}
              alt="Hambúrguer artesanal duplo com queijo derretido, alface e tomate"
              width={1024}
              height={1024}
              className="h-full w-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
            <div className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow-lg">
              Mais Pedido
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const highlights = [
  {
    title: "HAMBÚRGUER ARTESANAL",
    description: "Blend 180g, pão brioche e molhos da casa.",
    image: heroBurger,
    alt: "Hambúrguer artesanal duplo com queijo derretido",
    price: "R$ 28",
  },
  {
    title: "PASTEL CROCANTE",
    description: "Massa sequinha com recheios generosos.",
    image: pastelImg,
    alt: "Pastel brasileiro recheado com carne e queijo",
    price: "R$ 12",
  },
  {
    title: "REFEIÇÕES COMPLETAS",
    description: "Arroz, feijão, proteína, fritas e salada.",
    image: pratoImg,
    alt: "Prato brasileiro com arroz, feijão, bife e salada",
    price: "R$ 32",
  },
  {
    title: "BEBIDAS GELADAS",
    description: "Refrigerantes, sucos naturais e cervejas.",
    image: bebidaImg,
    alt: "Copo de refrigerante gelado com cubos de gelo",
    price: "R$ 6",
  },
];

function Highlights() {
  return (
    <section className="px-5 py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-10 text-center font-display text-3xl tracking-wide text-foreground sm:text-4xl">
          OS DESTAQUES DA CASA
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
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
                  <h3 className="font-display text-lg tracking-wide text-foreground">
                    {item.title}
                  </h3>
                  <span className="rounded-md bg-primary/15 px-2 py-1 text-sm font-bold text-primary">
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
  { name: "X-BURGUER RUAN", description: "Hambúrguer 150g, queijo, alface, tomate e maionese da casa.", price: "R$ 24" },
  { name: "X-BACON SUPREMO", description: "Blend 180g, bacon crocante, cheddar e cebola caramelizada.", price: "R$ 32" },
  { name: "X-TUDO DO BAIRRO", description: "Hambúrguer, ovo, bacon, presunto, milho, ervilha e batata palha.", price: "R$ 35" },
  { name: "PASTEL DE CARNE COM QUEIJO", description: "Carne moída temperada, queijo e azeitona.", price: "R$ 12" },
  { name: "PASTEL DE FRANGO COM CATUPIRY", description: "Frango desfiado, catupiry cremoso e tempero verde.", price: "R$ 13" },
  { name: "PASTEL DE PALMITO", description: "Palmito com queijo e orégano.", price: "R$ 11" },
  { name: "PRATO DE ALCATRA", description: "Arroz, feijão, alcatra grelhada, fritas e salada.", price: "R$ 34" },
  { name: "PRATO DE FRANGO GRELHADO", description: "Arroz, feijão, frango temperado, fritas e salada.", price: "R$ 29" },
  { name: "PORÇÃO DE BATATA RÚSTICA", description: "Batatas fritas temperadas com páprica e alecrim.", price: "R$ 18" },
  { name: "PORÇÃO DE CALABRESA", description: "Calabresa acebolada com pimentão e limão.", price: "R$ 32" },
  { name: "SUCO NATURAL 500ML", description: "Laranja, limão, abacaxi com hortelã ou maracujá.", price: "R$ 10" },
  { name: "REFRIGERANTE LATA", description: "Coca-Cola, Guaraná, Fanta ou Sprite.", price: "R$ 6" },
];

function Menu() {
  return (
    <section id="cardapio" className="bg-brand-darker px-5 py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-10 text-center font-display text-3xl tracking-wide text-foreground sm:text-4xl">
          NOSSO CARDÁPIO
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {menuItems.map((item) => (
            <div
              key={item.name}
              className="flex flex-col justify-between rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/50"
            >
              <div>
                <div className="mb-1 flex items-start justify-between gap-2">
                  <h3 className="font-display text-base tracking-wide text-foreground">
                    {item.name}
                  </h3>
                  <span className="whitespace-nowrap font-bold text-primary">
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
    <section className="bg-background px-5 py-16">
      <div className="mx-auto grid max-w-6xl gap-10 rounded-3xl border border-border bg-card p-8 sm:grid-cols-2 sm:p-12">
        <div>
          <h2 className="mb-6 font-display text-3xl tracking-wide text-foreground sm:text-4xl">
            ONDE ESTAMOS
          </h2>
          <p className="mb-6 text-lg text-muted-foreground">
            Rua das Flores, 123 — Vila Maria, São Paulo - SP
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="mb-1 font-semibold uppercase tracking-wider text-primary">
                Terça a Sábado
              </h4>
              <p className="text-foreground">18h às 23h30</p>
            </div>
            <div>
              <h4 className="mb-1 font-semibold uppercase tracking-wider text-primary">
                Domingo
              </h4>
              <p className="text-foreground">17h às 22h</p>
            </div>
            <div>
              <h4 className="mb-1 font-semibold uppercase tracking-wider text-primary">
                Segunda
              </h4>
              <p className="text-foreground">Fechado</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-4">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-lg font-bold text-primary-foreground transition-transform hover:scale-105 active:scale-95"
          >
            <WhatsAppIcon className="size-6" />
            Chamar no WhatsApp
          </a>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Rua+das+Flores%2C+123%2C+São+Paulo%2C+SP"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-secondary px-6 py-4 text-lg font-bold text-secondary-foreground transition-colors hover:bg-muted"
          >
            <MapPinIcon className="size-6" />
            Ver no Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-brand-darker px-5 py-10">
      <div className="mx-auto max-w-6xl text-center">
        <p className="font-display text-2xl tracking-wider text-foreground">
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

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
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
