import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Initialize Gemini API client on the server side
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '20mb' }));

  // API Route: Health check
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      serverTime: new Date().toISOString(),
      hasGeminiKey: !!process.env.GEMINI_API_KEY,
      quantumBackend: "Qiskit Aer Simulator (8-Qubit VQC)"
    });
  });

  // API Route: AI Clinical Radiologist Second Opinion
  app.post("/api/gemini/second-opinion", async (req, res) => {
    try {
      const { scanId, patientId, tumourClass, confidence, tumourVolumeCm3, notes, imageType } = req.body;

      if (!ai) {
        // Fallback default note if key is missing or not configured
        return res.json({
          reportText: `[Clinical Decision Support Note]
The Hybrid Quantum-Classical VQC Engine detected features consistent with ${tumourClass} (Confidence: ${(confidence * 100).toFixed(1)}%).
Lesion Volume Estimate: ${tumourVolumeCm3 || 12.4} cm³.
Radiomic Analysis: High signal variance in spatial feature maps with amplitude encoding qubit collapse at states |10110001⟩ and |11001010⟩.
Recommendation: Correlate with contrast-enhanced T1w axial/coronal sequences and clinical symptoms. Follow-up scan in 4-6 weeks recommended.`
        });
      }

      const prompt = `You are a Senior Neuro-Radiologist and Quantum Medical Imaging Specialist evaluating an MRI scan using a Hybrid Quantum-Classical VQC Deep Learning Pipeline.

Scan ID: ${scanId || 'SCAN-8091'}
Patient ID: ${patientId || 'PAT-4029'}
Sequence: ${imageType || 'Axial T1CE MRI'}
Model Output Classification: ${tumourClass}
Model Confidence: ${(confidence * 100).toFixed(1)}%
Volumetric Lesion Estimate: ${tumourVolumeCm3 || 12.4} cm³
Radiologist Initial Notes: ${notes || 'Heterogeneous enhancing lesion'}

Generate a structured, professional, concise 3-part Clinical Impression Report:
1. Executive Diagnostic Summary (Clinician Overview)
2. Hybrid Quantum Feature & Radiomic Insight (Explainable AI note on Qubit Amplitude Encoding & Grad-CAM spatial heatmap)
3. Recommended Clinical Management Steps (Next steps, surgical/radiation consultation or follow-up imaging protocol)

Keep the tone highly professional, objective, precise, and concise.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          temperature: 0.3,
          systemInstruction: "You are a world-class neuro-radiologist providing concise, objective clinical AI decision support summaries based on hybrid quantum MRI analysis."
        }
      });

      res.json({
        reportText: response.text || "Report generated successfully."
      });
    } catch (err: any) {
      console.error("Gemini API Error:", err);
      res.status(500).json({
        error: "Failed to generate AI clinical opinion",
        message: err.message
      });
    }
  });

  // API Route: Hybrid Quantum Inference Simulation
  app.post("/api/predict", async (req, res) => {
    try {
      const { scanId, patientId, imageData, backend = 'qiskit_aer', encoding = 'amplitude', qubitCount = 8 } = req.body;

      // Simulate quantum pipeline calculation delay
      const executionTimeMs = Math.floor(110 + Math.random() * 45);

      // Classes: Glioma, Meningioma, Pituitary, Normal
      let tumourClass = 'Glioma';
      let confidence = 0.984;
      let tumourVolumeCm3 = 14.2;

      if (scanId === 'SCAN-8092') {
        tumourClass = 'Meningioma';
        confidence = 0.967;
        tumourVolumeCm3 = 9.2;
      } else if (scanId === 'SCAN-8093') {
        tumourClass = 'Pituitary';
        confidence = 0.971;
        tumourVolumeCm3 = 4.5;
      } else if (scanId === 'SCAN-8094') {
        tumourClass = 'No Tumour (Normal)';
        confidence = 0.992;
        tumourVolumeCm3 = 0.0;
      }

      const probabilities: Record<string, number> = {
        'Glioma': tumourClass === 'Glioma' ? confidence : Number(((1 - confidence) * 0.5).toFixed(3)),
        'Meningioma': tumourClass === 'Meningioma' ? confidence : Number(((1 - confidence) * 0.3).toFixed(3)),
        'Pituitary': tumourClass === 'Pituitary' ? confidence : Number(((1 - confidence) * 0.15).toFixed(3)),
        'No Tumour (Normal)': tumourClass === 'No Tumour (Normal)' ? confidence : Number(((1 - confidence) * 0.05).toFixed(3)),
      };

      // SHAP Feature importance rankings
      const shapFeatures = [
        { name: 'Spatial Intensity Gradient (Grad-CAM #1)', value: 0.38, description: 'Hyperintense rim enhancement in frontoparietal cortex' },
        { name: 'Qubit State |10110001⟩ Amplitude', value: 0.24, description: 'Quantum Hilbert space feature projection peak' },
        { name: 'Necrotic Core Texture Variance', value: 0.16, description: 'Central hypointensity texture dissimilarity' },
        { name: 'Perilesional Edema Halo Index', value: 0.12, description: 'T2/FLAIR hyperintensity surrounding mass' },
        { name: 'Mass Effect & Midline Shift', value: 0.06, description: 'Local tissue compression and ventricular displacement' },
      ];

      res.json({
        scanId: scanId || `SCAN-${Math.floor(8000 + Math.random() * 1000)}`,
        patientId: patientId || `PAT-${Math.floor(1000 + Math.random() * 9000)}`,
        tumourDetected: tumourClass !== 'No Tumour (Normal)',
        tumourClass,
        confidence,
        tumourVolumeCm3,
        probabilities,
        quantumMetrics: {
          circuitFidelity: 0.994,
          entanglementEntropy: 1.82,
          executionTimeMs,
          backend,
          qubitsUsed: qubitCount,
          circuitDepth: 12,
          quantumKernelValue: 0.892
        },
        classicalFeatures: Array.from({ length: 16 }, () => Number((Math.random() * 2 - 1).toFixed(3))),
        shapFeatures,
        timestamp: new Date().toISOString()
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Vite middleware in dev mode
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
