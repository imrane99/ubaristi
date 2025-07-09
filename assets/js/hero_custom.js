document.addEventListener('DOMContentLoaded', () => {
  const slideInterval = 3000;

  const heroSection = document.querySelector('.hero-section-ub');
  const slides = document.querySelectorAll('.slide-ub');
  const dotsContainer = document.querySelector('.slider-dots-ub');

  if (slides.length === 0) return;

  let currentSlide = 0;
  let slideTimer;

  function createDots() {
    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.classList.add('dot-ub');
      dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
      dot.addEventListener('click', () => {
        goToSlide(index);
        resetTimer();
      });
      dotsContainer.appendChild(dot);
    });
  }

  function updateSlider() {
    const activeSlide = slides[currentSlide];
    const newColor = activeSlide.dataset.color;

    if (newColor) {
      heroSection.style.setProperty('--accent-color', newColor);
    }

    slides.forEach((slide, index) => {
      slide.classList.toggle('active', index === currentSlide);
    });

    const dots = document.querySelectorAll('.dot-ub');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  }

  function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateSlider();
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
  }

  function resetTimer() {
    clearInterval(slideTimer);
    slideTimer = setInterval(nextSlide, slideInterval);
  }

  createDots();
  updateSlider();
  resetTimer();
});
