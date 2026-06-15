/*Navegacion navbar*/

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });

      const navbarLinks = document.querySelectorAll('.navbar a');
      navbarLinks.forEach(link => {
          link.classList.remove('active');
      });

      const activeLink = document.getElementById(`link-${sectionId}`);
      if (activeLink) {
          activeLink.classList.add('active');
      }

      if (navbar.classList.contains('active')) {
          navbar.classList.remove('active');
          menuIcon.classList.remove('bx-x');
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
 ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .experience-box, .contacto form, .dashboard', { origin: 'bottom' });
 ScrollReveal().reveal('.home-content h1, .about-img, .dashboard h2', { origin: 'left' });
 ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

 /*copiar mi correo electronico*/

 function tCopy(key, fallback) {
  return window.i18n ? window.i18n.t(key) : fallback;
 }

 async function copiarCorreo() {
  const inputText = document.getElementById('mailprofesional');
  const email = inputText.value;

  let copied = false;

  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(email);
      copied = true;
    } catch (error) {
      copied = false;
    }
  }

  if (!copied) {
    copied = copyWithFallback(email);
  }

  if (copied) {
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: tCopy('copy_success', 'Correo copiado correctamente'),
      showConfirmButton: false,
      timer: 1300
    });
    return;
  }

  inputText.removeAttribute('disabled');
  inputText.focus();
  inputText.select();
  inputText.setSelectionRange(0, email.length);
  inputText.setAttribute('disabled', '');

  Swal.fire({
    position: 'top',
    icon: 'error',
    title: tCopy('copy_error', 'No se pudo copiar automáticamente. Selecciónalo y usa Ctrl+C.'),
    showConfirmButton: false,
    timer: 2500
  });
 }

 function copyWithFallback(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.setAttribute('readonly', '');
  textArea.style.position = 'fixed';
  textArea.style.left = '-9999px';
  document.body.appendChild(textArea);
  textArea.select();

  let copied = false;
  try {
    copied = document.execCommand('copy');
  } catch (error) {
    copied = false;
  }

  document.body.removeChild(textArea);
  return copied;
 }

 /*formulario contacto*/

 function tForm(key, fallback) {
  return window.i18n ? window.i18n.t(key) : fallback;
 }

 function validateContactForm(form) {
  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();
  const phone = form.elements.number.value.trim();
  const subject = form.elements.subject.value.trim();
  const message = form.elements.message.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[+]?[\d\s()-]{6,20}$/;

  if (name.length < 2) {
    return tForm('form_validation_name', 'El nombre debe tener al menos 2 caracteres.');
  }

  if (!emailPattern.test(email)) {
    return tForm('form_validation_email', 'Introduce un correo electrónico válido.');
  }

  if (phone && !phonePattern.test(phone)) {
    return tForm('form_validation_phone', 'Introduce un teléfono válido.');
  }

  if (subject.length < 3) {
    return tForm('form_validation_subject', 'El asunto debe tener al menos 3 caracteres.');
  }

  if (message.length < 10) {
    return tForm('form_validation_message', 'El mensaje debe tener al menos 10 caracteres.');
  }

  return '';
 }

 function showFormAlert(icon, title, text) {
  Swal.fire({
    position: 'top',
    icon,
    title,
    text,
    showConfirmButton: false,
    timer: icon === 'success' ? 2800 : 3200
  });
 }

 async function handleContactFormSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const validationError = validateContactForm(form);

  if (validationError) {
    showFormAlert(
      'error',
      tForm('form_validation_title', 'Revisa el formulario'),
      validationError
    );
    return;
  }

  const submitBtn = form.querySelector('[type="submit"]');
  submitBtn.disabled = true;

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });

    let data = {};
    try {
      data = await response.json();
    } catch (error) {
      data = {};
    }

    if (response.ok && (data.success === 'true' || data.success === true)) {
      showFormAlert(
        'success',
        tForm('form_success', '¡Mensaje enviado!'),
        tForm('form_success_text', 'Gracias por contactar. Te responderé lo antes posible.')
      );
      form.reset();
      return;
    }

    showFormAlert(
      'error',
      tForm('form_error', 'No se pudo enviar el mensaje'),
      tForm('form_error_text', 'Inténtalo de nuevo en unos minutos o escríbeme por correo.')
    );
  } catch (error) {
    showFormAlert(
      'error',
      tForm('form_error', 'No se pudo enviar el mensaje'),
      tForm('form_error_text', 'Inténtalo de nuevo en unos minutos o escríbeme por correo.')
    );
  } finally {
    submitBtn.disabled = false;
  }
 }

 document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactFormSubmit);
  }
 });
 
 