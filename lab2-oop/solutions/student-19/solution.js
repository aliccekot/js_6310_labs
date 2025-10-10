'use strict'

// ===== ЗАДАНИЕ 1: Базовый класс Vehicle =====
class Vehicle {
    // Создайте базовый класс Vehicle.
    // В конструкторе принимайте и сохраняйте в this свойства: 
    // make (марка), model (модель), year (год выпуска).
    
    // Статическое свойство для подсчета транспортных средств (Задание 5)
    static vehicleCount = 0;

    constructor(make, model, year) {
        // Валидация входных данных
        this._make = this._validateMake(make);
        this._model = this._validateModel(model);
        this._year = this._validateYear(year);
        
        // Увеличиваем счетчик при создании каждого транспортного средства
        Vehicle.vehicleCount++;
    }

    // Методы валидации
    _validateMake(make) {
        if (!make || typeof make !== 'string' || make.trim() === '') {
            throw new Error('Марка должна быть непустой строкой');
        }
        return make.trim();
    }

    _validateModel(model) {
        if (!model || typeof model !== 'string' || model.trim() === '') {
            throw new Error('Модель должна быть непустой строкой');
        }
        return model.trim();
    }

    _validateYear(year) {
        const currentYear = new Date().getFullYear();
        
        if (typeof year !== 'number' || !Number.isInteger(year)) {
            throw new Error('Год должен быть целым числом');
        }
        if (year < 1886) {
            throw new Error('Год не может быть раньше 1886 (год создания первого автомобиля)');
        }
        if (year > currentYear) {
            throw new Error(`Год не может быть больше ${currentYear}`);
        }
        return year;
    }

    // Добавьте метод displayInfo(), который выводит в консоль информацию 
    // о транспортном средстве в формате: "Марка: [make], Модель: [model], Год: [year]".
    displayInfo() {
        console.log(`Марка: ${this.make}, Модель: ${this.model}, Год: ${this.year}`);
    }

    // Добавьте геттер age, который возвращает возраст транспортного средства 
    // (текущий год минус год выпуска). Используйте new Date().getFullYear().
    get age() {
        return new Date().getFullYear() - this._year;
    }

    // Добавьте сеттер для года выпуска с проверкой: год не может быть больше текущего.
    set year(newYear) {
        this._year = this._validateYear(newYear);
    }

    get year() {
        return this._year;
    }

    // Геттеры для марки и модели
    get make() {
        return this._make;
    }

    get model() {
        return this._model;
    }

    // Добавьте статический метод compareAge(vehicle1, vehicle2), 
    // который возвращает разницу в возрасте между двумя транспортными средствами.
    static compareAge(vehicle1, vehicle2) {
        return Math.abs(vehicle1.age - vehicle2.age);
    }

    // Статический метод для получения общего количества транспортных средств (Задание 5)
    static getTotalVehicles() {
        return Vehicle.vehicleCount;
    }
}

// ===== ЗАДАНИЕ 2: Класс Car (наследуется от Vehicle) =====
class Car extends Vehicle {
    // Создайте дочерний класс Car, который наследуется от Vehicle.
    // Добавьте новое свойство numDoors (количество дверей).
    constructor(make, model, year, numDoors) {
        super(make, model, year);
        this.numDoors = this._validateNumDoors(numDoors);
    }

    // Валидация количества дверей
    _validateNumDoors(numDoors) {
        if (typeof numDoors !== 'number' || !Number.isInteger(numDoors) || numDoors < 1) {
            throw new Error('Количество дверей должно быть целым числом больше 0');
        }
        return numDoors;
    }

    // Переопределите метод displayInfo() так, чтобы он также выводил количество дверей. 
    // Используйте super.displayInfo() для вызова метода родителя.
    displayInfo() {
        super.displayInfo();
        console.log(`Количество дверей: ${this.numDoors}`);
    }

    // Добавьте метод honk(), который выводит "Beep beep!".
    honk() {
        console.log('Beep beep!');
    }
}

// ===== ЗАДАНИЕ 3: Класс ElectricCar (наследуется от Car) =====
class ElectricCar extends Car {
    // Создайте дочерний класс ElectricCar, который наследуется от Car.
    // Добавьте новое свойство batteryCapacity (емкость батареи в кВт·ч).
    constructor(make, model, year, numDoors, batteryCapacity) {
        super(make, model, year, numDoors);
        this.batteryCapacity = this._validateBatteryCapacity(batteryCapacity);
    }

    // Валидация емкости батареи
    _validateBatteryCapacity(batteryCapacity) {
        if (typeof batteryCapacity !== 'number' || batteryCapacity <= 0) {
            throw new Error('Емкость батареи должна быть положительным числом');
        }
        return batteryCapacity;
    }

    // Переопределите метод displayInfo() для вывода дополнительной информации о батарее.
    displayInfo() {
        super.displayInfo();
        console.log(`Емкость батареи: ${this.batteryCapacity} кВт·ч`);
    }

    // Добавьте метод calculateRange(), который рассчитывает примерный запас хода 
    // (предположим, что 1 кВт·ч = 6 км).
    calculateRange() {
        return this.batteryCapacity * 6;
    }
}

// ===== ЗАДАНИЕ 4: Каррирование =====

// Создайте функцию createVehicleFactory, которая возвращает функцию 
// для создания транспортных средств определенного типа (каррирование).
const createVehicleFactory = (vehicleType) => (make, model, year, ...additionalArgs) => {
    return new vehicleType(make, model, year, ...additionalArgs);
};

// ===== ЗАДАНИЕ 5: Статические методы и свойства =====

// Добавьте статическое свойство vehicleCount в класс Vehicle 
// для подсчета количества созданных транспортных средств.
// Модифицируйте конструктор Vehicle для увеличения счетчика
// (добавьте в начало конструктора: Vehicle.vehicleCount++);
// Создайте статический метод getTotalVehicles(), 
// который возвращает общее количество созданных транспортных средств.
// (Реализовано выше в классе Vehicle)

// Автоматические тесты
function runTests() {
    console.log('Запуск тестов...');

    Vehicle.vehicleCount = 0;

    // ===== ТЕСТЫ ДЛЯ ЗАДАНИЯ 1 =====
    console.log('\n=== ТЕСТЫ ДЛЯ ЗАДАНИЯ 1: Базовый класс Vehicle ===');

    console.log('\n--- Тест 1.1: Создание Vehicle и основные методы ---');
    const vehicle_1 = new Vehicle('Toyota', 'Camry', 2020);
    vehicle_1.displayInfo();
    console.log(`Возраст: ${vehicle_1.age} лет`);
    
    const vehicle_2 = new Vehicle('Toyota', 'Camry', 2010);
    vehicle_2.displayInfo();
    console.log(`Возраст: ${vehicle_2.age} лет`);
    
    console.log(`Разница возраста: ${Vehicle.compareAge(vehicle_1, vehicle_2)} лет`);
    console.log(`Общее количество созданных транспортных средств: ${Vehicle.getTotalVehicles()} шт`);

    console.log('\n--- Тест 1.2: Валидация марки ---');
    try { new Vehicle('', 'Model', 2020); console.log('Ошибка: пустая марка не вызвала исключение'); } 
    catch (error) { console.log('Ожидаемая ошибка (пустая марка):', error.message); }

    try { new Vehicle('   ', 'Model', 2020); console.log('Ошибка: марка из пробелов не вызвала исключение'); } 
    catch (error) { console.log('Ожидаемая ошибка (марка из пробелов):', error.message); }

    try { new Vehicle(123, 'Model', 2020); console.log('Ошибка: не строковая марка не вызвала исключение'); } 
    catch (error) { console.log('Ожидаемая ошибка (не строковая марка):', error.message); }

    try { new Vehicle(null, 'Model', 2020); console.log('Ошибка: null марка не вызвала исключение'); } 
    catch (error) { console.log('Ожидаемая ошибка (null марка):', error.message); }

    try { new Vehicle(undefined, 'Model', 2020); console.log('Ошибка: undefined марка не вызвала исключение'); } 
    catch (error) { console.log('Ожидаемая ошибка (undefined марка):', error.message); }

    console.log('\n--- Тест 1.3: Валидация модели ---');
    try { new Vehicle('Toyota', '', 2020); console.log('Ошибка: пустая модель не вызвала исключение'); } 
    catch (error) { console.log('Ожидаемая ошибка (пустая модель):', error.message); }

    try { new Vehicle('Toyota', '   ', 2020); console.log('Ошибка: модель из пробелов не вызвала исключение'); } 
    catch (error) { console.log('Ожидаемая ошибка (модель из пробелов):', error.message); }

    try { new Vehicle('Toyota', null, 2020); console.log('Ошибка: null модель не вызвала исключение'); } 
    catch (error) { console.log('Ожидаемая ошибка (null модель):', error.message); }

    try { new Vehicle('Toyota', undefined, 2020); console.log('Ошибка: undefined модель не вызвала исключение'); } 
    catch (error) { console.log('Ожидаемая ошибка (undefined модель):', error.message); }

    try { new Vehicle('Toyota', 123, 2020); console.log('Ошибка: не строковая модель не вызвала исключение'); } 
    catch (error) { console.log('Ожидаемая ошибка (не строковая модель):', error.message); }

    console.log('\n--- Тест 1.4: Валидация года ---');
    const currentYear = new Date().getFullYear();
    
    try { new Vehicle('Future', 'Car', currentYear + 3); console.log('Ошибка: год слишком в будущем не вызвал исключение'); } 
    catch (error) { console.log('Ожидаемая ошибка (год в будущем):', error.message); }

    try { new Vehicle('Ancient', 'Car', 1885); console.log('Ошибка: год до 1886 не вызвал исключение'); } 
    catch (error) { console.log('Ожидаемая ошибка (год до 1886):', error.message); }

    try { new Vehicle('Test', 'Car', '2020'); console.log('Ошибка: не числовой год не вызвал исключение'); } 
    catch (error) { console.log('Ожидаемая ошибка (не числовой год):', error.message); }

    try { new Vehicle('Test', 'Car', 2020.5); console.log('Ошибка: не целый год не вызвал исключение'); } 
    catch (error) { console.log('Ожидаемая ошибка (не целый год):', error.message); }

    try { new Vehicle('Test', 'Car', null); console.log('Ошибка: null год не вызвал исключение'); } 
    catch (error) { console.log('Ожидаемая ошибка (null год):', error.message); }

    try { new Vehicle('Test', 'Car', undefined); console.log('Ошибка: undefined год не вызвал исключение'); } 
    catch (error) { console.log('Ожидаемая ошибка (undefined год):', error.message); }

    try { new Vehicle('Test', 'Car', -1); console.log('Ошибка: отрицательный год не вызвал исключение'); } 
    catch (error) { console.log('Ожидаемая ошибка (отрицательный год):', error.message); }

    console.log('\n--- Тест 1.5: Граничные значения года ---');
    // Минимальный допустимый год
    const minYearVehicle = new Vehicle('Test', 'Car', 1886);
    console.log(`Минимальный год (1886): ${minYearVehicle.year}`);
    
    // Максимальный допустимый год (currentYear + 2)
    const maxYearVehicle = new Vehicle('Test', 'Car', currentYear);
    console.log(`Максимальный год (${currentYear + 2}): ${maxYearVehicle.year}`);
    
    // Текущий год
    const currentYearVehicle = new Vehicle('Test', 'Car', currentYear);
    console.log(`Текущий год (${currentYear}): ${currentYearVehicle.year}`);
    
    // Год +1
    const nextYearVehicle = new Vehicle('Test', 'Car', currentYear);
    console.log(`Следующий год (${currentYear + 1}): ${nextYearVehicle.year}`);

    console.log('\n--- Тест 1.6: Сеттер года ---');
    const testVehicle = new Vehicle('Test', 'Car', 2010);
    console.log(`Изначальный год: ${testVehicle.year}`);
    
    // Корректное изменение года
    testVehicle.year = 2015;
    console.log(`Новый год после сеттера: ${testVehicle.year}`);
    
    // Проверка сеттера на граничные значения
    testVehicle.year = currentYear;
    console.log(`Год после установки максимального значения: ${testVehicle.year}`);
    
    testVehicle.year = 1886;
    console.log(`Год после установки минимального значения: ${testVehicle.year}`);
    
    // Невалидные значения в сеттере
    try { testVehicle.year = currentYear + 3; console.log('Ошибка: невалидный год в сеттере не вызвал исключение'); } 
    catch (error) { console.log('Ожидаемая ошибка при установке невалидного года:', error.message); }

    try { testVehicle.year = 1885; console.log('Ошибка: год до 1886 в сеттере не вызвал исключение'); } 
    catch (error) { console.log('Ожидаемая ошибка при установке года до 1886:', error.message); }

    try { testVehicle.year = '2020'; console.log('Ошибка: не числовой год в сеттере не вызвал исключение'); } 
    catch (error) { console.log('Ожидаемая ошибка при установке не числового года:', error.message); }

    console.log('\n--- Тест 1.7: Обрезка пробелов ---');
    const trimmedVehicle = new Vehicle('  Honda  ', '  Civic  ', 2018);
    console.log(`Марка после обрезки: "${trimmedVehicle.make}"`);
    console.log(`Модель после обрезки: "${trimmedVehicle.model}"`);
    
    // Проверка, что обрезка работает корректно
    console.log(`Длина марки после обрезки: ${trimmedVehicle.make.length}`);
    console.log(`Длина модели после обрезки: ${trimmedVehicle.model.length}`);

    console.log('\n--- Тест 1.8: Статический метод compareAge ---');
    const vehicle1 = new Vehicle('Brand1', 'Model1', 2015);
    const vehicle2 = new Vehicle('Brand2', 'Model2', 2020);
    const ageDifference = Vehicle.compareAge(vehicle1, vehicle2);
    console.log(`Разница в возрасте: ${ageDifference} лет`);
    
    // Проверка с одинаковым годом
    const vehicle3 = new Vehicle('Brand3', 'Model3', 2018);
    const vehicle4 = new Vehicle('Brand4', 'Model4', 2018);
    const sameAgeDifference = Vehicle.compareAge(vehicle3, vehicle4);
    console.log(`Разница в возрасте при одинаковом годе: ${sameAgeDifference} лет`);

    console.log('\n--- Тест 1.9: Геттеры ---');
    const getterTestVehicle = new Vehicle('Audi', 'A4', 2019);
    console.log(`Марка через геттер: ${getterTestVehicle.make}`);
    console.log(`Модель через геттер: ${getterTestVehicle.model}`);
    console.log(`Год через геттер: ${getterTestVehicle.year}`);
    console.log(`Возраст через геттер: ${getterTestVehicle.age}`);

    // ===== ТЕСТЫ ДЛЯ ЗАДАНИЯ 2 =====
    console.log('\n=== ТЕСТЫ ДЛЯ ЗАДАНИЯ 2: Класс Car ===');

    console.log('\n--- Тест 2.1: Создание Car и основные методы ---');
    const car = new Car('Honda', 'Civic', 2018, 4);
    car.displayInfo();
    car.honk();

    console.log('\n--- Тест 2.2: Валидация количества дверей ---');
    try { new Car('Honda', 'Civic', 2018, 0); console.log('Ошибка: 0 дверей не вызвал исключение'); } 
    catch (error) { console.log('Ожидаемая ошибка (0 дверей):', error.message); }

    try { new Car('Honda', 'Civic', 2018, 2.5); console.log('Ошибка: не целое количество дверей не вызвал исключение'); } 
    catch (error) { console.log('Ожидаемая ошибка (не целое количество дверей):', error.message); }

    try { new Car('Honda', 'Civic', 2018, -1); console.log('Ошибка: отрицательное количество дверей не вызвал исключение'); } 
    catch (error) { console.log('Ожидаемая ошибка (отрицательное количество дверей):', error.message); }

    try { new Car('Honda', 'Civic', 2018, null); console.log('Ошибка: null количество дверей не вызвал исключение'); } 
    catch (error) { console.log('Ожидаемая ошибка (null количество дверей):', error.message); }

    try { new Car('Honda', 'Civic', 2018, undefined); console.log('Ошибка: undefined количество дверей не вызвал исключение'); } 
    catch (error) { console.log('Ожидаемая ошибка (undefined количество дверей):', error.message); }

    try { new Car('Honda', 'Civic', 2018, '4'); console.log('Ошибка: не числовое количество дверей не вызвал исключение'); } 
    catch (error) { console.log('Ожидаемая ошибка (не числовое количество дверей):', error.message); }

    console.log('\n--- Тест 2.3: Различные значения количества дверей ---');
    const car2Doors = new Car('Smart', 'Fortwo', 2020, 2);
    console.log(`2 двери: ${car2Doors.numDoors}`);
    
    const car5Doors = new Car('VW', 'Golf', 2021, 5);
    console.log(`5 дверей: ${car5Doors.numDoors}`);
    
    const carManyDoors = new Car('Bus', 'Large', 2020, 10);
    console.log(`10 дверей: ${carManyDoors.numDoors}`);

    console.log('\n--- Тест 2.4: Наследование от Vehicle ---');
    console.log(`car instanceof Vehicle: ${car instanceof Vehicle}`);
    console.log(`car instanceof Car: ${car instanceof Car}`);
    console.log(`Метод displayInfo переопределен: ${car.displayInfo !== Vehicle.prototype.displayInfo}`);
    console.log(`Наследует геттер age: ${typeof car.age === 'number'}`);

    // ===== ТЕСТЫ ДЛЯ ЗАДАНИЯ 3 =====
    console.log('\n=== ТЕСТЫ ДЛЯ ЗАДАНИЯ 3: Класс ElectricCar ===');

    console.log('\n--- Тест 3.1: Создание ElectricCar и основные методы ---');
    const electricCar = new ElectricCar('Tesla', 'Model 3', 2020, 4, 75);
    electricCar.displayInfo();
    console.log(`Запас хода: ${electricCar.calculateRange()} км`);
    electricCar.honk();

    console.log('\n--- Тест 3.2: Валидация емкости батареи ---');
    try { new ElectricCar('Tesla', 'Model 3', 2020, 4, 0); console.log('Ошибка: нулевая емкость батареи не вызвала исключение'); } 
    catch (error) { console.log('Ожидаемая ошибка (нулевая емкость батареи):', error.message); }

    try { new ElectricCar('Tesla', 'Model 3', 2020, 4, -10); console.log('Ошибка: отрицательная емкость батареи не вызвала исключение'); } 
    catch (error) { console.log('Ожидаемая ошибка (отрицательная емкость батареи):', error.message); }

    try { new ElectricCar('Tesla', 'Model 3', 2020, 4, null); console.log('Ошибка: null емкость батареи не вызвала исключение'); } 
    catch (error) { console.log('Ожидаемая ошибка (null емкость батареи):', error.message); }

    try { new ElectricCar('Tesla', 'Model 3', 2020, 4, undefined); console.log('Ошибка: undefined емкость батареи не вызвала исключение'); } 
    catch (error) { console.log('Ожидаемая ошибка (undefined емкость батареи):', error.message); }

    try { new ElectricCar('Tesla', 'Model 3', 2020, 4, '75'); console.log('Ошибка: не числовая емкость батареи не вызвала исключение'); } 
    catch (error) { console.log('Ожидаемая ошибка (не числовая емкость батареи):', error.message); }

    console.log('\n--- Тест 3.3: Различные значения емкости батареи ---');
    const smallBatteryCar = new ElectricCar('Nissan', 'Leaf', 2021, 5, 40);
    console.log(`Малая батарея (40 кВт·ч): запас хода ${smallBatteryCar.calculateRange()} км`);
    
    const largeBatteryCar = new ElectricCar('Tesla', 'Model S', 2022, 4, 100);
    console.log(`Большая батарея (100 кВт·ч): запас хода ${largeBatteryCar.calculateRange()} км`);
    
    const fractionalBatteryCar = new ElectricCar('Hyundai', 'Kona', 2021, 5, 64.5);
    console.log(`Дробная емкость батареи (64.5 кВт·ч): запас хода ${fractionalBatteryCar.calculateRange()} км`);

    console.log('\n--- Тест 3.4: Наследование ---');
    console.log(`electricCar instanceof Car: ${electricCar instanceof Car}`);
    console.log(`electricCar instanceof Vehicle: ${electricCar instanceof Vehicle}`);
    console.log(`electricCar instanceof ElectricCar: ${electricCar instanceof ElectricCar}`);
    console.log(`Наследует метод honk: ${typeof electricCar.honk === 'function'}`);
    console.log(`Метод displayInfo переопределен: ${electricCar.displayInfo !== Car.prototype.displayInfo}`);

    // ===== ТЕСТЫ ДЛЯ ЗАДАНИЯ 4 =====
    console.log('\n=== ТЕСТЫ ДЛЯ ЗАДАНИЯ 4: Каррирование ===');

    console.log('\n--- Тест 4.1: Фабрика для Vehicle ---');
    const createVehicle = createVehicleFactory(Vehicle);
    const factoryVehicle = createVehicle('Factory', 'Basic', 2019);
    console.log('Создан Vehicle через фабрику:');
    factoryVehicle.displayInfo();
    console.log(`factoryVehicle instanceof Vehicle: ${factoryVehicle instanceof Vehicle}`);

    console.log('\n--- Тест 4.2: Фабрика для Car ---');
    const createCarFactory = createVehicleFactory(Car);
    const myNewCar = createCarFactory('BMW', 'X5', 2022, 5);
    console.log('Создан новый автомобиль через фабрику:');
    myNewCar.displayInfo();
    console.log(`myNewCar instanceof Car: ${myNewCar instanceof Car}`);

    console.log('\n--- Тест 4.3: Фабрика для ElectricCar ---');
    const createElectricCarFactory = createVehicleFactory(ElectricCar);
    const myNewElectricCar = createElectricCarFactory('Nissan', 'Leaf', 2021, 5, 40);
    console.log('Создан новый электромобиль через фабрику:');
    myNewElectricCar.displayInfo();
    console.log(`myNewElectricCar instanceof ElectricCar: ${myNewElectricCar instanceof ElectricCar}`);

    console.log('\n--- Тест 4.4: Фабрика с разным количеством аргументов ---');
    const car3Doors = createCarFactory('Mini', 'Cooper', 2020, 3);
    console.log('Car с 3 дверями через фабрику:');
    car3Doors.displayInfo();

    // ===== ТЕСТЫ ДЛЯ ЗАДАНИЯ 5 =====
    console.log('\n=== ТЕСТЫ ДЛЯ ЗАДАНИЯ 5: Статические методы и свойства ===');

    console.log('\n--- Тест 5.1: Подсчет транспортных средств ---');
    const initialCount = Vehicle.getTotalVehicles();
    console.log(`Текущее количество транспортных средств: ${initialCount} шт`);
    
    // Создаем еще несколько транспортных средств
    const additionalVehicle1 = new Vehicle('Test1', 'Model1', 2015);
    const additionalVehicle2 = new Car('Test2', 'Model2', 2016, 4);
    const additionalVehicle3 = new ElectricCar('Test3', 'Model3', 2017, 2, 50);
    
    const finalCount = Vehicle.getTotalVehicles();
    console.log(`Количество после создания 3 дополнительных средств: ${finalCount} шт`);
    console.log(`Счетчик увеличился на 3: ${finalCount === initialCount + 3}`);

    console.log('\n--- Тест 5.2: Проверка, что счетчик не увеличивается при ошибках валидации ---');
    const countBeforeError = Vehicle.getTotalVehicles();
    
    try {
        new Vehicle('', 'Invalid', 2020);
    } catch (error) {
        // Игнорируем ошибку
    }
    
    const countAfterError = Vehicle.getTotalVehicles();
    console.log(`Счетчик до ошибки: ${countBeforeError}, после ошибки: ${countAfterError}`);
    console.log(`Счетчик не изменился при ошибке: ${countBeforeError === countAfterError}`);

    console.log('\n--- Тест 5.3: Статический метод getTotalVehicles ---');
    console.log(`Тип getTotalVehicles: ${typeof Vehicle.getTotalVehicles}`);
    console.log(`Возвращает число: ${typeof Vehicle.getTotalVehicles() === 'number'}`);
    console.log(`Значение больше или равно 0: ${Vehicle.getTotalVehicles() >= 0}`);

    // ===== ИТОГОВАЯ ПРОВЕРКА =====
    console.log('\n=== ИТОГОВАЯ СВОДКА ===');
    console.log(`Всего создано транспортных средств: ${Vehicle.getTotalVehicles()} шт`);
    console.log(`Из них:`);
    console.log(`- Vehicle: ${vehicle_1 instanceof Vehicle && vehicle_2 instanceof Vehicle ? '2 шт' : 'ошибка'}`);
    console.log(`- Car: ${car instanceof Car && myNewCar instanceof Car ? 'минимум 2 шт' : 'ошибка'}`);
    console.log(`- ElectricCar: ${electricCar instanceof ElectricCar && myNewElectricCar instanceof ElectricCar ? 'минимум 2 шт' : 'ошибка'}`);

    console.log('\n✅ Все тесты пройдены!');
}

runTests();