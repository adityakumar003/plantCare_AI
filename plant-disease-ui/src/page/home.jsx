import React, { useState, useRef } from 'react';
import { Upload, X, Leaf, ArrowLeft, AlertCircle, CheckCircle, Loader } from 'lucide-react';

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setPrediction(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreview(null);
    setPrediction(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
    // Uncomment and modify this for your actual API call:
  const handlePredict = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      
      const response = await fetch("http://localhost:5000/predict", {
        method: 'POST',
        body: formData
      });
      
      const result = await response.json();
      console.log('Prediction Result:', result);
      setPrediction(result);
      setIsLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
    }
    
  };

  return (
    <div className="min-h-screen bg-[#F5F3EE]">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.location.href = '/'}
              className="flex items-center gap-2 text-[#2D5016] hover:text-[#8B9D83] transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Back</span>
            </button>
            <div className="h-6 w-px bg-[#D4E7C5]" />
            <div className="flex items-center gap-2">
              <Leaf size={24} color="#8B9D83" />
              <span className="text-xl font-bold text-[#2D5016]">PlantCare AI</span>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-70xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#2D5016] mb-4 text-center">
            Detect Plant Diseases
          </h1>
          <p className="text-lg text-[#2D5016] opacity-80">
            Upload an image of your plant's leaf to get instant diagnosis
          </p>
        </div>
        <br />
        <br />
        <br />

        <div className="grid lg:grid-cols-2 gap-8 ">
          {/* Upload Section */}
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <h2 className="text-4xl font-bold text-[#2D5016] mb-6 text-center">Choose an image...</h2>
            <br />
            <br />
            {/* Drag and Drop Area */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`border-3 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                isDragging
                  ? 'border-[#8B9D83] bg-[#D4E7C5] bg-opacity-30'
                  : 'border-[#D4E7C5] bg-[#F5F3EE]'
              }`}
            >
              <Upload size={48} className="mx-auto mb-4 text-[#8B9D83]" />
              <p className="text-lg font-semibold text-[#2D5016] mb-2">
                Drag and drop file here
              </p>
              <p className="text-sm text-[#2D5016] opacity-60 mb-6">
                Limit 200MB per file • JPG, PNG, JPEG
              </p>
              
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-[#8B9D83] hover:bg-[#7A8B73] text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Browse files
              </button>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />
            </div>

            {/* Selected File Preview */}
            {selectedFile && (
              <div className="mt-6 bg-[#F5F3EE] rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-[#D4E7C5] p-3 rounded-lg">
                    <Upload size={20} className="text-[#8B9D83]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#2D5016]">{selectedFile.name}</p>
                    <p className="text-sm text-[#2D5016] opacity-60">
                      {(selectedFile.size / 1024).toFixed(1)}KB
                    </p>
                  </div>
                </div>
                <button
                  onClick={removeFile}
                  className="p-2 hover:bg-[#C97064] hover:bg-opacity-20 rounded-full transition-colors"
                >
                  <X size={20} className="text-[#C97064]" />
                </button>
              </div>
            )}

            {/* Preview Image */}
            {preview && (
              <div className="mt-6">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-xl shadow-md"
                />
              </div>
            )}

            {/* Predict Button */}
            {selectedFile && !prediction && (
              <button
                onClick={handlePredict}
                disabled={isLoading}
                className="w-full mt-6 bg-[#8B9D83] hover:bg-[#7A8B73] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {isLoading ? (
                  <>
                    <Loader className="animate-spin" size={20} />
                    Analyzing...
                  </>
                ) : (
                  'Detect Disease'
                )}
              </button>
            )}
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <h2 className="text-4xl font-bold text-[#2D5016] mb-6 text-center">Diagnosis Results</h2>
            
            {!prediction && !isLoading && (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="bg-[#D4E7C5] p-6 rounded-full mb-4">
                  <Leaf size={48} className="text-[#8B9D83]" />
                </div>
                <p className="text-[#2D5016] opacity-60">
                  Upload an image to see the diagnosis results
                </p>
              </div>
            )}

            {isLoading && (
              <div className="flex flex-col items-center justify-center h-64">
                <Loader className="animate-spin text-[#8B9D83] mb-4" size={48} />
                <p className="text-[#2D5016] font-semibold">Analyzing your plant...</p>
              </div>
            )}

            {prediction && (
              <div className="space-y-6">
                {/* Disease Name */}
                <div className="bg-[#D4E7C5] rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="text-[#C97064] flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h3 className="text-xl font-bold text-[#2D5016] mb-2">
                        {prediction.disease}
                      </h3>
                      <p className="text-[#2D5016] opacity-80">
                        {prediction.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Confidence */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-[#2D5016]">Confidence</span>
                    <span className="text-[#8B9D83] font-bold">{prediction.confidence}%</span>
                  </div>
                  <div className="w-full bg-[#F5F3EE] rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-[#8B9D83] h-full rounded-full transition-all duration-500"
                      style={{ width: `${prediction.confidence}%` }}
                    />
                  </div>
                </div>

                {/* Severity */}
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#2D5016]">Severity:</span>
                  <span className={`px-4 py-1 rounded-full text-sm font-semibold ${
                    prediction.severity === 'high' 
                      ? 'bg-[#C97064] text-white'
                      : prediction.severity === 'moderate'
                      ? 'bg-[#D4A574] text-white'
                      : 'bg-[#D4E7C5] text-[#2D5016]'
                  }`}>
                    {prediction.severity.toUpperCase()}
                  </span>
                </div>

                {/* Treatment */}
                <div>
                  <h4 className="font-bold text-[#2D5016] mb-3 flex items-center gap-2">
                    <CheckCircle className="text-[#8B9D83]" size={20} />
                    Recommended Treatment
                  </h4>
                  <ul className="space-y-2">
                    {prediction.treatment.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#8B9D83] font-bold">{idx + 1}.</span>
                        <span className="text-[#2D5016]">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Analyze Another */}
                <button
                  onClick={removeFile}
                  className="w-full bg-[#F5F3EE] hover:bg-[#D4E7C5] text-[#2D5016] px-8 py-3 rounded-full font-semibold transition-all duration-300"
                >
                  Analyze Another Image
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;