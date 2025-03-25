// Filter function for food trucks
document.addEventListener('DOMContentLoaded', function() {
  // Filter buttons
  const filterButtons = document.querySelectorAll('.filter-button');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      const filter = this.getAttribute('data-filter');
      const cards = document.querySelectorAll('.truck-card');
      
      cards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-days') === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
});

// Modal functions
function openModal(id) {
  document.getElementById(id).style.display = 'block';
  document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
}

function closeModal(id) {
  document.getElementById(id).style.display = 'none';
  document.body.style.overflow = ''; // Restore scrolling
}

// Close modal when clicking outside of the modal content
window.addEventListener('click', function(event) {
  const modals = document.querySelectorAll('.ft-modal');
  modals.forEach(modal => {
    if (event.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  });
});

// Close modal with escape key
window.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    const openModals = document.querySelectorAll('.ft-modal[style="display: block;"]');
    openModals.forEach(modal => {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    });
  }
});