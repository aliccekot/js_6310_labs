/* eslint-disable */
import { jest } from '@jest/globals';

// Mock модулей перед импортами
jest.unstable_mockModule('node-telegram-bot-api', () => ({
  default: jest.fn().mockImplementation(() => ({
    onText: jest.fn(),
    on: jest.fn(),
    sendMessage: jest.fn().mockResolvedValue({}),
    answerCallbackQuery: jest.fn().mockResolvedValue({}),
    startPolling: jest.fn()
  }))
}));

jest.unstable_mockModule('dotenv/config', () => ({}));

// Динамический импорт после моков
const {
  getProductsByCategory,
  getRecommendations,
  sendSafeMessage,
  handleInvalidMessage,
  mainMenuKeyboard,
  categoryKeyboard,
  styleKeyboard,
  sizeKeyboard,
  budgetKeyboard,
  default: runServer
} = await import('../src/server.js');

describe('Fashion Assistant Bot - Integration Tests', () => {
  let mockBot;
  let originalEnv;
  let botInstance;

  beforeAll(() => {
    originalEnv = { ...process.env };
    process.env.TELEGRAM_BOT_TOKEN = 'test-token-123';
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  beforeEach(() => {
    mockBot = {
      sendMessage: jest.fn().mockResolvedValue({ message_id: 1 }),
      onText: jest.fn(),
      on: jest.fn(),
      answerCallbackQuery: jest.fn().mockResolvedValue({}),
      startPolling: jest.fn()
    };
    
    // Создаем экземпляр бота для тестов
    botInstance = runServer();
  });

  // Вспомогательная функция для поиска обработчиков команд
  const findCommandHandler = (command) => {
    const calls = botInstance.onText.mock.calls;
    for (const [regex, handler] of calls) {
      if (regex.test(command)) {
        return handler;
      }
    }
    return null;
  };

  // Вспомогательная функция для поиска обработчиков событий
  const findEventHandler = (eventName) => {
    const calls = botInstance.on.mock.calls;
    for (const [event, handler] of calls) {
      if (event === eventName) {
        return handler;
      }
    }
    return null;
  };

  describe('Command Handlers', () => {
    test('/start command should send welcome message', () => {
      const handler = findCommandHandler('/start');
      expect(handler).toBeDefined();

      const mockMsg = { 
        chat: { id: 12345 },
        text: '/start'
      };
      
      handler(mockMsg);
      
      expect(botInstance.sendMessage).toHaveBeenCalledWith(
        12345,
        expect.stringContaining('Добро пожаловать'),
        mainMenuKeyboard
      );
    });

    test('/catalog command should show categories', () => {
      const handler = findCommandHandler('/catalog');
      expect(handler).toBeDefined();

      const mockMsg = { 
        chat: { id: 12345 },
        text: '/catalog'
      };
      
      handler(mockMsg);
      
      expect(botInstance.sendMessage).toHaveBeenCalledWith(
        12345,
        '🏪 Выберите категорию товаров:',
        categoryKeyboard
      );
    });

    test('/consult command should start consultation', () => {
      const handler = findCommandHandler('/consult');
      expect(handler).toBeDefined();

      const mockMsg = { 
        chat: { id: 12345 },
        text: '/consult'
      };
      
      handler(mockMsg);
      
      expect(botInstance.sendMessage).toHaveBeenCalledWith(
        12345,
        '🎨 Выберите предпочитаемый стиль:',
        styleKeyboard
      );
    });

    test('/help command should show help', () => {
      const handler = findCommandHandler('/help');
      expect(handler).toBeDefined();

      const mockMsg = { 
        chat: { id: 12345 },
        text: '/help'
      };
      
      handler(mockMsg);

      const sendMessageCalls = botInstance.sendMessage.mock.calls;
      const lastCall = sendMessageCalls[sendMessageCalls.length - 1];
      const actualText = lastCall[1];
      
      // Проверяем что текст содержит ключевые элементы помощи
      expect(actualText).toContain('🆘 Помощь по боту FashionAssistant2');
      expect(actualText).toContain('/catalog');
      expect(actualText).toContain('/consult');
      expect(actualText).toContain('Используйте кнопки меню');
      
      expect(botInstance.sendMessage).toHaveBeenCalledWith(
        12345,
        actualText,
        {}
      );
    });
  });

  describe('Callback Query Handlers', () => {
    let callbackHandler;

    beforeEach(() => {
      callbackHandler = findEventHandler('callback_query');
      expect(callbackHandler).toBeDefined();
    });

    test('category selection should show products', () => {
      const mockCallback = {
        id: 'test1',
        message: { chat: { id: 12345 } },
        data: 'category_men'
      };

      // Очищаем моки перед тестом
      botInstance.answerCallbackQuery.mockClear();
      botInstance.sendMessage.mockClear();

      callbackHandler(mockCallback);

      expect(botInstance.answerCallbackQuery).toHaveBeenCalledWith('test1');
  
      // Проверяем, что sendMessage был вызван хотя бы один раз
      expect(botInstance.sendMessage).toHaveBeenCalled();
  
      // Получаем все вызовы sendMessage и находим тот, который содержит "Мужская одежда"
      const sendMessageCalls = botInstance.sendMessage.mock.calls;
      const categoryCall = sendMessageCalls.find(call => 
        typeof call[1] === 'string' && call[1].includes('Мужская одежда')
      );
  
      expect(categoryCall).toBeDefined();
      expect(categoryCall[0]).toBe(12345); // chatId
      expect(categoryCall[1]).toContain('👔 Мужская одежда');
      expect(categoryCall[2]).toEqual({}); // options
    });

    test('style selection should ask for size', () => {
      const mockCallback = {
        id: 'test2',
        message: { chat: { id: 12345 } },
        data: 'style_classic'
      };

      callbackHandler(mockCallback);

      expect(botInstance.answerCallbackQuery).toHaveBeenCalledWith('test2');
      expect(botInstance.sendMessage).toHaveBeenCalledWith(
        12345,
        '📏 Выберите ваш размер:',
        sizeKeyboard
      );
    });

    test('size selection should ask for budget', () => {
      // Сначала устанавливаем стиль
      const styleCallback = {
        id: 'test2a',
        message: { chat: { id: 12345 } },
        data: 'style_classic'
      };
      callbackHandler(styleCallback);

      // Затем выбираем размер
      const mockCallback = {
        id: 'test3',
        message: { chat: { id: 12345 } },
        data: 'size_m'
      };

      callbackHandler(mockCallback);

      expect(botInstance.answerCallbackQuery).toHaveBeenCalledWith('test3');
      expect(botInstance.sendMessage).toHaveBeenCalledWith(
        12345,
        '💰 Выберите ваш бюджет:',
        budgetKeyboard
      );
    });

    test('budget selection should show recommendations', () => {
      // Проходим весь путь: стиль -> размер -> бюджет
      const styleCallback = {
        id: 'test4a',
        message: { chat: { id: 12345 } },
        data: 'style_classic'
      };
      callbackHandler(styleCallback);

      const sizeCallback = {
        id: 'test4b',
        message: { chat: { id: 12345 } },
        data: 'size_m'
      };
      callbackHandler(sizeCallback);

      const budgetCallback = {
        id: 'test4c',
        message: { chat: { id: 12345 } },
        data: 'budget_high'
      };

      callbackHandler(budgetCallback);

      expect(botInstance.answerCallbackQuery).toHaveBeenCalledWith('test4c');
      expect(botInstance.sendMessage).toHaveBeenCalledWith(
        12345,
        expect.stringContaining('Самый подходящий вариант'),
        {}
      );
    });

    test('unknown callback should show error', () => {
      const mockCallback = {
        id: 'test5',
        message: { chat: { id: 12345 } },
        data: 'unknown_callback'
      };

      callbackHandler(mockCallback);

      expect(botInstance.answerCallbackQuery).toHaveBeenCalledWith('test5');
      expect(botInstance.sendMessage).toHaveBeenCalledWith(
        12345,
        expect.stringContaining('Неизвестная команда'),
        mainMenuKeyboard
      );
    });
  });

  describe('Message Handlers', () => {
    let messageHandler;

    beforeEach(() => {
      messageHandler = findEventHandler('message');
      expect(messageHandler).toBeDefined();
    });

    test('menu button "Каталог" should show categories', () => {
      const mockMsg = {
        chat: { id: 12345 },
        text: '📁 Каталог'
      };

      messageHandler(mockMsg);

      expect(botInstance.sendMessage).toHaveBeenCalledWith(
        12345,
        '🏪 Выберите категорию товаров:',
        categoryKeyboard
      );
    });

    test('menu button "Консультация" should start consultation', () => {
      const mockMsg = {
        chat: { id: 12345 },
        text: '💬 Консультация'
      };

      messageHandler(mockMsg);

      expect(botInstance.sendMessage).toHaveBeenCalledWith(
        12345,
        '🎨 Выберите предпочитаемый стиль:',
        styleKeyboard
      );
    });

    test('menu button "Помощь" should show help', () => {
      const mockMsg = {
        chat: { id: 12345 },
        text: '🆘 Помощь'
      };

      messageHandler(mockMsg);

      const sendMessageCalls = botInstance.sendMessage.mock.calls;
      const lastCall = sendMessageCalls[sendMessageCalls.length - 1];
      const actualText = lastCall[1];

      // Проверяем ключевые элементы помощи - используем английские команды
      expect(actualText).toContain('🆘 Помощь по боту FashionAssistant2');

      expect(botInstance.sendMessage).toHaveBeenCalledWith(
        12345,
        actualText,
        {}
      );
    });

    test('unknown command should show error', () => {
      const mockMsg = {
        chat: { id: 12345 },
        text: '/unknown'
      };

      messageHandler(mockMsg);

      expect(botInstance.sendMessage).toHaveBeenCalledWith(
        12345,
        expect.stringContaining('Я не знаю такую команду'),
        mainMenuKeyboard
      );
    });

    test('invalid text message should be handled', () => {
      const mockMsg = {
        chat: { id: 12345 },
        text: 'random text message'
      };

      messageHandler(mockMsg);

      expect(botInstance.sendMessage).toHaveBeenCalledWith(
        12345,
        expect.stringContaining('Я не понимаю это сообщение'),
        expect.any(Object)
      );
    });
  });

  describe('Error Handling', () => {
    test('sendSafeMessage should handle bot errors', async () => {
      const errorBot = {
        sendMessage: jest.fn().mockRejectedValue(new Error('API error'))
      };

      // Мокаем console.error чтобы избежать вывода в консоль во время тестов
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      await sendSafeMessage(errorBot, 12345, 'Test message');
      expect(errorBot.sendMessage).toHaveBeenCalled();
      
      // Проверяем, что console.error был вызван с правильными аргументами
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error sending message to 12345:',
        'API error'
      );
      
      // Восстанавливаем оригинальный console.error
      consoleErrorSpy.mockRestore();
    });

    test('handleInvalidMessage should work without state', () => {
      // Мокаем console.error для этого теста
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      handleInvalidMessage(mockBot, 12345);
      expect(mockBot.sendMessage).toHaveBeenCalled();
      
      consoleErrorSpy.mockRestore();
    });

    test('recommendations with missing state should show error', () => {
      const callbackHandler = findEventHandler('callback_query');
      const mockCallback = {
        id: 'test6',
        message: { chat: { id: 12345 } },
        data: 'budget_high'
      };

      // Пытаемся выбрать бюджет без предварительного выбора стиля и размера
      callbackHandler(mockCallback);

      expect(botInstance.sendMessage).toHaveBeenCalledWith(
        12345,
        expect.stringContaining('❌ Сессия устарела'),
        {}
      );
    });
  });

  describe('Edge Cases', () => {
    test('empty category should return empty array', () => {
      const result = getProductsByCategory('nonexistent');
      expect(result).toEqual([]);
    });

    test('recommendations with no matches should return array', () => {
      const result = getRecommendations('nonexistent', 'XXXL', 'unknown');
      expect(Array.isArray(result)).toBe(true);
    });

    test('handle invalid size case', () => {
      const result = getRecommendations('classic', 'invalid_size', 'high');
      expect(Array.isArray(result)).toBe(true);
    });

    test('multiple callback queries should maintain state', () => {
      const callbackHandler = findEventHandler('callback_query');
      
      // Выбираем стиль
      callbackHandler({
        id: 'test7a',
        message: { chat: { id: 12345 } },
        data: 'style_sport'
      });

      // Выбираем размер
      callbackHandler({
        id: 'test7b',
        message: { chat: { id: 12345 } },
        data: 'size_l'
      });

      // Выбираем бюджет
      callbackHandler({
        id: 'test7c',
        message: { chat: { id: 12345 } },
        data: 'budget_medium'
      });

      expect(botInstance.sendMessage).toHaveBeenCalledWith(
        12345,
        expect.stringContaining('Самый подходящий вариант'),
        {}
      );
    });
  });

  describe('Utility Functions', () => {
    test('getProductsByCategory should return correct number of products', () => {
      const menProducts = getProductsByCategory('men');
      expect(menProducts.length).toBeGreaterThan(0);

      const womenProducts = getProductsByCategory('women');
      expect(womenProducts.length).toBeGreaterThan(0);

      const kidsProducts = getProductsByCategory('kids');
      expect(kidsProducts.length).toBeGreaterThan(0);
    });

    test('getRecommendations should return one product for exact match', () => {
      const recommendations = getRecommendations('classic', 'M', 'high');
      expect(recommendations).toHaveLength(1);
      expect(recommendations[0].style).toBe('classic');
    });

    test('sendSafeMessage should work with options', async () => {
      const options = { parse_mode: 'HTML' };
      await sendSafeMessage(mockBot, 12345, 'Test message', options);
      expect(mockBot.sendMessage).toHaveBeenCalledWith(12345, 'Test message', options);
    });
  });
});