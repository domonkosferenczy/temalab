using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using todo_server.Models;

namespace todo_server.Services
{
    public interface ITodosInterface
    {
        Task<IEnumerable<Todo>> GetTodos();
        Task<Todo> GetTodo(int id);
        Task EditTodo(Todo todo);
        Task<Todo> AddTodo(Todo todo);
        Task DeleteTodo(int id);
        bool TodoExists(int id);
    }
}
