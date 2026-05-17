import { useState } from "react";

const MENU = {
  "Хинкали": [
    { name: "Хинкали с говядиной и свининой", desc: "Классические тбилисские хинкали с сочной начинкой и ароматным бульоном внутри", price: "650 ₽", tag: "Хит" },
    { name: "Хинкали с грибами", desc: "Нежные хинкали с лесными грибами и зеленью — для вегетарианцев", price: "580 ₽", tag: null },
    { name: "Хинкали с сыром сулугуни", desc: "Хинкали с тянущимся сулугуни и свежей мятой", price: "600 ₽", tag: null },
    { name: "Хинкали с бараниной", desc: "Хинкали по горскому рецепту с бараниной, луком и специями", price: "720 ₽", tag: "Новинка" },
  ],
  "Хачапури": [
    { name: "Хачапури по-аджарски", desc: "Открытая лодочка с сулугуни, яйцом и сливочным маслом — классика Батуми", price: "780 ₽", tag: "Хит" },
    { name: "Хачапури по-имеретински", desc: "Круглый хачапури с нежным имеретинским сыром внутри", price: "650 ₽", tag: null },
    { name: "Хачапури по-мегрельски", desc: "Хачапури с сыром и сверху, и внутри — двойное удовольствие", price: "720 ₽", tag: null },
    { name: "Хачапури с картофелем", desc: "Сытный хачапури с картошкой и сыром, обжаренный на сковороде", price: "590 ₽", tag: null },
  ],
  "Горячее": [
    { name: "Мцвади (шашлык из телятины)", desc: "Шашлык из молодой телятины на живом огне, с гранатом и свежей зеленью", price: "1 200 ₽", tag: "С огня" },
    { name: "Чахохбили из курицы", desc: "Тушёная курица в томатном соусе с чесноком, кинзой и грузинскими специями", price: "890 ₽", tag: null },
    { name: "Оджахури", desc: "Жареное мясо с картофелем и овощами на кеци — традиционной глиняной сковороде", price: "980 ₽", tag: "Популярное" },
    { name: "Чанахи", desc: "Томлёная баранина с баклажанами, картофелем и томатами в горшочке", price: "1 050 ₽", tag: null },
  ],
  "Закуски": [
    { name: "Пхали ассорти", desc: "Пять видов пхали: шпинат, свёкла, морковь, фасоль и баклажан с орехами", price: "490 ₽", tag: null },
    { name: "Баклажаны с орехами", desc: "Тонкие ломтики баклажана с ореховой начинкой, чесноком и зеленью", price: "420 ₽", tag: "Популярное" },
    { name: "Лобиани", desc: "Пирог с острой фасолью и беконом, жаренный на масле", price: "380 ₽", tag: null },
    { name: "Аджапсандали", desc: "Тёплое рагу из баклажанов, перца, томатов и специй", price: "450 ₽", tag: null },
  ],
  "Напитки": [
    { name: "Вино Кахети красное", desc: "Домашнее красное вино из Кахетии, выдержанное в квеври. Насыщенный вкус", price: "900 ₽", tag: "Популярное" },
    { name: "Вино Кахети белое", desc: "Янтарное белое вино с фруктовыми нотами — идеально к рыбе и сыру", price: "850 ₽", tag: null },
    { name: "Лимонад тархун", desc: "Домашний лимонад с эстрагоном и лимоном — освежающий и ароматный", price: "290 ₽", tag: null },
    { name: "Чай с чабрецом", desc: "Горный чай с чабрецом, мёдом и лимоном — согревает душу", price: "220 ₽", tag: null },
  ],
};

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

function MenuSection() {
  const [activeTab, setActiveTab] = useState(Object.keys(MENU)[0]);
  const items = MENU[activeTab as keyof typeof MENU];
  return (
    <section className="section-padding" id="menu">
      <div className="section-header">
        <h2 className="section-title">НАШЕ МЕНЮ</h2>
      </div>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "40px" }}>
        {Object.keys(MENU).map((tab) => (
          <button
            key={tab}
            className="btn-cta"
            onClick={() => setActiveTab(tab)}
            style={{
              background: activeTab === tab ? "var(--primary)" : "white",
              color: activeTab === tab ? "white" : "var(--dark)",
              fontSize: "13px",
            }}
          >
            {tab}
          </button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}>
        {items.map((item) => (
          <div
            key={item.name}
            style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "20px 24px", border: "var(--border)", background: "white",
              boxShadow: "4px 4px 0 var(--dark)", gap: "16px",
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px", flexWrap: "wrap" }}>
                <h3 style={{ fontSize: "16px", fontWeight: 800, textTransform: "uppercase" }}>{item.name}</h3>
                {item.tag && (
                  <span className="menu-tag" style={{ position: "static", fontSize: "11px", padding: "2px 10px" }}>
                    {item.tag}
                  </span>
                )}
              </div>
              <p style={{ fontSize: "14px", color: "#666" }}>{item.desc}</p>
            </div>
            <span className="price" style={{ whiteSpace: "nowrap", flexShrink: 0 }}>{item.price}</span>
          </div>
        ))}
      </div>
    </section>
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
          <a href="#menu">Меню</a>
          <a href="#about">О нас</a>
          <a href="#atmosphere">Атмосфера</a>
          <a href="#contacts">Контакты</a>
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

        <MenuSection />

        <section className="retro-vibe" id="atmosphere">
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

        <section className="section-padding" style={{ borderTop: "var(--border)" }}>
          <h2 className="section-title" style={{ marginBottom: "40px", textAlign: "center" }}>ГОСТИ О НАС</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px" }}>
            {[
              { name: "Анна К.", city: "Москва", text: "Хинкали — лучшие, что я пробовала в Москве. Тесто тонкое, бульон внутри сочный, специи прямо как в Тбилиси. Обязательно вернёмся!", stars: 5 },
              { name: "Михаил Р.", city: "Москва", text: "Отмечали день рождения. Оджахури на кеци, вино из Кахетии и живая музыка вечером — всё было на высшем уровне. Персонал внимательный и очень душевный.", stars: 5 },
              { name: "Елена В.", city: "Подмосковье", text: "Хачапури по-аджарски просто тают во рту. Атмосфера тёплая, уютная — чувствуешь себя как в гостях у грузинской семьи. Рекомендую всем друзьям!", stars: 5 },
              { name: "Дмитрий С.", city: "Москва", text: "Чанахи в горшочке — невероятно ароматное. Порции большие, цены адекватные. Стали ходить сюда каждую пятницу — уже как домой.", stars: 5 },
            ].map((review) => (
              <div
                key={review.name}
                style={{
                  padding: "24px", border: "var(--border)", background: "white",
                  boxShadow: "4px 4px 0 var(--dark)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px", flexWrap: "wrap", gap: "8px" }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: "16px", textTransform: "uppercase" }}>{review.name}</div>
                    <div style={{ fontSize: "13px", color: "#888" }}>{review.city}</div>
                  </div>
                  <div style={{ color: "var(--accent)", fontSize: "20px", filter: "brightness(0.7)" }}>
                    {"★".repeat(review.stars)}
                  </div>
                </div>
                <p style={{ fontSize: "15px", color: "#444", lineHeight: 1.6, fontStyle: "italic" }}>«{review.text}»</p>
              </div>
            ))}
          </div>
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

        <section className="section-padding" id="contacts" style={{ borderTop: "var(--border)", padding: 0 }}>
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
              <a href="#menu" style={{ color: "inherit", textDecoration: "none" }}>
                Меню
              </a>
            </li>
            <li>
              <a href="#atmosphere" style={{ color: "inherit", textDecoration: "none" }}>
                О нас
              </a>
            </li>
            <li>
              <a href="#" style={{ color: "inherit", textDecoration: "none" }}>
                Политика
              </a>
            </li>
            <li>
              <a href="#contacts" style={{ color: "inherit", textDecoration: "none" }}>
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