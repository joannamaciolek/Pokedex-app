var pokemonRepository=function(){var e=[],t="https://pokeapi.co/api/v2/pokemon/";function n(e){pokemonRepository.loadDetails(e).then(function(){a(e)})}function o(t){"object"==typeof t?e.push(t):console.error("new item is not an object therefore it cannot be added")}function a(e){var t=$("#modal-container");t.text("");var n=$('<div class = "modal">'),o=$('<button class = "modal-close"> Close </button>');o.on("click",i);var a=$("<h1>"+e.name+"</h1>"),s=$('<img class = "modal-img">');s.attr("src",e.imageUrl);var r=$("<p>height : "+e.height+"</p>"),l=$("<p>weight : "+e.weight+"</p>");n.append(o),n.append(a),n.append(s),n.append(r),n.append(l),t.append(n),t.addClass("is-visible")}function i(){$("#modal-container").removeClass("is-visible")}return window.addEventListener("keydown",e=>{var t=$("#modal-container");"Escape"===e.key&&t.hasClass("is-visible")&&i()}),$("#modal-container").on("click",function(e){$(e.target).closest("#modal-container").length&&i()}),{add:o,getAll:function(){return e},addListItem:function(e){var t=$("<li>");$("ul").append(t);var o=$('<button class = "button-style">'+e.name+"</button>");t.append(o),o.on("click",function(){n(e)})},showDetails:n,loadList:function(){return $.ajax(t).then(function(e){e.results.forEach(function(e){o({name:e.name,detailsUrl:e.url})})}).catch(function(e){console.error(e)})},loadDetails:function(e){var t=e.detailsUrl;return $.ajax(t).then(function(t){e.imageUrl=t.sprites.front_default,e.height=t.height,e.types=Object.keys(t.types),e.weight=t.weight}).catch(function(e){console.error(e)})},showModal:a,hideModal:i}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(e){pokemonRepository.addListItem(e)})});
