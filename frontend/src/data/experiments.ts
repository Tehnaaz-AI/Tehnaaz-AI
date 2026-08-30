export interface Experiment {
  id: string;
  title: string;
  area: string;
  question: string;
  approach: string;
  experiment: string;
  result: string;
  lessons: string;
}

export const experiments: Experiment[] = [
  {
    id: "hate-speech-classifier",
    title: "Contextual Toxicity Parsing",
    area: "NLP / AI",
    question: "Can we effectively distinguish between benign usage of sensitive words and actual hate speech using classical NLP techniques?",
    approach: "Utilizing Scikit-learn to train various text classification models on annotated datasets, focusing on feature extraction via TF-IDF and word embeddings.",
    experiment: "Built a pipeline to preprocess text, extract features, and train models like Naive Bayes and SVM to classify text into toxic or non-toxic categories.",
    result: "Achieved baseline accuracy but struggled with nuanced sarcasm or reclaimed words, highlighting the limitations of non-contextual models.",
    lessons: "Classical ML is powerful for baseline text classification, but deep learning (transformers) is necessary for true contextual understanding of hate speech."
  },
  {
    id: "waste-sorting-vision",
    title: "Automated Waste Classification",
    area: "Computer Vision",
    question: "How accurately can a basic CNN sort household waste into recyclable and non-recyclable categories?",
    approach: "Training a Convolutional Neural Network (CNN) on a dataset of images of various waste items.",
    experiment: "Implemented image preprocessing and augmentation to handle varying lighting conditions, then trained a custom CNN architecture.",
    result: "The model performed well on distinct items (like bottles) but struggled with deformed or partially obscured objects.",
    lessons: "Data quality and varied augmentation are just as critical as the model architecture in computer vision tasks."
  }
];
