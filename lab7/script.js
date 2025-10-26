document.addEventListener('DOMContentLoaded', function() {
    const sliderTrack = document.getElementById('sliderTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentPageElement = document.querySelector('.current-page');
    const totalPagesElement = document.querySelector('.total-pages');
    
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    let currentSlide = 0;
    
    function getSlidesPerView() {
        if (window.innerWidth <= 768) {
            return 1;
        } else if (window.innerWidth <= 1024) {
            return 2; 
        } else {
            return 3; 
        }
    }
    
    function calculateTotalPages() {
        const slidesPerView = getSlidesPerView();
        return Math.ceil(totalSlides / slidesPerView);
    }
    
    function updatePager() {
        const slidesPerView = getSlidesPerView();
        const totalPages = calculateTotalPages();
        const currentPage = Math.floor(currentSlide / slidesPerView) + 1;
        
        currentPageElement.textContent = currentPage;
        totalPagesElement.textContent = totalPages;
    }
    
    function moveSlider() {
        const slidesPerView = getSlidesPerView();
        const slideWidth = 100 / slidesPerView; 
        const translateX = -currentSlide * slideWidth;
        
        sliderTrack.style.transform = `translateX(${translateX}%)`;
        updatePager();
        
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide >= totalSlides - slidesPerView;
    }
    
    function nextPage() {
        const slidesPerView = getSlidesPerView();
        const maxSlide = totalSlides - slidesPerView;
        
        if (currentSlide < maxSlide) {
            currentSlide += slidesPerView;
            if (currentSlide > maxSlide) {
                currentSlide = maxSlide;
            }
            moveSlider();
        }
    }
    
    function prevPage() {
        const slidesPerView = getSlidesPerView();
        
        if (currentSlide > 0) {
            currentSlide -= slidesPerView;
            if (currentSlide < 0) {
                currentSlide = 0;
            }
            moveSlider();
        }
    }
    
    prevBtn.addEventListener('click', prevPage);
    nextBtn.addEventListener('click', nextPage);
    
    window.addEventListener('resize', function() {
        const slidesPerView = getSlidesPerView();
        const maxSlide = totalSlides - slidesPerView;
        if (currentSlide > maxSlide) {
            currentSlide = maxSlide;
        }
        moveSlider();
    });
    
    updatePager();
    moveSlider();
    
    let startX = 0;
    let endX = 0;
    
    sliderTrack.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
    });
    
    sliderTrack.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextPage();
            } else {
                prevPage(); 
            }
        }
    }
});
