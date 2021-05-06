using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Data.Common;
using System.Diagnostics;
using System.Threading.Tasks;
using todo_server.Models;
using todo_server.Services;
using Microsoft.Data.Sqlite;


namespace XUnitTestProject
{
    [TestClass]
    public class UnitTest
    {
        [TestMethod]
        public async Task GetTodos()
        {
            var optionsBuilder = new DbContextOptionsBuilder<TodosDbContext>()
                .UseSqlServer(CreateInMemoryDatabase());

            TodosDbContext TodosContext = new TodosDbContext(optionsBuilder.Options);
            TodosService todosService = new TodosService(TodosContext);

            TodosContext.Todos.Add(new Todo());
            var obj = await todosService.GetTodos();
            Assert.IsNotNull(obj);
        }

        [TestMethod]
        public async Task GetTodos2()
        {
            var optionsBuilder = new DbContextOptionsBuilder<TodosDbContext>()
                .UseSqlServer(CreateInMemoryDatabase());        

            TodosDbContext TodosContext = new TodosDbContext(optionsBuilder.Options);
            TodosService todosService = new TodosService(TodosContext);

            var obj = await todosService.GetTodo(1);
            Assert.IsNull(obj);
        }

        private static DbConnection CreateInMemoryDatabase()
        {
            var connection = new SqliteConnection(@"DataSource=:memory:");

            connection.Open();

            return connection;
        }
    }
}
