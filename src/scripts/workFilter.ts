document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll<HTMLButtonElement>('.work-filter__btn');
  const workCards = document.querySelectorAll<HTMLElement>('.work-card');

  if (!filterButtons.length || !workCards.length) return;

  // Read initial filter from URL
  const urlParams = new URLSearchParams(window.location.search);
  const initialFilter = urlParams.get('filter') || 'all';

  function applyFilter(filter: string) {
    const normalizedFilter = filter.toLowerCase();

    workCards.forEach((card) => {
      const category = card.getAttribute('data-category') || '';
      if (normalizedFilter === 'all' || category.toLowerCase() === normalizedFilter) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });

    filterButtons.forEach((btn) => {
      const btnFilter = btn.getAttribute('data-filter') || '';
      const isActive = btnFilter.toLowerCase() === normalizedFilter;
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  }

  // Bind click events
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter') || 'all';
      applyFilter(filter);
      // Update URL without reload
      const url = new URL(window.location.href);
      if (filter === 'all') {
        url.searchParams.delete('filter');
      } else {
        url.searchParams.set('filter', filter);
      }
      window.history.replaceState({}, '', url.toString());
    });
  });

  // Apply initial filter (default to 'all' for unrecognised values)
  const validFilters = Array.from(filterButtons).map((btn) =>
    (btn.getAttribute('data-filter') || '').toLowerCase()
  );
  const filterToApply = validFilters.includes(initialFilter.toLowerCase())
    ? initialFilter
    : 'all';
  applyFilter(filterToApply);
});
