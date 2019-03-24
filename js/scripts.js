var pokemonRepository = (function () {
  var repository = [];

  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

  function loadList() {
    //fetches the data from API
    return $.ajax(apiUrl).then(function (response) {
      response.results.forEach(function(item){
        var pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        //adds the data to repository
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  //Creates new elements and adds into the DOM
  function addListItem (eachPokemon) {

    //creates li element in DOM
    var $li = $('<li>');

    // chooses ul element & appends it in ul
    $('ul').append($li);

    //creates button element in DOM ,add class to it & pokemon name
    var $button = $('<button class = "button-style">' + eachPokemon.name + '</button>' );

    //appends button to website as a child of li
    $li.append($button);

    //executes showDetails function if button is clicked
    $button.on('click',function(event){
      showDetails(eachPokemon);
    });
  }

   //loads details for each pokemon by clicking on the button
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      //displays details in a modal
      showModal(item);
    });
  }

  // adds item to the repository
  function add(item) {
    //validates if item is object
    if (typeof item === 'object' ){
      repository.push(item);
    }else{
      console.log('new item is not an object therefore it cannot be added');
    }
  }

  // allows to access the repository from outside
  function getAll() {
    return repository;
  }

  //loads detailed data for each pokemon using detailsUrl property
  function loadDetails(item) {
    var url = item.detailsUrl;
    return $.ajax(url).then(function (response) {
      item.imageUrl = response.sprites.front_default;
      item.height = response.height;
      item.types = Object.keys(response.types);
      item.weight = response.weight;
    }).catch(function (e) {
      console.error(e);
    });
  }

  // creating modal content
  function showModal(item){
    var $modalContainer = $('#modal-container');

    //clearing all existing modal content
    $modalContainer.text('');

    //creating div element in DOM & adding class to div DOM element
    var $modal =$('<div class = "modal">');

    //creating closing button in modal content
    var $closeButtonElement = $('<button class = "modal-close"> Close </button>');

    // adding event listener to close modal when clicked on button
    $closeButtonElement.on( 'click' , hideModal);

    //creating element for name in modal content & adding pokemon name to it
    var $nameElement = $('<h1>' + item.name  + '</h1>');

    // creating img in modal content
    var $imageElement = $('<img class = "modal-img">')
    $imageElement.attr("src", item.imageUrl);

    //creating element for height in modal content & adding height to it
    var $heightElement = $('<p>'+ 'height : ' + item.height  + '</p>');

    //creating element for weight in modal content & adding weight to it
    var $typesElement = $('<p>' +'weight : ' + item.weight + '</p>');

    //appending modal content to webpage
    $modal.append($closeButtonElement);
    $modal.append($nameElement);
    $modal.append($imageElement);
    $modal.append($heightElement);
    $modal.append($typesElement);
    $modalContainer.append($modal);

    //adds class to show the modal
    $modalContainer.addClass('is-visible');
  }

  //hides modal when clicked on close button
  function hideModal() {
    var $modalContainer = $('#modal-container');
    $modalContainer.removeClass('is-visible');
  }

  //hides modal when clicked on ESC on keyboard
  window.addEventListener('keydown', (e) =>{
    var $modalContainer =  $('#modal-container');
    if (e.key === 'Escape' && $modalContainer.hasClass('is-visible')){
      hideModal();
    }
  })

  var $modalContainer = $('#modal-container');
  //hides modal if clicked outside of it
  $modalContainer.on('click' ,function(event)  {
    var $modalContainer = $('#modal-container');
    if ($(event.target).closest('#modal-container').length) {
      hideModal();
      }
    }
   );

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails:loadDetails,
    showModal: showModal,
    hideModal: hideModal
  };

} ) ();

  // Loading the data from API
pokemonRepository.loadList().then(function() {
  // accessing pokemon repository & running function over each object in repository
  pokemonRepository.getAll().forEach(function (eachPokemon){
    //executing addListItem function for each object in pokemon repository
    pokemonRepository.addListItem (eachPokemon);
  });
});
