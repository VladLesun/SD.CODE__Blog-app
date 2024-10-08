const posts = [];

const postTitleInputNode = document.querySelector('.js-post-title');
const postTextTextareaNode = document.querySelector('.js-post-text');
const newPostsBtnNode = document.querySelector('.js-new-post-btn');
const postsNode = document.querySelector('.js-posts');

const getPostFromUser = () => {
	const title = postTitleInputNode.value,
		text = postTextTextareaNode.value;

	return {
		title,
		text,
	};
};
const addPost = ({ title, text }) => {
	posts.push({
		title,
		text,
	});
};
const getPosts = () => {
	return posts;
};
const renderPosts = () => {
	const posts = getPosts();

	let postsHTML = '';

	posts.forEach(post => {
		postsHTML += `
		<div class="blog-app__item">
			<p class="blog-app__item-title">${post.title}</p>
			<p class="blog-app__item-text">${post.text}</p>
		</div>
	`;
	});

	postsNode.innerHTML = postsHTML;
};

newPostsBtnNode.addEventListener('click', e => {
	e.preventDefault();
	// получение данных от пользователя
	const newPostFromUser = getPostFromUser();

	// сохранить поста
	addPost(newPostFromUser);

	// рендер поста
	renderPosts();
});
