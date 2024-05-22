# waste_classifier

## 1. Introduction

In today's fast-paced world, effective waste management is crucial for maintaining a clean and sustainable environment. With the growing demand for efficient waste segregation solutions, we have developed a Waste Classifier designed to revolutionize the way individuals and organizations handle waste. Our classifier is a user-friendly tool that categorizes waste into recyclable, biodegradable, and hazardous, facilitating proper disposal and promoting environmental conservation.

## 2. Problem Statement

One of the significant challenges in waste management is the proper segregation of waste materials. In many situations, individuals may be uncertain about how to dispose of different types of waste, leading to improper disposal and environmental harm. This lack of knowledge and accessibility to correct waste disposal information can hinder effective waste management practices. A waste classifier solution is well-suited to address this challenge due to its ability to provide instant classification, personalized interaction, scalability, and educational capabilities.

## 3. Features
Waste Classification: Automatically classify waste items into recyclable, biodegradable, or hazardous categories.
User Interface: A simple and intuitive web interface for users to upload waste images and receive classification results.
Real-Time Processing: Quick and accurate classification results are provided in real time.
## 4. Solution Implementation Approach


### Data Acquisition
The waste images for this project were sourced from multiple locations to ensure a diverse dataset. Primarily, images were obtained from Kaggle datasets, which provided a substantial collection of labeled waste images. Additionally, further images were scraped from Google and other online sources to augment the dataset and enhance the classifier's accuracy.

[dataset kaggle link](https://www.kaggle.com/datasets/gufranamu/waste-dataset)

### Data Preprocessing
#### Data Augmentation
Data augmentation is a technique used to artificially increase the training set by creating modified copies of a dataset using existing data. This includes making minor changes to the dataset or using deep learning to generate new data points, thereby improving the model's robustness and performance.

#### Data Cleaning
Data cleaning involved removing unwanted images with formats other than JPEG, JPG, and PNG. The imghdr function was used to check each image, ensuring only valid images were included in the dataset.

#### Data Splitting
After shuffling the data, the dataset was split into three parts: training, validation, and test sets. This ensures that the model is trained on one set of data, validated on another, and tested on a completely separate set to evaluate its performance.


#### Model Training
The model was trained using a Convolutional Neural Network (CNN) with a sequential architecture. CNNs are particularly effective for image classification tasks due to their ability to automatically and adaptively learn spatial hierarchies of features from input images. The sequential architecture allowed for stacking multiple layers, including convolutional layers, pooling layers, and fully connected layers, to build a robust classifier capable of distinguishing between recyclable, biodegradable, and hazardous waste.

#### Model Optimization
As our model tends to overfit, we need to optimize it to improve its generalization performance. This involves adding dropout layers and performing L2 regularization.

##### Overfitting
Overfitting is a common challenge in machine learning where a model learns the training data too well, capturing noise or random fluctuations rather than the underlying patterns. An overfit model may perform well on the training data but generalize poorly to new, unseen data.

##### Dropout Layer
In a dropout layer, a random set of neurons in the network is "dropped out" or set to zero during each forward and backward pass of training. This means that, during training, certain neurons do not contribute to the computation, forcing the network to learn more robust features. Dropout introduces randomness during training, making it harder for the model to rely too much on specific neurons and reducing the risk of overfitting.
##### L2 regularization
L2 regularization, also known as weight decay, is a technique used to prevent overfitting by adding a penalty term to the loss function. This penalty term is proportional to the squared magnitude of the weights in the network. By penalizing large weight values, L2 regularization encourages the model to learn simpler patterns and reduces its tendency to overfit the training data.

#### Web Implementation
The Waste Classifier Project includes a web interface implemented using HTML, CSS, and JavaScript for the frontend, and Flask for the backend.

##### Frontend (HTML/CSS/JavaScript)
The front end of the web application provides a user-friendly interface for users to interact with the waste classifier. It includes features such as uploading waste images and displaying classification results.

##### Backend (Flask)
Flask, a lightweight web application framework in Python, is used for the backend of the web application. Flask handles requests from the front end, processes the uploaded images, performs waste classification using the trained model, and sends the classification results back to the front end for display.

### Technology/Framework Stack Used

- **Model Training:** Python,Tensorflow,OpenCV
- **Frontend/Web App:** HTML, CSS, Flask, JavaScript

## Additional Steps

### Usage 
#### By uploading an image
Here are the steps provided in the figure to use the model by uploading an image on the 
web page simply this image is uploaded and API is called. Firstly, when the user clicks on 
the choose file button then he can select the image from the local computer and then click
on the predict button on the next page the result is displayed.

![image  1](https://github.com/gufran21/waste_classifier/assets/111707501/a87c17c1-b5db-404c-a6b9-a43ef1535b76)

#### By Camera 
Input can also be taken directly through the camera, by clicking on the camera button 
camera of the laptop/PC will be open by using the JavaScript library webcam.js which will 
take an image after that we will click on the predict button then the result will be predicted 
on the next page.

![image 2](https://github.com/gufran21/waste_classifier/assets/111707501/c988c49c-4d00-4ced-a7dd-89878aab1b29)

## How to Run

1. Clone this repository.
2. go to waste_classifier directory `cd waste_classifier`
3. Install the required dependencies using `pip install -r requirements.txt`.
4. go to website directory `cd website`
5. Run the Flask web application using `python app.py`.
6. Access the website interface through your web browser.


## Contributing
Contributions are welcome! Please fork this repository and submit a pull request with your improvements.
