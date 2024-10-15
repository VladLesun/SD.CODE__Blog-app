const posts = [];

const TITLE_VALIDATION_LIMIT = 10,
	TEXT_VALIDATION_LIMIT = 20;

const postTitleInputNode = document.querySelector('.js-post-title');
const postTextTextareaNode = document.querySelector('.js-post-text');
const newPostsBtnNode = document.querySelector('.js-new-post-btn');
const postsNode = document.querySelector('.js-posts');
const validationMessage = document.getElementById('validationMessage');

const declOfNum = (n, titles) =>
	n +
	' ' +
	titles[
		n % 10 === 1 && n % 100 !== 11
			? 0
			: n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
			? 1
			: 2
	];
const validation = () => {
	const titleLength = postTitleInputNode.value.length,
		textLength = postTextTextareaNode.value.length;

	const errorsTitleSymbols = declOfNum(titleLength - TITLE_VALIDATION_LIMIT, [
			'символ',
			'символа',
			'символов',
		]),
		errorsTextSymbols = declOfNum(textLength - TEXT_VALIDATION_LIMIT, [
			'символ',
			'символа',
			'символов',
		]);

	if (titleLength > TITLE_VALIDATION_LIMIT) {
		postTitleInputNode.style.borderColor = 'red';
		validationMessage.textContent = `
		Заголовок не должен превышать ${TITLE_VALIDATION_LIMIT} символов, превышение на ${errorsTitleSymbols}`;
		validationMessage.classList.remove('blog-app__errors_hidden');
		newPostsBtnNode.disabled = true;
		return;
	}

	postTitleInputNode.style.borderColor = 'black';

	if (textLength > TEXT_VALIDATION_LIMIT) {
		postTextTextareaNode.style.borderColor = 'red';
		validationMessage.textContent = `
		Текст не должен превышать ${TEXT_VALIDATION_LIMIT} символов, превышение на ${errorsTextSymbols}`;
		validationMessage.classList.remove('blog-app__errors_hidden');
		newPostsBtnNode.disabled = true;
		return;
	}

	postTextTextareaNode.style.borderColor = 'black';
	validationMessage.classList.add('blog-app__errors_hidden');
	newPostsBtnNode.disabled = false;
};
const getFormatDate = () => {
	let currentTime = new Date(),
		minutes = currentTime.getMinutes(),
		hours = currentTime.getHours(),
		days = currentTime.getDate(),
		month = currentTime.getMonth(),
		years = currentTime.getFullYear();

	if (minutes < 10) minutes = '0' + minutes;
	if (hours < 10) hours = '0' + hours;
	if (days < 10) days = '0' + days;
	if (month < 10) month = '0' + month;

	return `${days}.${month}.${years} ${hours}:${minutes}`;
};
const getFormatMinutes = () => {
	let currentDate = new Date(),
		minutes = currentDate.getMinutes();

	return minutes;
};

const getPostFromUser = () => {
	const postTitle = postTitleInputNode.value,
		postText = postTextTextareaNode.value;

	return {
		date: getFormatDate(),
		minutes: getFormatMinutes(),
		title: postTitle,
		text: postText,
	};
};
const addPost = ({ date, minutes, title, text }) => {
	const newObjPost = {
		date,
		minutes,
		title,
		text,
	};
	posts.push(newObjPost);
};
const getPosts = () => {
	return posts;
};
const renderPosts = () => {
	const currentDate = new Date();

	const posts = getPosts();
	let postsHTML = '';

	posts.forEach(post => {
		postsHTML += `
			<div class="blog-app__item">
				<p class="blog-app__item-date">${
					currentDate.getMinutes() - post.minutes < 1
						? 'Меньше минуты назад...'
						: currentDate.getMinutes() - post.minutes <= 2
						? declOfNum(currentDate.getMinutes() - post.minutes, [
								'минута назад...',
								'минуты назад...',
								'минут назад...',
						  ])
						: post.date
				}
				</p>
				<p class="blog-app__item-title">${post.title}</p>
				<p class="blog-app__item-text">${post.text}</p>
			</div>
		`;
	});

	postsNode.innerHTML = postsHTML;
};

postTitleInputNode.addEventListener('input', validation);
postTextTextareaNode.addEventListener('input', validation);

newPostsBtnNode.addEventListener('click', e => {
	e.preventDefault();
	// получение данных от пользователя
	const newPostFromUser = getPostFromUser();
	// сохранить поста
	addPost(newPostFromUser);
	// рендер поста
	renderPosts();
});
