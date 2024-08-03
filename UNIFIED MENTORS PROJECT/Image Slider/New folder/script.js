let currentIndex = 0;
const slideIntervalTime = 7000;
let autoSlideInterval;

function updateBackgroundImage(index) {
  const slides = document.querySelectorAll('.slide');
  const imageUrl = slides[index].querySelector('img').src;
  document.querySelector('.background').style.backgroundImage = `url('${imageUrl}')`;
}

function showSlide(index) {
  const slides = document.querySelectorAll('.slide');
  const slider = document.querySelector('.slider');
  slider.style.transform = 'translateX(' + (-index * 100) + '%)';
  updateBackgroundImage(index);
}

function prevSlide() {
  currentIndex = (currentIndex > 0) ? currentIndex - 1 : document.querySelectorAll('.slide').length - 1;
  showSlide(currentIndex);
}

function nextSlide() {
  currentIndex = (currentIndex < document.querySelectorAll('.slide').length - 1) ? currentIndex + 1 : 0;
  showSlide(currentIndex);
}

function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, slideIntervalTime);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

function resetAutoSlide() {
  stopAutoSlide();
  startAutoSlide();
}

function viewFullScreen() {
  const slide = document.querySelectorAll('.slide')[currentIndex];
  const img = slide.querySelector('img');
  if (img.requestFullscreen) {
    img.requestFullscreen();
  } else if (img.mozRequestFullScreen) { /* Firefox */
    img.mozRequestFullScreen();
  } else if (img.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
    img.webkitRequestFullscreen();
  } else if (img.msRequestFullscreen) { /* IE/Edge */
    img.msRequestFullscreen();
  }
}

// Initial display
showSlide(currentIndex);
startAutoSlide();
