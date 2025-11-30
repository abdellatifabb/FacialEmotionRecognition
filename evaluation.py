import numpy as np
import matplotlib.pyplot as plt
from sklearn.metrics import classification_report, confusion_matrix
import itertools
import tensorflow as tf

# Note: 'model', 'test_ds', and 'class_names' need to be defined before running this code.
# For example:
# model = tf.keras.models.load_model('path/to/model.h5')
# test_ds = ... # Your test dataset
# class_names = ... # List of class names

# ============================================================
# 8. Evaluation: Accuracy, F1-score, confusion matrix
# ============================================================

# Ensure model and test_ds are available in the context if running as a script
if 'model' in locals() and 'test_ds' in locals():
    test_loss, test_acc = model.evaluate(test_ds)
    print("Test accuracy:", test_acc)

    y_true = []
    y_pred = []

    for images, labels in test_ds:
        preds = model.predict(images)
        y_true.extend(labels.numpy())
        y_pred.extend(np.argmax(preds, axis=1))

    y_true = np.array(y_true)
    y_pred = np.array(y_pred)

    print("Classification report:")
    if 'class_names' in locals():
        print(classification_report(y_true, y_pred, target_names=class_names))
    else:
        print(classification_report(y_true, y_pred))

    cm = confusion_matrix(y_true, y_pred)
    print("Confusion matrix:\n", cm)

    def plot_confusion_matrix(cm, classes,
                              normalize=False,
                              title='Confusion matrix',
                              cmap=plt.cm.Blues):
        if normalize:
            cm = cm.astype("float") / cm.sum(axis=1)[:, np.newaxis]

        plt.figure(figsize=(8, 6))
        plt.imshow(cm, interpolation='nearest', cmap=cmap)
        plt.title(title)
        plt.colorbar()
        tick_marks = np.arange(len(classes))
        plt.xticks(tick_marks, classes, rotation=45)
        plt.yticks(tick_marks, classes)

        fmt = ".2f" if normalize else "d"
        thresh = cm.max() / 2.
        for i, j in itertools.product(range(cm.shape[0]), range(cm.shape[1])):
            plt.text(j, i, format(cm[i, j], fmt),
                     horizontalalignment="center",
                     color="white" if cm[i, j] > thresh else "black")

        plt.ylabel('True label')
        plt.xlabel('Predicted label')
        plt.tight_layout()

    if 'class_names' in locals():
        plot_confusion_matrix(cm, classes=class_names, title="Confusion Matrix (non-normalized)")
        plt.show()

        plot_confusion_matrix(cm, classes=class_names, normalize=True, title="Confusion Matrix (normalized)")
        plt.show()

    # Optional: save model
    model.save("/content/mobilenetv2_emotion.keras")
else:
    print("Error: 'model' and 'test_ds' must be defined to run this evaluation script.")
