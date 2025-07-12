document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('post-form');
    const nameInput = document.getElementById('name');
    const postInput = document.getElementById('post');
    const feed = document.getElementById('feed');
    const API_BASE = import.meta.env.VITE_API_BASE_URL

    // Function to generate a random anonymous name
    const generateRandomName = () => {
        return `anon${Math.floor(Math.random() * 10000)}`;
    };

    // Function to fetch and display posts
    const fetchPosts = async () => {
        try {
            const response = await fetch(`${API_BASE}/posts`);
            const posts = await response.json();
            feed.innerHTML = ''; // Clear the feed
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `
                    <div class="name">by: ${post.name}</div>
                    <div class="text">${post.text}</div>
                `;
                feed.prepend(postElement); // Add new posts to the top
            });
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    // Handle form submission
    postForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        let name = nameInput.value.trim();
        if (!name) {
            name = generateRandomName();
        }

        const text = postInput.value.trim();
        if (!text) {
            alert('Post content cannot be empty.');
            return;
        }

        try {
            const response = await fetch(`${API_BASE}/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, text }),
            });

            if (response.ok) {
                postInput.value = ''; // Clear the post input
                fetchPosts(); // Refresh the feed
            } else {
                alert('Failed to submit post.');
            }
        } catch (error) {
            console.error('Error submitting post:', error);
        }
    });

    // Initial fetch of posts when the page loads
    fetchPosts();
});