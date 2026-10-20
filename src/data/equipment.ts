import ventilatorPoster from "../assets/mechanical-ventilator-illustration.jpg?url";

// Add a new device by copying one object below. Paste a Spline/Sketchfab
// iframe URL into `embedUrl`, or full embed HTML (iframe) into `embedHtml`.

export const categories = [
  "Diagnostic Imaging",
  "Life Support & Critical Care",
  "Patient Monitoring & Biosignals",
  "Therapeutic & Surgical",
  "Laboratory & Sterilization",
] as const;
export type Category = (typeof categories)[number];

export const categoryInfo: Record<Category, { examples: string; purpose: string; risk: string }> = {
  "Diagnostic Imaging": {
    examples: "MRI, CT, Diagnostic Ultrasound, Digital X-Ray",
    purpose: "Non-invasive visualisation of anatomical structures and physiological processes.",
    risk: "Medium to High",
  },
  "Life Support & Critical Care": {
    examples: "Mechanical Ventilators, Anaesthesia Machines, Hemodialysis Machines, Infant Incubators",
    purpose: "Continuous maintenance or replacement of vital bodily functions during organ failure or surgery.",
    risk: "High / Life-Critical",
  },
  "Patient Monitoring & Biosignals": {
    examples: "ECG, EEG, Pulse Oximeters, Patient Monitors",
    purpose: "Acquisition, amplification and real-time display of bioelectric and physiological parameters.",
    risk: "Medium",
  },
  "Therapeutic & Surgical": {
    examples: "Defibrillators, Pacemakers, Electrosurgical Units, Oxygen Concentrators",
    purpose: "Active treatment of disease, cardiac arrest, tissue cutting/coagulation or acute deficits.",
    risk: "High",
  },
  "Laboratory & Sterilization": {
    examples: "Autoclaves, Centrifuges, Spectrophotometers, Biosafety Cabinets",
    purpose: "Sample preparation, biochemical analysis and infection control through sterilisation.",
    risk: "Medium",
  },
};

export type Device = {
  slug: string;
  name: string;
  category: Category;
  summary: string;
  risk?: string;
  embedUrl?: string;
  embedHtml?: string;
  posterUrl?: string;
  posterCredit?: string;
  posterCreditUrl?: string;
  posterFit?: "cover" | "contain";
  modelCredit?: string;
  modelCreditUrl?: string;
  workingPrinciples: string[];
  clinicalUses: string[];
  components?: { name: string; detail: string }[];
  descriptions: { heading: string; body: string }[];
  references?: { title: string; url: string; source?: string }[];
};

export const devices: Device[] = [
  {
    slug: "mri-scanner",
    name: "MRI Scanner",
    category: "Diagnostic Imaging",
    risk: "Medium to High — the magnet is very strong, so loose metal objects and some implants can be dangerous near it",
    summary: "Uses a powerful magnet and radio waves to make detailed pictures of soft tissues — such as the brain, muscles, and organs — without X-ray radiation.",
    embedUrl: "",
    workingPrinciples: [
      "A very strong magnet (called B0, usually 1.5 T or 3.0 T) lines up tiny hydrogen atoms in the body so they spin together. The speed of that spin is called the Larmor frequency.",
      "A short radio-wave pulse, tuned to that exact spin speed, knocks the atoms sideways. This is called excitation.",
      "As the atoms settle back, they give off faint radio signals. Different tissues settle at different speeds (called T1 and T2 times), and that difference creates the contrast in the picture.",
      "Extra coils (gradient coils) change the magnetic field slightly along the X, Y, and Z directions, so the machine can pinpoint where each signal came from. A computer then builds the image using a maths method called the Fast Fourier Transform (FFT).",
    ],
    clinicalUses: [
      "Scanning the brain and spinal cord",
      "Checking muscles, bones, and joints",
      "Examining the heart and the organs in the abdomen (belly)",
    ],
    components: [
      { name: "Main Superconducting Magnet", detail: "Coils of niobium-titanium wire kept extremely cold in liquid helium (about 4.2 K, roughly −269°C) so they carry electricity with no resistance and keep the magnetic field strong and steady." },
      { name: "Gradient Coil Assembly", detail: "Three coils — for the X, Y, and Z directions — that pinpoint where each signal comes from: choosing the slice to image and encoding its position." },
      { name: "RF Coils", detail: "Antennas placed close to the body. They send out the radio-wave pulses and listen for the faint signals (echoes) coming back." },
      { name: "Cryogenic Cooling System", detail: "The cooling equipment — helium containers (dewars), cold-heads, and compressors — that keeps the magnet cold and prevents a sudden shutdown called a quench." },
      { name: "Image Reconstruction Processor", detail: "The computer that turns the raw signal data (called k-space) into 2D and 3D pictures using FFT maths." },
    ],
    descriptions: [
      {
        heading: "Overview",
        body: "MRI uses a strong magnet and radio waves to make clear pictures of soft tissue — parts of the body such as the brain, muscles, and organs. The patient lies inside the magnet while radio-wave pulses nudge the hydrogen atoms in their body, and the machine listens to the tiny signals those atoms send back.",
      },
      {
        heading: "Signal Path",
        body: "The round tunnel (bore) holds the superconducting magnet coils. Inside it sits the gradient coil assembly, and closest to the patient are the RF coils that send and receive signals. The signals pass through quiet amplifiers (pre-amplifiers), are converted into digital form, and finally reach the computer that builds the images.",
      },
    ],
  },
  {
    slug: "mechanical-ventilator",
    name: "Mechanical Ventilator",
    category: "Life Support & Critical Care",
    risk: "High / Life-Critical — possible complications include lung infection linked to the breathing tube (ventilator-associated pneumonia), lung injury from pressure (barotrauma), air leaking around the lung (pneumothorax), partly collapsed lung areas (atelectasis), and vocal cord injury",
    summary: "A life-support machine that breathes for a patient — or helps them breathe — when their own breathing muscles cannot do the job well enough.",
    embedUrl: "https://sketchfab.com/models/a03a99fab9314aab96fd41ec69acf1a3/embed?autostart=1&camera=0&transparent=1&ui_hint=2",
    posterUrl: ventilatorPoster,
    posterCredit: "Illustration © Encyclopaedia Britannica, Inc.",
    posterFit: "contain",
    modelCredit: "3D model: Medical Ventilator by lazarys on Sketchfab",
    modelCreditUrl: "https://sketchfab.com/3d-models/medical-ventilator-a03a99fab9314aab96fd41ec69acf1a3",
    workingPrinciples: [
      "Computer-controlled breathing: A microprocessor (a small computer) uses sensor feedback to control every breath. It can deliver a set amount of air each time (volume-controlled) or a set pressure (pressure-controlled).",
      "Measured gas supply: Medical air and oxygen arrive under pressure (about 50 psi / 400 kPa). Electric valves (proportional solenoid valves) measure the flow and mix the gases to give the exact oxygen percentage needed.",
      "Gentle positive pressure: The machine pushes oxygen-rich gas into the lungs, helping to open the tiny air sacs (alveoli) so oxygen can pass into the blood.",
      "Breathing out with PEEP: The lungs relax and used air flows back through the breathing-out tube (expiratory limb). A PEEP valve leaves a little pressure in the lungs at the end of the breath so the tiny air sacs do not completely collapse.",
    ],
    clinicalUses: [
      "When breathing fails: Supports patients whose lungs cannot take in enough oxygen — for example severe lung injury (ARDS), pneumonia, a flare-up of COPD, asthma attacks, stroke, sepsis (a life-threatening reaction to infection), or traumatic brain injury.",
      "During surgery: Breathes for the patient while general anaesthesia and muscle-relaxing medicines temporarily stop their own breathing effort.",
      "Two ways of giving support: Through a tight-fitting face mask (non-invasive, such as CPAP or BiPAP) for lighter help, or through a breathing tube placed in the windpipe — via the mouth (endotracheal tube) or the neck (tracheostomy) — for full life support.",
    ],
    components: [
      { name: "Pneumatic Gas Supply & Inlet Regulators", detail: "Where medical air and pure oxygen enter under pressure (about 50 psi / 400 kPa). The regulators steady that pressure before the gas travels further inside." },
      { name: "Gas Blender (Proportioning Valve Assembly)", detail: "Mixes medical air and oxygen to give the exact oxygen percentage prescribed — this percentage is called FiO2. It ranges from 21% (normal air) to 100% pure oxygen." },
      { name: "Microprocessor Unit & Solenoid Control Valves", detail: "The machine's brain. It opens and closes the control valves to decide when each breath starts, how much air flows, and how much pressure is applied." },
      { name: "Heated Humidifier & Conditioning System", detail: "Warms the dry gas to body temperature (about 37°C) and adds moisture (100% relative humidity), protecting the airway lining and preventing mucus from becoming thick and dry." },
      { name: "Patient Breathing Circuit (Inspiratory & Expiratory Limbs)", detail: "Two flexible, ribbed (corrugated) tubes: one carries fresh gas to the patient (inspiratory limb), and the other carries used, carbon-dioxide-rich air away (expiratory limb)." },
      { name: "Patient Interface (Breathing Tube / Mask)", detail: "The connection to the patient: either a breathing tube into the windpipe — through the mouth (endotracheal) or an opening in the neck (tracheostomy) — or a tight-fitting face mask." },
      { name: "Expiratory PEEP Valve & Pathogen Filter", detail: "Controls how easily used air leaves, so a small pressure (PEEP) stays in the lungs to keep the air sacs partly open. The filter traps germs in the outgoing air to protect staff and others nearby." },
      { name: "Inline Monitoring Sensors (Flow, Pressure, & FiO2)", detail: "Sensors constantly measure airflow, pressure, and oxygen level (FiO2) and send the readings to the computer, which fine-tunes each breath. They include pressure transducers, hot-wire flow sensors, and oxygen cells." },
      { name: "Digital Display Monitor & Safety Alarms", detail: "The screen shows live breathing waveforms (pressure and volume graphs) and measurements. Alarms sound and flash if a tube disconnects, pressure rises too high, or power fails." },
    ],
    descriptions: [
      {
        heading: "Overview",
        body: "A mechanical ventilator is a life-support machine that breathes for a patient — fully or partly — when they cannot breathe well enough on their own. It works like a carefully controlled bellows: it pushes oxygen-rich air into the lungs so oxygen can reach the blood, and it clears out carbon dioxide. It is used during severe breathing failure and during surgery under general anaesthesia.",
      },
      {
        heading: "How the Air Travels (Gas Flow Pathway)",
        body: "1. Gas enters: Medical air and pure oxygen arrive under pressure (about 50 psi / 400 kPa) from hospital wall pipelines or small compressors. Regulators at the inlet steady the pressure.\n2. Oxygen is mixed: Inside the gas blender, electric valves mix the air and oxygen to the exact percentage prescribed — called FiO2, from 21% (normal air) to 100% oxygen.\n3. The computer gives a breath: A microprocessor controls the inspiratory valve to deliver the set amount of air (tidal volume), speed of flow, and highest pressure for each breath.\n4. The air is warmed and moistened: The gas passes through a heated humidifier that brings it to body temperature (about 37°C) and adds moisture to protect the soft lining of the airway.\n5. The lungs fill: The warmed gas travels down the breathing-in tube (inspiratory limb) and through a face mask or breathing tube into the lungs, gently inflating the tiny air sacs (alveoli) where oxygen enters the blood.\n6. Used air leaves: The lungs relax and carbon-dioxide-rich air flows back through the breathing-out tube (expiratory limb), through a germ filter, and past the PEEP valve, which keeps a little pressure in the lungs so the air sacs do not collapse completely.",
      },
      {
        heading: "Category Profile",
        body: "Main job: To keep a patient breathing — taking in oxygen and removing carbon dioxide — when their lungs or breathing muscles cannot do it alone, during organ failure or surgery.\nRisk level: High / life-critical. Possible complications include lung infection linked to the breathing tube (ventilator-associated pneumonia), lung injury from pressure (barotrauma), air leaking around the lung (pneumothorax), partly collapsed lung areas (atelectasis), and vocal cord injury.\nRelated devices: Anaesthesia machines, CPAP/BiPAP mask respirators, high-frequency jet ventilators, and ECMO circuits (machines that add oxygen to the blood outside the body).",
      },
    ],
    references: [
      { title: "Basic components of a mechanical ventilator", url: "https://derangedphysiology.com/main/cicm-primary-exam/respiratory-system/Chapter-501/basic-components-mechanical-ventilator", source: "Deranged Physiology" },
      { title: "What Is a Medical Ventilator & How Does It Work?", url: "https://www.impactinstrumentation.com/", source: "Innovative Technologies in Medicine" },
      { title: "Ventilator/Ventilator Support - What Is a Ventilator?", url: "https://www.nhlbi.nih.gov/health/ventilator", source: "NHLBI, NIH" },
      { title: "Ventilator/Ventilator Support - Who Needs a Ventilator", url: "https://www.nhlbi.nih.gov/health/ventilator/who-needs-it", source: "NHLBI, NIH" },
      { title: "Ventilator/Ventilator Support - What to Expect", url: "https://www.nhlbi.nih.gov/health/ventilator/what-to-expect", source: "NHLBI, NIH" },
      { title: "Ventilator/Ventilator Support - Risks of Being on a Ventilator", url: "https://www.nhlbi.nih.gov/health/ventilator/risks", source: "NHLBI, NIH" },
      { title: "What Are Ventilator Parts and Function?", url: "https://www.nai-group.com/what-are-ventilator-parts-and-function/", source: "NAI Group" },
      { title: "Medical ventilators: a breakdown of components and sensors", url: "https://uk.rs-online.com/web/content/smart-advanced-technologies/medical-technology/medical-devices", source: "RS Components" },
    ],
  },
];

export const getDevice = (slug: string) => devices.find((d) => d.slug === slug);

export const resourceTypes = ["Video", "Book", "Article", "Journal", "PDF", "Other"] as const;
export type ResourceType = (typeof resourceTypes)[number];

export type Resource = {
  title: string;
  type: ResourceType;
  url: string;
  source?: string;
  categories: Category[];
  topics?: string;
  note?: string;
};

// Add study materials here. `categories` decides which equipment filters it appears under.
export const resources: Resource[] = [
  // Videos
  {
    title: "NPTEL Biomedical Instrumentation Course",
    type: "Video",
    url: "https://onlinecourses.nptel.ac.in/",
    source: "IIT Madras / NPTEL (Prof. Varadhan SKM)",
    categories: ["Patient Monitoring & Biosignals", "Therapeutic & Surgical"],
    topics: "Sensors, Biopotentials, ECG, EEG, Flowmeters, Defibrillators, Pacemakers",
    note: "Lecture series on electrodes, instrumentation amplifiers, cardiopulmonary monitoring and therapeutic devices.",
  },
  {
    title: "NPTEL Introduction to Biomedical Imaging Systems",
    type: "Video",
    url: "https://www.youtube.com/results?search_query=NPTEL+Introduction+to+Biomedical+Imaging+Systems",
    source: "IIT Kharagpur / NPTEL",
    categories: ["Diagnostic Imaging"],
    topics: "X-Ray, CT, MRI, Ultrasound, Scintigraphy",
    note: "Radiation interactions, CT reconstruction, MRI pulse sequences and transducer optics.",
  },
  {
    title: "MRI Physics Basics & Diagnostic Radiology",
    type: "Video",
    url: "https://radiopaedia.org/articles/mri-physics",
    source: "Radiopaedia",
    categories: ["Diagnostic Imaging"],
    topics: "MRI, CT, General Radiography",
    note: "Larmor precession, gradient encoding, relaxation curves and X-ray target physics.",
  },
  {
    title: "Anesthesia Machines & Mechanical Ventilation Guides",
    type: "Video",
    url: "https://www.youtube.com/results?search_query=full+tour+of+the+anesthesia+machine",
    source: "OpenAnesthesia / Clinical Learning Media",
    categories: ["Life Support & Critical Care"],
    topics: "Mechanical Ventilators, Anaesthesia Workstations",
    note: "Breathing circuits, servo-controlled valves, vaporizer operation and alarms.",
  },
  // Books
  {
    title: "WHO Core Medical Equipment & Technical Series",
    type: "Book",
    url: "https://www.who.int/publications/i/item/WHO-HSS-EHT-DIM-11.03",
    source: "World Health Organization",
    categories: ["Diagnostic Imaging", "Life Support & Critical Care", "Patient Monitoring & Biosignals", "Therapeutic & Surgical", "Laboratory & Sterilization"],
    topics: "Equipment specifications, maintenance, inventory",
    note: "Public-domain reference on specifications, operating principles and maintenance.",
  },
  {
    title: "Handbook of Biomedical Instrumentation (R.S. Khandpur)",
    type: "Book",
    url: "https://www.google.com/search?q=Handbook+of+Biomedical+Instrumentation+Khandpur",
    source: "R.S. Khandpur",
    categories: ["Patient Monitoring & Biosignals", "Life Support & Critical Care"],
    topics: "ECG, EEG, Oximeters, Dialysis, Telemetry",
    note: "Biopotentials, transducer design, circuit schematics and patient safety.",
  },
  {
    title: "Bio-Medical Instrumentation e-Textbook",
    type: "Book",
    url: "https://www.scribd.com/search?query=Biomedical%20Instrumentation%20e-Textbook",
    source: "Open Educational Resources (M-Scheme)",
    categories: ["Patient Monitoring & Biosignals", "Therapeutic & Surgical", "Diagnostic Imaging"],
    topics: "Bioelectric potentials, recorders, therapeutic devices, imaging",
    note: "Introductory text on lead systems, biotelemetry, surgical lasers and shock prevention.",
  },
  {
    title: "LibreTexts Academic Learning Modules",
    type: "Book",
    url: "https://med.libretexts.org/",
    source: "LibreTexts",
    categories: ["Laboratory & Sterilization", "Patient Monitoring & Biosignals"],
    topics: "Medical instrumentation, biosensors, biophysics",
    note: "Open modular textbook on biosensor physics and laboratory instrumentation.",
  },
  // Articles
  {
    title: "Radiopaedia Imaging Physics Knowledge Base",
    type: "Article",
    url: "https://radiopaedia.org/articles/physical-principles-of-ultrasound",
    source: "Radiopaedia Foundation",
    categories: ["Diagnostic Imaging"],
    topics: "MRI, CT, Ultrasound, Digital X-Ray",
    note: "Acoustic impedance, T1/T2 relaxation, beam hardening and detector geometry.",
  },
  {
    title: "Frank's Hospital Workshop Technical Tutorials",
    type: "Article",
    url: "https://www.frankshospitalworkshop.com/",
    source: "Frank Weithöner",
    categories: ["Therapeutic & Surgical", "Laboratory & Sterilization", "Life Support & Critical Care"],
    topics: "Suction Pumps, Oxygen Concentrators, Autoclaves, Centrifuges, Incubators",
    note: "Troubleshooting checklists, component replacement and maintenance.",
  },
  {
    title: "iFixit Medical Device Hardware Documentation",
    type: "Article",
    url: "https://www.ifixit.com/Device/Medical_Device",
    source: "iFixit Global Medical Project",
    categories: ["Patient Monitoring & Biosignals", "Therapeutic & Surgical"],
    topics: "Bedside Monitors, Defibrillators, Syringe Pumps, Pulse Oximeters",
    note: "Teardown photos, block diagrams, parts lists and disassembly guides.",
  },
  {
    title: "Open Critical Care Equipment Guidance",
    type: "Article",
    url: "https://opencriticalcare.org/",
    source: "Open Critical Care Initiative",
    categories: ["Life Support & Critical Care", "Therapeutic & Surgical"],
    topics: "Oxygen delivery, Ventilators, Flowmeters, High-Flow Nasal Cannulae",
    note: "Device selection, oxygen purity testing, manifold setup and circuit safety.",
  },
  // Journals
  {
    title: "BioMedical Engineering OnLine",
    type: "Journal",
    url: "https://biomedical-engineering-online.biomedcentral.com/",
    source: "BioMed Central / Springer Nature",
    categories: ["Patient Monitoring & Biosignals", "Diagnostic Imaging"],
    topics: "Sensors, wearable monitors, diagnostic hardware",
    note: "Fully open-access research on physiological sensors and diagnostic innovations.",
  },
  {
    title: "Journal of Medical Engineering & Technology",
    type: "Journal",
    url: "https://www.tandfonline.com/journals/ijmt20",
    source: "Taylor & Francis",
    categories: ["Diagnostic Imaging", "Life Support & Critical Care", "Patient Monitoring & Biosignals", "Therapeutic & Surgical", "Laboratory & Sterilization"],
    topics: "Clinical engineering, device evaluation, equipment management",
    note: "Field evaluations of devices and performance testing protocols.",
  },
  {
    title: "IEEE Reviews in Biomedical Engineering",
    type: "Journal",
    url: "https://www.embs.org/rbme/",
    source: "IEEE EMBS",
    categories: ["Diagnostic Imaging", "Therapeutic & Surgical", "Patient Monitoring & Biosignals"],
    topics: "Imaging architectures, therapeutic devices, signal processing",
    note: "Review papers on modern medical technologies.",
  },
  // Mechanical Ventilator references
  {
    title: "Basic components of a mechanical ventilator",
    type: "Article",
    url: "https://derangedphysiology.com/main/cicm-primary-exam/respiratory-system/Chapter-501/basic-components-mechanical-ventilator",
    source: "Deranged Physiology",
    categories: ["Life Support & Critical Care"],
    topics: "Mechanical Ventilator, components, gas blender, PEEP valve",
    note: "Breakdown of ventilator components and the pneumatic pathway.",
  },
  {
    title: "What Is a Medical Ventilator & How Does It Work?",
    type: "Article",
    url: "https://www.impactinstrumentation.com/",
    source: "Innovative Technologies in Medicine",
    categories: ["Life Support & Critical Care"],
    topics: "Mechanical Ventilator, positive pressure, FiO2",
    note: "Overview of how medical ventilators deliver controlled breaths.",
  },
  {
    title: "Ventilator/Ventilator Support - What Is a Ventilator?",
    type: "Article",
    url: "https://www.nhlbi.nih.gov/health/ventilator",
    source: "NHLBI, NIH",
    categories: ["Life Support & Critical Care"],
    topics: "Mechanical Ventilator, respiratory failure",
    note: "Patient-friendly explanation of ventilator support.",
  },
  {
    title: "Ventilator/Ventilator Support - Who Needs a Ventilator",
    type: "Article",
    url: "https://www.nhlbi.nih.gov/health/ventilator/who-needs-it",
    source: "NHLBI, NIH",
    categories: ["Life Support & Critical Care"],
    topics: "Mechanical Ventilator, ARDS, pneumonia, COPD, anesthesia",
    note: "Conditions and situations that require ventilation.",
  },
  {
    title: "Ventilator/Ventilator Support - What to Expect",
    type: "Article",
    url: "https://www.nhlbi.nih.gov/health/ventilator/what-to-expect",
    source: "NHLBI, NIH",
    categories: ["Life Support & Critical Care"],
    topics: "Mechanical Ventilator, ICU, intubation",
    note: "What patients and families can expect during ventilation.",
  },
  {
    title: "Ventilator/Ventilator Support - Risks of Being on a Ventilator",
    type: "Article",
    url: "https://www.nhlbi.nih.gov/health/ventilator/risks",
    source: "NHLBI, NIH",
    categories: ["Life Support & Critical Care"],
    topics: "Mechanical Ventilator, pneumonia, barotrauma, pneumothorax",
    note: "Complications associated with mechanical ventilation.",
  },
  {
    title: "What Are Ventilator Parts and Function?",
    type: "Article",
    url: "https://www.nai-group.com/what-are-ventilator-parts-and-function/",
    source: "NAI Group",
    categories: ["Life Support & Critical Care"],
    topics: "Mechanical Ventilator, sensors, valves, breathing circuit",
    note: "Guide to ventilator parts and their functions.",
  },
  {
    title: "Medical ventilators: a breakdown of components and sensors",
    type: "Article",
    url: "https://uk.rs-online.com/web/content/smart-advanced-technologies/medical-technology/medical-devices",
    source: "RS Components",
    categories: ["Life Support & Critical Care"],
    topics: "Mechanical Ventilator, flow sensors, pressure transducers",
    note: "Engineering breakdown of ventilator components and sensors.",
  },
];
