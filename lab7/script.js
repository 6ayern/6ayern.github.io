document.addEventListener('DOMContentLoaded', function() {
    const sliderTrack = document.getElementById('sliderTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentPageElement = document.querySelector('.current-page');
    const totalPagesElement = document.querySelector('.total-pages');
    
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    let currentPosition = 0;
    
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
        const currentPage = Math.floor(currentPosition / slidesPerView) + 1;
        
        currentPageElement.textContent = currentPage;
        totalPagesElement.textContent = totalPages;
    }
    
        function moveSlider() {
        const slidesPerView = getSlidesPerView();
        const slideWidth = slides[0].offsetWidth;
        const maxPosition = totalSlides - slidesPerView;
        
        if (currentPosition < 0) {
            currentPosition = 0;
        } else if (currentPosition > maxPosition) {
            currentPosition = maxPosition;
        }
        
        sliderTrack.style.transform = `translateX(-${currentPosition * slideWidth}px)`;
        updatePager();
    }
    
    function nextPage() {
        const slidesPerView = getSlidesPerView();
        const maxPosition = totalSlides - slidesPerView;
        
        if (currentPosition < maxPosition) {
            currentPosition += slidesPerView;
            moveSlider();
        }
    }
    
    function prevPage() {
        const slidesPerView = getSlidesPerView();
        
        if (currentPosition > 0) {
            currentPosition -= slidesPerView;
            moveSlider();
        }
    }
    
    prevBtn.addEventListener('click', prevPage);
    nextBtn.addEventListener('click', nextPage);
    
    window.addEventListener('resize', function() {
        currentPosition = 0;
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