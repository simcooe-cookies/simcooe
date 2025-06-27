const cards = document.querySelectorAll('.card');
const dots = document.querySelectorAll('.dot');
const leftArrow = document.querySelector('.nav-arrow.left');
const rightArrow = document.querySelector('.nav-arrow.right');
const memberName = document.querySelector('.member-name');
const memberRole = document.querySelector('.member-role');

const names = ['The Classic', 'Oreo Lovers', 'Snickerdoodle', 'Holiday Special'];
const roles = ['Chocolate Chip Cookie', 'Oreo Chunk Cookie', 'Cinnamon Sugar Cookie', 'SURPRISE!'];

let currentIndex = 0;

function updateCarousel(index) {
  const total = cards.length;

  cards.forEach((card, i) => {
    card.className = 'card'; // reset
    const position = (i - index + total) % total;

    if (i === index) {
      card.classList.add('center');
    } else if (position === 1 || position === -3) {
      card.classList.add('right-1');
    } else if (position === 2 || position === -2) {
      card.classList.add('right-2');
    } else if (position === total - 1 || position === -1) {
      card.classList.add('left-1');
    } else if (position === total - 2 || position === -2) {
      card.classList.add('left-2');
    } else {
      card.classList.add('hidden');
    }
  });

  dots.forEach(dot => dot.classList.remove('active'));
  if (dots[index]) dots[index].classList.add('active');

  memberName.textContent = names[index];
  memberRole.textContent = roles[index];
}

function goLeft() {
  currentIndex = (currentIndex - 1 + cards.length) % cards.length;
  updateCarousel(currentIndex);
}

function goRight() {
  currentIndex = (currentIndex + 1) % cards.length;
  updateCarousel(currentIndex);
}

leftArrow.addEventListener('click', goLeft);
rightArrow.addEventListener('click', goRight);

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    currentIndex = parseInt(dot.dataset.index);
    updateCarousel(currentIndex);
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') goLeft();
  if (e.key === 'ArrowRight') goRight();
});

// swipe
let startX = 0;
let endX = 0;

document.querySelector('.carousel-track').addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});

document.querySelector('.carousel-track').addEventListener('touchend', e => {
  endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) goRight();
  if (endX - startX > 50) goLeft();
});

updateCarousel(currentIndex);
