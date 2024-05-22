function open_camera(){
    Webcam.set({
	  width: 350,
	  height: 290,
	  image_format: 'jpeg',
	  jpeg_quality: 90
	 });	 
	
      document.getElementById("input").outerHTML=`
      <div id="input"></div>
      `
      document.getElementById("predict").outerHTML=`
      <button id="predict" class="custom-file-input" type="button" onclick="captured_pred()">predict</button>
      `
      Webcam.attach( '#input');  
      }

      function captured_pred(){
      Webcam.snap( function(data_uri) {
       file=urlTOFile(data_uri)
       
	     document.getElementById('input').outerHTML =
	    '<img style="width:350px;height:270px" id="input" class="after_capture_frame" src="'+data_uri+'"/>';
        document.getElementById('input').style.border="3px solid black";
        document.getElementById('input').style.borderRadius="10px";
       Webcam.reset()
       const data=new FormData()
       data.append("img",file)
      fetch("/predict",{
        method:'POST',
        body:data
       }).then(response=>response.json()).then(data=>{
        document.getElementById("out_img").src=data_uri  
        document.getElementById("arrow").src='../static/assets/arrow-5817_256.gif';     
        document.getElementById("dustbin").src=data.dustbin
        document.getElementById("out_img").style.border="3px solid black";
        document.getElementById("out_img").style.borderRadius="10px";
       
        console.log(data)
        if(data.predicted=="cardboard"){
            document.getElementById("out_text").outerHTML=`
            <div id="out_text">
            <h4>this is <span style="color:blue;">cardboard</span> which comes under <span style="color:blue;"><b>recycable</b></span> waste category,so please put it into <span style="color:blue;"> blue</span> dustbin</h4>
            <h3>confidence : ${data.confidence}</h3>
            </div>
            `
        }
        else if(data.predicted=="plastic"){
            document.getElementById("out_text").outerHTML=`
            <div id="out_text">
            <h4>this is <span style="color:blue;">plastic</span> which comes under <span style="color:blue;"><b>recycable </b></span> waste category,so please put it into <span style="color:blue;"> blue</span> dustbin</h4>
            <h3>confidence : ${data.confidence}</h3>
            </div>
            `
        }
        else if(data.predicted=="paper"){
            document.getElementById("out_text").outerHTML=`
            <div id="out_text">
            <h4>this is <span style="color:blue;">paper</span> which comes under <span style="color:blue;"><b>recycable </b></span> waste category,so please put it into <span style="color:blue;"> blue</span> dustbin</h4>
            <h3>confidence : ${data.confidence}</h3>
            </div>
            `
        }
        else if(data.predicted=="glass"){
            document.getElementById("out_text").outerHTML=`
            <div id="out_text">
            <h4>this is <span style="color:blue;">glass</span> which comes under <span style="color:blue;"><b>recycable </b></span> waste category,so please put it into <span style="color:blue;"> blue</span> dustbin</h4>
            <h3>confidence : ${data.confidence}</h3>
            </div>
            `
        }
        else if(data.predicted=="metal"){
            document.getElementById("out_text").outerHTML=`
            <div id="out_text">
            <h4>this is <span style="color:blue;">metal</span> which comes under <span style="color:blue;"><b>recycable </b></span> waste category,so please put it into<span style="color:blue;"> blue</span>dustbin</h4>
            <h3>confidence : ${data.confidence}</h3>
            </div>
            `
        }
        else if(data.predicted=="trash"){
            document.getElementById("out_text").outerHTML=`
            <div id="out_text">
            <h4>this is <span style="color:blue;">trash</span> which comes under <span style="color:blue;"><b>recycable </b></span> waste category,so please put it into <span style="color:blue;"> blue</span> dustbin</h4>
            <h3>confidence : ${data.confidence}</h3>
            </div>
            `
        }
        else if(data.predicted=="bio-degradable"){
            document.getElementById("out_text").outerHTML=`
            <div id="out_text">
            <h4>this is <span style="color:green;"><b>bio-degradable</b></span>,so please put it into <span style="color:green;"> green</span> dustbin</h4>
            <h3>confidence : ${data.confidence}</h3>
            </div>
            `
        }
        else if(data.predicted=="e-waste"){
            document.getElementById("out_text").outerHTML=`
            <div id="out_text">
            <h4>this is <span style="color:red;"><b>e-waste</b></span>,so please put it into <span style="color:red;"> red</span> dustbin</h4>
            <h3>confidence : ${data.confidence}</h3>
            </div>
            `
        }
        document.getElementById("out_text").style.border="2px solid black";
        document.getElementById("out_text").style.borderRadius="10px";
      

       })
	        });	 
	

      }
      function urlTOFile(data_uri){
        let arr=data_uri.split(",")
        let mime=arr[0].match(/:(.*?);/)[1]
       
        let dataStr=atob(arr[1])
        let n=dataStr.length
        let dataArr=new Uint8Array(n)
        while(n--){
          dataArr[n]=dataStr.charCodeAt(n) 
        }
        let file=new File([dataArr],"file.jpg",{type:mime})
      
        return file
      }
   
      function img_show(data){

        const [file]=data
  
        if(file){
        document.getElementById("input").outerHTML=`
        <img id="input"
                style="width:350px;height:270px"
                src="{{url_for('static',filename='assets/2.gif')}}"
                class=""
                alt=""
              />
        `
        document.getElementById("input").src=URL.createObjectURL(file)
        document.getElementById("input").style.border="2px solid black";
        document.getElementById("input").style.borderRadius="10px";
        document.getElementById("predict").outerHTML=`
        <button id="predict" class="custom-file-input" type="button" onclick="predict_img()">predict</button>
      `
        }
      }

function predict_img(){
        const [file]=document.getElementById("uploaded_image").files
        const data=new FormData()
       data.append("img",file)
      fetch("/predict",{
        method:'POST',
        body:data
       }).then(response=>response.json()).then(data=>{
     
        document.getElementById("out_img").src=data.img_path
        document.getElementById("arrow").src='../static/assets/arrow-5817_256.gif';
        document.getElementById("dustbin").src=data.dustbin
        document.getElementById("out_img").style.border="3px solid black";
        document.getElementById("out_img").style.borderRadius="10px";
        
        if(data.predicted=="cardboard"){
            document.getElementById("out_text").outerHTML=`
            <div id="out_text">
            <h4>this is <span style="color:blue;">cardboard</span>, which comes under <span style="color:blue;"><b>recycable</b></span> waste category,so please put it into <span style="color:blue;"> blue</span> dustbin</h4>
            <h3>confidence : ${data.confidence}</h3>
            </div>
            `
        }
        else if(data.predicted=="plastic"){
            document.getElementById("out_text").outerHTML=`
            <div id="out_text">
            <h4>this is <span style="color:blue;">plastic</span> which comes under <span style="color:blue;"><b>recycable</b></span> waste category,so please put it into <span style="color:blue;"> blue</span> dustbin</h4>
            <h3>confidence : ${data.confidence}</h3>
            </div>
            `
        }
        else if(data.predicted=="paper"){
            document.getElementById("out_text").outerHTML=`
            <div id="out_text">
            <h4>this is <span style="color:blue;">paper</span> which comes under <span style="color:blue;"><b>recycable</b></span> waste category,so please put it into <span style="color:blue;"> blue</span> dustbin</h4>
            <h3>confidence : ${data.confidence}</h3>
            </div>
            `
        }
        else if(data.predicted=="glass"){
            document.getElementById("out_text").outerHTML=`
            <div id="out_text">
            <h4>this is <span style="color:blue;">glass</span> which comes under <span style="color:blue;"><b>recycable</b></span> waste category,so please put it into <span style="color:blue;"> blue</span> dustbin</h4>
            <h3>confidence : ${data.confidence}</h3>
            </div>
            `
        }
        else if(data.predicted=="metal"){
            document.getElementById("out_text").outerHTML=`
            <div id="out_text">
            <h4>this is <span style="color:blue;">metal</span> which comes under <span style="color:blue;"><b>recycable</b></span> waste category,so please put it into <span style="color:blue;"> blue</span> dustbin</h4>
            <h3>confidence : ${data.confidence}</h3>
            </div>
            `
        }
        else if(data.predicted=="trash"){
            document.getElementById("out_text").outerHTML=`
            <div id="out_text">
            <h4>this is <span style="color:blue;">trash</span> which comes under <span style="color:blue;"><b>recycable</b></span> waste category,so please put it into <span style="color:blue;"> blue</span> dustbin</h4>
            <h3>confidence : ${data.confidence}</h3>
            </div>
            `
        }
        else if(data.predicted=="bio-degradable"){
            document.getElementById("out_text").outerHTML=`
            <div id="out_text">
            <h4>this is <span style="color:green;"><b>bio-degradable</b></span>,so please put it into <span style="color:green;"> green</span> dustbin</h4>
            <h3>confidence : ${data.confidence}</h3>
            </div>
            `
        }
        else if(data.predicted=="e-waste"){
            document.getElementById("out_text").outerHTML=`
            <div id="out_text">
            <h4>this is <span style="color:red;"><b>bio-degradable</b></span>,so please put it into <span style="color:red;"> red</span> dustbin</h4>
            <h3>confidence : ${data.confidence}</h3>
            </div>
            `
        }
        document.getElementById("out_img").style.height="270px"
        document.getElementById("out_img").style.width="350px"
        document.getElementById("out_text").style.border="2px solid black";
        document.getElementById("out_text").style.borderRadius="10px";
      
       })
      }