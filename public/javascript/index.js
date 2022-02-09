const charactersAPI = new APIHandler();

window.addEventListener("load", () => {
  document
    .getElementById("fetch-all")
    .addEventListener("click", function (event) {
      charactersAPI
        .getFullList()
        .then((response) => {
          let text = "";

          response.data.forEach(
            (element) =>
              (text += `
        <div class="character-info">
          <div class="name">${element.name}</div>
          <div class="occupation">${element.occupation}</div>
          <div class="cartoon">${element.cartoon}</div>
          <div class="weapon">${element.weapon}</div>
        </div>`)
          );

          document.querySelector(".characters-container").innerHTML = text;
        })
        .catch((err) => console.log(err));
    });

  document
    .getElementById("fetch-one")
    .addEventListener("click", function (event) {
      event.preventDefault();

      const input = document.querySelector('input[name="character-id"]');
      const id = input.value;
      charactersAPI.getOneRegister(id).then((response) => {
        const element = response.data;
        const text = `<div class="character-info">
          <div class="id">Id: ${element.id}</div>
          <div class="name">Name: ${element.name}</div>
          <div class="occupation">Occupation: ${element.occupation}</div>
          <div class="cartoon">Is a Cartoon: ${element.cartoon}</div>
          <div class="weapon">Weapon: ${element.weapon}</div>
        </div>`;

        const container = document.querySelector(".characters-container");

        container.innerHTML = text;

        const inputs = document.querySelectorAll("#edit-character-form input");
        inputs[0].value = element.id;
        inputs[1].value = element.name;
        inputs[2].value = element.occupation;
        inputs[3].value = element.weapon;
        inputs[4].checked = element.cartoon;
      });
    });

  document
    .getElementById("delete-one")
    .addEventListener("click", function (event) {
      event.preventDefault();

      const input = document.querySelector('input[name="character-id-delete"]');
      const id = input.value;
      charactersAPI
        .deleteOneRegister(id)
        .then(() => console.log("deleted"))
        .catch((error) => console.log(error));
    });

  document
    .getElementById("edit-character-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const inputs = document.querySelectorAll("#edit-character-form input");
      const id = inputs[0].value;
      const data = {
        name: inputs[1].value,
        occupation: inputs[2].value,
        weapon: inputs[3].value,
        cartoon: inputs[4].checked,
      };

      charactersAPI
        .updateOneRegister(id, data)
        .then(() => console.log("updated"))
        .catch((error) => console.log(error));
    });

  document
    .getElementById("new-character-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const inputs = document.querySelectorAll("#new-character-form input")

      const data = {
        name: inputs[0].value,
        occupation: inputs[1].value,
        weapon: inputs[2].value,
        cartoon: inputs[3].checked,
      };

      console.log(data);

      charactersAPI
        .createOneRegister(data)
        .then(() => console.log("created"))
        .catch((error) => console.log(error));
    });
});
