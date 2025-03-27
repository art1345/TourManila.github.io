// Sample data for the slider
const slidesData = [
    {
        image: 'img/rizalpark2.jpg',
        title: 'Rizal Park',
        description: 'Historic urban park in Manila featuring gardens, monuments, and open spaces.',
        location: 'Rizal Park, Manila, Philippines',
        relatedImages: [
            'img/rizalpark1.jpg',
            'img/rizalpark.jpg',
            'img/chinesegarden.jpg',
            'img/chinesegarden1.jpg',
            'img/chinesegarden3.jpg'
        ]
    },
    {
        image: 'img/intra6.jpg',
        title: 'Intramuros',
        description: 'The historic walled area within Manila, showcasing Spanish colonial architecture.',
        location: 'Intramuros, Manila, Philippines',
        relatedImages: [
            'img/intra.jpg',
            'img/intra1.jpg',
            'img/intra2.jpg',
            'img/intra3.jpg',
            'img/intra4.jpg',
            'img/intra5.jpg',
            'img/intra7.jpg',
            'img/intra8.jpg'
            
        ]
    },
    {
        image: 'img/fort2.jpg', 
        title: 'Fort Santiago',
        description: 'A citadel built by the Spanish, part of the historic Intramuros.',
        location: 'Manila, Philippines',
        relatedImages: [
            'img/fort1.jpg',
            'img/fort3.jpg',
            'img/fort4.jpg',
            'img/fort5.jpg',
            'img/fort6.jpg'    
        ]
    },
    {
        image: 'img/bay3f.jpg',
        title: 'Manila Baywalk',
        description: 'Famous boulevard overlooking Manila Bay, known for its spectacular sunsets.',
        location: 'Manila, Philippines',
        relatedImages: [
            'img/bay.jpg',
            'img/bay1.jpg',
            'img/bay2.jpg'
        ]
    },
    {
        image: 'img/fine.jpg',
        title: 'National Museum of Fine Arts',
        description: 'Home to a vast collection of Filipino art, including works by national artists.',
        location: 'Manila, Philippines',
        relatedImages: [
            'img/fine1.jpg',
            'img/fine2.jpg',
            'img/fine3.jpg',
            'img/fine4.jpg'    
        ]
    },
    {
        image: 'img/san.jpg',
        title: 'San Agustin Church',
        description: 'The oldest stone church in the Philippines, a UNESCO World Heritage Site.',
        location: 'Manila, Philippines',
        relatedImages: [
            'img/san1.jpg',
            'img/san2.jpg',
            'img/san3.jpg'
        ]
    },
    {
        image: 'img/ocean.jpg',
        title: 'Manila Ocean Park',
        description: 'An oceanarium and marine-themed park offering interactive exhibits.',
        location: 'Manila, Philippines',
        relatedImages: [
            'img/ocean1.jpg',
            'img/ocean2.jpg',
            'img/ocean3.jpg',
            'img/ocean4.jpg'
        ]
    },
    {
        image: 'img/sm.jpg',
        title: 'SM Mall of Asia',
        description: 'One of the largest malls in the world, featuring shopping, dining, and entertainment.',
        location: 'Manila, Philippines',
        relatedImages: [
            'img/sm1.jpg',
            'img/sm2.jpg',
            'img/sm3.jpg',
            'img/sm4.jpg'
        ]
    },
    {
        image: 'img/Binondo.jpg',
        title: 'Binondo',
        description: 'The oldest Chinatown in the world, known for its rich culture and delicious food.',
        location: 'Manila, Philippines',
        relatedImages: [
            'img/Binondo1.jpg',
            'img/Binondo2.jpg',
            'img/Binondo3.jpg',
            'img/Binondo4.jpg',
            'img/Binondo5.jpg',
            'img/Binondo6.jpg'
        ]
    }
];

// Initialize slider elements
const slider = document.querySelector('.slider');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalLocation = document.getElementById('modal-location');
const modalClose = document.querySelector('.modal-close');

let currentSlide = 0;

// Create slides
function createSlides() {
    slidesData.forEach((slide, index) => {
        const slideElement = document.createElement('div');
        slideElement.className = 'slide';
        slideElement.innerHTML = `
            <img src="${slide.image}" alt="${slide.title}" 
                 class="w-full h-96 object-cover" 
                 data-index="${index}">
        `;
        slider.appendChild(slideElement);
    });
}

// Show slide
function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    currentSlide = (index + slides.length) % slides.length;
    slider.scrollTo({
        left: currentSlide * slider.offsetWidth,
        behavior: 'smooth'
    });
    
    // Update gallery for current slide
    const slide = slidesData[currentSlide];
    const galleryContainer = document.querySelector('.gallery-container');
    galleryContainer.innerHTML = '';
    
    if (slide.relatedImages) {
        slide.relatedImages.forEach(imgUrl => {
            const img = document.createElement('img');
            img.src = imgUrl;
            img.alt = slide.title + ' - additional view';
            img.classList.add('gallery-img');
            img.addEventListener('click', () => {
                const enlargedView = document.createElement('div');
                enlargedView.className = 'enlarged-view';
                enlargedView.innerHTML = `
                    <div class="enlarged-content">
                        <img src="${img.src}" alt="${img.alt}">
                        <button class="close-enlarged">&times;</button>
                    </div>
                `;
                document.body.appendChild(enlargedView);

                const closeBtn = document.querySelector('.close-enlarged');
                const closeHandler = () => {
                    document.body.removeChild(enlargedView);
                    enlargedView.removeEventListener('click', outsideClickHandler);
                };
                
                const outsideClickHandler = (e) => {
                    if (e.target === enlargedView) {
                        closeHandler();
                    }
                };
                
                closeBtn.addEventListener('click', closeHandler);
                enlargedView.addEventListener('click', outsideClickHandler);
            });
            galleryContainer.appendChild(img);
        });
    }
}

// Event listeners
prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));

// Modal and Gallery functionality
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG' && e.target.parentElement.classList.contains('slide')) {
        const index = e.target.dataset.index;
        const slide = slidesData[index];
        
        // Show main image in modal
        modalImage.src = slide.image;
        modalImage.alt = slide.title;
        modalTitle.textContent = slide.title;
        modalDescription.textContent = slide.description;
        modalLocation.textContent = slide.location;
        modal.style.display = 'flex';
        
        // Show related images in gallery
        const gallery = document.querySelector('.image-gallery');
        const galleryContainer = document.querySelector('.gallery-container');
        galleryContainer.innerHTML = '';
        
        if (slide.relatedImages) {
            gallery.classList.remove('hidden');
            slide.relatedImages.forEach(imgUrl => {
                const img = document.createElement('img');
                img.src = imgUrl;
                img.alt = slide.title + ' - additional view';
                img.classList.add('gallery-img');
                img.addEventListener('click', () => {
                    // Create enlarged view
                    const enlargedView = document.createElement('div');
                    enlargedView.className = 'enlarged-view';
                    enlargedView.innerHTML = `
                        <div class="enlarged-content">
                            <img src="${img.src}" alt="${img.alt}">
                            <button class="close-enlarged">&times;</button>
                        </div>
                    `;
                    document.body.appendChild(enlargedView);

                    // Close button and click outside
                    const closeBtn = document.querySelector('.close-enlarged');
                    const closeHandler = () => {
                        document.body.removeChild(enlargedView);
                        enlargedView.removeEventListener('click', outsideClickHandler);
                    };
                    
                    const outsideClickHandler = (e) => {
                        if (e.target === enlargedView) {
                            closeHandler();
                        }
                    };
                    
                    closeBtn.addEventListener('click', closeHandler);
                    enlargedView.addEventListener('click', outsideClickHandler);
                });
                galleryContainer.appendChild(img);
            });
        } else {
            gallery.classList.add('hidden');
        }
    }
});

modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Initialize
createSlides();