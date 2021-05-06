using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using todo_server.Models;
using todo_server.Services;

namespace todo_server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class TodosController : ControllerBase
    {
        readonly ITodosInterface TodosService;
        public TodosController(ITodosInterface todosService)
        {
            TodosService = todosService;
        }

        // GET: api/Todos
        [HttpGet]
        [Produces("application/json")]
        public async Task<ActionResult<IEnumerable<Todo>>> GetTodos()
        {
            return new ActionResult<IEnumerable<Todo>>(await TodosService.GetTodos());
        }

        // GET: api/Todos/5
        [HttpGet("{id}")]
        [Produces("application/json")]
        public async Task<ActionResult<Todo>> GetTodo(int id)
        {
            try
            {
                return new ActionResult<Todo>(await TodosService.GetTodo(id));
            } catch (Exception e)
            {
                return NotFound();
            }
        }

        // PUT: api/Todos/5
        [HttpPut("{id}")]
        [Produces("application/json")]
        public async Task<IActionResult> PutTodo(int id, Todo todo)
        {
            try
            {
                todo.Id = id;
                await TodosService.EditTodo(todo);
                return NoContent();
            } catch (Exception e)
            {
                return BadRequest();
            }
        }

        // POST: api/Todos
        [HttpPost]
        [Produces("application/json")]
        public async Task<ActionResult<Todo>> PostTodo(Todo todo)
        {
            try
            {
                return new ActionResult<Todo>(await TodosService.AddTodo(todo));
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        // DELETE: api/Todos/5
        [HttpDelete("{id}")]
        [Produces("application/json")]
        public async Task<IActionResult> DeleteTodo(int id)
        {
            try
            {
                await TodosService.DeleteTodo(id);
                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }
    }
}
