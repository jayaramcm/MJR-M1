/* 10. Location Section Animations
   - Scroll transition from Amenities to Location: Title reveal
   - Dashed branch and card fade-ins
   - TG RERA certificate rolling into frame with ease-out as user enters viewport
*/
(() => {
  const section = document.getElementById('location');
  if (!section) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!window.gsap || !window.ScrollTrigger || reduceMotion.matches) return;
  gsap.registerPlugin(ScrollTrigger);

  // 1. Animate title on scroll / as amenities shrinks
  const titleLines = section.querySelectorAll('.loc__title-line');
  if (titleLines.length) {
    gsap.fromTo(titleLines, 
      {
        y: 70,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.25,
        stagger: 0.18,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      }
    );
  }

  // 2. Description reveals after the title
  const lead = section.querySelector('.loc__lead');
  if (lead) {
    gsap.fromTo(lead,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.1,
        delay: 0.55,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      }
    );
  }

  // 3. Staggered reveal for connectivity cards
  const cards = gsap.utils.toArray('.loc-card');
  cards.forEach((card) => {
    gsap.fromTo(card,
      { y: 45, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      }
    );
  });

  // 4. Rolling TG RERA Certificate into frame with ease-out animation
  const certImg = document.getElementById('locCertImg');
  const foundation = document.getElementById('foundation');
  if (certImg && foundation) {
    gsap.fromTo(certImg,
      {
        x: -220,
        y: 200,
        rotation: -38,
        opacity: 0,
        transformOrigin: 'bottom left',
      },
      {
        x: 0,
        y: 0,
        rotation: -7,
        opacity: 1,
        duration: 1.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: foundation,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        }
      }
    );
  }

  // 5. Hold the foundation section in place for a while as the user scrolls
  if (foundation && window.innerWidth > 900) {
    ScrollTrigger.create({
      trigger: foundation,
      start: 'top top',
      end: () => '+=' + window.innerHeight * 0.8,
      pin: true,
      invalidateOnRefresh: true,
    });
  }

  window.addEventListener('load', () => ScrollTrigger.refresh());
})();
