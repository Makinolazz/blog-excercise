using BlogApi.Controllers;
using BlogApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace BlogApi.Tests
{
    public class PostsControllerTests : IClassFixture<FakeDBContext>
    {
        PostsController Controller;
        BlogContext Context;

        public PostsControllerTests(FakeDBContext fakeData)
        {
            this.Context = fakeData.BlogContext;
            Controller = new PostsController(Context);
        }

        [Fact]
        public void TemplateMethod()
        {
            // 1. Arrange

            // 2. Act

            // 3. Assert
        }

        [Fact]
        public async void GetPosts_WhenCalled_CountAllPostsInDB()
        {
            // 1. Arrange
            var expectedPostsCount = 4; //total entries in FakeDB
            var actualPostsCount = 0;
            var actionResult = await Controller.GetPosts();

            // 2. Act
            var list = actionResult.Value as IEnumerable<Post>;

            foreach (var item in list)
            {
                actualPostsCount++;
            }

            // 3. Assert
            Assert.NotNull(list);
            Assert.Equal(expectedPostsCount, actualPostsCount);
        }

        [Fact]
        public async void GetPost_WhenCalled_ReturnSelectedPost()
        {
            // 1. Arrange
            long id = 1;
            string title = "Post Title 01";
            var actionResult = await Controller.GetPost(1);
            var obtainedPost = actionResult.Value as Post;

            // 2. Act

            // 3. Assert
            Assert.Equal(obtainedPost.Id, id);
            Assert.Equal(obtainedPost.Title, title);
        }
        
        [Fact]
        public async void PostPost_WhenCalled_AddEntryAndCountTotal()
        {
            // 1. Arrange
            var expectedPostsCount = 5; //total entries in FakeDB + a new one
            var actualPostsCount = 0;
            Post post = new Post {Title = "New Post", Text = "This is a new post", IsPrivate = false, Author = "Developer" };
            var postAction = await Controller.PostPost(post);
            var resultAction = await Controller.GetPosts();

            // 2. Act
            var list = resultAction.Value as IEnumerable<Post>;
            foreach (var item in list)
            {
                actualPostsCount++;
            }

            // 3. Assert
            Assert.NotNull(list);
            Assert.Equal(expectedPostsCount, actualPostsCount);
        }

    }
}
