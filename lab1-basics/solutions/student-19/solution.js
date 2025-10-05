// ===== ЗАДАНИЕ 1: Базовые операции =====
function simpleTask() {
    // 1.1 Объявите переменные разных типов (не менне 5)
    // 1.2 Выведите типы всех переменных
const num = 5
const str = "tiyfvgvig"
const bool = true
let u
const obj = {
    name: "alice",
    age: 22
}
console.log(typeof num);
console.log(typeof str);
console.log(typeof bool);
console.log(typeof u);
console.log(typeof obj);
}
 

// ===== ЗАДАНИЕ 2: Функции =====
function getReviewerNumber(number, lab) {
    // 2.1 Функция определяющая номер ревьюера для вашей группы по вашему номеру и номеру лабораторной работы
// Проверка что оба параметра являются числами
    if (typeof number !== 'number' || typeof lab !== 'number') {
        return 'Ошибка: оба параметра должны быть числами';
    }
    
    // Проверка что оба параметра положительные
    if (number <= 0 || lab <= 0) {
        return 'Ошибка: номер студента и лабораторной работы должны быть положительными числами';
    }
    
    // Проверка что оба параметра целые числа
    if (!Number.isInteger(number) || !Number.isInteger(lab)) {
        return 'Ошибка: номер студента и лабораторной работы должны быть целыми числами';
    }
    
    // Проверка что номер студента не превышает 23
    if (number > 23) {
        return 'Ошибка: номер студента не должен превышать 23';
    }
    
    // Расчет номера ревьюера
    let res = (number + lab - 1) % 23 + 1;
    return res;
    
}

     
function getVariant(number, variants) {
    // 2.2 Функция определяющая номер варианта, исходя из количества вариантов
    
    if (typeof number !== 'number' || typeof variants !== 'number') {
        return 'Ошибка: оба параметра должны быть числами';
    }
    
    if (!Number.isInteger(number) || !Number.isInteger(variants)) {
        return 'Ошибка: оба параметра должны быть целыми числами';
    }
    
    if (number <= 0 || variants <= 0) {
        return 'Ошибка: оба параметра должны быть положительными числами';
    }
    const variant = ((number - 1) % variants + 1);
    return variant;
}


function calculate(a, b, operation) {
    // 2.3 Напишите функцию калькулятор, калькулятор обрабатывает следующие операции: +, -, *, /
     if ((typeof a !== 'number') || (typeof b !== 'number' || isNaN(a) || isNaN(b))) {
        return "Оба параметра должны быть числами"}

    if(operation == "+"){
        return a + b;
    }
    else if(operation == "-"){
        return a - b;
    }
    else if(operation == "*"){
        return a * b;
    }
    else if(operation == "/"){
        if(b == 0){
            return "Делить на ноль нельзя";
        }
        return a / b;
    }
    else{
        return "Неизвестная операция";
    }
}


function calculateArea(figure, ...params) {
    // 2.4 Напишите функцию для определения площади фигур 'circle', 'rectangle', 'triangle'
    // Используйте switch.
// Проверка на тип фигуры
    if (typeof figure !== 'string') {
        return 'Ошибка: первый параметр должен быть строкой (circle, rectangle, triangle)';
    }
    
    // Проверка что все параметры - числа
    for (let i = 0; i < params.length; i++) {
        if (typeof params[i] !== 'number' || isNaN(params[i])) {
            return 'Ошибка: все параметры должны быть числами';
        }
        if (params[i] <= 0) {
            return 'Ошибка: все параметры должны быть положительными числами';
        }
    }
    
    switch (figure.toLowerCase()) {
        case 'circle':
            // Проверка количества параметров для круга
            if (params.length !== 1) {
                return 'Ошибка: для круга нужен 1 параметр (радиус), передано: ' + params.length;
            }
            return Math.PI * params[0] * params[0];
            
        case 'rectangle':
            // Проверка количества параметров для прямоугольника
            if (params.length !== 2) {
                return 'Ошибка: для прямоугольника нужны 2 параметра (длина и ширина), передано: ' + params.length;
            }
            return params[0] * params[1];
            
        case 'triangle':
            // Проверка количества параметров для треугольника
            if (params.length !== 2) {
                return 'Ошибка: для треугольника нужны 2 параметра (основание и высота), передано: ' + params.length;
            }
            return 0.5 * params[0] * params[1];
            
        default:
            return 'Ошибка: неизвестная фигура. Используйте: circle, rectangle, triangle';
    }
}

// 2.5 Стрелочные функции
const reverseString = (str) => {
    // Функция возвращает перевернутую строку
let reversed = '';
    if (typeof(str) === "string"){
        for (let i = str.length - 1; i >= 0; i--) {
        reversed += str[i];
    }
     return reversed;
    }
    return "Ошибка: можно передавать только строки";
   
};



const getRandomNumber = (min, max) => {
    // Проверка на количество аргументов
   
    // Проверка на тип данных (числа)
    if (typeof min !== 'number' || typeof max !== 'number') {
        throw new TypeError('Оба параметра должны быть числами');
    }
    
    // min не должен быть больше max
    if (min > max) {
        throw new Error('Минимальное значение не может быть больше максимального');
    }
    // Функция возвращает случайное число между min и max (включительно)
    // Math.random() возвращает число от 0 (включительно) до 1 (исключительно)
    // Умножаем на (max - min + 1) чтобы покрыть весь диапазон
    // Добавляем min для смещения в нужный диапазон
    return Math.floor(Math.random() * (max - min + 1)) + min;
};


// ===== ЗАДАНИЕ 3: Объекты =====
const book = {
    // 3.1 Создайте объект "книга" с полями для хранения заголовка, автора, 
    // года выпуска, количества страниц, и доступности
    // объект должен иметь два метода getInfo возвращает одной строкой информацию о названии книги, аторе, годе выпуска, количестве страниц
    // метод toggleAvailability - который меняет значение доступности и возвращает его
    title: '1984',
    author: 'Дж.Оруэлл',
    year: 1947,
    pages: 200,
    available: true,

    getInfo: function() { 
        return `${this.title}, ${this.author}, ${this.year}, ${this.pages}`;
    },

    toggleAvailability: function() {
        this.available = !this.available;
        return this.available;
    }
};

const student = {
    // 3.2 Реализуйте методы объекта "студент" 
    name: "Анна Петрова",
    age: 20,
    course: 2,
    grades: {
        math: 90,
        programming: 95,
        history: 85
    },
    
    // Метод для расчета среднего балла
    getAverageGrade() {
        // Ваш код здесь
        let sum = 0;
        let count = 0;
        for (let subject in this.grades){
            sum+= this.grades[subject];
            count ++;
        }
      
        
        return sum / count;
    },
    
    // Метод для добавления новой оценки
    addGrade(subject, grade) {
        // Ваш код здесь
      
        if (typeof subject !== 'string' || subject.trim() === '') {
        return 'Ошибка: название предмета должно быть непустой строкой';
    }
    
    if (typeof grade !== 'number' || isNaN(grade)) {
        return 'Ошибка: оценка должна быть числом';
    }
    
    // Проверка на диапазон оценки
    if (grade < 1 || grade > 100) {
        return 'Ошибка: оценка должна быть в диапазоне от 1 до 100';
    }
    
    // Проверка на целое число (если требуется)
    if (!Number.isInteger(grade)) {
        return 'Ошибка: оценка должна быть целым числом';
    }
    
    // Если все проверки пройдены, добавляем оценку
    this.grades[subject] = grade;
    return `Оценка ${grade} по предмету "${subject}" успешно добавлена`;
    
    }
};


// ===== ЗАДАНИЕ 4: Массивы =====
function processArrays() {
    const numbers = [12, 45, 23, 67, 34, 89, 56, 91, 27, 14];
    const words = ["JavaScript", "программирование", "массив", "функция", "объект"];
    const users = [
        { id: 1, name: "Анна", age: 25, isActive: true },
        { id: 2, name: "Борис", age: 30, isActive: false },
        { id: 3, name: "Виктория", age: 22, isActive: true },
        { id: 4, name: "Григорий", age: 35, isActive: true },
        { id: 5, name: "Дарья", age: 28, isActive: false }
    ];
    
    // 1. Используйте forEach для вывода всех чисел больше 50
    console.log("Числа больше 50:");
    numbers.forEach(function(number) {
        if (number > 50) {
            console.log(number);
        }
    });
    // 2. Используйте map для создания массива квадратов чисел
    /*const squares =  ваш код */
    const squares = numbers.map(function(number) {
        return number * number;
    });
console.log(squares);

    // 3. Используйте filter для получения активных пользователей
    /*const activeUsers =  ваш код */
    const activeUsers = users.filter(function(user) {
        return user.isActive === true;
    });
    console.log(activeUsers);

    // 4. Используйте find для поиска пользователя с именем "Виктория"
    /*const victoria =  ваш код */
const victoria = users.find(function(user) {
        return user.name === "Виктория";
    });
    console.log(victoria);
    // 5. Используйте reduce для подсчета суммы всех чисел
    /*const sum =  ваш код */
    const sum = numbers.reduce(function(total, number) {
        return total + number;
    }, 0);
    console.log(sum);

    // 6. Используйте sort для сортировки пользователей по возрасту (по убыванию)
    /*const sortedByAge =  ваш код */
const sortedByAge = users.sort(function(a, b) {
    return b.age - a.age;
});
console.log(sortedByAge);

    // 7. Используйте метод для проверки, все ли пользователи старше 18 лет
    /*const allAdults =  ваш код */
    const allAdults = users.every(function(user) {
    return user.age > 18;
});
console.log(allAdults);

    // 8. Создайте цепочку методов: 
    //    - отфильтровать активных пользователей
    //    - преобразовать в массив имен
    //    - отсортировать по алфавиту
    /*const activeUserNames =  ваш код */
    const activeUserNames = users.filter(user => user.isActive).map(user => user.name).sort();
    console.log(activeUserNames);
}



// ===== ЗАДАНИЕ 5: Менеджер задач =====
const taskManager = {
    tasks: [
        { id: 1, title: "Изучить JavaScript", completed: false, priority: "high" },
        { id: 2, title: "Сделать лабораторную работу", completed: true, priority: "high" },
        { id: 3, title: "Прочитать книгу", completed: false, priority: "medium" }
    ],
    
    addTask(title, priority = "medium") {
        // 5.1 Добавление задачи
        const newTask = {
            id: this.tasks.length > 0 ? Math.max(...this.tasks.map(task => task.id)) + 1 : 1,
        title: title,
        completed: false,
        priority: priority
    };
    this.tasks.push(newTask);
    return `Задача "${newTask.title}" с ID ${newTask.id} добавлена (приоритет: ${priority})`;
    },

    completeTask(taskId) {
        // 5.2 Отметка выполнения
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            task.completed = true;
            return `Задача "${task.title}" выполнена`;
        }
        return `Задача с ID ${taskId} не найдена`;
    },

    // Удаление задачи
    deleteTask(taskId) {
        // 5.3 Ваш код здесь
        const initialLength = this.tasks.length;
        this.tasks = this.tasks.filter(task => task.id !== taskId);

        if (this.tasks.length < initialLength) {
            return `Задача с ID ${taskId} удалена`;
        }
        return `Задача с ID ${taskId} не найдена`;
    },

    // Получение списка задач по статусу
    getTasksByStatus(completed) {
        // 5.4 Ваш код здесь
        return this.tasks.filter(task => task.completed === completed);
    },

    getStats() {
        /* 5.5 Статистика возвращает объект:        
        total,
        completed,
        pending,
        completionRate
        */
        const total = this.tasks.length;
        const completed = this.tasks.filter(task => task.completed).length;
        const pending = total - completed;
        const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

        return {
            total: total,
            completed: completed,
            pending: pending,
            completionRate: completionRate
        };
    }
};

    

// ===== ЗАДАНИЕ 6: Регулярные выражения =====
/*
Дополнительные материалы:
https://regex101.com/ - интерактивный тестер regex
MDN Regular Expressions - https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Regular_expressions
Learn Regex - https://github.com/ziishaned/learn-regex - учебник по regex
 
Задание (по вариантам):
1. Изучите функции с регулярными выражениями по своему варианту
На защите вы должны суметь объяснить структуру регулярного выражения.
2. Напишите тесты, покрывающие все различные варианты. Обратите внимание тесты должны обеспечивать полное покрытие, но не быть дублирующимися.
3. Если предложенное регулярное выражение некорректно, вы можете исправить его.

Вычисление своего варианта:
Номер варианта = Ваш номер % Общее количество вариантов
 */

/**
 * Вариант 1: Валидация email адреса
 * Правила:
 * - Латиница, цифры, спецсимволы: ._%+-
 * - Обязательный символ @
 * - Доменная часть: латиница, цифры, точка
 * - Минимальная длина 5 символов
 */
function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

/**
 * Вариант 2: Валидация пароля
 * Правила:
 * - Минимум 8 символов
 * - Хотя бы одна заглавная буква
 * - Хотя бы одна строчная буква  
 * - Хотя бы одна цифра
 * - Хотя бы один специальный символ: !@#$%^&*()
 */
function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/;
    return passwordRegex.test(password);
}

/**
 * Вариант 3: Валидация номера телефона (российский формат)
 * Поддерживает форматы:
 * - +7 (999) 123-45-67
 * - 8 (999) 123-45-67  
 * - 89991234567  
 * - +7(999)123-45-67
 */
function validatePhone(phone) {
    const phoneRegex = /^(\+7|8)[\s(-]?\d{3}[\s)-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;
    return phoneRegex.test(phone);
    
}

/**
 * Вариант 4: Валидация даты в формате DD.MM.YYYY
 * Правила:
 * - День: 01-31
 * - Месяц: 01-12
 * - Год: 1900-2099
 */
function validateDate(date) {
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(19|20)\d{2}$/;
    return dateRegex.test(date);
}

// Бонус: выполните все остальные варианты. Выполнение бонуса не учитывается в итоговой оценке.


// ===== ТЕСТИРОВАНИЕ =====


// Запуск тестов

function runTests() {
     console.log("=== ТЕСТИРОВАНИЕ ===");
   
//Тест задания 1
simpleTask()

//Тест задания 2.1
console.assert(getReviewerNumber(5, 3) === 8, 'Тест 1: getReviewerNumber(5, 3) должно быть 8');
console.assert(getReviewerNumber(22, 2) === 1, 'Тест 2: getReviewerNumber(22, 2) должно быть 1');
console.assert(getReviewerNumber(3, 2.2) === 'Ошибка: номер студента и лабораторной работы должны быть целыми числами', 'Тест 3: должна быть ошибка для дробных чисел');
console.assert(getReviewerNumber(-5, 3) === 'Ошибка: номер студента и лабораторной работы должны быть положительными числами', 'Тест 4: должна быть ошибка для отрицательных чисел');
console.assert(getReviewerNumber(5, -3) === 'Ошибка: номер студента и лабораторной работы должны быть положительными числами', 'Тест 5: должна быть ошибка для отрицательных чисел');
console.assert(getReviewerNumber("alicce", 3) === 'Ошибка: оба параметра должны быть числами', 'Тест 6: должна быть ошибка для нечисловых параметров');
console.assert(getReviewerNumber(5, "alicce") === 'Ошибка: оба параметра должны быть числами', 'Тест 7: должна быть ошибка для нечисловых параметров');
console.assert(getReviewerNumber(5.5, 3) === 'Ошибка: номер студента и лабораторной работы должны быть целыми числами', 'Тест 8: должна быть ошибка для дробных чисел');
console.assert(getReviewerNumber(0, 3) === 'Ошибка: номер студента и лабораторной работы должны быть положительными числами', 'Тест 9: должна быть ошибка для нулевых значений');
console.assert(getReviewerNumber(22, 1) === 23, 'Тест 10: getReviewerNumber(22, 1) должно быть 23');
console.assert(getReviewerNumber(24, 1) === "Ошибка: номер студента не должен превышать 23", "Тест 11 провален, ошибка для значений превышающих 23");


//Тест задания 2.2 

    console.assert(getVariant(8, "a") === "Ошибка: оба параметра должны быть числами", "0Тест задания 2.2 провален (не числа)");
    console.assert(getVariant("a", 4) === "Ошибка: оба параметра должны быть числами", "01Тест задания 2.2 провален (не числа)");
    console.assert(getVariant(-8, 4) === "Ошибка: оба параметра должны быть положительными числами", "8Тест задания 2.2 провален");
    console.assert(getVariant(7, -4) === "Ошибка: оба параметра должны быть положительными числами", "7Тест задания 2.2 провален");
    console.assert(getVariant(6.2, 4) === 'Ошибка: оба параметра должны быть целыми числами', "6Тест задания 2.2 провален");
    console.assert(getVariant(5, 4.2) ==='Ошибка: оба параметра должны быть целыми числами', "5Тест задания 2.2 провален");
    console.assert(getVariant(4, 4) === 4, "4Тест задания 2.2 провален");
    console.assert(getVariant(3, 4) === 3, "3Тест задания 2.2 провален");



//Тест задания 2.3
console.assert(calculate(5, 3, "+") === 8, 
    'Тест 1 провален: 5 + 3 должно быть 8');
console.assert(calculate((-10), (-4), "+") === -14, 
    'Тест 2 провален: (-10) + (-4) должно быть -14');
     console.assert(calculate(10, -4, '-') === 14,
     'Тест 3 провален: 10 - (-4) должно быть 14');
console.assert(calculate(7, 3, "*") === 21, 
    'Тест 3 провален: 7 * 3 должно быть 21');
console.assert(calculate(15, 3, "/") === 5, 
    'Тест 4 провален: 15 / 3 должно быть 5');
console.assert(calculate(10, 0, "/") === "Делить на ноль нельзя", 
    'Тест 5 провален: деление на ноль должно возвращать ошибку');
console.assert(calculate(5, 3, "%") === "Неизвестная операция", 
    'Тест 6 провален: неизвестная операция должна возвращать ошибку');
console.assert(calculate("5", 3, "+") === "Оба параметра должны быть числами", 
    'Тест 7 провален: нечисловые параметры должны возвращать ошибку');
console.assert(calculate(5, "3", "+") === "Оба параметра должны быть числами", 
    'Тест 8 провален: нечисловые параметры должны возвращать ошибку');
console.assert(calculate(2.5, 1.5, "*") === 3.75, 
    'Тест 9 провален: 2.5 * 1.5 должно быть 3.75');
console.assert(calculate(8, 0, "-") === 8, 
    'Тест 11 провален: 8 - 0 должно быть 8');
console.assert(calculate(0, 7, "*") === 0, 
    'Тест 12 провален: 0 * 7 должно быть 0');
console.assert(calculate(0, 5, "/") === 0, 
    'Тест 13 провален: 0 / 5 должно быть 0');
console.assert(calculate(NaN, 5, "+") === "Оба параметра должны быть числами", 
    'Тест 14 провален: NaN должен возвращать ошибку');
    console.assert(calculate(6, NaN, "+") === "Оба параметра должны быть числами", 
    'Тест 15 провален: NaN должен возвращать ошибку');
console.assert(calculate(Number.MAX_VALUE, 1, '+') === Number.MAX_VALUE+1, "Тест 15 провален (переполнение при сложении)");
    console.assert(calculate(Number.MAX_VALUE, Number.MAX_VALUE, '+') === Infinity, "Тест 16 провален (переполнение при сложении двух больших чисел)");
    console.assert(calculate(Number.MAX_VALUE, 2, '-') === Number.MAX_VALUE - 2, "Тест 17 провален (вычитание из максимального значения)");
    console.assert(calculate(Number.MAX_VALUE, 1, '*') === Number.MAX_VALUE, "Тест 18 провален (переполнение при умножении)");
    console.assert(calculate(1, Number.MAX_VALUE, '*') === Number.MAX_VALUE, "Тест 19 провален (переполнение при умножении с максимальным значением)");
    console.assert(calculate(Number.MAX_VALUE, 10, "*") === Infinity, "Тест 20 провален (умножение максимального числа на 10)");
    console.assert(calculate(Number.MAX_VALUE, 2, '/') === Number.MAX_VALUE / 2, "Тест 21 провален (деление максимального значения)");

    //Тест задания 2.4
// Тесты для круга
console.assert(calculateArea('circle', 5, NaN) === 'Ошибка: все параметры должны быть числами',"Тест провален: должна быть ошибка при передаче NaN в параметрах");
console.assert(calculateArea('circle', 5) === Math.PI * 25, 
    'Тест круга с радиусом 5 не пройден');

console.assert(calculateArea('circle', 10) === Math.PI * 100, 
    'Тест круга с радиусом 10 не пройден');

console.assert(calculateArea('circle', 5, 10) === 'Ошибка: для круга нужен 1 параметр (радиус), передано: 2', "Тест провален: должна быть ошибка при 2 параметрах для круга");

// Тесты для прямоугольника
console.assert(calculateArea('rectangle', 4, 6) === 24, 
    'Тест прямоугольника 4x6 не пройден');

console.assert(calculateArea('rectangle', 3, 7) === 21, 
    'Тест прямоугольника 3x7 не пройден');

// Тесты для треугольника
console.assert(calculateArea('triangle', 4, 5) === 10, 
    'Тест треугольника с основанием 4 и высотой 5 не пройден');

console.assert(calculateArea('triangle', 6, 8) === 24, 
    'Тест треугольника с основанием 6 и высотой 8 не пройден');

// Тесты на обработку ошибок
console.assert(calculateArea('circle', -1) === 'Ошибка: все параметры должны быть положительными числами', 
    'Тест на отрицательный радиус не пройден');

console.assert(calculateArea('rectangle', 4) === 'Ошибка: для прямоугольника нужны 2 параметра (длина и ширина), передано: 1', 
    'Тест на недостаток параметров для прямоугольника не пройден');

console.assert(calculateArea('triangle', 3, 4, 5) === 'Ошибка: для треугольника нужны 2 параметра (основание и высота), передано: 3', 
    'Тест на избыток параметров для треугольника не пройден');

console.assert(calculateArea('square', 5) === 'Ошибка: неизвестная фигура. Используйте: circle, rectangle, triangle', 
    'Тест на неизвестную фигуру не пройден');

console.assert(calculateArea(123, 5) === 'Ошибка: первый параметр должен быть строкой (circle, rectangle, triangle)', 
    'Тест на нестроковый первый параметр не пройден');

console.assert(calculateArea('circle', 'abc') === 'Ошибка: все параметры должны быть числами', 
    'Тест на нечисловой параметр не пройден');

// Тесты на регистрозависимость
console.assert(calculateArea('CIRCLE', 5) === Math.PI * 25, 
    'Тест круга в верхнем регистре не пройден');

console.assert(calculateArea('Rectangle', 4, 6) === 24, 
    'Тест прямоугольника с заглавной буквы не пройден');

// Дополнительные тесты с дробными числами
console.assert(calculateArea('circle', 2.5) === Math.PI * 6.25, 
    'Тест круга с дробным радиусом не пройден');

console.assert(calculateArea('rectangle', 2.5, 3.5) === 8.75, 
    'Тест прямоугольника с дробными сторонами не пройден');

//Тест задания 2.5
console.assert(reverseString("hello") === "olleh", "Тест провален: 'hello' -> 'olleh'");
console.assert(reverseString("12345") === "54321", "Тест провален: '12345' -> '54321'");
console.assert(reverseString("a b c") === "c b a", "Тест провален: 'a b c' -> 'c b a'");
console.assert(reverseString("") === "", "Тест провален: пустая строка -> пустая строка");
console.assert(reverseString(123) === "Ошибка: можно передавать только строки", "Тест провален: 123 -> 321");
//Тест задания 2.6
console.assert(typeof(getRandomNumber(10, 20)) === "number", "Тест провален (результат не число");
console.assert(getRandomNumber(10, 20) >= 10 && getRandomNumber(10, 20) <= 20, "Тест провален(результат не в границах)");
console.assert((() => { try { getRandomNumber("1", 2); return false; } catch(e) { return e.message === 'Оба параметра должны быть числами'; } })(), "Тест 1: должна быть ошибка при нечисловых параметрах");
console.assert((() => { try { getRandomNumber(10, 5); return false; } catch(e) { return e.message === 'Минимальное значение не может быть больше максимального'; } })(), "Тест 2: должна быть ошибка при min > max");

//Тест задания 3.1
    console.log(book.getInfo());
    console.log(book.toggleAvailability());
    console.log(book.toggleAvailability());  
  
//Тест задания 3.2
const average = student.getAverageGrade();
console.assert(average === 90, "Тест провален: средний балл");
student.addGrade('physics', 100);
console.assert(student.grades.physics === 100, "Тест провален: добавление новой оценки");
student.addGrade('math', 100);
const newAverage = student.getAverageGrade();
console.assert(newAverage === 95, "Тест провален: новый средний балл");
console.assert(student.addGrade("", 90) === 'Ошибка: название предмета должно быть непустой строкой',"Tест  провален: не должно быть пустой строки");
console.assert(student.addGrade(123, 90) === 'Ошибка: название предмета должно быть непустой строкой',"Tест  провален: название предмета должно быть строкой");
console.assert(student.addGrade("chemistry", NaN) === 'Ошибка: оценка должна быть числом',"Тест провален: оценка должна быть числом");
console.assert(student.addGrade("chemistry", "95") === 'Ошибка: оценка должна быть числом',"Тест провален: оценка должна быть числом");
console.assert(student.addGrade("chemistry", 0) === 'Ошибка: оценка должна быть в диапазоне от 1 до 100',"Тест провален: оценка должна быть < 1");
console.assert(student.addGrade("chemistry", 101) === 'Ошибка: оценка должна быть в диапазоне от 1 до 100',"Тест провален: оценка должна быть > 100");
console.assert(student.addGrade("chemistry", 95.5) === 'Ошибка: оценка должна быть целым числом',"Тест провален: должно быть целое число")
//Тест задания 4
processArrays();
//Тест задания 5
    console.log(taskManager.addTask("Написать отчет", "high")); //добавление задачи в список
    console.log(taskManager.completeTask(1)); //отметка выполнения задачи
    console.log(taskManager.completeTask(999)); //отметка выполнения несуществующей задачи
    console.log(taskManager.deleteTask(3)); //удаление задачи
    console.log(taskManager.deleteTask(999)); //удаление несуществующей задачи
    console.log("Активные задачи:", taskManager.getTasksByStatus(false)); //вывод задач по статусу
    console.log("Статистика:", taskManager.getStats()); //вывод статы
    console.log(taskManager.addTask("Написать отчет"  )); //добавление задачи в список
   



    //Тесты задания 6
    console.assert(validatePhone("+7(999)123-45-67") === true, "Тест 1: +7(999)123-45-67");

// Тесты из условия: 8 (999) 123-45-67  
console.assert(validatePhone("8(999)123-45-67") === true, "Тест 2: 8(999)123-45-67");

// Тесты из условия: 89991234567  
console.assert(validatePhone("89991234567") === true, "Тест 3: 89991234567");

// Тесты из условия: +7(999)123-45-67
console.assert(validatePhone("+7(999)123-45-67") === true, "Тест 4: +7(999)123-45-67");

// Дополнительные вариации с пробелами и дефисами
console.assert(validatePhone("+7 999 123 45 67") === true, "Тест 5: +7 999 123 45 67");
console.assert(validatePhone("8-999-123-45-67") === true, "Тест 6: 8-999-123-45-67");
console.assert(validatePhone("+7-999-123-45-67") === true, "Тест 7: +7-999-123-45-67");
console.assert(validatePhone("8 999 123 45 67") === true, "Тест 8: 8 999 123 45 67");

// Некорректные номера (должны вернуть false)
console.assert(validatePhone("+9 (999) 123-45-67") === false, "Тест 9: +9 (999) 123-45-67");
console.assert(validatePhone("7 (999) 123-45-67") === false, "Тест 10: 7 (999) 123-45-67");
console.assert(validatePhone("+7 (99) 123-45-67") === false, "Тест 11: +7 (99) 123-45-67");
console.assert(validatePhone("+7 (999) 123-456") === false, "Тест 12: +7 (999) 123-456");
console.assert(validatePhone("+7 (999) 123-45-6") === false, "Тест 13: +7 (999) 123-45-6");
console.assert(validatePhone("8999123456") === false, "Тест 14: 8999123456");
console.assert(validatePhone("899912345678") === false, "Тест 15: 899912345678");
console.assert(validatePhone("+7 (999) 123-45-6a") === false, "Тест 16: +7 (999) 123-45-6a");
console.assert(validatePhone("abc") === false, "Тест 17: abc");
console.assert(validatePhone("") === false, "Тест 18: пустая строка");

}
runTests();
