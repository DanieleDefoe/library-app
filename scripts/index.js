class BookCard {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}

const addBookPopup = document.getElementById('book-add');
const editBookPopup = document.getElementById('book-edit');

const addBookBtn = document.querySelector('.header__add-button');
const exitPopupBtns = document.querySelectorAll('.book-form__exit');

const bookGrid = document.querySelector('.book-cards');

const bookForm = document.forms['book-form'];
const bookTitle = bookForm.querySelector('#book-title');
const bookAuthor = bookForm.querySelector('#book-author');
const bookPages = bookForm.querySelector('#book-total-pages');
const bookIsRead = bookForm.querySelector('#is-finished');

const bookFormEdit = document.forms['book-form-edit'];
const bookTitleEdit = bookFormEdit.querySelector('#book-title-edit');
const bookAuthorEdit = bookFormEdit.querySelector('#book-author-edit');
const bookPagesEdit = bookFormEdit.querySelector('#book-total-pages-edit');
const bookIsReadEdit = bookFormEdit.querySelector('#is-finished-edit');

const cardTemplate = document.getElementById('card-template').content;

const openPopup = (popup) => {
  popup.classList.add('book-popup_active');
};

const closePopup = () => {
  document
    .querySelector('.book-popup_active')
    .classList.remove('book-popup_active');
};

const closePopupOnOverlayClick = (e) => {
  if (e.target !== e.currentTarget) return;
  closePopup();
};

const removeCard = (e) => {
  e.stopPropagation();
  e.target.closest('.card').remove();
};

const returnFormData = (title, author, pages, isRead) => {
  bookTitleEdit.value = title;
  bookAuthorEdit.value = author;
  bookPagesEdit.value = pages;
  if (!isRead) {
    bookIsReadEdit.checked = false
  } else {
    bookIsReadEdit.checked = true
  }
  openPopup(editBookPopup);
};

let currentClickedArticle;

const createCard = () => {
  const article = cardTemplate.cloneNode(true);
  const book = new BookCard(
    bookTitle.value,
    bookAuthor.value,
    bookPages.value,
    bookIsRead.checked,
  );
  article.querySelector('.card__title').textContent = book.title;
  article.querySelector('.card__author').textContent = book.author;
  article.querySelector('.card__pages').textContent = book.pages;
  article.querySelector('.card__remove').addEventListener('click', removeCard);
  const articleNode = article.querySelector('.card');
  articleNode.addEventListener('click', () => {
    currentClickedArticle = articleNode;
    returnFormData(
      currentClickedArticle.children[0].textContent,
      currentClickedArticle.children[1].textContent,
      currentClickedArticle.children[2].textContent,
      articleNode.classList.contains('card_read'),
    );
  });
  if (book.isRead) articleNode.classList.add('card_read');
  return article;
};

const prependCard = (e) => {
  e.preventDefault();
  const article = createCard();
  bookGrid.prepend(article);
  closePopup();
  bookForm.reset();
};

const editCard = (e) => {
  e.preventDefault();
  currentClickedArticle.querySelector('.card__title').textContent = bookTitleEdit.value;
  currentClickedArticle.querySelector('.card__author').textContent = bookAuthorEdit.value;
  currentClickedArticle.querySelector('.card__pages').textContent = bookPagesEdit.value;
  if (bookIsReadEdit.checked) {
    currentClickedArticle.classList.add('card_read');
  } else {
    currentClickedArticle.classList.remove('card_read');
  }
  closePopup();
};

addBookPopup.addEventListener('click', closePopupOnOverlayClick);
editBookPopup.addEventListener('click', closePopupOnOverlayClick);

addBookBtn.addEventListener('click', () => openPopup(addBookPopup));
exitPopupBtns.forEach((exit) => exit.addEventListener('click', closePopup));

bookForm.addEventListener('submit', prependCard);
bookFormEdit.addEventListener('submit', editCard);
