import os

DATASET_PATH = r"C:\Coding\dataset\plantvillage dataset"  # <-- change to actual path
subfolders = ["color", "grayscale", "segmented"]

labels = set()  # use set to avoid duplicates

for folder in subfolders:
    path = os.path.join(DATASET_PATH, folder)
    if os.path.exists(path):
        folder_labels = [d for d in os.listdir(path) if os.path.isdir(os.path.join(path, d))]
        labels.update(folder_labels)

labels = sorted(list(labels))  # convert back to sorted list

# Save labels.txt
with open("labels.txt", "w") as f:
    for label in labels:
        f.write(label + "\n")

print("✅ labels.txt created successfully!")
print("Total unique disease classes:", len(labels))
print(labels)
