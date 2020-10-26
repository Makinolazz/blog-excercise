using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogApi.Models
{
    public class Post
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public bool IsPrivate { get; set; }
        public string Author { get; set; }
    }
}
