using BlogApi.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace BlogApi.Tests
{
    public class FakeDBContext : IDisposable
    {
        public BlogContext BlogContext { get; set; }

        public FakeDBContext()
        {
            var options = new DbContextOptionsBuilder<BlogContext>()
                .UseInMemoryDatabase("PostsList")
                .Options;

            BlogContext = new BlogContext(options);

            BlogContext.Posts.Add(new Post { Id = 1, Title = "Post Title 01", Text = "Post 01 Text", IsPrivate = false, Author = "1st Author" });
            BlogContext.Posts.Add(new Post { Id = 2, Title = "Post Title 02", Text = "Post 02 Text", IsPrivate = false, Author = "2nd Author" });
            BlogContext.Posts.Add(new Post { Id = 3, Title = "Post Title 03", Text = "Post 03 Text", IsPrivate = true, Author = "3rd Author" });
            BlogContext.Posts.Add(new Post { Id = 4, Title = "Post Title 04", Text = "Post 04 Text", IsPrivate = true, Author = "4th Author" });
            BlogContext.SaveChanges();
        }

        public void Dispose()
        {
            BlogContext.Dispose();
        }
    }
}
