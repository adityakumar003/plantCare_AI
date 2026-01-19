import React, { useState, useRef } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [result, setResult] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileSelect = (selectedFile) => {
        if (selectedFile && selectedFile.type.startsWith('image/')) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
            setResult(null);
        } else {
            alert('Please select a valid image file');
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        handleFileSelect(droppedFile);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleFileInput = (e) => {
        const selectedFile = e.target.files[0];
        handleFileSelect(selectedFile);
    };

    const removeFile = () => {
        setFile(null);
        setPreview(null);
        setResult(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleUpload = async () => {
        if (!file) {
            alert('Please select an image');
            return;
        }

        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append('image', file);

            const response = await axios.post('http://127.0.0.1:5000/predict', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            // The backend now returns dynamic treatment recommendations from Gemini API
            const prediction = {
                disease: response.data.disease,
                confidence: response.data.confidence,
                severity: response.data.severity,
                description: response.data.description,
                treatment: response.data.treatment, // Will be null for healthy plants
                is_healthy: response.data.is_healthy || false
            };

            setResult(prediction);
            setIsLoading(false);
        } catch (error) {
            console.error('Error:', error);
            alert('Error predicting disease. Please check if the backend server is running.');
            setIsLoading(false);
        }
    };

    return (
        <div className="app">
            <Navbar />

            <section className="upload-section">
                <div className="upload-container">
                    <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
                        <h1>Plant Disease Detection</h1>
                        <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)' }}>
                            Upload an image of your plant's leaf to get instant diagnosis and treatment recommendations
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: preview ? '1fr 1fr' : '1fr', gap: 'var(--spacing-xl)' }}>
                        {/* Upload Area */}
                        <div>
                            <div
                                className={`upload-area ${isDragging ? 'drag-over' : ''}`}
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <div className="upload-icon">
                                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                                        <path d="M40 10V50M40 10L25 25M40 10L55 25" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M15 50V65C15 67.761 17.239 70 20 70H60C62.761 70 65 67.761 65 65V50" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h3 className="upload-text">
                                    {file ? 'Change Image' : 'Drop your image here'}
                                </h3>
                                <p className="upload-hint">
                                    or click to browse (JPG, PNG, JPEG)
                                </p>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileInput}
                                    style={{ display: 'none' }}
                                />
                            </div>

                            {file && (
                                <div style={{
                                    marginTop: 'var(--spacing-md)',
                                    background: 'white',
                                    padding: 'var(--spacing-md)',
                                    borderRadius: 'var(--radius-md)',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <div>
                                        <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{file.name}</p>
                                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                            {(file.size / 1024).toFixed(1)} KB
                                        </p>
                                    </div>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); removeFile(); }}
                                        style={{
                                            background: 'transparent',
                                            color: 'var(--terracotta)',
                                            padding: '0.5rem',
                                            borderRadius: '50%'
                                        }}
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    </button>
                                </div>
                            )}

                            {file && !result && (
                                <button
                                    onClick={handleUpload}
                                    disabled={isLoading}
                                    className="btn btn-primary"
                                    style={{ width: '100%', marginTop: 'var(--spacing-md)', justifyContent: 'center' }}
                                >
                                    {isLoading ? (
                                        <>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ animation: 'spin 1s linear infinite' }}>
                                                <path d="M10 2V6M10 14V18M18 10H14M6 10H2M15.657 4.343L12.828 7.172M7.172 12.828L4.343 15.657M15.657 15.657L12.828 12.828M7.172 7.172L4.343 4.343" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                            </svg>
                                            Analyzing...
                                        </>
                                    ) : (
                                        'Analyze Plant'
                                    )}
                                </button>
                            )}
                        </div>

                        {/* Preview & Results */}
                        {preview && (
                            <div>
                                <img
                                    src={preview}
                                    alt="Plant preview"
                                    className="result-image"
                                    style={{ marginBottom: 'var(--spacing-md)' }}
                                />

                                {isLoading && (
                                    <div style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}>
                                        <div style={{
                                            width: '60px',
                                            height: '60px',
                                            margin: '0 auto var(--spacing-md)',
                                            animation: 'spin 1s linear infinite'
                                        }}>
                                            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                                                <circle cx="30" cy="30" r="25" stroke="var(--olive-light)" strokeWidth="4" />
                                                <path d="M30 5C16.193 5 5 16.193 5 30" stroke="var(--forest-primary)" strokeWidth="4" strokeLinecap="round" />
                                            </svg>
                                        </div>
                                        <p style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>
                                            Analyzing your plant...
                                        </p>
                                    </div>
                                )}

                                {result && (
                                    <div className="results">
                                        <div className="results-header">
                                            <h2>Diagnosis Results</h2>
                                        </div>

                                        <div className="result-info">
                                            <div>
                                                <p className="result-label">Disease Detected</p>
                                                <p className="result-value">{result.disease}</p>
                                                <p style={{ marginTop: 'var(--spacing-xs)', color: 'var(--text-secondary)' }}>
                                                    {result.description}
                                                </p>
                                            </div>

                                            <div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-xs)' }}>
                                                    <p className="result-label">Confidence</p>
                                                    <p style={{ fontWeight: 700, color: 'var(--forest-primary)' }}>
                                                        {result.confidence}%
                                                    </p>
                                                </div>
                                                <div className="confidence-bar">
                                                    <div className="confidence-fill" style={{ width: `${result.confidence}%` }}></div>
                                                </div>
                                            </div>

                                            {!result.is_healthy && result.severity !== 'None' && (
                                                <div>
                                                    <p className="result-label">Severity Level</p>
                                                    <span style={{
                                                        display: 'inline-block',
                                                        padding: '0.5rem 1rem',
                                                        borderRadius: 'var(--radius-sm)',
                                                        fontWeight: 600,
                                                        fontSize: '0.875rem',
                                                        textTransform: 'uppercase',
                                                        background: result.severity.toLowerCase() === 'high' ? 'var(--terracotta)' :
                                                            result.severity.toLowerCase() === 'moderate' ? '#D4A574' : 'var(--olive-light)',
                                                        color: 'white'
                                                    }}>
                                                        {result.severity}
                                                    </span>
                                                </div>
                                            )}

                                            {result.treatment && result.treatment.length > 0 ? (
                                                <div>
                                                    <p className="result-label" style={{ marginBottom: 'var(--spacing-sm)' }}>
                                                        Recommended Treatment
                                                    </p>
                                                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                                                        {result.treatment.map((step, idx) => (
                                                            <li key={idx} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                                                                <span style={{
                                                                    background: 'var(--forest-primary)',
                                                                    color: 'white',
                                                                    width: '24px',
                                                                    height: '24px',
                                                                    borderRadius: '50%',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    fontSize: '0.875rem',
                                                                    fontWeight: 600,
                                                                    flexShrink: 0
                                                                }}>
                                                                    {idx + 1}
                                                                </span>
                                                                <span style={{ color: 'var(--text-primary)', lineHeight: 1.6 }}>{step}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ) : result.is_healthy && (
                                                <div style={{
                                                    background: 'linear-gradient(135deg, #d4e7c5 0%, #cad2c5 100%)',
                                                    padding: 'var(--spacing-lg)',
                                                    borderRadius: 'var(--radius-md)',
                                                    textAlign: 'center'
                                                }}>
                                                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ margin: '0 auto var(--spacing-sm)' }}>
                                                        <circle cx="24" cy="24" r="20" fill="var(--forest-primary)" opacity="0.2" />
                                                        <path d="M16 24L21 29L32 18" stroke="var(--forest-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                    <p style={{ color: 'var(--forest-deep)', fontWeight: 600, fontSize: '1.125rem' }}>
                                                        Great news! Your plant is healthy.
                                                    </p>
                                                    <p style={{ color: 'var(--sage-green)', marginTop: 'var(--spacing-xs)' }}>
                                                        Keep up the good care and continue monitoring your plant regularly.
                                                    </p>
                                                </div>
                                            )}

                                            <button
                                                onClick={removeFile}
                                                className="btn btn-secondary"
                                                style={{ width: '100%', justifyContent: 'center' }}
                                            >
                                                Analyze Another Image
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <Footer />

            <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
};

export default Home;
