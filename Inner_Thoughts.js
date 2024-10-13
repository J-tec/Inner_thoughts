// Mock login validation
const loginForm = document.getElementById('login-form');
const blogContainer = document.getElementById('blog-container');
const loginBox = document.getElementById('login-box');
const greeting = document.getElementById('greeting');

let currentUser = '';

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  currentUser = document.getElementById('username').value;
  loginBox.classList.add('hidden');
  blogContainer.classList.remove('hidden');
  greeting.innerHTML = `Welcome, ${currentUser}`;
});

// Tabs switching functionality
const communityPostsTab = document.getElementById('community-posts-tab');
const myPostsTab = document.getElementById('my-posts-tab');
const communityPosts = document.getElementById('community-posts');
const myPosts = document.getElementById('my-posts');

communityPostsTab.addEventListener('click', () => {
  communityPosts.classList.remove('hidden');
  myPosts.classList.add('hidden');
});

myPostsTab.addEventListener('click', () => {
  myPosts.classList.remove('hidden');
  communityPosts.classList.add('hidden');
});

// Add post functionality
const addPostBtn = document.getElementById('add-post-btn');
const addPostBox = document.getElementById('add-post-box');
const cancelPostBtn = document.getElementById('cancel-post-btn');
const addPostForm = document.getElementById('add-post-form');
const communityPostsList = document.getElementById('community-posts-list');
const myPostsList = document.getElementById('my-posts-list');

addPostBtn.addEventListener('click', () => {
  addPostBox.classList.remove('hidden');
});

cancelPostBtn.addEventListener('click', () => {
  addPostBox.classList.add('hidden');
});

addPostForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const postContent = document.getElementById('post-content').value;

  // Create new post element
  const post = createPostElement(currentUser, postContent);

  // Add to community and my posts
  communityPostsList.appendChild(post.cloneNode(true));
  myPostsList.appendChild(post);

  // Hide the add post box
  addPostBox.classList.add('hidden');

  // Save post to local storage
  savePost(currentUser, postContent);
});

// Helper function to create a post element
function createPostElement(username, content) {
  const post = document.createElement('div');
  post.classList.add('post');
  post.innerHTML = `<strong>${username}:</strong> ${content}`;
  return post;
}

// Function to save post in local storage
function savePost(username, content) {
  let posts = JSON.parse(localStorage.getItem('posts')) || [];
  posts.push({ username, content });
  localStorage.setItem('posts', JSON.stringify(posts));
}

// Function to load posts on page load
function loadPosts() {
  let posts = JSON.parse(localStorage.getItem('posts')) || [];
  posts.forEach(post => {
    const postElement = createPostElement(post.username, post.content);
    communityPostsList.appendChild(postElement.cloneNode(true));
    if (post.username === currentUser) {
      myPostsList.appendChild(postElement);
    }
  });
}

document.addEventListener('DOMContentLoaded', loadPosts);
