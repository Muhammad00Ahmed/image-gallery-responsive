const images = [
  { id: 1, src: 'https://picsum.photos/400/300?random=1', category: 'nature', title: 'Mountain View' },
  { id: 2, src: 'https://picsum.photos/400/300?random=2', category: 'architecture', title: 'Modern Building' },
  { id: 3, src: 'https://picsum.photos/400/300?random=3', category: 'people', title: 'Portrait' },
  { id: 4, src: 'https://picsum.photos/400/300?random=4', category: 'nature', title: 'Forest Path' },
  { id: 5, src: 'https://picsum.photos/400/300?random=5', category: 'animals', title: 'Wildlife' },
  { id: 6, src: 'https://picsum.photos/400/300?random=6', category: 'architecture', title: 'City Skyline' },
  { id: 7, src: 'https://picsum.photos/400/300?random=7', category: 'nature', title: 'Ocean Sunset' },
  { id: 8, src: 'https://picsum.photos/400/300?random=8', category: 'people', title: 'Street Photography' },
  { id: 9, src: 'https://picsum.photos/400/300?random=9', category: 'animals', title: 'Bird' }
];

let currentImageIndex = 0;
let filteredImages = [...images];

function renderGallery() {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';
  
  filteredImages.forEach((image, index) => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.onclick = () => openLightbox(index);
    
    item.innerHTML = `
      <img src="${image.src}" alt="${image.title}" loading="lazy">
      <div class="image-overlay">
        <h3>${image.title}</h3>
        <p>${image.category}</p>
      </div>
    `;
    
    gallery.appendChild(item);
  });
}

function openLightbox(index) {
  currentImageIndex = index;
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  img.src = filteredImages[index].src;
  lightbox.style.display = 'flex';
}

function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % filteredImages.length;
  document.getElementById('lightbox-img').src = filteredImages[currentImageIndex].src;
}

function prevImage() {
  currentImageIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
  document.getElementById('lightbox-img').src = filteredImages[currentImageIndex].src;
}

// Search functionality
document.getElementById('search').addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const category = document.getElementById('filter').value;
  
  filteredImages = images.filter(img => {
    const matchesSearch = img.title.toLowerCase().includes(searchTerm);
    const matchesCategory = category === 'all' || img.category === category;
    return matchesSearch && matchesCategory;
  });
  
  renderGallery();
});

// Filter functionality
document.getElementById('filter').addEventListener('change', (e) => {
  const category = e.target.value;
  const searchTerm = document.getElementById('search').value.toLowerCase();
  
  filteredImages = images.filter(img => {
    const matchesSearch = img.title.toLowerCase().includes(searchTerm);
    const matchesCategory = category === 'all' || img.category === category;
    return matchesSearch && matchesCategory;
  });
  
  renderGallery();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  const lightbox = document.getElementById('lightbox');
  if (lightbox.style.display === 'flex') {
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'Escape') closeLightbox();
  }
});

// Initial render
renderGallery();