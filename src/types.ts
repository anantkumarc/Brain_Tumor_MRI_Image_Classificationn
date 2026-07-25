export type TumourClass = 'Glioma' | 'Meningioma' | 'Pituitary' | 'No Tumour (Normal)';

export type QuantumBackend = 'qiskit_aer' | 'ibm_quantum_falcon' | 'qsvm_kernel' | 'qcnn_hybrid';

export type QuantumEncoding = 'amplitude' | 'angle' | 'data_reuploading';

export interface ScanSample {
  id: string;
  patientId: string;
  patientAge: number;
  patientGender: 'M' | 'F';
  scanDate: string;
  imageType: 'Axial T1w' | 'Axial T1CE' | 'Coronal T1CE' | 'Sagittal T2' | 'FLAIR';
  imageUrl: string;
  preprocessedUrl?: string;
  gradCamUrl?: string;
  tumourClass: TumourClass;
  confidence: number;
  tumourVolumeCm3?: number;
  quantumExecutionTimeMs: number;
  qubitCount: number;
  status: 'completed' | 'processing' | 'flagged';
  radiologistReviewStatus: 'approved' | 'pending' | 'rejected';
  notes?: string;
}

export interface QuantumCircuitGate {
  qubit: number;
  type: 'H' | 'Rx' | 'Ry' | 'Rz' | 'CNOT' | 'M';
  param?: string;
  targetQubit?: number;
}

export interface ShapFeature {
  name: string;
  value: number;
  description: string;
}

export interface PredictionResult {
  scanId: string;
  patientId: string;
  tumourDetected: boolean;
  tumourClass: TumourClass;
  confidence: number;
  tumourVolumeCm3: number;
  probabilities: Record<TumourClass, number>;
  quantumMetrics: {
    circuitFidelity: number;
    entanglementEntropy: number;
    executionTimeMs: number;
    backend: QuantumBackend;
    qubitsUsed: number;
    circuitDepth: number;
    quantumKernelValue: number;
  };
  classicalFeatures: number[];
  shapFeatures: ShapFeature[];
  geminiReport?: string;
  timestamp: string;
}

export interface DatasetItem {
  id: string;
  name: string;
  source: string;
  totalImages: number;
  classes: Record<TumourClass, number>;
  fileSize: string;
  format: string;
  description: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  role: 'Clinician' | 'Neuro-Radiologist' | 'Researcher' | 'Admin';
  action: string;
  details: string;
  level: 'info' | 'warning' | 'error';
}
