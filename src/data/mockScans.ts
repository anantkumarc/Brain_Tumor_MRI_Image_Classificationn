import { ScanSample, DatasetItem, AuditLog } from '../types';

// Helper to generate SVG Data URI for realistic MRI medical scans
function generateMriSvgDataUrl(type: 'glioma' | 'meningioma' | 'pituitary' | 'normal', overlay: 'raw' | 'preprocessed' | 'gradcam' = 'raw'): string {
  const width = 400;
  const height = 400;

  // Background skull outline
  let overlayShape = '';
  if (overlay === 'gradcam') {
    if (type === 'glioma') {
      overlayShape = `
        <circle cx="240" cy="180" r="48" fill="url(#gradCamHot)" opacity="0.85" />
        <path d="M 200,160 Q 240,120 280,170 T 210,220 Z" fill="#ff0000" opacity="0.6" filter="blur(10px)"/>
      `;
    } else if (type === 'meningioma') {
      overlayShape = `
        <ellipse cx="140" cy="210" rx="36" ry="42" fill="url(#gradCamHot)" opacity="0.85" />
      `;
    } else if (type === 'pituitary') {
      overlayShape = `
        <circle cx="200" cy="260" r="32" fill="url(#gradCamHot)" opacity="0.85" />
      `;
    } else {
      overlayShape = `
        <circle cx="200" cy="200" r="100" fill="#0000ff" opacity="0.15" filter="blur(20px)"/>
      `;
    }
  } else if (overlay === 'preprocessed') {
    overlayShape = `
      <!-- CLAHE & Denoise contrast mask grid -->
      <path d="M 80,200 Q 200,80 320,200 Q 200,320 80,200" fill="none" stroke="#00f3ff" stroke-width="1.5" stroke-dasharray="4,4" opacity="0.7"/>
    `;
  }

  let lesionDetails = '';
  if (type === 'glioma') {
    lesionDetails = `
      <g id="glioma_lesion">
        <!-- Irregular heterogeneous mass with necrotic core -->
        <ellipse cx="240" cy="180" rx="42" ry="38" fill="#e0e0e0" opacity="0.85" />
        <path d="M 215,165 Q 245,145 265,175 Q 255,200 220,195 Z" fill="#1a1a1a" />
        <circle cx="240" cy="180" r="46" fill="none" stroke="#ffffff" stroke-width="3" opacity="0.9" />
        <!-- Perilesional edema -->
        <path d="M 180,140 Q 240,110 290,160 Q 280,220 200,210 Z" fill="#ffffff" opacity="0.22" filter="blur(6px)"/>
      </g>
    `;
  } else if (type === 'meningioma') {
    lesionDetails = `
      <g id="meningioma_lesion">
        <!-- Well-circumscribed extra-axial lesion -->
        <ellipse cx="138" cy="210" rx="34" ry="40" fill="#f5f5f5" opacity="0.9" />
        <!-- Dural tail -->
        <path d="M 138,170 Q 120,140 110,120 M 138,250 Q 120,270 110,280" fill="none" stroke="#ffffff" stroke-width="3" opacity="0.8"/>
      </g>
    `;
  } else if (type === 'pituitary') {
    lesionDetails = `
      <g id="pituitary_lesion">
        <!-- Sellar mass -->
        <ellipse cx="200" cy="258" rx="28" ry="24" fill="#ffffff" opacity="0.92" />
        <path d="M 180,230 Q 200,210 220,230" fill="none" stroke="#ffffff" stroke-width="2.5" opacity="0.7"/>
      </g>
    `;
  }

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="100%">
      <defs>
        <radialGradient id="brainBg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#141824" />
          <stop offset="70%" stop-color="#0a0c12" />
          <stop offset="100%" stop-color="#020305" />
        </radialGradient>

        <radialGradient id="gradCamHot" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ff0000" stop-opacity="0.95" />
          <stop offset="35%" stop-color="#ff9900" stop-opacity="0.8" />
          <stop offset="65%" stop-color="#ffff00" stop-opacity="0.6" />
          <stop offset="85%" stop-color="#00ffcc" stop-opacity="0.3" />
          <stop offset="100%" stop-color="#0000ff" stop-opacity="0" />
        </radialGradient>

        <radialGradient id="cortexGradient" cx="50%" cy="45%" r="45%">
          <stop offset="0%" stop-color="#2a3245" stop-opacity="0.9"/>
          <stop offset="60%" stop-color="#181e2b" stop-opacity="0.95"/>
          <stop offset="90%" stop-color="#0c0f17" stop-opacity="1"/>
        </radialGradient>
      </defs>

      <!-- Background -->
      <rect width="${width}" height="${height}" fill="url(#brainBg)" />

      <!-- Skull boundary -->
      <ellipse cx="200" cy="195" rx="145" ry="165" fill="#05070a" stroke="#4a5568" stroke-width="6" />
      <ellipse cx="200" cy="195" rx="138" ry="158" fill="url(#cortexGradient)" stroke="#2d3748" stroke-width="2" />

      <!-- Brain Sulci & Gyri patterns -->
      <path d="M 200,40 L 200,350 M 130,80 Q 200,120 270,80 M 110,130 Q 200,170 290,130 M 100,190 Q 200,210 300,190 M 115,250 Q 200,270 285,250 M 135,300 Q 200,320 265,300" 
            fill="none" stroke="#101520" stroke-width="5" opacity="0.8" />

      <!-- Lateral Ventricles -->
      <path d="M 180,160 Q 165,190 182,215 Q 192,185 180,160 Z" fill="#080a0f" stroke="#334155" stroke-width="1.5" />
      <path d="M 220,160 Q 235,190 218,215 Q 208,185 220,160 Z" fill="#080a0f" stroke="#334155" stroke-width="1.5" />

      <!-- Lesion Specifics -->
      ${lesionDetails}

      <!-- Overlay (Preprocessed or GradCAM) -->
      ${overlayShape}

      <!-- Medical Crosshair & Orientation markers -->
      <text x="195" y="25" fill="#94a3b8" font-family="monospace" font-size="12" font-weight="bold">A</text>
      <text x="195" y="380" fill="#94a3b8" font-family="monospace" font-size="12" font-weight="bold">P</text>
      <text x="20" y="200" fill="#94a3b8" font-family="monospace" font-size="12" font-weight="bold">R</text>
      <text x="370" y="200" fill="#94a3b8" font-family="monospace" font-size="12" font-weight="bold">L</text>

      <!-- Scale bar -->
      <line x1="300" y1="365" x2="360" y2="365" stroke="#cbd5e1" stroke-width="2" />
      <text x="308" y="358" fill="#cbd5e1" font-family="sans-serif" font-size="10">3 cm</text>
    </svg>
  `;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const INITIAL_SCANS: ScanSample[] = [
  {
    id: 'SCAN-8091',
    patientId: 'PAT-4029',
    patientAge: 54,
    patientGender: 'M',
    scanDate: '2026-07-22',
    imageType: 'Axial T1CE',
    imageUrl: generateMriSvgDataUrl('glioma', 'raw'),
    preprocessedUrl: generateMriSvgDataUrl('glioma', 'preprocessed'),
    gradCamUrl: generateMriSvgDataUrl('glioma', 'gradcam'),
    tumourClass: 'Glioma',
    confidence: 0.984,
    tumourVolumeCm3: 14.8,
    quantumExecutionTimeMs: 142,
    qubitCount: 8,
    status: 'completed',
    radiologistReviewStatus: 'approved',
    notes: 'Heterogeneous ring-enhancing frontoparietal lesion with central necrosis and perilesional edema. High VQC probability.'
  },
  {
    id: 'SCAN-8092',
    patientId: 'PAT-1184',
    patientAge: 48,
    patientGender: 'F',
    scanDate: '2026-07-23',
    imageType: 'Coronal T1CE',
    imageUrl: generateMriSvgDataUrl('meningioma', 'raw'),
    preprocessedUrl: generateMriSvgDataUrl('meningioma', 'preprocessed'),
    gradCamUrl: generateMriSvgDataUrl('meningioma', 'gradcam'),
    tumourClass: 'Meningioma',
    confidence: 0.967,
    tumourVolumeCm3: 9.2,
    quantumExecutionTimeMs: 128,
    qubitCount: 8,
    status: 'completed',
    radiologistReviewStatus: 'approved',
    notes: 'Well-circumscribed extra-axial mass arising along the dural convexities with distinct dural tail sign.'
  },
  {
    id: 'SCAN-8093',
    patientId: 'PAT-9932',
    patientAge: 36,
    patientGender: 'M',
    scanDate: '2026-07-24',
    imageType: 'Sagittal T2',
    imageUrl: generateMriSvgDataUrl('pituitary', 'raw'),
    preprocessedUrl: generateMriSvgDataUrl('pituitary', 'preprocessed'),
    gradCamUrl: generateMriSvgDataUrl('pituitary', 'gradcam'),
    tumourClass: 'Pituitary',
    confidence: 0.971,
    tumourVolumeCm3: 4.5,
    quantumExecutionTimeMs: 135,
    qubitCount: 8,
    status: 'completed',
    radiologistReviewStatus: 'pending',
    notes: 'Sellar mass with mild suprasellar extension without optic chiasm compression.'
  },
  {
    id: 'SCAN-8094',
    patientId: 'PAT-7710',
    patientAge: 29,
    patientGender: 'F',
    scanDate: '2026-07-24',
    imageType: 'FLAIR',
    imageUrl: generateMriSvgDataUrl('normal', 'raw'),
    preprocessedUrl: generateMriSvgDataUrl('normal', 'preprocessed'),
    gradCamUrl: generateMriSvgDataUrl('normal', 'gradcam'),
    tumourClass: 'No Tumour (Normal)',
    confidence: 0.992,
    tumourVolumeCm3: 0.0,
    quantumExecutionTimeMs: 110,
    qubitCount: 8,
    status: 'completed',
    radiologistReviewStatus: 'approved',
    notes: 'Normal brain MRI scan. Symmetrical ventricular architecture without mass effect or contrast enhancement.'
  }
];

export const MOCK_DATASETS: DatasetItem[] = [
  {
    id: 'ds-brats2024',
    name: 'BraTS 2024 Multimodal Brain Tumor Dataset',
    source: 'RSNA-MICCAI Brain Tumor Segmentation Challenge',
    totalImages: 4860,
    classes: {
      'Glioma': 2140,
      'Meningioma': 1220,
      'Pituitary': 900,
      'No Tumour (Normal)': 600
    },
    fileSize: '4.2 GB',
    format: 'NIfTI / DICOM / PNG',
    description: 'Gold standard clinical brain MRI benchmark with expert radiologist ground truth segmentations.'
  },
  {
    id: 'ds-figshare-mri',
    name: 'Figshare Brain MRI Classification Benchmark',
    source: 'Nanfang Hospital & General Hospital, Tianjin',
    totalImages: 3064,
    classes: {
      'Glioma': 1426,
      'Meningioma': 708,
      'Pituitary': 930,
      'No Tumour (Normal)': 0
    },
    fileSize: '820 MB',
    format: 'MATLAB / PNG 512x512',
    description: 'Widely cited open benchmark dataset for 3-class brain tumour classification.'
  },
  {
    id: 'ds-neuroquant-institutional',
    name: 'NeuroQ-Scan Institutional Cohort 2025-2026',
    source: 'University Neuro-Oncology Center',
    totalImages: 1850,
    classes: {
      'Glioma': 520,
      'Meningioma': 480,
      'Pituitary': 350,
      'No Tumour (Normal)': 500
    },
    fileSize: '1.8 GB',
    format: 'DICOM T1w+C, T2w, FLAIR',
    description: 'Prospectively validated clinical cohort with matching hybrid QML inference records.'
  }
];

export const MOCK_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'LOG-3001',
    timestamp: '2026-07-24 21:30:12',
    user: 'Dr. Ananth Kumar (Neuro-Radiologist)',
    role: 'Neuro-Radiologist',
    action: 'INFERENCE_RUN',
    details: 'Ran 8-Qubit VQC hybrid inference on SCAN-8091 (Patient PAT-4029). Class: Glioma (98.4%)',
    level: 'info'
  },
  {
    id: 'LOG-3002',
    timestamp: '2026-07-24 21:15:44',
    user: 'Dr. Elena Rostova',
    role: 'Clinician',
    action: 'REPORT_EXPORT',
    details: 'Exported diagnostic PDF report for SCAN-8092 with Grad-CAM and SHAP XAI summaries.',
    level: 'info'
  },
  {
    id: 'LOG-3003',
    timestamp: '2026-07-24 20:42:00',
    user: 'Admin System',
    role: 'Admin',
    action: 'BACKEND_SWITCH',
    details: 'Switched Quantum Backend to Qiskit Aer Simulator with 8-Qubit Statevector Execution.',
    level: 'info'
  },
  {
    id: 'LOG-3004',
    timestamp: '2026-07-24 19:10:05',
    user: 'Dr. Marcus Vance',
    role: 'Researcher',
    action: 'MODEL_RETRAIN',
    details: 'Initiated VQC retraining loop on BraTS 2024 subset (Depth L=4, COBYLA Optimizer, 50 Epochs).',
    level: 'info'
  }
];
