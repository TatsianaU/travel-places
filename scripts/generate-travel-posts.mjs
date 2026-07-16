import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DB_PATH = resolve(__dirname, '..', 'db.json')
const TOTAL_POSTS = 2000

let seed = 13

function random() {
  seed = (seed * 23434) % 34324325435
  return seed / 34324325435
}

function pick(items) {
  return items[Math.floor(random() * items.length)]
}

function int(min, max) {
  return Math.floor(random() * (max - min + 1)) + min
}

const CATEGORIES = ['nature', 'city', 'food', 'culture', 'beach', 'mountains']

const PLACES = [
  { city: 'Барселона', country: 'Испания' },
  { city: 'Киото', country: 'Япония' },
  { city: 'Лиссабон', country: 'Португалия' },
  { city: 'Рейкьявик', country: 'Исландия' },
  { city: 'Прага', country: 'Чехия' },
  { city: 'Венеция', country: 'Италия' },
  { city: 'Сантьяго', country: 'Чили' },
  { city: 'Куско', country: 'Перу' },
  { city: 'Бангкок', country: 'Таиланд' },
  { city: 'Стамбул', country: 'Турция' },
  { city: 'Марракеш', country: 'Марокко' },
  { city: 'Берген', country: 'Норвегия' },
  { city: 'Канны', country: 'Франция' },
  { city: 'Дубровник', country: 'Хорватия' },
  { city: 'Ханой', country: 'Вьетнам' },
  { city: 'Каир', country: 'Египет' },
  { city: 'Кейптаун', country: 'ЮАР' },
  { city: 'Квинстаун', country: 'Новая Зеландия' },
  { city: 'Загреб', country: 'Хорватия' },
  { city: 'Тбилиси', country: 'Грузия' },
  { city: 'Бали', country: 'Индонезия' },
  { city: 'Порту', country: 'Португалия' },
  { city: 'Зальцбург', country: 'Австрия' },
  { city: 'Эдинбург', country: 'Шотландия' },
]

const TITLE_TEMPLATES = {
  nature: ['Дикая природа рядом с {city}', 'Тропы и закаты: {city}', 'Зелёные маршруты {city}'],
  city: ['Один день в городе {city}', 'Прогулка по {city}', '{city} без туристов'],
  food: ['Где вкусно поесть в {city}', 'Гастрономический гид по {city}', 'Уличная еда {city}'],
  culture: ['Музеи и история {city}', 'Культурный {city}', 'Что посмотреть в {city}'],
  beach: ['Лучшие пляжи рядом с {city}', 'Море и солнце: {city}', 'Пляжный отдых в {city}'],
  mountains: ['Горные виды у {city}', 'Восхождение рядом с {city}', 'Перевалы и тропы {city}'],
}

const EXCERPT_TEMPLATES = [
  'Короткая заметка о поездке: что понравилось, чего ожидать и сколько брать на дорогу.',
  'Подборка мест, которые стоит увидеть, если у вас всего пара дней.',
  'Личные впечатления и пара лайфхаков, как сэкономить время в очередях.',
  'Рассказываю маршрут по часам — удобно повторить самостоятельно.',
  'Делюсь любимыми точками: кафе, смотровые и тихие дворы вдали от толпы.',
  'Что взять с собой, когда и куда идти за лучшими видами и кадрами.',
]

const AUTHORS = ['Аня Петрова', 'Игорь Соколов', 'Мария Ким', 'Дмитрий Орлов', 'Лена Васина', 'Павел Громов', 'Ольга Нид', 'Сергей Лав']

const CATEGORY_WORD = {
  nature: 'природе',
  city: 'городе',
  food: 'еде',
  culture: 'культуре',
  beach: 'пляжах',
  mountains: 'горах',
}

function buildPost(index) {
  const place = pick(PLACES)
  const category = pick(CATEGORIES)
  const title = pick(TITLE_TEMPLATES[category]).replace('{city}', place.city)
  const baseTime = Date.parse('2026-07-01T12:00:00.000Z')
  const createdAt = new Date(baseTime - int(0, 730) * 24 * 60 * 60 * 1000).toISOString()

  return {
    id: `tp-${String(index).padStart(5, '0')}`,
    title,
    city: place.city,
    country: place.country,
    category,
    excerpt: `${pick(EXCERPT_TEMPLATES)} Больше о ${CATEGORY_WORD[category]} - внутри.`,
    author: pick(AUTHORS),
    likes: int(0, 999),
    readingTime: int(1, 12),
    createdAt,
  }
}

const travelPosts = Array.from({ length: TOTAL_POSTS }, (_, i) => buildPost(i + 1))
const db = JSON.parse(readFileSync(DB_PATH, 'utf-8'))
db.travelPosts = travelPosts
writeFileSync(DB_PATH, `${JSON.stringify(db, null, 2)}\n`, 'utf-8')

console.log(`Сгенерировано ${travelPosts.length} записей travelPosts в db.json`)
