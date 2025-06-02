  // BACK TO TOP BUTTON
  const backToTopButton = document.getElementById('backToTop');
  
  window.addEventListener('scroll', () => { // showing button when scolled 1000px
      if (window.scrollY > 1000) { 
          backToTopButton.classList.add('show');
      } else {
          backToTopButton.classList.remove('show');
      }
  });
  
  backToTopButton.addEventListener('click', () => { // smooth scroll back to the top of page
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });