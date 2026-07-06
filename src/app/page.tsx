 "use client";

import Image from "next/image";
import { useMemo, useState } from "react";

const WHATSAPP_PHONE = "573217589300";

const categories = [
  {
    name: "Hombre",
    description: "Camisetas performance de ajuste atletico para entrenar.",
    image: "/munin/shirt-blue.jpeg",
  },
  {
    name: "Mujer",
    description: "Conjuntos de alto contraste para gimnasio y rutina diaria.",
    image: "/munin/women-red-front.jpeg",
  },
  {
    name: "Performance",
    description: "Tela fresca, costuras visibles y silueta de movimiento.",
    image: "/munin/shirt-gray.jpeg",
  },
];

const products = [
  {
    id: "shirt-blue",
    name: "Camiseta Azul Storm",
    color: "Azul acero",
    price: 89000,
    image: "/munin/shirt-blue.jpeg",
  },
  {
    id: "shirt-teal",
    name: "Camiseta Teal Pro",
    color: "Verde profundo",
    price: 89000,
    image: "/munin/shirt-teal.jpeg",
  },
  {
    id: "shirt-mint",
    name: "Camiseta Mint Flex",
    color: "Menta claro",
    price: 89000,
    image: "/munin/shirt-mint.jpeg",
  },
  {
    id: "shirt-rust",
    name: "Camiseta Rust Core",
    color: "Terracota",
    price: 89000,
    image: "/munin/shirt-rust.jpeg",
  },
  {
    id: "shirt-gray",
    name: "Camiseta Graphite",
    color: "Gris grafito",
    price: 89000,
    image: "/munin/shirt-gray.jpeg",
  },
  {
    id: "set-red-limits",
    name: "Set Red Limits",
    color: "Rojo intenso",
    price: 149000,
    image: "/munin/women-red-front.jpeg",
  },
];

const formatPrice = (price: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(price);

export default function Home() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartItems = useMemo(
    () =>
      products
        .filter((product) => cart[product.id])
        .map((product) => ({
          ...product,
          quantity: cart[product.id],
        })),
    [cart],
  );

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const orderMessage = useMemo(() => {
    const lines = cartItems
      .map(
        (item) =>
          `- ${item.quantity} x ${item.name} (${item.color}) - ${formatPrice(
            item.price * item.quantity,
          )}`,
      )
      .join("\n");

    return `Hola MUNIN, quiero completar este pedido:\n\n${lines}\n\nTotal: ${formatPrice(
      subtotal,
    )}\n\nQuedo pendiente para confirmar talla, disponibilidad y entrega.`;
  }, [cartItems, subtotal]);

  const whatsappHref = WHATSAPP_PHONE
    ? `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(orderMessage)}`
    : `https://wa.me/?text=${encodeURIComponent(orderMessage)}`;

  const addToCart = (productId: string) => {
    setCart((currentCart) => ({
      ...currentCart,
      [productId]: (currentCart[productId] ?? 0) + 1,
    }));
    setIsCartOpen(true);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart((currentCart) => {
      const nextCart = { ...currentCart };

      if (quantity <= 0) {
        delete nextCart[productId];
      } else {
        nextCart[productId] = quantity;
      }

      return nextCart;
    });
  };

  return (
    <main className="min-h-screen bg-[#f4f1ec] text-[#111111]">
      <header className="sticky top-0 z-30 border-b border-black/10 bg-[#f4f1ec]/95 backdrop-blur">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#" className="flex items-center gap-3">
            <span className="relative h-12 w-20 overflow-hidden rounded bg-white">
              <Image
                src="/munin/logo.jpeg"
                alt="Logo MUNIN"
                fill
                sizes="80px"
                className="object-contain p-1"
                priority
              />
            </span>
            <span className="text-xl font-black">MUNIN</span>
          </a>

          <div className="hidden items-center gap-8 text-sm font-bold uppercase md:flex">
            <a href="#coleccion" className="transition hover:text-[#c7252f]">
              Coleccion
            </a>
            <a href="#productos" className="transition hover:text-[#c7252f]">
              Productos
            </a>
            <a href="#lookbook" className="transition hover:text-[#c7252f]">
              Lookbook
            </a>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#productos"
              className="hidden h-11 items-center justify-center rounded border border-black/20 px-5 text-sm font-black uppercase transition hover:border-[#c7252f] hover:text-[#c7252f] sm:flex"
            >
              Comprar
            </a>
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="flex h-11 items-center justify-center rounded bg-[#111111] px-5 text-sm font-black uppercase text-white transition hover:bg-[#c7252f]"
            >
              Carrito ({cartCount})
            </button>
          </div>
        </nav>
      </header>

      <section className="mx-auto grid min-h-[calc(100svh-5rem)] max-w-7xl grid-cols-1 gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="max-w-2xl">
          <p className="mb-5 w-fit rounded bg-[#c7252f] px-3 py-2 text-xs font-black uppercase text-white">
            Never back down
          </p>
          <h1 className="text-5xl font-black leading-none sm:text-7xl lg:text-8xl">
            Ropa deportiva con caracter propio.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[#4b4b4b]">
            MUNIN combina ajuste atletico, prendas limpias y una imagen fuerte
            para entrenar sin perder estilo.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#productos"
              className="flex h-12 items-center justify-center rounded bg-[#111111] px-6 text-sm font-black uppercase text-white transition hover:bg-[#c7252f]"
            >
              Ver productos
            </a>
            <a
              href="#coleccion"
              className="flex h-12 items-center justify-center rounded border border-black/20 px-6 text-sm font-black uppercase transition hover:border-[#c7252f] hover:text-[#c7252f]"
            >
              Explorar linea
            </a>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-[1fr_0.72fr]">
          <div className="relative min-h-[520px] overflow-hidden rounded bg-[#111111]">
            <Image
              src="/munin/women-red-front.jpeg"
              alt="Conjunto rojo deportivo MUNIN"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
              priority
            />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded bg-white/90 p-4 text-sm font-black uppercase backdrop-blur">
              <span>Red Limits</span>
              <span>{formatPrice(149000)}</span>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="relative min-h-[252px] overflow-hidden rounded bg-white">
              <Image
                src="/munin/shirt-teal.jpeg"
                alt="Camiseta verde MUNIN"
                fill
                sizes="(min-width: 1024px) 28vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="flex min-h-[252px] flex-col justify-between rounded bg-[#111111] p-6 text-white">
              <Image
                src="/munin/logo.jpeg"
                alt="Logo MUNIN"
                width={180}
                height={120}
                className="w-36 rounded bg-white p-2"
              />
              <div>
                <p className="text-sm font-black uppercase text-[#ff565f]">
                  Nueva coleccion
                </p>
                <p className="mt-2 text-3xl font-black leading-none">
                  Break your limits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="coleccion"
        className="border-y border-black/10 bg-white px-5 py-16 sm:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-black uppercase text-[#c7252f]">
                Lineas principales
              </p>
              <h2 className="mt-2 text-3xl font-black sm:text-5xl">
                Entrena por categoria
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-[#5b5b5b]">
              Una estructura sencilla para que la tienda se entienda rapido:
              hombre, mujer y prendas performance.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {categories.map((category) => (
              <article
                key={category.name}
                className="group overflow-hidden rounded border border-black/10 bg-[#f4f1ec]"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#e8e4dc]">
                  <Image
                    src={category.image}
                    alt={`Linea ${category.name} MUNIN`}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-black">{category.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#5b5b5b]">
                    {category.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="productos" className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-black uppercase text-[#c7252f]">
              Catalogo
            </p>
            <h2 className="mt-2 text-3xl font-black sm:text-5xl">
              Productos destacados
            </h2>
          </div>
          <a
            href="#"
            className="w-fit rounded border border-black/20 px-5 py-3 text-sm font-black uppercase transition hover:border-[#c7252f] hover:text-[#c7252f]"
          >
            Ver todo
          </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.name}
              className="group rounded border border-black/10 bg-white p-3"
            >
              <div className="relative aspect-square overflow-hidden rounded bg-[#e8e4dc]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex items-start justify-between gap-3 px-1 py-4">
                <div>
                  <p className="text-xs font-black uppercase text-[#c7252f]">
                    {product.color}
                  </p>
                  <h3 className="mt-1 font-black">{product.name}</h3>
                </div>
                <p className="shrink-0 font-black">
                  {formatPrice(product.price)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => addToCart(product.id)}
                className="h-11 w-full rounded bg-[#111111] text-sm font-black uppercase text-white transition hover:bg-[#c7252f]"
              >
                Agregar
              </button>
            </article>
          ))}
        </div>
      </section>

      <section
        id="lookbook"
        className="bg-[#111111] px-5 py-16 text-white sm:px-8"
      >
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase text-[#ff565f]">
              Lookbook
            </p>
            <h2 className="mt-3 text-3xl font-black sm:text-5xl">
              La prenda se ve fuerte en movimiento.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-6 text-white/70">
              Esta seccion muestra como se comporta la marca en fotos de
              campana: contraste alto, gimnasio oscuro y rojo como acento.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="relative aspect-[3/4] overflow-hidden rounded bg-black">
              <Image
                src="/munin/women-red-front.jpeg"
                alt="Vista frontal conjunto rojo MUNIN"
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[3/4] overflow-hidden rounded bg-black">
              <Image
                src="/munin/women-red-back.jpeg"
                alt="Vista posterior conjunto rojo MUNIN"
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/55">
          <button
            type="button"
            aria-label="Cerrar carrito"
            className="absolute inset-0 h-full w-full cursor-default"
            onClick={() => setIsCartOpen(false)}
          />
          <aside className="absolute bottom-0 right-0 top-0 flex w-full max-w-md flex-col bg-[#f4f1ec] shadow-2xl sm:border-l sm:border-black/10">
            <div className="flex items-center justify-between border-b border-black/10 p-5">
              <div>
                <p className="text-xs font-black uppercase text-[#c7252f]">
                  Pedido MUNIN
                </p>
                <h2 className="text-2xl font-black">Carrito</h2>
              </div>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded bg-[#111111] text-lg font-black text-white transition hover:bg-[#c7252f]"
                aria-label="Cerrar carrito"
              >
                X
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {cartItems.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center rounded border border-black/10 bg-white p-8 text-center">
                  <p className="text-xl font-black">Tu carrito esta vacio</p>
                  <p className="mt-2 text-sm leading-6 text-[#5b5b5b]">
                    Agrega productos del catalogo para armar el pedido por
                    WhatsApp.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <article
                      key={item.id}
                      className="grid grid-cols-[84px_1fr] gap-3 rounded border border-black/10 bg-white p-3"
                    >
                      <div className="relative aspect-square overflow-hidden rounded bg-[#e8e4dc]">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="84px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-xs font-black uppercase text-[#c7252f]">
                              {item.color}
                            </p>
                            <h3 className="font-black">{item.name}</h3>
                          </div>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, 0)}
                            className="text-xs font-black uppercase text-[#5b5b5b] hover:text-[#c7252f]"
                          >
                            Quitar
                          </button>
                        </div>
                        <div className="mt-4 flex items-center justify-between gap-3">
                          <div className="flex h-10 overflow-hidden rounded border border-black/15 bg-[#f4f1ec]">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="flex w-10 items-center justify-center font-black transition hover:bg-white"
                              aria-label={`Restar ${item.name}`}
                            >
                              -
                            </button>
                            <span className="flex w-10 items-center justify-center text-sm font-black">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="flex w-10 items-center justify-center font-black transition hover:bg-white"
                              aria-label={`Sumar ${item.name}`}
                            >
                              +
                            </button>
                          </div>
                          <p className="font-black">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-black/10 bg-white p-5">
              <div className="mb-4 flex items-center justify-between text-lg font-black">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="grid gap-2">
                <a
                  href={cartItems.length ? whatsappHref : undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-disabled={!cartItems.length}
                  className={`flex h-12 items-center justify-center rounded text-sm font-black uppercase text-white transition ${
                    cartItems.length
                      ? "bg-[#25d366] hover:bg-[#1fb457]"
                      : "pointer-events-none bg-[#9c9c9c]"
                  }`}
                >
                  Pedir por WhatsApp
                </a>
                {cartItems.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setCart({})}
                    className="h-11 rounded border border-black/20 text-sm font-black uppercase transition hover:border-[#c7252f] hover:text-[#c7252f]"
                  >
                    Vaciar carrito
                  </button>
                )}
              </div>
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}
