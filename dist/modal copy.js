 // MODALS

    // 1. detect image to show in modal
    // we are listening in the body because modal will be placed in the body at the end(not to have margins and paddings)
    let modalState = "closed"
    document.body.addEventListener("click", function (event) {
        if (modalState === "closed") { // to prevent bug when  clicking on image in open modal
            if (event.target.classList.contains("modal-image")) { // if clicked on image
                // get the image
                let imgElement = event.target;

                // create modal html template
                const modalHTML = `
            <div class="modal fade" id="myImageModal" tabindex = "-1" aria-labelledby="myImageModalLabel" aria-hidden="true" >
                <div class="modal-dialog modal-fullscreen">
                    <div class="modal-content" style="position:relative;">
                        
                        <div class="modal-body d-flex align-items-md-center text-center">
                            
                            <div class="col img-div">
                                ${imgElement.outerHTML}
                            </div>

                        </div>

                    </div>
                </div>
            </div>`;
            // insert modal in DOM
            document.body.insertAdjacentHTML("beforeend", modalHTML);
            console.log(modalHTML)
            };
        }; 
    });           
    

    //designate and initiate modal
    var myModal = new bootstrap.Modal(document.getElementById('myImageModal'), {});
    myModal.show();
    modalState = "open";

    // listen for the closing button to remove modal 
    document.querySelector(".btn-close").addEventListener("click", function () {

        //remove modal upon closing
        document.getElementById("myImageModal").remove();
        modalState = "closed";

    });