import { useState } from "react";

const BOOKING_URL = "https://functions.poehali.dev/4743a1d5-4bb2-46ab-b888-c7cf4f24cf16";

function BookingModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: "", phone: "", date: "", guests: "", comment: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(BOOKING_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 9999,
        display: "flex", alignItems: "center", justifyContent: "center", padding: "20px",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div style={{
        background: "var(--bg)", border: "var(--border)", boxShadow: "var(--shadow)",
        padding: "40px", maxWidth: "500px", width: "100%", position: "relative",
      }}>
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: "15px", right: "15px", background: "none",
            border: "none", fontSize: "24px", cursor: "pointer", fontWeight: 800,
          }}
        >×</button>

        {status === "success" ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🍷</div>
            <h3 style={{ fontFamily: "Unbounded, sans-serif", fontSize: "24px", marginBottom: "12px" }}>
              ЗАЯВКА ПРИНЯТА!
            </h3>
            <p style={{ color: "#666" }}>Мы свяжемся с вами в ближайшее время для подтверждения брони.</p>
            <button className="btn-cta" style={{ marginTop: "24px", background: "var(--primary)", color: "white" }} onClick={onClose}>
              Закрыть
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h3 style={{ fontFamily: "Unbounded, sans-serif", fontSize: "22px", marginBottom: "24px", textTransform: "uppercase" }}>
              Забронировать стол
            </h3>
            {[
              { name: "name", placeholder: "Ваше имя *", required: true },
              { name: "phone", placeholder: "Телефон *", required: true },
              { name: "date", placeholder: "Дата и время (например: 25 мая, 19:00)" },
              { name: "guests", placeholder: "Количество гостей" },
            ].map((field) => (
              <input
                key={field.name}
                name={field.name}
                placeholder={field.placeholder}
                required={field.required}
                value={form[field.name as keyof typeof form]}
                onChange={handleChange}
                style={{
                  width: "100%", padding: "12px 16px", border: "var(--border)",
                  background: "white", fontFamily: "Montserrat, sans-serif",
                  fontWeight: 600, fontSize: "14px", marginBottom: "12px", display: "block",
                }}
              />
            ))}
            <textarea
              name="comment"
              placeholder="Комментарий (пожелания, повод)"
              value={form.comment}
              onChange={handleChange}
              rows={3}
              style={{
                width: "100%", padding: "12px 16px", border: "var(--border)",
                background: "white", fontFamily: "Montserrat, sans-serif",
                fontWeight: 600, fontSize: "14px", marginBottom: "20px",
                display: "block", resize: "vertical",
              }}
            />
            {status === "error" && (
              <p style={{ color: "var(--primary)", fontWeight: 700, marginBottom: "12px" }}>
                Ошибка отправки. Попробуйте ещё раз или позвоните нам.
              </p>
            )}
            <button
              className="btn-cta"
              type="submit"
              disabled={status === "loading"}
              style={{ background: "var(--primary)", color: "white", width: "100%" }}
            >
              {status === "loading" ? "Отправляем..." : "Отправить заявку"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function Index() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {showModal && <BookingModal onClose={() => setShowModal(false)} />}
      <div className="grain-overlay" />

      <header className="header">
        <div className="logo">БАРХАТНЫЙ*ДВОРЕЦ</div>
        <nav>
          <a href="#">Меню</a>
          <a href="#">О нас</a>
          <a href="#">Атмосфера</a>
          <a href="#">Контакты</a>
        </nav>
        <button className="btn-cta" onClick={() => setShowModal(true)}>Забронировать</button>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">
              ВКУС
              <br />
              ГРУЗИИ <span>в сердце</span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl mb-8 md:mb-10 leading-relaxed text-[#555]">
              Настоящая грузинская кухня с теплом домашнего очага. Хинкали, мцвади, вино из Кахетии — всё как у бабушки в Тбилиси.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
              <button className="btn-cta" style={{ background: "var(--primary)", color: "white" }} onClick={() => setShowModal(true)}>
                Забронировать стол
              </button>
              <button className="btn-cta" style={{ background: "white" }}>
                Смотреть меню
              </button>
            </div>
          </div>
          <div className="hero-img">
            <div className="sticker">
              СВЕЖЕЕ
              <br />
              КАЖДЫЙ ДЕНЬ
            </div>
            <div className="floating-tag hidden md:block" style={{ top: "20%", left: "10%" }}>
              #ГРУЗИЯ
            </div>
            <div className="floating-tag hidden md:block" style={{ bottom: "30%", right: "20%" }}>
              ГАМАРДЖОБА
            </div>
          </div>
        </section>

        <div className="marquee">
          <div className="marquee-content">
            &nbsp; * ХИНКАЛИ КАК В ТБИЛИСИ * ВИНО ИЗ КАХЕТИИ * МЦВАДИ НА ЖИВОМ ОГНЕ * ОТКРЫТЫ ДО 23:00 * НАСТОЯЩАЯ ГРУЗИЯ *
            ХИНКАЛИ КАК В ТБИЛИСИ * ВИНО ИЗ КАХЕТИИ * МЦВАДИ НА ЖИВОМ ОГНЕ * ОТКРЫТЫ ДО 23:00 * НАСТОЯЩАЯ ГРУЗИЯ
          </div>
        </div>

        <section className="section-padding">
          <div className="section-header">
            <h2 className="section-title">ВЫБОР ШЕФА</h2>
            <a
              href="#"
              className="text-sm md:text-base"
              style={{ color: "var(--dark)", fontWeight: 800, textTransform: "uppercase" }}
            >
              Всё меню
            </a>
          </div>

          <div className="menu-grid">
            {/* Item 1 */}
            <div className="menu-card">
              <span className="menu-tag">Хит продаж</span>
              <img
                src="https://cdn.poehali.dev/projects/8c6705c4-71ae-4c99-9829-acba1c79f502/files/ded20837-22ca-4aaa-b864-2fa93d1f1567.jpg"
                alt="Хинкали"
              />
              <div className="menu-card-body">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <h3>Хинкали с мясом</h3>
                  <span className="price">650 ₽</span>
                </div>
                <p style={{ fontSize: "14px", color: "#666" }}>
                  Сочные хинкали с говядиной и свининой, зеленью и пряностями по старинному тбилисскому рецепту.
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="menu-card">
              <span className="menu-tag" style={{ background: "var(--secondary)" }}>
                Со огня
              </span>
              <img
                src="https://cdn.poehali.dev/projects/8c6705c4-71ae-4c99-9829-acba1c79f502/files/165b0ad0-8dc0-4281-94ce-0bcecf91d76c.jpg"
                alt="Мцвади"
              />
              <div className="menu-card-body">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <h3>Мцвади</h3>
                  <span className="price">1 200 ₽</span>
                </div>
                <p style={{ fontSize: "14px", color: "#666" }}>Шашлык из телятины на живом огне с зеленью, луком и гранатом.</p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="menu-card">
              <span className="menu-tag" style={{ background: "var(--accent)", color: "var(--dark)" }}>
                Популярное
              </span>
              <img
                src="https://cdn.poehali.dev/projects/8c6705c4-71ae-4c99-9829-acba1c79f502/files/84d580ec-1bf5-4594-bc5a-bee40ad92736.jpg"
                alt="Вино Кахетия"
              />
              <div className="menu-card-body">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <h3>Вино Кахети</h3>
                  <span className="price">900 ₽</span>
                </div>
                <p style={{ fontSize: "14px", color: "#666" }}>
                  Домашнее красное вино из Кахетии, выдержанное в традиционных квеври. Насыщенный вкус и аромат.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="retro-vibe">
          <div>
            <h2 className="vibe-title">АТМОСФЕРА ДВОРЦА.</h2>
            <p className="vibe-text">
              Мы не просто кормим — мы переносим вас в Грузию. Живая музыка, тёплый свет свечей, деревянные своды и запах специй. Каждый вечер здесь — как праздник в кругу семьи. Стол накроем и расскажем историю каждого блюда.
            </p>
            <button className="btn-cta" style={{ background: "var(--dark)", color: "white", borderColor: "white" }}>
              Наша история
            </button>
          </div>
          <div className="vibe-img"></div>
        </section>

        <section className="section-padding">
          <h2 className="section-title" style={{ marginBottom: "40px", textAlign: "center" }}>
            @BARKHATNYI.DVORETS
          </h2>
          <div className="social-grid">
            <div className="social-item">
              <img
                src="https://cdn.poehali.dev/projects/8c6705c4-71ae-4c99-9829-acba1c79f502/files/4cf2233c-ffa3-4223-a480-0c1e4c23c1e1.jpg"
                alt="Атмосфера"
              />
            </div>
            <div className="social-item">
              <img
                src="https://cdn.poehali.dev/projects/8c6705c4-71ae-4c99-9829-acba1c79f502/files/ded20837-22ca-4aaa-b864-2fa93d1f1567.jpg"
                alt="Хинкали"
              />
            </div>
            <div className="social-item">
              <img
                src="https://cdn.poehali.dev/projects/8c6705c4-71ae-4c99-9829-acba1c79f502/files/165b0ad0-8dc0-4281-94ce-0bcecf91d76c.jpg"
                alt="Мцвади"
              />
            </div>
            <div className="social-item">
              <img
                src="https://cdn.poehali.dev/projects/8c6705c4-71ae-4c99-9829-acba1c79f502/files/84d580ec-1bf5-4594-bc5a-bee40ad92736.jpg"
                alt="Вино"
              />
            </div>
          </div>
        </section>

        <section className="section-padding" style={{ borderTop: "var(--border)", padding: 0 }}>
          <div style={{ padding: "40px 20px 0" }}>
            <h2 className="section-title" style={{ marginBottom: "30px", textAlign: "center" }}>КАК НАС НАЙТИ</h2>
            <p style={{ textAlign: "center", fontWeight: 700, fontSize: "18px", marginBottom: "20px", textTransform: "uppercase" }}>
              Москва, Дубравная улица, д. 39
            </p>
          </div>
          <iframe
            src="https://yandex.ru/map-widget/v1/?text=Москва%2C+Дубравная+улица+39&z=16&l=map"
            width="100%"
            height="400"
            style={{ border: "none", borderTop: "var(--border)", display: "block" }}
            allowFullScreen
            title="Карта"
          />
        </section>
      </main>

      <footer>
        <div>
          <div className="footer-logo">БАРХАТНЫЙ*ДВОРЕЦ</div>
          <p style={{ color: "#666", lineHeight: 1.6 }}>
            Грузинский ресторан с душой. Настоящие рецепты, живое вино и тепло Кавказа — с 2024 года в вашем городе.
          </p>
        </div>
        <div className="footer-links">
          <h4>Навигация</h4>
          <ul>
            <li>
              <a href="#" style={{ color: "inherit", textDecoration: "none" }}>
                Меню
              </a>
            </li>
            <li>
              <a href="#" style={{ color: "inherit", textDecoration: "none" }}>
                О нас
              </a>
            </li>
            <li>
              <a href="#" style={{ color: "inherit", textDecoration: "none" }}>
                Политика
              </a>
            </li>
            <li>
              <a href="#" style={{ color: "inherit", textDecoration: "none" }}>
                Контакты
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>Часы работы</h4>
          <ul>
            <li>Пн–Чт: 12:00–23:00</li>
            <li>Пт–Сб: 12:00–01:00</li>
            <li>Вс: 12:00–22:00</li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>Контакты</h4>
          <ul>
            <li>Москва, Дубравная ул., 39</li>
            <li><a href="tel:+79013697851" style={{ color: "inherit", textDecoration: "none" }}>8 (901) 369-78-51</a></li>
            <li>
              <a href="https://t.me/o_5ks" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>
                Telegram
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}