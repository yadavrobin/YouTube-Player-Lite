const data = [
  {
    videoId: 'bUZgmUXMUw4',
    title: 'Bhailang',
    category: 'javascript',
    favorite: true,
  },
  {
    videoId: 'g9b7x2g9cJk',
    title: 'fullstack roadmap',
    category: 'html',
    favorite: false,
  },
  {
    videoId: 'XXYlFuWEuKI',
    title: 'weekend music',
    category: 'music',
    favorite: false,
  },
  {
    videoId: 'hMQCVMh4Aig',
    title: 'Life at Park+',
    category: 'javascript',
    favorite: true,
  },
  
];

const renderToDom = (divId, textToRender) => {
  const selectedElement = document.querySelector(divId);
  selectedElement.innerHTML = textToRender;
};

const videoBtnModal = () => {
  const domString = `
    <button type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#add-video">
    Add Video
    </button>
    <div class="modal fade" id="add-video" tabindex="-1" aria-labelledby="add-video" aria-hidden="true">
      <div class="modal-dialog modal-fullscreen-md-down">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add Video</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" id="modal-body">
          <form>
          <div class="form-floating mb-3">
            <input class="form-control form-control-lg" type="text" placeholder="Video ID" id="videoId" aria-label="video id" required>
            <label for="videoId">YouTube Video ID</label>
          </div>
          <div class="form-floating mb-3">
            <input class="form-control form-control-lg" type="text" placeholder="Title" id="title" aria-label="title" required>
            <label for="title">Title</label>
          </div>
          <div class="form-floating mb-3">
            <select class="form-select form-control-lg" id="category" aria-label="category" required>
              <option value="">Select a category</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
              <option value="javascript">JavaScript</option>
              <option value="music">Music</option>
            </select>
            <label for="category">Category</label>
          </div>
          <div class="form-check mb-3">
            <input class="form-check-input" type="checkbox" value="" id="favorite">
            <label class="form-check-label" for="favorite">
              Favorite
            </label>
          </div>
          <button 
            type="submit" 
            class="btn btn-success" 
          >
            Submit
          </button>
        </form>
          </div>
        </div>
      </div>
    </div>
  `;
  renderToDom('#createBtnContainer', domString);
};

const videoPlayer = (videoId = 'g9b7x2g9cJk') => {
  const domString = `
  <iframe src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  `;
  renderToDom('#videoPlayer', domString);
};

const filterButtons = () => {
  let domString = `
  <div class="d-flex flex-wrap justify-content-between my-3">
    <button class="btn btn-secondary btn-lg buttonRow" id="music">Music</button>
    <button class="btn btn-secondary btn-lg buttonRow" id="javascript">Javascript</button>
    <button class="btn btn-secondary btn-lg buttonRow" id="css">CSS</button>
    <button class="btn btn-secondary btn-lg buttonRow" id="html">HTML</button>
    <button class="btn btn-secondary btn-lg buttonRow" id="favorite">Favorites</button>
    <button class="btn btn-secondary btn-lg buttonRow" id="clear">Clear Filter</button>
  </div>
  `;
  renderToDom('#filterContainer', domString);
};

const cardsOnDom = (array) => {
  let domString = '';
  for (const item of array) {
    domString += `
    <div class="mb-3 d-flex align-items-center" style="background: white; padding: 20px; border: 1px solid black; border-radius: 10px;">
    <div class="flex-shrink-0">
      <img src="media/${item.category}.png" style="width: 120px; height: 120px; border-radius: 20px;" alt="${item.category} icon">
    </div>
    <div class="flex-grow-1 ms-3">
      <h2 style="font-size: 24px; font-weight: bold; padding: 0px; margin: 0px">${item.favorite ? '⭐' : ''} ${item.title}</h2>
      <p><b>Category:</b> ${item.category.toUpperCase()}</p>
      <button class="btn btn-dark" id="watch--${item.videoId}">Watch Video</button>
    </div>
    <div>
      <button class="btn btn-danger" id="delete--${item.videoId}">X</button>
    </div>
  </div>
    `;
  }
  renderToDom('#cardContainer', domString);
};

const eventListeners = () => {
  const formModal = new bootstrap.Modal(document.querySelector('#add-video'));

  document.querySelector('#filterContainer').addEventListener('click', (e) => {
    if (e.target.id === 'clear') {
      cardsOnDom(data);
    } else if (e.target.id === 'favorite') {
      cardsOnDom(data.filter((vid) => vid.favorite));
    } else if (e.target.id) {
      cardsOnDom(data.filter((vid) => vid.category === e.target.id));
    }
  });

  document.querySelector('#cardContainer').addEventListener('click', (e) => {
    if (e.target.id) {
      const [, videoId] = e.target.id.split('--');
      const index = data.findIndex((vid) => vid.videoId === videoId);

      if (e.target.id.includes('watch')) {
        videoPlayer(data[index].videoId);
        document.location = '#';
      }

      if (e.target.id.includes('delete')) {
        data.splice(index, 1);
        cardsOnDom(data);
      }
    }
  });

  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const newVideoObj = {
      videoId: document.querySelector('#videoId').value,
      title: document.querySelector('#title').value,
      category: document.querySelector('#category').value,
      favorite: document.querySelector('#favorite').checked,
    };

    data.push(newVideoObj);
    cardsOnDom(data);
    formModal.hide()
    form.reset();
  });
};

const startApp = () => {
  videoBtnModal();
  videoPlayer();
  filterButtons();
  cardsOnDom(data);
  eventListeners();
};

startApp();
console.log(true===" ")