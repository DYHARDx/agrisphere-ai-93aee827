// Enhanced Multi-Class Disease Detection System
export interface DetectionResult {
  disease: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  treatment: string;
  affectedPart: 'leaf' | 'stem' | 'fruit' | 'soil';
  symptoms: string[];
  preventiveMeasures: string[];
  economicImpact: string;
}

export interface PestDetectionResult {
  pest: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  treatment: string;
  affectedPart: 'leaf' | 'stem' | 'fruit' | 'root';
  lifecycle: string;
  biologicalControl: string[];
  chemicalControl: string[];
  damage: string;
}

export interface NutrientDeficiencyResult {
  nutrient: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  symptoms: string[];
  treatment: string;
  fertilizer: string;
  soilAmendment: string;
  affectedGrowth: string;
}

export interface SoilAnalysisResult {
  texture: 'clay' | 'sandy' | 'loamy' | 'silt';
  confidence: number;
  ph: number;
  moisture: number;
  organicMatter: number;
  drainage: 'poor' | 'moderate' | 'good' | 'excellent';
  fertility: 'low' | 'medium' | 'high';
  recommendations: string[];
}

export interface MultiClassResult {
  diseases: DetectionResult[];
  pests: PestDetectionResult[];
  nutrientDeficiency: NutrientDeficiencyResult[];
  soilAnalysis: SoilAnalysisResult;
  overallHealth: {
    score: number;
    status: 'critical' | 'poor' | 'fair' | 'good' | 'excellent';
    recommendations: string[];
  };
  imageAnalysis: {
    plantPart: 'leaf' | 'stem' | 'fruit' | 'soil';
    quality: 'poor' | 'fair' | 'good' | 'excellent';
    processingTime: number;
  };
}

export class EnhancedDiseaseDetector {
  private models: Map<string, any> = new Map();
  private labels: any = null;

  async loadModels() {
    console.log('Loading enhanced multi-class detection models...');
    
    // Load labels from the enhanced model
    try {
      const response = await fetch('/enhanced_model_output/all_labels.json');
      this.labels = await response.json();
      console.log('Labels loaded:', this.labels);
    } catch (error) {
      console.log('Using fallback labels');
      this.labels = {
        disease: ['healthy', 'leaf_blight', 'leaf_rust', 'leaf_spot', 'stem_rot', 'fruit_rot', 'bacterial_wilt', 'viral_mosaic'],
        pest: ['no_pest', 'aphids', 'caterpillars', 'beetles', 'mites', 'thrips', 'whiteflies'],
        nutrient: ['sufficient', 'nitrogen_deficiency', 'phosphorus_deficiency', 'potassium_deficiency', 'iron_deficiency', 'magnesium_deficiency'],
        soil: ['clay', 'sandy', 'loamy', 'silt']
      };
    }
    
    console.log('Enhanced disease detection models loaded (demo mode)');
  }

  async detectMultiClass(imageFile: File): Promise<MultiClassResult> {
    const startTime = Date.now();
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Analyze image type based on filename or simulate detection
    const plantPart = this.detectPlantPart(imageFile.name);
    
    // Generate realistic multi-class results
    const diseases = this.generateDiseaseResults(plantPart);
    const pests = this.generatePestResults(plantPart);
    const nutrientDeficiency = this.generateNutrientResults(plantPart);
    const soilAnalysis = this.generateSoilAnalysis();
    
    const processingTime = Date.now() - startTime;
    
    // Calculate overall health score
    const overallHealth = this.calculateOverallHealth(diseases, pests, nutrientDeficiency, soilAnalysis);
    
    return {
      diseases,
      pests,
      nutrientDeficiency,
      soilAnalysis,
      overallHealth,
      imageAnalysis: {
        plantPart,
        quality: this.assessImageQuality(),
        processingTime
      }
    };
  }

  private detectPlantPart(filename: string): 'leaf' | 'stem' | 'fruit' | 'soil' {
    const name = filename.toLowerCase();
    if (name.includes('leaf')) return 'leaf';
    if (name.includes('stem')) return 'stem';
    if (name.includes('fruit')) return 'fruit';
    if (name.includes('soil')) return 'soil';
    
    // Random selection for demo
    const parts: ('leaf' | 'stem' | 'fruit' | 'soil')[] = ['leaf', 'stem', 'fruit', 'soil'];
    return parts[Math.floor(Math.random() * parts.length)];
  }

  private generateDiseaseResults(plantPart: string): DetectionResult[] {
    const diseaseDatabase = {
      leaf: [
        {
          disease: 'leaf_blight',
          symptoms: ['Brown spots with yellow halos', 'Wilting leaves', 'Premature leaf drop'],
          treatment: 'Apply copper-based fungicide every 7-10 days, improve air circulation',
          preventiveMeasures: ['Avoid overhead watering', 'Remove infected debris', 'Plant resistant varieties'],
          economicImpact: 'Can reduce yield by 20-40% if untreated'
        },
        {
          disease: 'leaf_rust',
          symptoms: ['Orange-red pustules on leaf undersides', 'Yellow spots on upper surface', 'Stunted growth'],
          treatment: 'Apply systemic fungicide, remove infected leaves',
          preventiveMeasures: ['Ensure good air circulation', 'Avoid high humidity', 'Use resistant cultivars'],
          economicImpact: 'Yield loss of 15-30% in severe cases'
        }
      ],
      stem: [
        {
          disease: 'stem_rot',
          symptoms: ['Dark, water-soaked lesions on stem', 'Soft, mushy tissue', 'Plant wilting'],
          treatment: 'Remove infected plants, apply fungicide to healthy plants',
          preventiveMeasures: ['Improve drainage', 'Avoid overwatering', 'Use pathogen-free seeds'],
          economicImpact: 'Complete plant loss in severe infections'
        }
      ],
      fruit: [
        {
          disease: 'fruit_rot',
          symptoms: ['Soft, brown spots on fruit', 'Fuzzy mold growth', 'Premature fruit drop'],
          treatment: 'Remove infected fruits, apply protective fungicide',
          preventiveMeasures: ['Harvest at proper maturity', 'Handle carefully', 'Store in cool, dry conditions'],
          economicImpact: 'Direct fruit loss, reduced market value'
        }
      ],
      soil: [
        {
          disease: 'bacterial_wilt',
          symptoms: ['Sudden wilting', 'Yellowing leaves', 'Vascular discoloration'],
          treatment: 'No cure - remove infected plants, soil solarization',
          preventiveMeasures: ['Use resistant varieties', 'Crop rotation', 'Soil sterilization'],
          economicImpact: 'Can destroy entire crops, long-term soil contamination'
        }
      ]
    };

    const relevantDiseases = diseaseDatabase[plantPart as keyof typeof diseaseDatabase] || diseaseDatabase.leaf;
    const numDiseases = Math.floor(Math.random() * 2) + 1;
    
    return relevantDiseases.slice(0, numDiseases).map(disease => ({
      disease: disease.disease,
      confidence: 0.75 + Math.random() * 0.2,
      severity: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as 'low' | 'medium' | 'high',
      treatment: disease.treatment,
      affectedPart: plantPart as 'leaf' | 'stem' | 'fruit' | 'soil',
      symptoms: disease.symptoms,
      preventiveMeasures: disease.preventiveMeasures,
      economicImpact: disease.economicImpact
    }));
  }

  private generatePestResults(plantPart: string): PestDetectionResult[] {
    const pestDatabase = {
      aphids: {
        lifecycle: 'Complete metamorphosis, 7-10 days per generation',
        biologicalControl: ['Ladybugs', 'Lacewings', 'Parasitic wasps'],
        chemicalControl: ['Neem oil', 'Insecticidal soap', 'Pyrethrin'],
        damage: 'Sap sucking, virus transmission, honeydew production'
      },
      thrips: {
        lifecycle: 'Incomplete metamorphosis, 15-30 days',
        biologicalControl: ['Predatory mites', 'Minute pirate bugs'],
        chemicalControl: ['Blue sticky traps', 'Spinosad', 'Abamectin'],
        damage: 'Leaf silvering, scarring, virus transmission'
      },
      caterpillars: {
        lifecycle: 'Complete metamorphosis, 30-45 days',
        biologicalControl: ['Bt bacteria', 'Trichogramma wasps', 'Birds'],
        chemicalControl: ['Bt spray', 'Spinosad', 'Emamectin benzoate'],
        damage: 'Leaf defoliation, fruit boring, growth stunting'
      }
    };

    const pests = Object.keys(pestDatabase);
    const detectedPest = pests[Math.floor(Math.random() * pests.length)];
    const pestInfo = pestDatabase[detectedPest as keyof typeof pestDatabase];

    if (Math.random() < 0.7) {
      return [{
        pest: detectedPest,
        confidence: 0.70 + Math.random() * 0.25,
        severity: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as 'low' | 'medium' | 'high',
        treatment: `Integrated pest management approach recommended`,
        affectedPart: plantPart as 'leaf' | 'stem' | 'fruit' | 'root',
        lifecycle: pestInfo.lifecycle,
        biologicalControl: pestInfo.biologicalControl,
        chemicalControl: pestInfo.chemicalControl,
        damage: pestInfo.damage
      }];
    }
    
    return [];
  }

  private generateNutrientResults(plantPart: string): NutrientDeficiencyResult[] {
    const nutrientDatabase = {
      nitrogen_deficiency: {
        symptoms: ['Yellowing of older leaves', 'Stunted growth', 'Reduced leaf size'],
        fertilizer: 'Urea (46-0-0) or Ammonium sulfate (21-0-0)',
        soilAmendment: 'Compost, blood meal, fish emulsion',
        affectedGrowth: 'Vegetative growth severely impacted'
      },
      phosphorus_deficiency: {
        symptoms: ['Purple/reddish leaf coloration', 'Delayed maturity', 'Poor root development'],
        fertilizer: 'Triple superphosphate (0-46-0) or DAP (18-46-0)',
        soilAmendment: 'Bone meal, rock phosphate',
        affectedGrowth: 'Root development and flowering affected'
      },
      potassium_deficiency: {
        symptoms: ['Leaf edge burning', 'Weak stems', 'Poor fruit quality'],
        fertilizer: 'Muriate of potash (0-0-60) or Sulfate of potash (0-0-50)',
        soilAmendment: 'Wood ash, kelp meal',
        affectedGrowth: 'Fruit quality and disease resistance reduced'
      }
    };

    const nutrients = Object.keys(nutrientDatabase);
    const deficientNutrient = nutrients[Math.floor(Math.random() * nutrients.length)];
    const nutrientInfo = nutrientDatabase[deficientNutrient as keyof typeof nutrientDatabase];

    if (Math.random() < 0.6) {
      return [{
        nutrient: deficientNutrient,
        confidence: 0.65 + Math.random() * 0.25,
        severity: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as 'low' | 'medium' | 'high',
        symptoms: nutrientInfo.symptoms,
        treatment: `Apply ${nutrientInfo.fertilizer} as per soil test recommendations`,
        fertilizer: nutrientInfo.fertilizer,
        soilAmendment: nutrientInfo.soilAmendment,
        affectedGrowth: nutrientInfo.affectedGrowth
      }];
    }
    
    return [];
  }

  private generateSoilAnalysis(): SoilAnalysisResult {
    const textures: ('clay' | 'sandy' | 'loamy' | 'silt')[] = ['clay', 'sandy', 'loamy', 'silt'];
    const texture = textures[Math.floor(Math.random() * textures.length)];
    
    const soilProperties = {
      clay: { ph: 6.8, moisture: 65, organicMatter: 3.2, drainage: 'poor', fertility: 'high' },
      sandy: { ph: 6.2, moisture: 25, organicMatter: 1.8, drainage: 'excellent', fertility: 'low' },
      loamy: { ph: 6.5, moisture: 45, organicMatter: 4.1, drainage: 'good', fertility: 'high' },
      silt: { ph: 7.1, moisture: 55, organicMatter: 2.9, drainage: 'moderate', fertility: 'medium' }
    };

    const props = soilProperties[texture];
    
    return {
      texture,
      confidence: 0.80 + Math.random() * 0.15,
      ph: props.ph + (Math.random() - 0.5) * 0.6,
      moisture: props.moisture + (Math.random() - 0.5) * 20,
      organicMatter: props.organicMatter + (Math.random() - 0.5) * 1.0,
      drainage: props.drainage as 'poor' | 'moderate' | 'good' | 'excellent',
      fertility: props.fertility as 'low' | 'medium' | 'high',
      recommendations: this.getSoilRecommendations(texture, props)
    };
  }

  private getSoilRecommendations(texture: string, props: any): string[] {
    const recommendations = {
      clay: [
        'Add organic matter to improve drainage',
        'Consider raised beds for better aeration',
        'Avoid working soil when wet to prevent compaction'
      ],
      sandy: [
        'Add compost to improve water retention',
        'Use mulch to reduce water evaporation',
        'Apply fertilizers more frequently in smaller amounts'
      ],
      loamy: [
        'Maintain organic matter levels with regular compost additions',
        'This is ideal soil - continue current management practices',
        'Monitor pH levels annually'
      ],
      silt: [
        'Improve drainage with organic amendments',
        'Avoid overwatering to prevent waterlogging',
        'Add coarse organic matter for structure'
      ]
    };

    return recommendations[texture as keyof typeof recommendations] || [];
  }

  private calculateOverallHealth(diseases: DetectionResult[], pests: PestDetectionResult[], nutrients: NutrientDeficiencyResult[], soil: SoilAnalysisResult) {
    let score = 100;
    const recommendations: string[] = [];

    diseases.forEach(disease => {
      const deduction = disease.severity === 'high' ? 25 : disease.severity === 'medium' ? 15 : 5;
      score -= deduction;
      recommendations.push(`Address ${disease.disease} immediately`);
    });

    pests.forEach(pest => {
      const deduction = pest.severity === 'high' ? 20 : pest.severity === 'medium' ? 12 : 4;
      score -= deduction;
      recommendations.push(`Implement IPM for ${pest.pest}`);
    });

    nutrients.forEach(nutrient => {
      const deduction = nutrient.severity === 'high' ? 15 : nutrient.severity === 'medium' ? 10 : 3;
      score -= deduction;
      recommendations.push(`Correct ${nutrient.nutrient}`);
    });

    if (soil.fertility === 'low') score -= 10;
    if (soil.drainage === 'poor') score -= 8;

    score = Math.max(0, Math.min(100, score));

    const status = score >= 90 ? 'excellent' : 
                  score >= 75 ? 'good' : 
                  score >= 60 ? 'fair' : 
                  score >= 40 ? 'poor' : 'critical';

    if (recommendations.length === 0) {
      recommendations.push('Plant health is excellent - maintain current practices');
    }

    return { score, status, recommendations };
  }

  private assessImageQuality(): 'poor' | 'fair' | 'good' | 'excellent' {
    const qualities: ('poor' | 'fair' | 'good' | 'excellent')[] = ['poor', 'fair', 'good', 'excellent'];
    return qualities[Math.floor(Math.random() * qualities.length)];
  }

  async analyzeLeafImage(imageFile: File): Promise<MultiClassResult> {
    return this.detectMultiClass(imageFile);
  }

  async analyzeStemImage(imageFile: File): Promise<MultiClassResult> {
    return this.detectMultiClass(imageFile);
  }

  async analyzeFruitImage(imageFile: File): Promise<MultiClassResult> {
    return this.detectMultiClass(imageFile);
  }

  async analyzeSoilImage(imageFile: File): Promise<MultiClassResult> {
    return this.detectMultiClass(imageFile);
  }

  getSupportedPlantParts(): string[] {
    return ['leaf', 'stem', 'fruit', 'soil'];
  }

  getSupportedDiseases(): string[] {
    return this.labels?.disease || ['healthy', 'leaf_blight', 'leaf_rust', 'leaf_spot', 'stem_rot', 'fruit_rot', 'bacterial_wilt', 'viral_mosaic'];
  }

  getSupportedPests(): string[] {
    return this.labels?.pest || ['no_pest', 'aphids', 'caterpillars', 'beetles', 'mites', 'thrips', 'whiteflies'];
  }

  getSupportedNutrients(): string[] {
    return this.labels?.nutrient || ['sufficient', 'nitrogen_deficiency', 'phosphorus_deficiency', 'potassium_deficiency', 'iron_deficiency', 'magnesium_deficiency'];
  }
}