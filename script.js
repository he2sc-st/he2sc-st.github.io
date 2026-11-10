const tabs = Array.from(document.querySelectorAll('.figure-tab'));
const galleryImage = document.querySelector('#gallery-image');
const galleryCaption = document.querySelector('#gallery-caption');

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectFigure(tab));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();

    let nextIndex = index;
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = tabs.length - 1;

    tabs[nextIndex].focus();
    selectFigure(tabs[nextIndex]);
  });
});

function selectFigure(selectedTab) {
  tabs.forEach((tab) => {
    const isSelected = tab === selectedTab;
    tab.classList.toggle('active', isSelected);
    tab.setAttribute('aria-selected', String(isSelected));
  });

  galleryImage.src = selectedTab.dataset.src;
  galleryImage.alt = selectedTab.dataset.alt;
  galleryCaption.textContent = selectedTab.dataset.caption;
}

const copyButton = document.querySelector('#copy-citation');
const bibtex = document.querySelector('#bibtex');

copyButton.addEventListener('click', async () => {
  const citation = bibtex.innerText;
  try {
    await navigator.clipboard.writeText(citation);
  } catch {
    const textArea = document.createElement('textarea');
    textArea.value = citation;
    textArea.setAttribute('readonly', '');
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    textArea.remove();
  }

  const originalLabel = copyButton.textContent;
  copyButton.textContent = 'Copied';
  window.setTimeout(() => {
    copyButton.textContent = originalLabel;
  }, 1600);
});
