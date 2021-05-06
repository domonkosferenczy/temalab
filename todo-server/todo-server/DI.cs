using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using todo_server.Services;
using todo_server.Models;

namespace todo_server
{
    public static class DI
    {
        public static IServiceCollection AddTodoDbContext(this IServiceCollection services, string connectionString)
        {
            return services.AddDbContext<TodosDbContext>(options => options.UseSqlServer(connectionString));
        }

        public static IServiceCollection AddTodoService(this IServiceCollection services)
        {
            return services.AddScoped<ITodosInterface, TodosService>();
        }
    }
}
