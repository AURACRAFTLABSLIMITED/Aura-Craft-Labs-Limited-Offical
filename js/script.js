/* ==========================================================================
   AURA CRAFT LABS LIMITED — OFFICIAL JAVASCRIPT
   Company: Aura Craft Labs Limited (also known as Oracraft Labs Limited)
   Founder & CEO: Ali Imran
   Technology: Pure Vanilla JavaScript (No frameworks, clean, beginner-friendly)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* ==========================================================================
     1. NAVIGATION: STICKY BAR & SMOOTH SCROLL
     ========================================================================== */
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  // Update navbar background appearance on window scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
    updateActiveNavLink();
  });

  // Highlight current nav item based on scroll position
  function updateActiveNavLink() {
    const scrollY = window.pageYOffset;
    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelectorAll(`.nav-link[href*="#${sectionId}"]`).forEach((link) => {
          link.classList.add("active");
        });
      } else {
        document.querySelectorAll(`.nav-link[href*="#${sectionId}"]`).forEach((link) => {
          link.classList.remove("active");
        });
      }
    });
  }

  /* ==========================================================================
     2. MOBILE MENU (HAMBURGER) TOGGLE
     ========================================================================== */
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const mobileNav = document.getElementById("mobile-nav");
  const mobileNavBackdrop = document.getElementById("mobile-nav-backdrop");
  const mobileNavLinks = mobileNav ? mobileNav.querySelectorAll(".nav-link") : [];

  function openMobileMenu() {
    hamburgerBtn.classList.add("open");
    mobileNav.classList.add("open");
    mobileNavBackdrop.classList.add("open");
    document.body.style.overflow = "hidden"; // Prevent background scroll
  }

  function closeMobileMenu() {
    hamburgerBtn.classList.remove("open");
    mobileNav.classList.remove("open");
    mobileNavBackdrop.classList.remove("open");
    document.body.style.overflow = "";
  }

  if (hamburgerBtn && mobileNav) {
    hamburgerBtn.addEventListener("click", () => {
      const isOpen = mobileNav.classList.contains("open");
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Close when clicking the backdrop
    mobileNavBackdrop.addEventListener("click", closeMobileMenu);

    // Close when any mobile navigation link is clicked
    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", closeMobileMenu);
    });

    // Close when ESC key is pressed
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileNav.classList.contains("open")) {
        closeMobileMenu();
      }
    });
  }

  /* ==========================================================================
     3. FAQ ACCORDION (SMOOTH VANILLA INTERACTION)
     ========================================================================== */
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector(".faq-question-btn");
    const answer = item.querySelector(".faq-answer");

    questionBtn.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all other accordions for clean single-view reading
      faqItems.forEach((otherItem) => {
        otherItem.classList.remove("active");
        const otherAnswer = otherItem.querySelector(".faq-answer");
        if (otherAnswer) otherAnswer.style.maxHeight = null;
      });

      // Toggle clicked item
      if (!isActive) {
        item.classList.add("active");
        answer.style.maxHeight = answer.scrollHeight + "px";
      } else {
        item.classList.remove("active");
        answer.style.maxHeight = null;
      }
    });
  });

  // Open the first FAQ item by default for intuitive discovery
  if (faqItems.length > 0) {
    const firstItem = faqItems[0];
    const firstAnswer = firstItem.querySelector(".faq-answer");
    firstItem.classList.add("active");
    if (firstAnswer) firstAnswer.style.maxHeight = firstAnswer.scrollHeight + "px";
  }

  /* ==========================================================================
     4. DEVELOPER CODE PANEL: COPY & SIMULATION
     ========================================================================== */
  const copyCodeBtn = document.getElementById("copy-code-btn");
  const codeContent = document.getElementById("code-content");
  const runCodeBtn = document.getElementById("run-code-btn");
  const codeOutputPanel = document.getElementById("code-output-panel");

  if (copyCodeBtn && codeContent) {
    copyCodeBtn.addEventListener("click", () => {
      const codeText = codeContent.innerText;
      navigator.clipboard.writeText(codeText).then(() => {
        const originalText = copyCodeBtn.innerText;
        copyCodeBtn.innerText = "Copied ✓";
        copyCodeBtn.style.borderColor = "var(--secondary-color)";
        setTimeout(() => {
          copyCodeBtn.innerText = originalText;
          copyCodeBtn.style.borderColor = "";
        }, 2000);
      }).catch(() => {
        copyCodeBtn.innerText = "Copied";
      });
    });
  }

  if (runCodeBtn && codeOutputPanel) {
    runCodeBtn.addEventListener("click", () => {
      codeOutputPanel.style.display = "block";
      codeOutputPanel.innerHTML = '<span style="color: #64748b;">// Executing API request...</span>';
      setTimeout(() => {
        codeOutputPanel.innerHTML = `
<span style="color: #34d399;">✓ 200 OK</span> [Response Time: 42ms]
{
  <span style="color: #38bdf8;">"status"</span>: <span style="color: #34d399;">"success"</span>,
  <span style="color: #38bdf8;">"organization"</span>: <span style="color: #34d399;">"Aura Craft Labs Limited"</span>,
  <span style="color: #38bdf8;">"solutionId"</span>: <span style="color: #fbbf24;">"sol_ai_pipeline_09"</span>,
  <span style="color: #38bdf8;">"latency"</span>: <span style="color: #a5b4fc;">"42ms"</span>,
  <span style="color: #38bdf8;">"securityAudit"</span>: <span style="color: #34d399;">"Verified"</span>
}`;
      }, 500);
    });
  }

  /* ==========================================================================
     5. CONTACT FORM (FRONTEND VALIDATION & NOTIFICATION)
     ========================================================================== */
  const contactForm = document.getElementById("contact-form");
  const formToast = document.getElementById("form-toast");

  if (contactForm && formToast) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Retrieve form values
      const name = document.getElementById("form-name").value.trim();
      const email = document.getElementById("form-email").value.trim();
      const projectType = document.getElementById("form-project-type").value;
      const message = document.getElementById("form-message").value.trim();

      if (!name || !email || !message) {
        alert("Please complete the required fields (Name, Email, Message).");
        return;
      }

      // Display friendly frontend success message
      formToast.className = "form-toast success";
      formToast.innerHTML = `
        <strong>Message Prepared!</strong> Thank you, <em>${name}</em>.
        Your inquiry regarding <em>${projectType}</em> has been recorded locally.
        <br><span style="font-size: 0.82rem; opacity: 0.85;">(Notice: To connect live SMTP or webhook delivery, integrate your preferred email API endpoint in /js/script.js).</span>
      `;
      formToast.scrollIntoView({ behavior: "smooth", block: "nearest" });

      // Reset form fields
      contactForm.reset();
    });
  }

  /* ==========================================================================
     6. AMBIENT TECH CONSTELLATION CANVAS (FUTURISTIC VISUAL)
     ========================================================================== */
  const canvas = document.getElementById("ambient-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(width / 35), 45); // Responsive density

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.radius = Math.random() * 1.6 + 0.8;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(99, 102, 241, 0.4)";
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Connect nearby particles with subtle glowing lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.15 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animate);
    }

    animate();
  }
});
