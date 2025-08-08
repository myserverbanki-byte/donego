// /src/data/checklists.js
export const defaultChecklists = [
  {
    id: "lc_travel_sea",
    title: "🌍 Путешествие: Сборы в поездку",
    category: "Путешествия",
    tasks: [
      { id: "t1", text: "Паспорт, билеты, бронирование отеля", done: false },
      { id: "t2", text: "Деньги, карты, страховка", done: false },
      { id: "t3", text: "Зарядки и павербанк", done: false },
      { id: "t4", text: "Одежда по погоде", done: false },
      { id: "t5", text: "Лекарства и аптечка", done: false },
      { id: "t6", text: "Гигиенические принадлежности", done: false },
      { id: "t7", text: "Документы для визы / страховки", done: false }
    ]
  },
  {
    id: "lc_travel_beach",
    title: "🏖 Чемодан для пляжного отдыха",
    category: "Путешествия",
    tasks: [
      { id: "t1", text: "Купальник / плавки", done: false },
      { id: "t2", text: "Полотенце для пляжа", done: false },
      { id: "t3", text: "Солнцезащитный крем", done: false },
      { id: "t4", text: "Солнцезащитные очки и головной убор", done: false },
      { id: "t5", text: "Лёгкая обувь", done: false },
      { id: "t6", text: "Набор для подводного плавания", done: false },
      { id: "t7", text: "Фотоаппарат / GoPro", done: false }
    ]
  },
  {
    id: "lc_shopping_week",
    title: "🛒 Покупки на неделю",
    category: "Быт",
    tasks: [
      { id: "t1", text: "Молоко, яйца, хлеб", done: false },
      { id: "t2", text: "Мясо / рыба", done: false },
      { id: "t3", text: "Овощи и фрукты", done: false },
      { id: "t4", text: "Крупы и макароны", done: false },
      { id: "t5", text: "Масло, специи, соусы", done: false },
      { id: "t6", text: "Чай / кофе", done: false },
      { id: "t7", text: "Моющие средства", done: false }
    ]
  },
  {
    id: "lc_cleaning",
    title: "🧹 Генеральная уборка квартиры",
    category: "Быт",
    tasks: [
      { id: "t1", text: "Собрать и выкинуть мусор", done: false },
      { id: "t2", text: "Протереть пыль", done: false },
      { id: "t3", text: "Пропылесосить полы и ковры", done: false },
      { id: "t4", text: "Вымыть полы", done: false },
      { id: "t5", text: "Почистить кухонные поверхности", done: false },
      { id: "t6", text: "Вымыть сантехнику", done: false },
      { id: "t7", text: "Проветрить комнаты", done: false }
    ]
  },
  {
    id: "lc_moving",
    title: "📦 Переезд: обязательные шаги",
    category: "Быт",
    tasks: [
      { id: "t1", text: "Упаковать вещи в коробки и подписать", done: false },
      { id: "t2", text: "Заказать транспорт или грузчиков", done: false },
      { id: "t3", text: "Перенести документы и ценные вещи отдельно", done: false },
      { id: "t4", text: "Перенести электронику и провода", done: false },
      { id: "t5", text: "Проверить оставленную квартиру", done: false },
      { id: "t6", text: "Подключить интернет и электричество на новом месте", done: false }
    ]
  },
  {
    id: "lc_event",
    title: "🎉 Организация мероприятия",
    category: "Работа",
    tasks: [
      { id: "t1", text: "Определить формат и дату", done: false },
      { id: "t2", text: "Составить список участников", done: false },
      { id: "t3", text: "Забронировать место", done: false },
      { id: "t4", text: "Подготовить сценарий / план", done: false },
      { id: "t5", text: "Организовать питание и напитки", done: false },
      { id: "t6", text: "Подготовить раздаточные материалы", done: false },
      { id: "t7", text: "Настроить технику", done: false }
    ]
  },
  {
    id: "lc_first_day",
    title: "💼 Первый день на новой работе",
    category: "Работа",
    tasks: [
      { id: "t1", text: "Принести необходимые документы", done: false },
      { id: "t2", text: "Познакомиться с коллегами", done: false },
      { id: "t3", text: "Настроить рабочее место", done: false },
      { id: "t4", text: "Получить доступы к системам", done: false },
      { id: "t5", text: "Ознакомиться с планом задач", done: false },
      { id: "t6", text: "Обсудить цели с руководителем", done: false }
    ]
  },
  {
    id: "lc_morning",
    title: "🌅 Утренний рутин",
    category: "Личное",
    tasks: [
      { id: "t1", text: "Встать и заправить кровать", done: false },
      { id: "t2", text: "Выпить стакан воды", done: false },
      { id: "t3", text: "Сделать лёгкую зарядку", done: false },
      { id: "t4", text: "Принять душ", done: false },
      { id: "t5", text: "Позавтракать", done: false },
      { id: "t6", text: "Проверить план на день", done: false }
    ]
  },
  {
    id: "lc_interview",
    title: "📝 Подготовка к собеседованию",
    category: "Работа",
    tasks: [
      { id: "t1", text: "Изучить компанию", done: false },
      { id: "t2", text: "Подготовить ответы на частые вопросы", done: false },
      { id: "t3", text: "Подготовить вопросы к работодателю", done: false },
      { id: "t4", text: "Выбрать и приготовить одежду", done: false },
      { id: "t5", text: "Распечатать резюме", done: false },
      { id: "t6", text: "Проверить технику (если онлайн)", done: false }
    ]
  }
];
