Менеджер задач

Учебный проект: React-приложение, которое работает с Python GraphQL-сервером через Apollo Client.

Что умеет
показывать список задач с категориями
добавлять новые задачи
отмечать задачи выполненными
Технологии
Клиент: React 18, Vite, Apollo Client
Сервер: Python, FastAPI, Strawberry GraphQL
Как запустить

Нужны Python 3.10+ и Node.js. Оба сервера должны работать одновременно.

1. Сервер

bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

Сервер запустится на http://localhost:8000/graphql

2. Клиент

bash
cd frontend
npm install
npm run dev

Приложение откроется на http://localhost:5173