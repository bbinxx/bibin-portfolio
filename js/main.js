
const textElement = document.getElementsByClassName('home')[0]; // Get the first element with class "typewriter"
const text = "Hello! I am a dedicated Computer Science and Engineering student with a strong passion for technology and software development.";
let i = 0;

function typewriter() {
  if (i < text.length) {
    textElement.textContent += text.charAt(i); // Add next character using textContent (better for performance)
    i++;
    setTimeout(typewriter, 50); // Adjust speed here (in milliseconds)
  }
}
window.onload = loading(),typewriter();
function loading() {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.display = 'none'; // Hide the loading screen on page load
  };
  
const homeButton = document.querySelector('.goback');
const homeSection = document.querySelector('.header');

homeButton.addEventListener('click', function() {
  homeSection.scrollIntoView({ behavior: "smooth" });
});
const element = document.querySelector('.goback');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      //  function 
    
    }
  });
});

observer.observe(element);
