/*Navegacion navbar*/

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });

      // Remove 'active' class from all navbar links
      const navbarLinks = document.querySelectorAll('.navbar a');
      navbarLinks.forEach(link => {
          link.classList.remove('active');
      });

      // Add 'active' class to the clicked link
      const activeLink = document.getElementById(`link-${sectionId}`);
      if (activeLink) {
          activeLink.classList.add('active');
      }
  }
}

function scrollToHomeFromFooter() {
    // Scroll to the home section
    scrollToSection('home');

    // Remove 'active' class from all navbar links
    const navbarLinks = document.querySelectorAll('.navbar a');
    navbarLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Add 'active' class to the home link
    const homeLink = document.getElementById('link-home');
    if (homeLink) {
        homeLink.classList.add('active');
    }
}


/*Efecto navbar responsive */

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};
/*Efecto navbar click*/



/*Efecto scroll */

ScrollReveal({ 
    //reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200

 });

 ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
 ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contacto form, .dashboard', { origin: 'bottom' });
 ScrollReveal().reveal('.home-content h1, .about-img, .dashboard h2', { origin: 'left' });
 ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

 /*titulo js */

 const typed = new Typed('.multiple-text',{
    strings: ['Desarrollador FrontEnd', 'Desarrollador BackEnd', 'Desarrollador FullStack'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
 });

 /*copiar mi correo electronico*/

 function copiarCorreo(){
  let inputText = document.getElementById('mailprofesional');
  inputText.select();
  inputText.setSelectionRange(0, 9999);
  navigator.clipboard.writeText(inputText.value);
  Swal.fire({
    position: "top",
    icon: "success",
    title: "No te arrepentiras!",
    showConfirmButton: false,
    timer: 1300
  });

}
 
 