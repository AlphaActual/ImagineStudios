 // MODALS
'use strict';

document.body.addEventListener("click", function (event) {
    
        if (event.target.classList.contains("modal-image")) { // if clicked on image
            // get the image
            let imgElement = event.target.cloneNode();
            imgElement.classList.remove("modal-image")
            console.log(imgElement);

            // create modal html template
            const modalHTML = `
            <div class="modal modal-fullscreen" id="myImageModal" tabindex="-1">
                <div class="modal-dialog modal-fullscreen ">
                    <div class="modal-content bg-transparent-black position-relative">
                        
                        <button type="button" class="btn-close bg-danger scale1" data-bs-dismiss="modal" aria-label="Close"></button>
                        
                    
                        <div class="modal-body d-flex align-items-center justify-content-center text-center">
                            
                            <div class="col-11 fadeIn animateFadeIn">
                                ${imgElement.outerHTML}
                            </div>

                        </div>
                
                </div>
                
            </div>`;
            // insert modal in DOM
            document.body.insertAdjacentHTML("beforeend", modalHTML);
            //designate and initiate modal
            var myModal = new bootstrap.Modal(document.getElementById('myImageModal'), {});
            myModal.show();
            
            // listen for the closing button to remove modal 
            document.querySelector(".btn-close").addEventListener("click", function () {

                //remove modal upon closing
                document.getElementById("myImageModal").remove();
                myModal = null;
                
            });
        }; 
});           
    

    

    