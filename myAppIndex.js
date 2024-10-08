// ! Функции обработки
const getFormatDate = () => {
	let currentDate = new Date(),
		day = currentDate.getDate(),
		month = currentDate.getMonth(),
		year = currentDate.getFullYear();

	if (day < 10) day = '0' + day;
	if (month < 10) month = '0' + month;

	return `${day}.${month}.${year}`;
};
const getFormatTime = () => {
	let currentTime = new Date(),
		hours = currentTime.getHours(),
		minutes = currentTime.getMinutes();

	if (hours < 10) hours = '0' + hours;
	if (minutes < 10) minutes = '0' + minutes;

	return `${hours}:${minutes}`;
};
const validateForm = () => {
	let validation = false;

	blogAppLeftErrorTitle.textContent = '';
	blogAppLeftInput.style.borderColor = '';
	if (blogAppLeftInput.value.length < 2) {
		validation = true;
		blogAppLeftErrorTitle.textContent = 'минимальное кол-во символов 2';
		blogAppLeftInput.style.borderColor = 'red';
	}
	if (blogAppLeftInput.value.length > 100) {
		validation = true;
		blogAppLeftErrorTitle.textContent = 'максимальное кол-во символов 100';
		blogAppLeftInput.style.borderColor = 'red';
	}

	blogAppLeftErrorText.textContent = '';
	blogAppLeftTextarea.style.borderColor = '';
	if (blogAppLeftTextarea.value.length < 20) {
		validation = true;
		blogAppLeftErrorText.textContent = 'минимальное кол-во символов 20';
		blogAppLeftTextarea.style.borderColor = 'red';
	}
	if (blogAppLeftTextarea.value.length > 200) {
		validation = true;
		blogAppLeftErrorText.textContent = 'максимальное кол-во символов 200';
		blogAppLeftTextarea.style.borderColor = 'red';
	}

	return validation;
};

// ! Функции создания элементов
const createBox = className => {
	const div = document.createElement('div');
	div.classList.add(className);

	return div;
};
const createTitle = (tag, className, text = '') => {
	const title = document.createElement(tag);
	title.classList.add(className);
	title.textContent = text;

	return title;
};
const createForm = className => {
	const form = document.createElement('form');
	form.classList.add(className);

	return form;
};
const createInput = (className, placeholder) => {
	const input = document.createElement('input');
	input.classList.add(className);
	input.type = 'text';
	input.placeholder = placeholder;

	return input;
};
const createTextarea = (className, placeholder) => {
	const textarea = document.createElement('textarea');
	textarea.classList.add(className);
	textarea.type = 'text';
	textarea.placeholder = placeholder;

	return textarea;
};
const createButton = (className, text) => {
	const button = document.createElement('button');
	button.classList.add(className);
	button.textContent = text;

	return button;
};
const createList = className => {
	const list = document.createElement('ul');
	list.classList.add(className);

	return list;
};
const createEmptyItem = () => {
	const item = document.createElement('li'),
		itemText = document.createElement('p');

	item.classList.add('blog-app__item-empty');
	itemText.classList.add('blog-app__item-text');

	itemText.textContent = 'Тут пока пусто...';

	item.append(itemText);

	return item;
};
const createItem = post => {
	const item = document.createElement('li'),
		itemDate = document.createElement('p'),
		itemTitle = document.createElement('h3'),
		itemText = document.createElement('p');

	item.classList.add('blog-app__item');
	itemDate.classList.add('blog-app__item-date');
	itemTitle.classList.add('blog-app__item-title');
	itemText.classList.add('blog-app__item-text');

	itemDate.textContent = `${post.date} ${post.time}`;
	itemTitle.textContent = post.title;
	itemText.textContent = post.text;

	item.append(itemDate, itemTitle, itemText);

	return item;
};

// ! переменные
const posts = [];
const blogAppInner = createBox('blog-app'),
	blogAppContainer = createBox('container'),
	blogAppLeftInner = createBox('blog-app__left'),
	blogAppLeftTitle = createTitle('h2', 'blog-app__title', 'Новый пост'),
	blogAppLeftForm = createForm('blog-app__form'),
	blogAppLeftInput = createInput('blog-app__form-input', 'Заголовок'),
	blogAppLeftTextarea = createTextarea(
		'blog-app__form-textarea',
		'Напиши пост'
	),
	blogAppLeftButton = createButton('blog-app__form-btn', 'Опубликовать'),
	blogAppLeftErrorsInner = createBox('blog-app__errors'),
	blogAppLeftErrorTitle = createTitle('p', 'blog-app__error'),
	blogAppLeftErrorText = createTitle('p', 'blog-app__error'),
	blogAppRightInner = createBox('blog-app__right'),
	blogAppRightTitle = createTitle('h1', 'blog-app__title', 'Лента'),
	blogAppRightPostTitle = createTitle('h3', 'blog-app__post-title'),
	blogAppRightList = createList('blog-app__list'),
	blogAppRightEmptyItem = createEmptyItem();

// ! отображение приложения
blogAppRightList.append(blogAppRightEmptyItem);
blogAppRightInner.append(blogAppRightTitle, blogAppRightList);
blogAppLeftForm.append(
	blogAppLeftInput,
	blogAppLeftTextarea,
	blogAppLeftButton
);
blogAppLeftErrorsInner.append(blogAppLeftErrorTitle, blogAppLeftErrorText);
blogAppLeftInner.append(
	blogAppLeftTitle,
	blogAppLeftForm,
	blogAppLeftErrorsInner
);
blogAppContainer.append(blogAppLeftInner, blogAppRightInner);
blogAppInner.append(blogAppContainer);
document.body.append(blogAppInner);

// ! Работа приложения
const getPostFromUser = () => {
	const date = getFormatDate(),
		time = getFormatTime(),
		title = blogAppLeftInput.value,
		text = blogAppLeftTextarea.value;

	return {
		date,
		time,
		title,
		text,
	};
};
const addPost = ({ date, time, title, text }) => {
	const newPostObj = {
		date,
		time,
		title,
		text,
	};

	posts.push(newPostObj);
};
const getPosts = () => {
	return posts;
};
const renderPosts = () => {
	const posts = getPosts();
	posts.forEach(post => {
		const newPost = createItem(post);
		blogAppRightList.append(newPost);
	});
};
const clearInputsValue = () => {
	blogAppLeftInput.value = '';
	blogAppLeftTextarea.value = '';
};

blogAppLeftButton.addEventListener('click', e => {
	e.preventDefault();
	if (validateForm() == true) {
		return;
	}
	blogAppRightList.innerHTML = '';
	// получение данных от пользователя
	const newPostFromUser = getPostFromUser();
	// сохранить поста
	addPost(newPostFromUser);
	// рендер поста
	renderPosts();
	// очистка полей ввода
	clearInputsValue();
});
