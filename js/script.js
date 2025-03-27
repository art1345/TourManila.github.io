// Sample data for the slider
const slidesData = [
    {
        image: 'img/rizalpark2.jpg',
        title: 'Rizal Park',
        description: 'Historic urban park in Manila featuring gardens, monuments, and open spaces.',
        location: 'Rizal Park, Manila, Philippines',
        guide: 'Rizal Park is a must-visit historical site in Manila. Explore the famous Rizal Monument, take a walk through the gardens, and enjoy a relaxing afternoon by the fountains. It is a great place for picnics and historical sightseeing.',
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
        guide: 'Intramuros is the heart of Manila’s history. Walk through cobblestone streets, visit Fort Santiago, explore the historic churches, and take a guided tour on a bamboo bike. Don’t miss the San Agustin Church and Casa Manila.',
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
        location: 'Intramuros, Manila, Philippines',
        guide: 'Fort Santiago is one of the most significant historical sites in Manila. Visit the Rizal Shrine, explore the dungeons, and walk along the walls of the fort for a glimpse of Manila’s colonial past.',
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
        location: 'Roxas Boulevard, Manila, Philippines',
        guide: 'The Manila Baywalk is the perfect spot for a relaxing evening stroll. Enjoy the stunning sunset views, try delicious street food, and listen to live music performances along the promenade.',
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
        location: 'Padre Burgos Ave, Ermita, Manila, Philippines',
        guide: 'Art lovers should not miss the National Museum of Fine Arts. Admire masterpieces from Filipino artists, including Juan Luna’s famous painting, "Spoliarium." Admission is free, making it a great cultural stop in Manila.',
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
        location: 'Intramuros, Manila, Philippines',
        guide: 'Visit the breathtaking San Agustin Church, the oldest stone church in the Philippines. Marvel at its Baroque architecture, beautiful ceiling paintings, and the adjacent museum filled with religious artifacts.',
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
        location: 'Rizal Park, Manila, Philippines',
        guide: 'Perfect for families and marine enthusiasts, Manila Ocean Park offers exciting attractions such as the Oceanarium, Sea Lion Show, and interactive touch pools. It’s a fun and educational experience for all ages.',
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
        location: 'Pasay City, Metro Manila, Philippines',
        guide: 'SM Mall of Asia is a shopping paradise with countless retail stores, restaurants, and entertainment options. Enjoy the famous SM By the Bay, where you can ride the MOA Eye Ferris wheel and experience fun activities along the waterfront.',
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
        location: 'Binondo, Manila, Philippines',
        guide: 'Binondo is a food lover’s paradise. Take a food tour and try authentic Chinese dishes such as dumplings, noodle soups, and hopia. Visit the Binondo Church and explore the lively streets filled with traditional shops and markets.',
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
