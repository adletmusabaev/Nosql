1. Регистрация пользователя
➤ Отправь POST-запрос

URL: http://localhost:5000/api/auth/register
Body (JSON, raw)

{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "123456"
}

Ответ

{
    "message": "User registered",
    "user": {
        "_id": "65f2c3d456a7b5e8b9d4f123",
        "name": "John Doe",
        "email": "john@example.com",
        "role": "customer"
    }
}
📌 2. Авторизация (получение JWT-токена)
➤ Отправь POST-запрос

URL: http://localhost:5000/api/auth/login
Body (JSON, raw)

{
    "email": "john@example.com",
    "password": "123456"
}
Ответ 
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}


📌 3. Создание товара (только админ)
➤ Отправь POST-запрос

URL: http://localhost:5000/api/products
Headers:
Authorization: Bearer <YOUR-TOKEN>
Body (JSON, raw)

{
    "name": "T-shirt",
    "category": "clothes",
    "price": 20,
    "stock": 50,
    "description": "Cotton T-shirt",
    "images": ["image1.jpg"]
}

Ожидаемый ответ

{
    "_id": "65f2c3d456a7b5e8b9d4f124",
    "name": "T-shirt",
    "category": "clothes",
    "price": 20,
    "stock": 50,
    "description": "Cotton T-shirt",
    "images": ["image1.jpg"]
}
📌 4. Получение списка товаров
➤ Отправь GET-запрос

URL: http://localhost:5000/api/products
Ожидаемый ответ

[
    {
        "_id": "65f2c3d456a7b5e8b9d4f124",
        "name": "T-shirt",
        "category": "clothes",
        "price": 20,
        "stock": 50,
        "description": "Cotton T-shirt",
        "images": ["image1.jpg"]
    }
]
📌 5. Создание заказа (только авторизованный пользователь)
➤ Отправь POST-запрос

URL: http://localhost:5000/api/orders
Headers:
Authorization: Bearer <YOUR-TOKEN>
Body (JSON, raw)

{
    "products": [
        { "productId": "65f2c3d456a7b5e8b9d4f124", "quantity": 2 }
    ],
    "totalPrice": 40
}
Ожидаемый ответ

{
    "_id": "65f2c3d456a7b5e8b9d4f125",
    "userId": "65f2c3d456a7b5e8b9d4f123",
    "products": [
        {
            "productId": "65f2c3d456a7b5e8b9d4f124",
            "quantity": 2
        }
    ],
    "totalPrice": 40,
    "status": "pending"
}
📌 6. Получение заказов пользователя
➤ Отправь GET-запрос

URL: http://localhost:5000/api/orders
Headers:
Authorization: Bearer <YOUR-TOKEN>

Ожидаемый ответ

[
    {
        "_id": "65f2c3d456a7b5e8b9d4f125",
        "userId": "65f2c3d456a7b5e8b9d4f123",
        "products": [
            {
                "productId": "65f2c3d456a7b5e8b9d4f124",
                "quantity": 2
            }
        ],
        "totalPrice": 40,
        "status": "pending"
    }
]
📌 7. Обновление статуса заказа (только админ)
➤ Отправь PUT-запрос

URL: http://localhost:5000/api/orders/{order_id}
Headers:
Authorization: Bearer <ADMIN-TOKEN>
Body (JSON, raw)

{
    "status": "shipped"
}
Ожидаемый ответ

{
    "_id": "65f2c3d456a7b5e8b9d4f125",
    "status": "shipped"
}
📌 8. Удаление заказа (только админ)
➤ Отправь DELETE-запрос

URL: http://localhost:5000/api/orders/{order_id}
Headers:
Authorization: Bearer <ADMIN-TOKEN>
Ожидаемый ответ

{
    "message": "Order deleted"
}
