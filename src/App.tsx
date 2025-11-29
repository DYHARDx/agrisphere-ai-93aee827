import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/providers/ThemeProvider";
import Index from "./pages/Index";
import DiseaseDetection from "./pages/DiseaseDetection";
import DigitalTwin from "./pages/DigitalTwin";
import YieldPrediction from "./pages/YieldPrediction";
import IoTMonitoring from "./pages/IoTMonitoring";
import Marketplace from "./pages/Marketplace";
import VoiceAssistant from "./pages/VoiceAssistant";
import ComprehensiveDashboard from "./pages/ComprehensiveDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/disease-detection" element={<DiseaseDetection />} />
          <Route path="/digital-twin" element={<DigitalTwin />} />
          <Route path="/yield-prediction" element={<YieldPrediction />} />
          <Route path="/iot-monitoring" element={<IoTMonitoring />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/voice-assistant" element={<VoiceAssistant />} />
          <Route path="/comprehensive-dashboard" element={<ComprehensiveDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
