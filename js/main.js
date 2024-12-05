(() => {
  //variables
  const hotspots = document.querySelectorAll(".Hotspot");
  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");
  const showError = document.querySelector("#show-error");
  const loader = document.querySelector("#loader");
  const info = document.querySelector("#info");

  let hasError = false;

  //functions
  function loadInfoBoxes() {
    loader.classList.toggle("hidden");

    fetch("https://swiftpixel.com/earbud/api/infoboxes")
      .then((response) => response.json())
      .then((infoBoxes) => {
        infoBoxes.forEach((infoBox, index) => {
          let selected = document.querySelector(`#hotspot-${index + 1}`);

          const heading = document.createElement("h2");
          heading.textContent = infoBox.heading;

          const description = document.createElement("p");
          description.textContent = infoBox.description;

          const img = document.createElement("img");
          img.src = `images/${infoBox.thumbnail}`;

          selected.appendChild(img);
          selected.appendChild(heading);
          selected.appendChild(description);
        });
      })
      .catch((error) => {
        console.log(error);
        if (!hasError) {
          const errorMessage = document.createElement("p");
          errorMessage.textContent = `Ooops, something went wrong. Please check your internet connection or try again later. Error Message: ${error}`;
          info.classList.add("hidden");
          loader.classList.toggle("hidden");
          showError.appendChild(errorMessage);
          hasError = true;
        }
      });
  }
  loadInfoBoxes();

  function loadMaterialInfo() {
    loader.classList.toggle("hidden");

    fetch("https://swiftpixel.com/earbud/api/materials")
      .then((response) => response.json())
      .then((materials) => {
        materials.forEach((material) => {
          const clone = materialTemplate.content.cloneNode(true);

          const materialHeading = clone.querySelector(".material-heading");
          materialHeading.textContent = material.heading;

          const materialDescription = clone.querySelector(
            ".material-description"
          );
          materialDescription.textContent = material.description;

          materialList.appendChild(clone);
        });
      })
      .catch((error) => {
        console.log(error);
        if (!hasError) {
          const errorMessage = document.createElement("p");
          errorMessage.textContent = `Ooops, something went wrong. Please check your internet connection or try again later. Error Message: ${error}`;
          info.classList.add("hidden");
          loader.classList.toggle("hidden");
          showError.appendChild(errorMessage);
          hasError = true;
        }
      });
  }
  loadMaterialInfo();

  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  //Event listeners

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });
})();
