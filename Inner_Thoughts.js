// Sample posts data stored in localStorage
let posts = JSON.parse(localStorage.getItem("posts")) || [];
let currentUser = null;

// Simulate login
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Here, any username and password will allow access
    if (username && password) {
        currentUser = username; // Store current user

        // Hide the login box
        document.getElementById("login-container").style.display = "none";

        // Show community posts by default
        showCommunityPosts();
    } else {
        alert("Please enter a username and password.");
    }
}

// Show community posts
function showCommunityPosts() {
    document.getElementById("community-posts").style.display = "block";
    document.getElementById("my-posts").style.display = "none";
    displayCommunityPosts(); // Display community posts
}

// Show my posts
function showMyPosts() {
    document.getElementById("community-posts").style.display = "none";
    document.getElementById("my-posts").style.display = "block";
    displayMyPosts(); // Display user's posts
}

// Show post form
function showPostForm() {
    document.getElementById("post-form").style.display = "flex";
    document.getElementById("new-post-content").value = ""; // Clear previous text
}

// Cancel post
function cancelPost() {
    document.getElementById("post-form").style.display = "none";
}

// Submit post
function submitPost() {
    const content = document.getElementById("new-post-content").value;

    if (content) {
        // Add post to posts and save to localStorage
        posts.push({ username: currentUser || "Anonymous", content });
        localStorage.setItem("posts", JSON.stringify(posts));

        // After submission, refresh the posts display in both sections
        displayCommunityPosts();
        displayMyPosts();

        // Hide the post form after submission
        document.getElementById("post-form").style.display = "none";
    } else {
        alert("Please enter some content to post.");
    }
}

// Display community posts (No Edit/Delete options here)
function displayCommunityPosts() {
    const communityPostsSection = document.getElementById("community-posts");
    communityPostsSection.innerHTML = '<h2>Community Posts</h2>';

    posts.forEach(post => {
        const postElement = `
            <div class="post">
                <h3>Username: ${post.username}</h3>
                <p>${post.content}</p>
            </div>
        `;
        communityPostsSection.innerHTML += postElement;
    });
}

// Display user's posts in "My Posts" (with Edit/Delete options)
function displayMyPosts() {
    const myPostsSection = document.getElementById("my-posts");
    myPostsSection.innerHTML = '<h2>My Posts</h2><button class="add-post-btn" onclick="showPostForm()">Add Post+</button>';
    
    posts.forEach((post, index) => {
        if (post.username === currentUser) {
            const postElement = `
                <div class="post">
                    <h3>Username: ${post.username}</h3>
                    <p>${post.content}</p>
                    <button onclick="editPost(${index})">Edit</button>
                    <button onclick="deletePost(${index})">Delete</button>
                </div>
            `;
            myPostsSection.innerHTML += postElement;
        }
    });
}

// Edit post
function editPost(index) {
    const post = posts[index];
    document.getElementById("new-post-content").value = post.content; // Load content into post form
    showPostForm(); // Show form for editing

    // Remove the post from posts array (this is a workaround for now)
    posts.splice(index, 1);
    localStorage.setItem("posts", JSON.stringify(posts)); // Save to localStorage
}

// Delete post
function deletePost(index) {
    posts.splice(index, 1);
    localStorage.setItem("posts", JSON.stringify(posts)); // Save to localStorage
    displayMyPosts(); // Refresh user's posts after deletion
    displayCommunityPosts(); // Refresh community posts after deletion
}
