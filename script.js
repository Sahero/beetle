(function ($) {
	$.fn.extend({
        vc3dEye: function(params) {
            vc3dEye(this.selector, params);
            return
        }
    });

    var vc3dEye=function (selectorName,params) {
    	//assigning params
    	this.selector = $(selectorName);
    	this.imagePath = params.imagePath;
    	this.totalImages = params.totalImages;
      this.imageExtension = params.imageExtension || "png";
      //this.hideAfterFirstMove = $(".will-hide");
    	this.isMoving = false;
    	this.currentX = 0;
    	this.currentImage=8;

    	function assignOperations() {
            selector.mousedown(function(target) {
                isMoving = true;
                currentX=target.pageX - this.offsetLeft;
                //console.log("mousedown : isMoving="+isMoving);
            });

            $(document).mouseup(function() {
                isMoving = false;
                loadInfoIcon();
                //console.log("mouseup : isMoving="+isMoving);
            });

            selector.mousemove(function(target) {
                //console.log("mousemove : isMoving="+isMoving);
    
                                   
                if (isMoving == true){ 
                  loadAppropriateImage(target.pageX - this.offsetLeft);
                  $(".will-hide").hide();
                }
                // else 
                // 	currentX = target.pageX - this.offsetLeft
            });

            selector.bind("touchstart", function(target) {
                 isMoving = true;
                 
                 $(".will-hide").hide();                 
                //store the start position
                var actualTouch = target.originalEvent.touches[0] || target.originalEvent.changedTouches[0];
                currentX = actualTouch.clientX;

            });

            $(document).bind("touchend", function() {
                isMoving = false;
                loadInfoIcon();
            });

            selector.bind("touchmove", function(target) {
                target.preventDefault();
                var actualTouch = target.originalEvent.touches[0] || target.originalEvent.changedTouches[0];
                if (isMoving == true) 
                	loadAppropriateImage(actualTouch.pageX - this.offsetLeft);
                else 
                	currentX = actualTouch.pageX - this.offsetLeft
            })
        }

        function loadInfoIcon(){
            if(currentImage === 8){
                $('#infoHeadlight').fadeIn();
                $('#infoBumper').hide();
                $('#infoSpoiler').hide();
                $('#infoHeadlight').tooltipster({
                    animation: 'fade',
                    trigger: 'click',
                    content: '<div class="info"><h3>Bi-Xenon headlights</h3>Bi-Xenon headlights with sleek LED Daytime Runtime Running Lights boost a longer life and use less energy.</div>',
                    contentAsHTML: true,
                    theme: 'tooltipster-shadow',
                    maxWidth: '150',
                    multiple: true,        
                });
                return;
            }
            else if(currentImage === 21){
                $('#infoHeadlight').hide();
                $('#infoSpoiler').fadeIn();
                $('#infoBumper').hide();
                $('#infoSpoiler').tooltipster({
                    animation: 'fade',
                    trigger: 'click',
                    content: '<div class="info"><h3>Rear spoiler</h3>A sleeker edge to the apperance of the car. So, while you\'re turning corners, it\'s turning Headers.</div>',
                    contentAsHTML: true,
                    theme: 'tooltipster-shadow',
                    maxWidth: '150',
                    multiple: true,
        
                });
                return;
            }
            else if(currentImage === 22 || currentImage === 2){
                $('#infoHeadlight').hide();
                $('#infoSpoiler').hide();
                $('#infoBumper').fadeIn();
                $('#infoBumper').tooltipster({
                    animation: 'fade',
                    trigger: 'click',
                    content: '<div class="info"><h3>Sport-design front and rear bumpers</h3>These smartly designed front and rear bumpers add a sporty and modern touch to the Beetle.</div>',
                    contentAsHTML: true,
                    theme: 'tooltipster-shadow',
                    maxWidth: '150',
                    multiple: true,
        
                });
                return;
            }
            else{
                $('#infoHeadlight').hide();
                $('#infoBumper').hide();
                $('#infoSpoiler').hide();
                return;
            }
        }

        function loadAppropriateImage(newX) {

            if (currentX - newX < -25 ) {
                currentX = newX;
                currentImage = --currentImage < 1 ? totalImages : currentImage;
                  //selector.css("background-image", "url(" + imagePath + currentImage + "." + imageExtension + ")");
                  selector.attr("src", imagePath + currentImage + "." + imageExtension );
            } else if (currentX - newX > 25) {
                currentX = newX;
                currentImage = ++currentImage > totalImages ? 1 : currentImage;  
                //selector.css("background-image", "url(" + imagePath + currentImage + "." + imageExtension + ")");
                selector.attr("src", imagePath + currentImage + "." + imageExtension );
            }            
            
        }

        function forceLoadAllImages() {
        	//load the first image
            var loadedImages = 2;
            var appropriateImageUrl = imagePath + "8." + imageExtension;
            //selector.css("background-image", "url(" + appropriateImageUrl + ")");
            selector.attr("src", appropriateImageUrl);  
            $("<img/>").attr("src", appropriateImageUrl).load(function() {
                /* selector.css("max-height", "700px");
                selector.css("max-width", "400px");
                selector.css("position", "absolute");
                selector.css("left", "0px");
                selector.css("top", "200px"); */
                selector.addClass("vw360img");
            });
  
            //load all other images by force
            /* for (var n = 2; n <= totalImages; n++) {
                appropriateImageUrl = imagePath + n+"." + imageExtension;
                selector.append("<img src='" + appropriateImageUrl + "' style='display:none;'>");
                $("<img/>").attr("src", appropriateImageUrl).css("display", "none").load(function() {
                    loadedImages++;
                    if (loadedImages >= totalImages) {
                        $("#VCc").removeClass("onLoadingDiv");
                        $("#VCc").text("")
                    }
                })
            } */
        }

        function initializeOverlayDiv() {
            //$("html").append("<style type='text/css'>.onLoadingDiv{background-color:#00FF00;opacity:0.5;text-align:center;font-size:2em;font:color:#000000;}</style>")
            $(selector).html("<div id='VCc' style='height:100%;width:100%;' class='onLoadingDiv'>Loading...</div>");
            
        }
        
        //initializeOverlayDiv();
        forceLoadAllImages();
        loadInfoIcon();
        //loadAppropriateImage();
        assignOperations();
        
    }

 
})(jQuery);