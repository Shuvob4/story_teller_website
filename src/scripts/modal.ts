document.addEventListener('DOMContentLoaded', () => {
  const dialog = document.getElementById('work-modal') as HTMLDialogElement | null;
  const iframe = document.getElementById('work-modal-iframe') as HTMLIFrameElement | null;
  const titleEl = document.getElementById('work-modal-title');
  const closeBtn = document.getElementById('work-modal-close');

  if (!dialog || !iframe || !titleEl || !closeBtn) return;

  let triggerElement: HTMLElement | null = null;

  // Open modal
  document.addEventListener('click', (e) => {
    const trigger = (e.target as HTMLElement).closest<HTMLButtonElement>('.work-card__trigger');
    if (!trigger) return;

    const embedUrl = trigger.getAttribute('data-embed-url');
    const title = trigger.getAttribute('data-title') || 'Video';

    if (!embedUrl) return;

    triggerElement = trigger;
    titleEl.textContent = title;
    iframe.src = embedUrl;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
  });

  // Close modal
  function closeModal() {
    dialog!.close();
    iframe!.src = '';
    document.body.style.overflow = '';
    if (triggerElement) {
      triggerElement.focus();
      triggerElement = null;
    }
  }

  closeBtn.addEventListener('click', closeModal);

  // Close on backdrop click
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) {
      closeModal();
    }
  });

  // Escape key handled natively by <dialog>, but clean up iframe on close
  dialog.addEventListener('close', () => {
    iframe!.src = '';
    document.body.style.overflow = '';
    if (triggerElement) {
      triggerElement.focus();
      triggerElement = null;
    }
  });
});
