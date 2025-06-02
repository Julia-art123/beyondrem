// clients review data
const reviews = [
    {
        name: "Abby",
        stars: "★★★★★",
        photo: "../Images/photos/balloon.png",
        commend: "I don't write reviews much but BeyondREM truly deserves the praise. My grandma recently passed and through BeyondREM, I got to relive one of my most precious memories with her. Thank you so much- shout out to the BeyondREM team!"
    },
    {
        name: "Micheal",
        stars: "★★★★★",
        photo: "../Images/photos/trippy.png",
        commend: "Feels like I’m totally tripping, but no drugs needed! This dreamscape is beyond surreal—the colors and vibe made me feel like I’d been transported to another dimension. BeyondREM really gave me the most thrilling experience!"
    },
    {
        name: "Roy",
        stars: "★★★★☆",
        photo: "../Images/photos/person-cat.png",
         commend: "Thanks to BeyondREM, I finally got to experience lying on my giant kitty. The only downside? I didn’t go for the premium option, so I couldn’t control its behavior—it was just as feisty as it is at home! Next time, I’m definitely upgrading to premium!"
    },
    {
        name: "Jack",
        stars: "★★★★★",
        photo: "../Images/photos/concert.png",
        commend: "I got to experience a concert with actual flowing musical notes—it was like they came to life! It was everything I imagined and more, like stepping into a dream where the music felt so real. It completely blew me away!"
    },
    {
        name: "Lucy",
        stars: "★★★★★",
        photo: "../Images/photos/pumpkin.png",
        commend: "I’m a big horror movie fan and always thought it’d be so cool to step into a spooky scene for Halloween. BeyondREM totally made it happen, and it turned out to be one of the most unforgettable Halloweens ever!"
    }
  ];
  
  let currentReviewIndex = 0;
  
  // update comments
  function updateReview() {
    const review = reviews[currentReviewIndex];
    document.getElementById("customer-name").innerText = review.name;
    document.getElementById("customer-review").innerText = review.stars;
    document.getElementById("customer-photo").src = review.photo;
    document.getElementById("commend").innerText = review.commend;
  }
  
  function nextReview() {
    currentReviewIndex = (currentReviewIndex + 1) % reviews.length;
    updateReview();
  }
  
  function prevReview() {
    currentReviewIndex = (currentReviewIndex - 1 + reviews.length) % reviews.length;
    updateReview();
  }

// FAQ Section
  document.addEventListener('DOMContentLoaded', function () {
    const questions = document.querySelectorAll('.faq-question');
  
    questions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
  
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
            } else {
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
  
            // Optionally, toggle the "active" class to change the look of the question when it is open
            question.classList.toggle('active');
        });
    });
  });
  
  // Back to top button
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