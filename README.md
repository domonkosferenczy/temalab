# Egyszerű .NET és React webalkalmazás

## Háttéralkalmazás
- C#
- .NET Core 5.0
- Entity Framework

### A háttéralkamazás rétegei

**Models**

```Class Todo```
*Az egyes Todo-k osztálya*

- Id : int (primary key)
- Name : string?
- Description : string?
- State : string?
- Deadline : DateTime?
- Priority : int?

```DbContext TodosDbContext```
*Adatbázis kontexus a Todok-hoz*

- A *Todo* adatbázis táblával van összekötve

**Services**

```Interface ITodosInterface```
*A Todo-k CRUD műveleteit támogató interfész*

- GetTodos() -> Összes elérhető Todo az adatbázisban
- GetTodo(int id) -> Adott azonosítójú Todo
- EditTodo(Todo todo) -> Szerkeszti a Todo-t (Id szükséges)
- AddTodo(Todo todo) -> Hozzáad új elemet
- DeleteTodo(int id) -> Törli
- TodoExists(int id) -> Ellenőrzi, hogy léttezik-e az adott Todo

```Class TodosService```
*Az ITodosInterface előírt függvényeit valósítja meg*

**Controllers**

```Class TodosController```
*API Controller*

- GET: api/Todos -> GetTodos()
- GET: api/Todos/{:id} -> GetTodo(int id)
- PUT: /api/Todos/{:id} -> EditTodo(Todo todo)
- POST: /api/Todos -> AddTodo(Todo todo)
- DELETE: /api/Todos/{:id} -> DeleteTodo(int id)

- application/json adatot vár és azzal is tér vissza
- Ha valamilyen hibába ütközik a kérés, akkor 400-as hibakóddal tér vissza az API kérés
- Az xUnit tesztelhetőség miatt fontos, hogy a TodosService konstruktorban kapja meg a TodosService osztáltyt, ami ITodosInterface függőségként jelenik meg *(Dependency Injection)*

*Fejlesztői környezetben való futtatás során a localhost 44338-as portján érhető el.*

**XUnitTestProject**

```Class UnitTest```
*A TodosService osztály tesztelését szolgálja*

- Dependency Injection miatt, Unit tesztelhető a projekt, egy memória alapú adatbázis esetén

## Kliensalkalmazás
