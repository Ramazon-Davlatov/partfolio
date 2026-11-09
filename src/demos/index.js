// Live sample sites shown in the Services dialog, one list per service (same order as t.services.items).
import { CoffeeLanding, SaasLanding, GymLanding, CourseLanding, PlovLanding } from './Landing'
import { DevPortfolio, PhotoPortfolio, DesignerPortfolio, WriterPortfolio } from './Portfolio'
import { TodoApp, ConverterApp, ShopApp, PomodoroApp } from './Apps'
import { NewsResponsive, StoreResponsive, HotelResponsive, ClinicResponsive } from './Responsive'
import { ScrollAnim, MicroAnim, PageAnim, TiltAnim } from './Animation'
import { TelegramApi, RatesApi, WeatherApi, GithubApi } from './Api'

const d = (C, url, uz, ru, duz, dru) => ({ C, url, name: { uz, ru }, desc: { uz: duz, ru: dru } })

export const DEMOS = [
  [
    d(CoffeeLanding, 'bodom-coffee.uz', 'Qahvaxona', 'Кофейня', 'Iliq ranglar, menyu va stol band qilish tugmasi.', 'Тёплые цвета, меню и кнопка бронирования столика.'),
    d(SaasLanding, 'hisobchi.app', 'SaaS / Fintech', 'SaaS / Финтех', 'Qorong‘i uslub, grafik va oylik/yillik narx almashinuvi.', 'Тёмный стиль, график и переключатель цен месяц/год.'),
    d(GymLanding, 'temir-gym.uz', 'Fitness zal', 'Фитнес-зал', 'Kuchli tipografiya va kunlar bo‘yicha interaktiv jadval.', 'Мощная типографика и интерактивное расписание по дням.'),
    d(CourseLanding, 'kodakademiya.uz', 'IT kurs', 'IT-курс', 'Jonli taymer, statistika va ro‘yxatdan o‘tish formasi.', 'Живой таймер, статистика и форма записи.'),
    d(PlovLanding, 'kohna-osh.uz', 'Osh markazi', 'Плов-центр', 'Milliy uslub, porsiya tanlash va narxni hisoblash.', 'Национальный стиль, выбор порций и расчёт цены.'),
  ],
  [
    d(DevPortfolio, 'aziz.dev', 'Dasturchi', 'Разработчик', 'Terminal uslubida, buyruqlar o‘zi yoziladi.', 'В стиле терминала, команды печатаются сами.'),
    d(PhotoPortfolio, 'malika.photo', 'Fotograf', 'Фотограф', 'Galereya — rasmni bosing, katta ochiladi.', 'Галерея — нажмите на фото, оно откроется крупно.'),
    d(DesignerPortfolio, 'dilnoza.design', 'Dizayner', 'Дизайнер', 'Yorqin ranglar va hover effektli ishlar ro‘yxati.', 'Яркие цвета и список работ с hover-эффектом.'),
    d(WriterPortfolio, 'jasur.blog', 'Yozuvchi / bloger', 'Писатель / блогер', 'Minimal, o‘qishga qulay va obuna formasi bilan.', 'Минимализм, удобное чтение и форма подписки.'),
  ],
  [
    d(TodoApp, 'todo.app', 'Vazifalar', 'Задачи', 'Qo‘shish, belgilash, o‘chirish va filtrlash — hammasi ishlaydi.', 'Добавление, отметка, удаление и фильтры — всё работает.'),
    d(ConverterApp, 'kurs.app', 'Valyuta konvertori', 'Конвертер валют', 'Summani kiriting — natija darhol hisoblanadi.', 'Введите сумму — результат считается мгновенно.'),
    d(ShopApp, 'gadjet.uz', 'Do‘kon savatchasi', 'Корзина магазина', 'Mahsulot qo‘shing, soni va jami summa yangilanadi.', 'Добавляйте товары — количество и сумма обновляются.'),
    d(PomodoroApp, 'focus.app', 'Pomodoro taymer', 'Помодоро-таймер', 'Ishlaydigan taymer, rejimlar va aylana progress.', 'Рабочий таймер, режимы и круговой прогресс.'),
  ],
  [
    d(NewsResponsive, 'kun.news', 'Yangiliklar portali', 'Новостной портал', 'Yuqoridagi tugmalar bilan ekran o‘lchamini almashtiring.', 'Меняйте размер экрана кнопками сверху.'),
    d(StoreResponsive, 'moda.uz', 'Onlayn do‘kon', 'Интернет-магазин', 'Telefonda 2 ustun, kompyuterda 3 ustun.', 'На телефоне 2 колонки, на ПК — 3.'),
    d(HotelResponsive, 'silkroad.hotel', 'Mehmonxona', 'Отель', 'Kompyuterda bron paneli yon tomonga o‘tadi.', 'На ПК панель бронирования уходит в сторону.'),
    d(ClinicResponsive, 'sogliqmed.uz', 'Klinika', 'Клиника', 'Shifokor kartalari ekranga qarab qayta joylashadi.', 'Карточки врачей перестраиваются под экран.'),
  ],
  [
    d(ScrollAnim, 'scroll.demo', 'Skroll effektlari', 'Скролл-эффекты', 'Ichkarida pastga skroll qiling — bloklar har xil kiradi.', 'Прокрутите вниз — блоки появляются по-разному.'),
    d(MicroAnim, 'micro.demo', 'Mikro-animatsiyalar', 'Микроанимации', 'Like, kalit, yuklash tugmasi va qo‘ng‘iroqcha.', 'Лайк, переключатель, кнопка загрузки и колокольчик.'),
    d(PageAnim, 'pages.demo', 'Sahifa o‘tishlari', 'Переходы страниц', 'Mobil ilovadagi kabi silliq sahifa almashinuvi.', 'Плавная смена экранов, как в мобильном приложении.'),
    d(TiltAnim, 'tilt.demo', '3D karta', '3D-карточка', 'Sichqonchani yurgizing — karta 3D aylanadi.', 'Двигайте мышью — карточка вращается в 3D.'),
  ],
  [
    d(TelegramApi, 't.me/oshmarkaz_bot', 'Telegram bot', 'Telegram-бот', 'Tugmalar bilan ishlaydigan buyurtma boti.', 'Бот для заказов с кнопками.'),
    d(RatesApi, 'kurs.uz/api', 'Valyuta kurslari', 'Курсы валют', 'Yuklanish holati va yangilash tugmasi bilan.', 'С состоянием загрузки и кнопкой обновления.'),
    d(WeatherApi, 'havo.uz', 'Ob-havo', 'Погода', 'Shaharni tanlang — ma’lumot yuklanadi.', 'Выберите город — данные загрузятся.'),
    d(GithubApi, 'api.github.com', 'GitHub qidiruv', 'Поиск GitHub', 'Login bo‘yicha profil qidirish va xatoni ko‘rsatish.', 'Поиск профиля по логину и обработка ошибок.'),
  ],
]
