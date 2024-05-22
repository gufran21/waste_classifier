from flask import Flask, request,jsonify, render_template
import os,cv2

import numpy as np
import tensorflow as tf
import matplotlib.pyplot as plt
from keras.models import load_model
class_name=["bio","cardboard","e-waste","glass","metal","paper","plastics","trash"]
def model_predict(filepath):
    os.chdir('../')
    model = load_model(os.path.join(os.getcwd(),"website\waste_classifier.h5"))
    os.chdir("./website")
    print(filepath)
    img=cv2.imread(os.path.join(os.getcwd(),filepath))
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    resize_img = tf.image.resize(img, (256, 256))
    img_array=tf.expand_dims(resize_img/255,0)
    predictions=model.predict(img_array)
    predicted_class=class_name[np.argmax(predictions[0])]
    confidence=round(100*(np.max(predictions[0])),2)
    return predicted_class,confidence

app=Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/predict", methods=["POST"])
def predict():
    try:
        if request.method == 'POST':
            img = request.files["img"]

            img_path = "static\\input_image\\" + img.filename
            if(os.path.isfile(img_path)):
                os.remove(img_path)
            img.save(img_path)
            pred, confidence = model_predict(img_path)
            dustbin=""
            if(pred=="cardboard" or pred=="plastics" or pred=="glass" or pred=="metal" or pred=="paper" or pred=="trash"):
                if(pred=="plastics"):
                    pred="plastic"
                dustbin="static\\assets\\dustbin\\1.png"
            elif(pred=="bio"):
                pred="bio-degradable"
                dustbin = "static\\assets\\dustbin\\3.png"
            elif(pred=="e-waste"):
                dustbin="static\\assets\\dustbin\\2.png"

            return jsonify(predicted=pred, confidence=confidence,img_path=img_path,dustbin=dustbin)
    except:
        error = "file cannot be processed."
        return render_template("index.html", err=error)


if(__name__=="__main__"):
    app.run(debug=True)

