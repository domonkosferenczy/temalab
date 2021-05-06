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

- JavaScript (TypeScript)
- React 17.0.1
- Material UI

### Az alkalmazás szerkezete

**Store**

```store.tsx```

Az alkalmazás Globális State Menedzsment a feladata

- A globális state-hez az alkalamzás a Context API-t használja. A StoreContext-et itt hozza létre és teszi elérhetővé az egész alkalmazáson belül (state a lekérdezéshez, dispatcher a módosításhoz szükséges)
- A StoreContext az egész TodoApp-ot körülöleli, hogy mindenhonnan elérhető legyen

```reduxer.tsx```

A globális state manipulását menedzseli

- "updateTodos": Az összes elérhető Todo manipulása
- "updateChosenTodo": A kiválaszott (szerkesztett) Todo-t állítja
- "updateLoaded": A flag-et lehet vele állítani, ami megadja, hogy már betöltötte-e a Todok-at

```Actions - NOT IMPLEMENTED```

A klasszikus Redux modell ellentétben Actions-ok nincsenek. Az alkalmazás méreretét tekintve nem fontos

```api.tsx```

A globális apiFetch függvényt tartalmazza, ami a megadott API endpointra, megfelelő beállításokkal hívást kezdeményez és a választ JSON-ból objektummá konvertálja

**UI Modulok**

```TodoApp```

A legfelső komponens, ami összefogja az egész UI-t. Ha még nem történt meg a Todo-k beolvasása, akkor API hívást kezdeményez és elmenti a globális state-be.
Inicializája a *CreateEdit*, *TodoList* komponenseket.

```TodoList```

Props-ként megkapja, hogy milyen Todo State-et (depending, processing, done) kell megjelenítenie. Az alapján filterezi a globális state-ből a Todo-kat. Továbá a Todo Priority szerint csökkendő sorrendbe rendezi az elemeket, majd minden egyes Todo objektumból egy *ToDoListElement* React Komponenst készít, amit beágyaz a TodoList-be.

```TodoListElement```

Props-ként megkapja az egész Todo-t. 2 feladatot lát el:
- Kattintás esetén (onClick) a *chosenTodo* értékét állítja
- Formázza és megjeleníti az adatokat

```CreateEdit```

Felelős az új Todo létrehozásáért és szerkesztéséért is. Ha a *chosenTodo* értéke null, de a Modal meg van nyitva, akkor mint CreateForm műkődik, ha a *chosenTodo* értéke integer, akkor EditForm a funkcionalitása.

Csak akkor hajtódik végre esemény ha jobb felső Mentés gomb lenyomása megtörténik (Új/Szerkesztés esetén ugyanaz).

Törölni egyszerűen a kuka inokkal lehet.

**Config**

Az alkalmazás tartalmaz egy Config fájlt is, ami az API elérési útvonalát tartalmazza.

### UI Reszponzivitás

A Material UI könyvtár által támogatott Grid layout-tal készült az alkalmazás és mobilra, tabletre, nagyképernyőre is optimalizált.


Az alkalmazás elindításakor a localhost 3000-es portján érhető el.
