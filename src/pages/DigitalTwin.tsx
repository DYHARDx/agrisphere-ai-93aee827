import { motion } from "framer-motion";
import { Map, Layers, Droplets, Bug, TrendingUp, Satellite, ArrowLeft, MapPin, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DigitalTwinEngine } from "@/lib/digital-twin";
import { GISDigitalTwin } from "@/lib/gis-digital-twin";
import { useState, useEffect } from "react";

const DigitalTwin = () => {
  const [twinEngine] = useState(() => new DigitalTwinEngine());
  const [gisEngine] = useState(() => new GISDigitalTwin());
  const [farmData, setFarmData] = useState(null);
  const [gisData, setGisData] = useState(null);
  const [isInitializing, setIsInitializing] = useState(false);

  const initializeDemoFarm = async () => {
    setIsInitializing(true);
    
    try {
      // Demo farm coordinates (rectangular field in Bihar)
      const demoCoordinates = [
        { lat: 26.1440, lng: 91.7360 },
        { lat: 26.1440, lng: 91.7370 },
        { lat: 26.1450, lng: 91.7370 },
        { lat: 26.1450, lng: 91.7360 }
      ];
      
      // Initialize both traditional and GIS digital twins
      const [traditionalData, gisData] = await Promise.all([
        twinEngine.initializeFarm(demoCoordinates.map(c => [c.lng, c.lat])),
        gisEngine.initializeFarm('Demo Smart Farm', 'AgriSphere User', demoCoordinates)
      ]);
      
      setFarmData(traditionalData);
      setGisData(gisData);
      
      // Perform spatial analysis
      const spatialAnalysis = await gisEngine.performSpatialAnalysis();
      console.log('Spatial Analysis Results:', spatialAnalysis);
      
    } catch (error) {
      console.error('Failed to initialize farm:', error);
    } finally {
      setIsInitializing(false);
    }
  };

  const twinFeatures = [
    {
      title: "Field Boundary Mapping",
      description: "Precise GPS-based field boundary detection and polygon mapping",
      icon: "🗺️",
      accuracy: "99.5%",
      features: ["GPS Coordinates", "Area Calculation", "Boundary Alerts", "Shape Analysis"]
    },
    {
      title: "Soil Zone Classification",
      description: "Multi-layer soil analysis with texture, pH, and nutrient mapping",
      icon: "🌍",
      accuracy: "94%",
      features: ["Soil Texture", "pH Zones", "Nutrient Maps", "Fertility Index"]
    },
    {
      title: "Irrigation Zone Planning",
      description: "Smart irrigation zone design based on crop needs and soil conditions",
      icon: "💧",
      accuracy: "96%",
      features: ["Water Zones", "Drip Planning", "Sprinkler Layout", "Efficiency Maps"]
    },
    {
      title: "Pest-Prone Area Detection",
      description: "Historical pest data analysis to identify high-risk zones",
      icon: "🐛",
      accuracy: "91%",
      features: ["Risk Zones", "Pest History", "Prevention Areas", "Treatment Maps"]
    },
    {
      title: "Crop Growth Staging",
      description: "Real-time crop growth stage monitoring across different field zones",
      icon: "🌱",
      accuracy: "93%",
      features: ["Growth Stages", "Maturity Maps", "Harvest Zones", "Yield Prediction"]
    },
    {
      title: "Weather Microclimate",
      description: "Field-specific microclimate analysis and weather pattern mapping",
      icon: "🌤️",
      accuracy: "89%",
      features: ["Temperature Zones", "Humidity Maps", "Wind Patterns", "Frost Risk"]
    }
  ];

  const gisLayers = [
    { name: "Satellite Imagery", type: "Base Layer", update: "Daily" },
    { name: "Soil Health", type: "Analysis Layer", update: "Weekly" },
    { name: "Crop Health", type: "Monitoring Layer", update: "Real-time" },
    { name: "Irrigation Status", type: "IoT Layer", update: "Live" },
    { name: "Weather Data", type: "Environmental Layer", update: "Hourly" },
    { name: "Pest Alerts", type: "Alert Layer", update: "As needed" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌱</span>
            <span className="text-xl font-bold gradient-text">AgriSphere AI</span>
          </div>
        </div>
      </header>
      {/* Header */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-6xl mb-6">🌐</div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              GIS Smart Farm Digital Twin
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Create a complete digital replica of your farm with advanced GIS mapping, 
              multi-layer visualization, and real-time monitoring for precision agriculture.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-gradient-primary" onClick={initializeDemoFarm} disabled={isInitializing}>
                <Map className="mr-2 w-5 h-5" />
                {isInitializing ? 'Initializing...' : 'Create Digital Twin'}
              </Button>
              <Button size="lg" variant="outline">
                <Satellite className="mr-2 w-5 h-5" />
                View Live Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Digital Twin Features */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Digital Twin Capabilities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {twinFeatures.map((feature, i) => (
              <Card key={i} className="p-8 hover:shadow-lg transition-all duration-300 group">
                <div className="text-center">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-bold">{feature.title}</h3>
                    <div className="bg-primary/20 px-2 py-1 rounded-full text-primary font-bold text-xs">
                      {feature.accuracy}
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4 text-sm">{feature.description}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {feature.features.map((item, idx) => (
                      <div key={idx} className="text-xs bg-muted px-2 py-1 rounded text-center">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* GIS Layers */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Multi-Layer GIS Visualization</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {gisLayers.map((layer, i) => (
              <Card key={i} className="p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <Layers className="w-6 h-6 text-primary" />
                  <h3 className="font-bold">{layer.name}</h3>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">{layer.type}</span>
                  <div className="bg-accent/20 px-2 py-1 rounded-full text-accent text-xs">
                    {layer.update}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Live Farm Data */}
      {farmData && (
        <section className="py-20 px-4 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">Live Digital Twin Data</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
              <Card className="p-6 text-center">
                <MapPin className="w-8 h-8 mx-auto mb-3 text-green-500" />
                <h3 className="font-bold mb-2">Farm Area</h3>
                <div className="text-2xl font-bold text-green-500">{farmData.farmBoundary.area.toFixed(2)}</div>
                <div className="text-sm text-muted-foreground">Hectares</div>
              </Card>
              <Card className="p-6 text-center">
                <Layers className="w-8 h-8 mx-auto mb-3 text-blue-500" />
                <h3 className="font-bold mb-2">Soil Zones</h3>
                <div className="text-2xl font-bold text-blue-500">{farmData.soilZones.length}</div>
                <div className="text-sm text-muted-foreground">Mapped zones</div>
              </Card>
              <Card className="p-6 text-center">
                <Droplets className="w-8 h-8 mx-auto mb-3 text-cyan-500" />
                <h3 className="font-bold mb-2">Irrigation Zones</h3>
                <div className="text-2xl font-bold text-cyan-500">{farmData.irrigationZones.length}</div>
                <div className="text-sm text-muted-foreground">Active zones</div>
              </Card>
              <Card className="p-6 text-center">
                <Activity className="w-8 h-8 mx-auto mb-3 text-orange-500" />
                <h3 className="font-bold mb-2">Crop Health</h3>
                <div className="text-2xl font-bold text-orange-500">
                  {Math.round(farmData.cropGrowthStages.reduce((sum, stage) => sum + stage.health, 0) / farmData.cropGrowthStages.length)}
                </div>
                <div className="text-sm text-muted-foreground">Average %</div>
              </Card>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Bug className="w-5 h-5 text-red-500" />
                  Pest Risk Areas
                </h3>
                <div className="space-y-3">
                  {farmData.pestProneAreas.map((area, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 bg-muted rounded">
                      <div>
                        <div className="font-medium">{area.pestType}</div>
                        <div className="text-sm text-muted-foreground">{area.id}</div>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs font-medium ${
                        area.riskLevel === 'high' ? 'bg-red-100 text-red-700' :
                        area.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {area.riskLevel} risk
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  Crop Growth Stages
                </h3>
                <div className="space-y-3">
                  {farmData.cropGrowthStages.map((stage, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 bg-muted rounded">
                      <div>
                        <div className="font-medium">{stage.cropType}</div>
                        <div className="text-sm text-muted-foreground">{stage.stage}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">{stage.health.toFixed(1)}%</div>
                        <div className="text-xs text-muted-foreground">Health</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Benefits */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Digital Twin Benefits</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { title: "30% Better Planning", desc: "Optimize field operations", icon: "📊" },
              { title: "25% Water Savings", desc: "Precision irrigation zones", icon: "💧" },
              { title: "40% Pest Reduction", desc: "Targeted prevention", icon: "🛡️" },
              { title: "35% Yield Increase", desc: "Data-driven decisions", icon: "📈" }
            ].map((benefit, i) => (
              <Card key={i} className="p-6 text-center hover:shadow-lg transition-all duration-300">
                <div className="text-4xl mb-3">{benefit.icon}</div>
                <h3 className="font-bold mb-2 text-primary">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-16">Powered by Advanced GIS Technology</h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { name: "Mapbox GL JS", desc: "Interactive mapping" },
              { name: "Leaflet", desc: "Open-source GIS" },
              { name: "PostGIS", desc: "Spatial database" },
              { name: "GDAL", desc: "Geospatial processing" }
            ].map((tech, i) => (
              <div key={i} className="p-4">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-primary flex items-center justify-center">
                  <Map className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold mb-1">{tech.name}</h3>
                <p className="text-sm text-muted-foreground">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DigitalTwin;