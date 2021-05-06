using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace todo_server.Models
{
    public class Todo
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? State { get; set; }
        public DateTime? Deadline { get; set; }
        public int? Priority { get; set; }
    }
}
