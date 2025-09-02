/* ================================
   SCRIPT PRINCIPAL FAP
   ================================ */

/* --- 1. Animation des cartes au scroll --- */
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card, .tile");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  cards.forEach(card => {
    card.classList.add("hidden"); // état initial
    observer.observe(card);
  });
});

/* --- 2. Vérification du mot de passe (inscription) --- */
function checkPasswordStrength(password) {
  const minLength = 8;
  const strongPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  if (password.length < minLength) {
    return "❌ Mot de passe trop court (min 8 caractères)";
  } else if (!strongPattern.test(password)) {
    return "⚠️ Utilisez au moins une majuscule, une minuscule et un chiffre";
  }
  return "✅ Mot de passe sécurisé";
}

const pwdInput = document.querySelector("#password");
const pwdMessage = document.querySelector("#password-message");

if (pwdInput && pwdMessage) {
  pwdInput.addEventListener("input", () => {
    pwdMessage.textContent = checkPasswordStrength(pwdInput.value);
  });
}

/* --- 3. Sécurité formulaire (anti-bots simple) --- */
const forms = document.querySelectorAll("form");

forms.forEach(form => {
  form.addEventListener("submit", (e) => {
    const honeypot = form.querySelector("input[name='website']");
    if (honeypot && honeypot.value !== "") {
      e.preventDefault(); // stop si bot rempli le champ caché
      alert("Bot détecté 🚨");
    }
  });
});

/* --- 4. Progressive Web App (PWA) --- */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js")
      .then(reg => console.log("✅ Service Worker enregistré :", reg))
      .catch(err => console.log("❌ Erreur SW :", err));
  });
}
