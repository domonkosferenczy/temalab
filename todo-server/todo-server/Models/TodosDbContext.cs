using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace todo_server.Models
{
    public class TodosDbContext : DbContext
    {
        public DbSet<Todo> Todos { get; set; }

        public TodosDbContext(DbContextOptions<TodosDbContext> options) : base(options)
        {
        }

        public TodosDbContext()
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Todo>().ToTable("Todo");
        }
    }
}
