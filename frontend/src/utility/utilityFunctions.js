export const toggleModal = (event) => {
  event.preventDefault();
  let modalContainer = document.querySelectorAll(".modal");
  let targetModalId = event.target.getAttribute("data-target");
  let targetModal = document.querySelector(targetModalId);
  targetModal.classList.toggle("hide");
  modalContainer.forEach((_modal) => _modal.classList.toggle("fade"));
};
