from typing import List

import strawberry
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from strawberry.fastapi import GraphQLRouter

@strawberry.type # категории
class Category:
    name: str
    color: str

@strawberry.type # описываем задачи
class Task:
    id: strawberry.ID # для поиска
    title: str
    description: str
    is_completed: bool
    category: Category

tasks_db: List[Task] = [  # привер для вывода
    Task(
        id=strawberry.ID("1"),
        title="Вайбкодинг",
        description="Навайбкодить Devil May Cry 6",
        is_completed=False,
        category=Category(name="Игры", color="blue"),
    ),
    Task(
        id=strawberry.ID("2"),
        title="Черт",
        description="Назвать Руслана чертом",
        is_completed=False,
        category=Category(name="Друзья", color="green"),
    ),
    Task(
        id=strawberry.ID("3"),
        title="Сделать КТ",
        description="Выполнить кт2 по пайтону",
        is_completed=True,
        category=Category(name="Учёба", color="blue"),
    ),
]

@strawberry.type
class Query:
    @strawberry.field # возвращает клиенту весь список задач.
    def all_tasks(self) -> List[Task]:
        return tasks_db

    @strawberry.field  # ищет задачу по айди
    def task(self, id: strawberry.ID) -> Task | None:
        for task in tasks_db:
            if task.id == id:
                return task
        return None

@strawberry.type  # мутация изменяющая список задач
class Mutation:
    @strawberry.mutation  # нвоая задая
    def create_task(self, title: str, description: str = "") -> Task:
        new_task = Task(  # айди исходя из списка
            id=strawberry.ID(str(len(tasks_db) + 1)),
            title=title,
            description=description,
            is_completed=False,
            category=Category(name="Без категории", color="gray"),
        )
        tasks_db.append(new_task)  # сохраняем и выводим
        return new_task

    @strawberry.mutation # поиск задачи и статус
    def complete_task(self, id: strawberry.ID) -> Task | None:
        for task in tasks_db:
            if task.id == id:
                task.is_completed = True
                return task
        return None

schema = strawberry.Schema(query=Query, mutation=Mutation)  # собирает графклсхему
graphql_app = GraphQLRouter(schema)  # маршрутизатор для мутации
app = FastAPI()
app.add_middleware(  # доступ браузера к адресам
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(graphql_app, prefix="/graphql")