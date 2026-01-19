(function() {

  const members = [
    {
      id: 0,
      name: "Chandra Rizal Alamsyah",
      nim: "52250068",
      role: "Quality Control",
      description: "Ensuring top-notch quality and precision in every aspect of our projects with meticulous attention to detail.",
      image: "img/FotoChandra.png"
    },
    {
      id: 1,
      name: "Fityanandra Athar Adyaksa",
      nim: "52250059",
      role: "UI / UX Designer",
      description: "Crafting intuitive and beautiful user experiences that bridge the gap between design and functionality.",
      image: "img/FotoAndra.png"
    },
    {
      id: 2,
      name: "Refantanur Husnul Haqib",
      nim: "52250052",
      role: "Data Analyst",
      description: "Transforming complex data into actionable insights through advanced analytics and visualization techniques.",
      image: "img/FotoRefan.png"
    },
    {
      id: 3,
      name: "Cahaya Medina Semidang",
      nim: "52250053",
      role: "Project Leader",
      description: "Leading projects with strategic vision and ensuring seamless execution from conception to completion.",
      image: "img/FotoCahaya.png"
    },
    {
      id: 4,
      name: "Cloise Shafira",
      nim: "52250044",
      role: "Documentation",
      description: "Creating comprehensive and clear documentation that enhances understanding and project continuity.",
      image: "img/FotoCloise.png"
    },
    {
      id: 5,
      name: "Adinda Maiza Ishfahani",
      nim: "52250074",
      role: "Technical Writer",
      description: "Translating complex technical concepts into accessible and user-friendly documentation and guides.",
      image: "img/FotoMaiza.png"
    }
  ];

  let currentModal = null;
  let currentMemberIndex = 0;


  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initMemberSystem, 300);
  });

  function initMemberSystem() {
    const memberItems = document.querySelectorAll('.member-item');

    const gridToDataIndex = [0, 1, 2, 3, 4, 5];

    memberItems.forEach((item, gridIndex) => {
      const dataIndex = gridToDataIndex[gridIndex];

      item.addEventListener('click', function(e) {
        e.preventDefault();
        showMemberDetail(dataIndex);
      });

      item.setAttribute('tabindex', '0');
      item.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          showMemberDetail(dataIndex);
        }
      });
    });
  }

  function showMemberDetail(index) {
    if (index < 0 || index >= members.length) return;

    currentMemberIndex = index;
    const member = members[index];

    const modalHTML = `
      <div class="member-modal-overlay">
        <div class="member-modal">
          <button class="modal-close" aria-label="Close">×</button>

          <div class="modal-content">
            <div class="modal-image">
              <img src="${member.image}" alt="${member.name}" loading="lazy">
            </div>

            <div class="modal-info">
              <div class="modal-logo-container">
                <img src="img/logoITSB.png" alt="ITSB Logo" class="modal-logo" onclick="window.open('https://itsb.ac.id/', '_blank')">
              </div>
              <h2>${member.name}</h2>
              <div class="modal-nim">NIM: ${member.nim}</div>
              <div class="modal-divider"></div>
              <span class="modal-role">${member.role}</span>
              <p>${member.description}</p>
            </div>
          </div>

          <div class="modal-nav">
            <button class="nav-arrow prev-arrow" data-index="${getPrevIndex(index)}" title="Previous member">←</button>
            <button class="nav-arrow next-arrow" data-index="${getNextIndex(index)}" title="Next member">→</button>
          </div>

        </div>
      </div>
    `;

    if (currentModal) {
      currentModal.remove();
    }

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    currentModal = document.querySelector('.member-modal-overlay');

    setTimeout(() => {
      const overlay = document.querySelector('.member-modal-overlay');
      const closeBtn = document.querySelector('.modal-close');
      const prevBtn = document.querySelector('.prev-arrow');
      const nextBtn = document.querySelector('.next-arrow');

      overlay.classList.add('active');

      closeBtn.addEventListener('click', closeModal);
      overlay.addEventListener('click', function(e) {
        if (e.target === overlay) closeModal();
      });

      if (prevBtn) {
        prevBtn.addEventListener('click', function() {
          const newIndex = getPrevIndex(currentMemberIndex);
          updateModalContent(newIndex);
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', function() {
          const newIndex = getNextIndex(currentMemberIndex);
          updateModalContent(newIndex);
        });
      }

      document.addEventListener('keydown', function keyHandler(e) {
        if (e.key === 'Escape') {
          closeModal();
          document.removeEventListener('keydown', keyHandler);
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          const newIndex = getPrevIndex(currentMemberIndex);
          updateModalContent(newIndex);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          const newIndex = getNextIndex(currentMemberIndex);
          updateModalContent(newIndex);
        }
      });
    }, 10);
  }

  function getPrevIndex(currentIndex) {
    return currentIndex === 0 ? members.length - 1 : currentIndex - 1;
  }

  function getNextIndex(currentIndex) {
    return currentIndex === members.length - 1 ? 0 : currentIndex + 1;
  }

  function updateModalContent(newIndex) {
    if (newIndex < 0 || newIndex >= members.length) return;

    currentMemberIndex = newIndex;
    const member = members[newIndex];

    const modal = document.querySelector('.member-modal');
    const image = modal.querySelector('.modal-image img');
    const name = modal.querySelector('.modal-info h2');
    const nim = modal.querySelector('.modal-nim');
    const role = modal.querySelector('.modal-role');
    const desc = modal.querySelector('.modal-info p');
    const prevBtn = modal.querySelector('.prev-arrow');
    const nextBtn = modal.querySelector('.next-arrow');

    modal.style.opacity = '0.7';
    modal.style.transform = 'scale(0.98)';

    setTimeout(() => {
      image.src = member.image;
      image.alt = member.name;
      name.textContent = member.name;
      nim.textContent = `NIM: ${member.nim}`;
      role.textContent = member.role;
      desc.textContent = member.description;

      if (prevBtn) prevBtn.dataset.index = getPrevIndex(newIndex);
      if (nextBtn) nextBtn.dataset.index = getNextIndex(newIndex);

      modal.style.opacity = '1';
      modal.style.transform = 'scale(1)';
    }, 150);
  }

  function closeModal() {
    if (currentModal) {
      currentModal.classList.remove('active');
      setTimeout(() => {
        currentModal.remove();
        currentModal = null;
      }, 300);
    }
  }

})();

// ===== CONTENT TAB SYSTEM =====
(function() {

  function initContentTabsForContainer(tabsContainer) {
    if (!tabsContainer) return;

    const tabs = Array.from(tabsContainer.querySelectorAll('.tab-btn'));
    if (!tabs.length) return;

    let indicator = tabsContainer.querySelector('.tab-indicator');
    if (!indicator) {
      indicator = document.createElement('div');
      indicator.className = 'tab-indicator';
      tabsContainer.insertBefore(indicator, tabsContainer.firstChild);
      document.querySelector('.tab-indicator')
    }

    const targets = tabs.map(t => t.dataset.target).filter(Boolean);

    function moveIndicator(btn) {
      const containerRect = tabsContainer.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      const left = btnRect.left - containerRect.left;

      indicator.style.width = btnRect.width + 'px';
      indicator.style.height = btnRect.height + 'px';
      indicator.style.transform = `translate(${left}px, -50%)`;
    }

    function activateTab(tab) {
      const targetId = tab.dataset.target;

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      targets.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('active');
      });

      const content = document.getElementById(targetId);
      if (content) {
        content.classList.remove('active');
        setTimeout(() => {
          content.classList.add('active');
        }, 10);
      }

      moveIndicator(tab);
    }

    tabs.forEach((tab, i) => {
      tab.setAttribute('tabindex', '0');
      tab.addEventListener('click', () => activateTab(tab));

      tab.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          const next = tabs[(i + 1) % tabs.length];
          next.focus();
          next.click();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          const prev = tabs[(i - 1 + tabs.length) % tabs.length];
          prev.focus();
          prev.click();
        } else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          tab.click();
        }
      });
    });

    const initial = tabsContainer.querySelector('.tab-btn.active') || tabs[0];
    if (initial) activateTab(initial);

    window.addEventListener('resize', () => {
      const active = tabsContainer.querySelector('.tab-btn.active') || tabs[0];
      if (active) moveIndicator(active);
    });
  }

  function initAllContentTabs() {
    const containers = document.querySelectorAll('.content-tab-container');
    containers.forEach(initContentTabsForContainer);
  }

  // SISTEM YANG SAMA SEPERTI MEMBER - dengan re-check setiap 500ms
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(initAllContentTabs, 300);
      // Re-check setelah delay untuk tab yang di-render lambat
      setTimeout(initAllContentTabs, 800);
      setTimeout(initAllContentTabs, 1500);
    });
  } else {
    setTimeout(initAllContentTabs, 300);
    setTimeout(initAllContentTabs, 800);
    setTimeout(initAllContentTabs, 1500);
  }

})();