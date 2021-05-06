using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using todo_server.Models;
using System.Diagnostics;

namespace todo_server.Services
{
    public class TodosService : ITodosInterface
    {
        private readonly TodosDbContext _context;
        public TodosService(TodosDbContext context)
        {
            _context = context;
        }

        public async Task EditTodo(Todo todo)
        {
            Todo newTodo = todo;
            var entry = _context.Todos.Attach(newTodo);
            entry.State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteTodo(int id)
        {
            _context.Todos.Remove(new Todo { Id = id });
            await _context.SaveChangesAsync();
        }

        public async Task<Todo> AddTodo(Todo todo)
        {
            _context.Todos.Add(todo);
            await _context.SaveChangesAsync();

            return await GetTodo(todo.Id);
        }

        public async Task<Todo> GetTodo(int id)
        {
            var todo = await _context.Todos.FindAsync(id);

            if (todo == null)
            {
                throw new BadHttpRequestException("");
            }

            return todo;
        }

        public async Task<IEnumerable<Todo>> GetTodos()
        {
            return await _context.Todos.ToListAsync();
        }

        public bool TodoExists(int id)
        {
            return _context.Todos.Any(e => e.Id == id);
        }
    }
}
