import TelegramBot from 'node-telegram-bot-api';
import 'dotenv/config';

// Данные товаров - ДОБАВЛЕНО БОЛЬШЕ ТОВАРОВ ДЛЯ ВСЕХ КАТЕГОРИЙ
export const products = [
  // Мужская одежда
  {
    id: 1,
    name: 'Классический костюм',
    category: 'men',
    style: 'classic',
    description: 'Элегантный деловой костюм из итальянской шерсти',
    price: 15000,
    sizes: ['M', 'L', 'XL'],
    budget: 'high'
  },
  {
    id: 2,
    name: 'Спортивная куртка',
    category: 'men',
    style: 'sport',
    description: 'Легкая и удобная куртка для активного отдыха',
    price: 5000,
    sizes: ['S', 'M', 'L', 'XL'],
    budget: 'medium'
  },
  {
    id: 3,
    name: 'Повседневные джинсы',
    category: 'men',
    style: 'casual',
    description: 'Универсальные джинсы для повседневной носки',
    price: 3000,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    budget: 'low'
  },
  {
    id: 4,
    name: 'Рубашка офисная',
    category: 'men',
    style: 'classic',
    description: 'Классическая рубашка для делового стиля',
    price: 2500,
    sizes: ['S', 'M', 'L'],
    budget: 'low'
  },

  // Женская одежда
  {
    id: 5,
    name: 'Вечернее платье',
    category: 'women',
    style: 'classic',
    description: 'Элегантное вечернее платье для особых случаев',
    price: 12000,
    sizes: ['XS', 'S', 'M'],
    budget: 'high'
  },
  {
    id: 6,
    name: 'Спортивный костюм',
    category: 'women',
    style: 'sport',
    description: 'Комфортный спортивный костюм для тренировок',
    price: 6000,
    sizes: ['S', 'M', 'L'],
    budget: 'medium'
  },
  {
    id: 7,
    name: 'Повседневная блузка',
    category: 'women',
    style: 'casual',
    description: 'Стильная блузка для повседневной носки',
    price: 3500,
    sizes: ['XS', 'S', 'M', 'L'],
    budget: 'low'
  },
  {
    id: 8,
    name: 'Джинсы с высокой талией',
    category: 'women',
    style: 'casual',
    description: 'Модные джинсы с высокой талией',
    price: 4500,
    sizes: ['S', 'M', 'L'],
    budget: 'medium'
  },

  // Детская одежда
  {
    id: 9,
    name: 'Детский костюм',
    category: 'kids',
    style: 'classic',
    description: 'Стильный костюм для детей на торжества',
    price: 4000,
    sizes: ['S', 'M'],
    budget: 'medium'
  },
  {
    id: 10,
    name: 'Спортивный комплект для детей',
    category: 'kids',
    style: 'sport',
    description: 'Яркий спортивный комплект для активных детей',
    price: 2500,
    sizes: ['XS', 'S', 'M'],
    budget: 'low'
  },
  {
    id: 11,
    name: 'Повседневное платье для девочки',
    category: 'kids',
    style: 'casual',
    description: 'Красивое и удобное платье для повседневной носки',
    price: 2000,
    sizes: ['XS', 'S'],
    budget: 'low'
  },
  {
    id: 12,
    name: 'Джинсы для мальчика',
    category: 'kids',
    style: 'casual',
    description: 'Прочные джинсы для активных игр',
    price: 1800,
    sizes: ['S', 'M', 'L'],
    budget: 'low'
  }
];

// Клавиатуры (экспортируем для тестов)
export const mainMenuKeyboard = {
  reply_markup: {
    keyboard: [
      ['📁 Каталог', '💬 Консультация'],
      ['🆘 Помощь']
    ],
    resize_keyboard: true
  }
};

export const categoryKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: '👔 Мужская', callback_data: 'category_men' },
        { text: '👗 Женская', callback_data: 'category_women' }
      ],
      [
        { text: '👶 Детская', callback_data: 'category_kids' }
      ]
    ]
  }
};

export const styleKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: '👔 Классический', callback_data: 'style_classic' },
        { text: '🏃 Спортивный', callback_data: 'style_sport' }
      ],
      [
        { text: '😎 Casual', callback_data: 'style_casual' }
      ]
    ]
  }
};

export const sizeKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: 'XS', callback_data: 'size_xs' },
        { text: 'S', callback_data: 'size_s' },
        { text: 'M', callback_data: 'size_m' }
      ],
      [
        { text: 'L', callback_data: 'size_l' },
        { text: 'XL', callback_data: 'size_xl' },
        { text: 'XXL', callback_data: 'size_xxl' }
      ]
    ]
  }
};

export const budgetKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: '💰 До 5000 руб', callback_data: 'budget_low' },
        { text: '💵 5000-15000 руб', callback_data: 'budget_medium' }
      ],
      [
        { text: '💎 От 15000 руб', callback_data: 'budget_high' }
      ]
    ]
  }
};

// Вспомогательные функции - ЛОГИКА РЕКОМЕНДАЦИЙ С ОДНИМ ТОВАРОМ
export const getProductsByCategory = (category) => {
  const categoryProducts = products.filter(product => product.category === category);
  console.log(`Found ${categoryProducts.length} products for category: ${category}`);
  return categoryProducts;
};

export const getRecommendations = (style, size, budget) => {
  console.log(`Getting recommendations for: style=${style}, size=${size}, budget=${budget}`);
  
  // Приоритет 1: Точное совпадение по всем параметрам
  const exactMatches = products.filter(product => 
    product.style === style &&
    product.sizes.includes(size.toUpperCase()) &&
    product.budget === budget
  );

  if (exactMatches.length > 0) {
    console.log(`Found ${exactMatches.length} exact matches, returning the first one`);
    return [exactMatches[0]]; // Возвращаем только первый точный match
  }

  // Приоритет 2: Совпадение по стилю и размеру (любой бюджет)
  const styleSizeMatches = products.filter(product => 
    product.style === style &&
    product.sizes.includes(size.toUpperCase())
  );

  if (styleSizeMatches.length > 0) {
    console.log(`Found ${styleSizeMatches.length} style+size matches, returning the first one`);
    return [styleSizeMatches[0]]; // Возвращаем только первый match по стилю и размеру
  }

  // Приоритет 3: Совпадение только по стилю (любой размер и бюджет)
  const styleMatches = products.filter(product => product.style === style);

  if (styleMatches.length > 0) {
    console.log(`Found ${styleMatches.length} style matches, returning the first one`);
    return [styleMatches[0]]; // Возвращаем только первый match по стилю
  }

  console.log('No matches found');
  return []; // Ничего не найдено
};

// Функция для отправки сообщения с обработкой ошибок (экспортируем для тестов)
export const sendSafeMessage = (bot, chatId, text, options = {}) => {
  return bot.sendMessage(chatId, text, options)
      .catch(error => {
        console.error(`Error sending message to ${chatId}:`, error.message);
      });
};

// Функция для обработки некорректных сообщений (экспортируем для тестов)
export const handleInvalidMessage = (bot, chatId, userState = {}) => {
  const { step } = userState;
  
  let message = '❌ Я не понимаю это сообщение.\n\n';
  
  if (step === 'style_selection') {
    message += 'Пожалуйста, выберите стиль из предложенных вариантов выше 👆';
    sendSafeMessage(bot, chatId, message, styleKeyboard);
  } else if (step === 'size_selection') {
    message += 'Пожалуйста, выберите размер из предложенных вариантов выше 👆';
    sendSafeMessage(bot, chatId, message, sizeKeyboard);
  } else if (step === 'budget_selection') {
    message += 'Пожалуйста, выберите бюджет из предложенных вариантов выше 👆';
    sendSafeMessage(bot, chatId, message, budgetKeyboard);
  } else {
    message += 'Используйте кнопки меню или команды:\n\n';
    message += '📁 /catalog - Каталог товаров\n';
    message += '💬 /consult - Консультация\n';
    message += '🆘 /help - Помощь';
    sendSafeMessage(bot, chatId, message, mainMenuKeyboard);
  }
};

// Основная функция бота
const runServer = () => {
  const token = process.env.TELEGRAM_BOT_TOKEN;

  if (!token) {
    console.error('TELEGRAM_BOT_TOKEN is not defined in environment variables');
    process.exit(1);
  }

  console.log('Bot token found, starting bot...');

  // Создаем экземпляр бота
  const bot = new TelegramBot(token, { polling: true });

  // Хранилище состояний для каждого пользователя
  const userStates = new Map();

  const getUserState = (chatId) => {
    if (!userStates.has(chatId)) {
      userStates.set(chatId, {});
    }
    return userStates.get(chatId);
  };

  const updateUserState = (chatId, newState) => {
    const currentState = getUserState(chatId);
    userStates.set(chatId, { ...currentState, ...newState });
  };

  const clearUserState = (chatId) => {
    userStates.delete(chatId);
  };

  // Обработчик команды /start
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    console.log(`User ${chatId} started bot`);
    
    const welcomeText = `👋 Добро пожаловать в FashionAssistant2!

Я ваш персональный консультант по моде и стилю. Помогу подобрать идеальный образ!

✨ Что я умею:
• Показывать каталог товаров по категориям
• Подбирать самый подходящий вариант по стилю, размеру и бюджету

Выберите действие или используйте меню ниже:`;

    sendSafeMessage(bot, chatId, welcomeText, mainMenuKeyboard);
  });

  // Обработчик команды /catalog
  bot.onText(/\/catalog/, (msg) => {
    const chatId = msg.chat.id;
    console.log(`User ${chatId} opened catalog`);
    sendSafeMessage(bot, chatId, '🏪 Выберите категорию товаров:', categoryKeyboard);
  });

  // Обработчик команды /consult
  bot.onText(/\/consult/, (msg) => {
    const chatId = msg.chat.id;
    console.log(`User ${chatId} started consultation`);
    updateUserState(chatId, { step: 'style_selection' });
    sendSafeMessage(bot, chatId, '🎨 Выберите предпочитаемый стиль:', styleKeyboard);
  });

  // Обработчик команды /help
  bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    const helpText = `🆘 Помощь по боту FashionAssistant2

Доступные команды:
📁 /catalog - Просмотр каталога товаров по категориям
💬 /consult - Персональная консультация с подбором самого подходящего товара

Используйте кнопки меню для удобной навигации.`;
    sendSafeMessage(bot, chatId, helpText);
  });

  // Обработчик инлайн-кнопок
  bot.on('callback_query', (callbackQuery) => {
    const msg = callbackQuery.message;
    const data = callbackQuery.data;
    const chatId = msg.chat.id;

    console.log(`User ${chatId} pressed button: ${data}`);

    // Отвечаем на callback запрос
    bot.answerCallbackQuery(callbackQuery.id).catch(error => {
      console.error(`Error answering callback for ${chatId}:`, error.message);
    });

    if (data.startsWith('category_')) {
      // Обработка выбора категории
      const category = data.replace('category_', '');
      const categoryProducts = getProductsByCategory(category);

      if (categoryProducts.length === 0) {
        sendSafeMessage(bot, chatId, '😔 В этой категории пока нет товаров.');
        return;
      }

      const categoryNames = {
        men: '👔 Мужская одежда',
        women: '👗 Женская одежда',
        kids: '👶 Детская одежда'
      };

      let response = `${categoryNames[category]}\n\n`;
      categoryProducts.forEach((product, index) => {
        response += `${index + 1}. ${product.name}\n`;
        response += `   📝 ${product.description}\n`;
        response += `   💰 Цена: ${product.price} руб.\n`;
        response += `   📏 Размеры: ${product.sizes.join(', ')}\n\n`;
      });

      sendSafeMessage(bot, chatId, response);
    } else if (data.startsWith('style_')) {
      // Обработка выбора стиля
      const style = data.replace('style_', '');
      updateUserState(chatId, { 
        style, 
        step: 'size_selection' 
      });
      sendSafeMessage(bot, chatId, '📏 Выберите ваш размер:', sizeKeyboard);
    } else if (data.startsWith('size_')) {
      // Обработка выбора размера
      const size = data.replace('size_', '');
      updateUserState(chatId, { 
        size, 
        step: 'budget_selection' 
      });
      sendSafeMessage(bot, chatId, '💰 Выберите ваш бюджет:', budgetKeyboard);
    } else if (data.startsWith('budget_')) {
      // Обработка выбора бюджета и формирование рекомендаций
      const budget = data.replace('budget_', '');
      const userState = getUserState(chatId);
      const { style, size } = userState;

      if (!style || !size) {
        sendSafeMessage(bot, chatId, '❌ Сессия устарела. Начните консультацию заново с помощью команды /consult.');
        clearUserState(chatId);
        return;
      }

      const recommendations = getRecommendations(style, size, budget);

      if (recommendations.length === 0) {
        sendSafeMessage(bot, chatId, '😔 К сожалению, по вашим критериям не найдено подходящих товаров.\nПопробуйте изменить параметры поиска.');
        clearUserState(chatId);
        return;
      }

      // Выводим только один самый подходящий товар
      const product = recommendations[0];
      let response = '🎯 Самый подходящий вариант для вас:\n\n';
      response += `✨ ${product.name}\n`;
      response += `📝 ${product.description}\n`;
      response += `💰 Цена: ${product.price} руб.\n`;
      response += `📏 Доступные размеры: ${product.sizes.join(', ')}\n\n`;
      response += '💫 Идеально соответствует вашим предпочтениям!';

      sendSafeMessage(bot, chatId, response);
      clearUserState(chatId);
    } else {
      // Неизвестный callback_data
      console.log(`User ${chatId} sent unknown callback: ${data}`);
      sendSafeMessage(bot, chatId, '❌ Неизвестная команда. Пожалуйста, используйте кнопки меню.', mainMenuKeyboard);
    }
  });

  // Обработка текстовых сообщений
  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    // Игнорируем команды (они обрабатываются отдельно)
    if (text && text.startsWith('/')) {
      // Если команда не обработана предыдущими обработчиками, покажем подсказку
      if (text !== '/start' && text !== '/catalog' && text !== '/consult' && text !== '/help') {
        console.log(`User ${chatId} sent unknown command: ${text}`);
        const unknownCommandText = `🤔 Я не знаю такую команду: ${text}

Но вот что я умею:
📁 /catalog - Показать каталог товаров
💬 /consult - Найти самый подходящий товар
🆘 /help - Получить помощь

Используйте кнопки меню для быстрого доступа к функциям!`;
        sendSafeMessage(bot, chatId, unknownCommandText, mainMenuKeyboard);
      }
      return;
    }

    // Игнорируем служебные сообщения (новые участники и т.д.)
    if (msg.new_chat_members || msg.left_chat_member || msg.group_chat_created) {
      return;
    }

    console.log(`User ${chatId} sent text: "${text}"`);

    const userState = getUserState(chatId);

    // Обработка корректных текстовых команд из главного меню
    if (text === '📁 Каталог') {
      sendSafeMessage(bot, chatId, '🏪 Выберите категорию товаров:', categoryKeyboard);
    } else if (text === '💬 Консультация') {
      updateUserState(chatId, { step: 'style_selection' });
      sendSafeMessage(bot, chatId, '🎨 Выберите предпочитаемый стиль:', styleKeyboard);
    } else if (text === '🆘 Помощь') {
      const helpText = `🆘 Помощь по боту FashionAssistant2

📁 Каталог - просмотр товаров по категориям
💬 Консультация - подбор самого подходящего товара

Используйте кнопки меню для навигации.`;
      sendSafeMessage(bot, chatId, helpText);
    } else if (text) {
      // Некорректное сообщение (не команда и не кнопка меню)
      console.log(`User ${chatId} sent invalid message: "${text}"`);
      handleInvalidMessage(bot, chatId, userState);
    }
  });

  // Обработка ошибок бота
  bot.on('error', (error) => {
    console.error('Bot error:', error.message);
  });

  bot.on('polling_error', (error) => {
    console.error('Polling error:', error.message);
    
    // Если ошибка критическая, пытаемся перезапустить бота
    if (error.code === 'EFATAL') {
      console.error('Fatal polling error, bot might need restart');
    }
  });

  console.log('Бот запущен ...');
  return bot;
};

export default runServer;