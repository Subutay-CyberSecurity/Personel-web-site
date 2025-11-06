// Blog Search and Filtering Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Get DOM elements for search and filtering
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  const blogGrid = document.querySelector('.blog-grid');
  const blogPosts = document.querySelectorAll('.blog-post');

  // Function to highlight search terms in text
  function highlightText(text, searchTerm) {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
  }

  // Function to remove highlights
  function removeHighlights() {
    const highlightedElements = document.querySelectorAll('.highlight');
    highlightedElements.forEach(element => {
      element.outerHTML = element.innerHTML;
    });
  }

  // Function to filter blog posts based on search term and category
  function filterBlogPosts() {
    const searchTerm = searchInput.value.trim();
    const selectedCategory = categoryFilter.value.toLowerCase();

    // Remove previous highlights
    removeHighlights();
    
    let visibleCount = 0;

    blogPosts.forEach(post => {
      const titleElement = post.querySelector('h3');
      const excerptElement = post.querySelector('.post-excerpt');
      const title = titleElement.textContent.toLowerCase();
      const excerpt = excerptElement.textContent.toLowerCase();
      const tags = Array.from(post.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
      const category = post.querySelector('.post-category').classList[1]; // Get the second class which is the category name
      
      // Check if post matches search term and category
      const matchesSearch = !searchTerm || 
                           title.includes(searchTerm.toLowerCase()) || 
                           excerpt.includes(searchTerm.toLowerCase()) || 
                           tags.some(tag => tag.includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || category === selectedCategory;
      
      // Show or hide the post based on filters
      if (matchesSearch && matchesCategory) {
        post.style.display = 'flex';
        visibleCount++;
        
        // Highlight search terms if there's a search term
        if (searchTerm) {
          const highlightedTitle = highlightText(titleElement.textContent, searchTerm);
          titleElement.innerHTML = highlightedTitle;
          
          const highlightedExcerpt = highlightText(excerptElement.textContent, searchTerm);
          excerptElement.innerHTML = highlightedExcerpt;
        }
      } else {
        post.style.display = 'none';
      }
    });
    
    // Show/hide no results message
    const noResultsMessage = document.querySelector('.no-results');
    if (visibleCount === 0 && (searchTerm || selectedCategory !== 'all')) {
      if (!noResultsMessage) {
        const noResultsDiv = document.createElement('div');
        noResultsDiv.className = 'no-results';
        noResultsDiv.innerHTML = `
          <i class="fas fa-search"></i>
          <h3>Arama Sonucu Bulunamadı</h3>
          <p>"${searchTerm || selectedCategory}" kriterlerine uygun makale bulunamadı.</p>
        `;
        blogGrid.appendChild(noResultsDiv);
      }
    } else if (noResultsMessage) {
      noResultsMessage.remove();
    }
  }

  // Add event listeners for search and filtering
  if (searchInput) {
    searchInput.addEventListener('input', filterBlogPosts);
  }

  if (categoryFilter) {
    categoryFilter.addEventListener('change', filterBlogPosts);
  }

  // Initialize blog post display
  if (blogPosts.length > 0) {
    // Add hover effects to blog posts
    blogPosts.forEach(post => {
      post.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
        this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(230, 57, 70, 0.2)';
      });
      
      post.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05)';
      });
    });
  }
});