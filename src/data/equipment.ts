import ventilatorPoster from "../assets/mechanical-ventilator-illustration.jpg?url";
import mriPoster from "../assets/mri-scanner-cutaway.jpg?url";

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
    examples: "MRI, CT, PET, Diagnostic Ultrasound, Digital X-Ray",
    purpose: "Creating pictures and measurements of internal structures and function without surgery, to help find, diagnose and monitor disease.",
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
    name: "Magnetic Resonance Imaging (MRI) Scanner",
    category: "Diagnostic Imaging",
    risk: "Moderate to High safety control — MRI uses no X-ray (ionising) radiation, but the magnet is always on and can pull ferromagnetic metal, disturb implants or pumps, cause RF heating, and make loud gradient noise. Careful screening is essential.",
    summary: "A diagnostic imaging machine that uses a very strong magnet, radiofrequency (radio-wave) pulses, gradient coils, and a computer to create detailed 2D and 3D pictures of soft tissues, organs, joints, and blood vessels without X-ray (ionising) radiation.",
    embedUrl: "https://sketchfab.com/models/308304dd1771433fb5f37fe9132bb1e7/embed?autostart=1&camera=0",
    posterUrl: mriPoster,
    posterCredit: "Cutaway illustration: 'Essential parts of a modern MRI machine' — Scientific Figure on ResearchGate (accessed 21 Oct 2026)",
    posterCreditUrl: "https://www.researchgate.net/figure/Essential-parts-of-a-modern-MRI-machine-12_fig82_241802473",
    posterFit: "contain",
    modelCredit: "3D model: Magnetic resonance imaging (MRI) by SmartTek Solutions on Sketchfab",
    modelCreditUrl: "https://sketchfab.com/3d-models/magnetic-resonance-imaging-mri-308304dd1771433fb5f37fe9132bb1e7",
    workingPrinciples: [
      "Alignment and precession in B0: The body contains abundant hydrogen nuclei (protons), mostly in water and fat. Each proton behaves like a tiny magnet. The powerful main field (B0, commonly 1.5 T or 3 T) makes a slight excess of protons line up with the field and wobble, or precess, at the Larmor frequency: f = (γ/2π)B0. At 3 T this is about 127.7 MHz.",
      "Radiofrequency excitation: A transmit coil sends a short radiofrequency pulse (B1) tuned exactly to that Larmor frequency. Because the frequency matches, energy is absorbed efficiently and the combined magnetization is tipped by a controlled flip angle. Pulses tuned to the wrong frequency have little effect — this frequency matching is the 'resonance' in MRI.",
      "Gradient spatial encoding: Three gradient coils (Gx, Gy and Gz) briefly make the magnetic field stronger or weaker in a controlled direction, so protons at different positions acquire different frequencies and phases. In a typical 2D sequence, one gradient helps select a slice, another gives a phase code, and another gives a frequency code during readout. This gives every location a mathematical 'address'.",
      "Relaxation and echo capture: When the RF pulse stops, protons gradually return towards alignment (T1 recovery) while their sideways magnetization fades (T2 decay). Fat, water, muscle, cerebrospinal fluid and diseased tissue relax differently. The changing magnetization induces tiny electrical signals (free induction decay or echoes) in receive coils placed close to the body.",
      "Digitization and image reconstruction: The pulse sequence is repeated with many gradient combinations. Low-noise amplifiers boost the faint signals, filters clean them, and analogue-to-digital converters store the samples in a data map called k-space. The reconstruction computer applies Fourier-transform maths (FFT) to convert those coded signals into slices or a 3D volume. Different pulse sequences emphasize anatomy, fluid, fat, blood flow, diffusion or function.",
    ],
    clinicalUses: [
      "Brain and spine: Evaluating brain and spinal tumours, aneurysms, stroke and bleeding, infection, developmental problems, multiple sclerosis and other demyelinating disease, spinal cord compression, and pinched or injured nerves.",
      "Heart and body organs: Assessing heart chambers, valves, congenital heart disease, reduced blood flow and heart-muscle damage; examining liver and bile ducts, kidneys, spleen, pancreas and abdominal or pelvic masses; and staging or monitoring some cancers and inflammatory bowel disease.",
      "Muscles, bones and joints: Investigating ligament, tendon, cartilage and muscle injuries; joint disorders; bone and soft-tissue tumours or infection; and spinal disc disease. MRI is especially valued where soft-tissue detail matters more than the cortical-bone detail shown well by CT.",
      "Specialised examinations: Magnetic resonance angiography (MRA) for narrowed, blocked or weakened blood vessels; breast MRI in selected screening and diagnostic settings; prostate and pelvic imaging; functional MRI for brain activity studies; and diffusion, perfusion or spectroscopy techniques where available.",
    ],
    components: [
      { name: "Superconducting Main Magnet (B0)", detail: "Thousands of turns of niobium-titanium/copper wire carry current with virtually no resistance when kept near absolute zero, producing a strong and stable magnetic field. Most clinical scanners operate at 1.5 T or 3 T, while 7 T systems are specialised. For scale, 1 T equals 10,000 gauss; a 3 T scanner is roughly 60,000 times stronger than Earth's magnetic field. The complete magnet assembly can weigh several tonnes and is normally at field all the time." },
      { name: "Cryogenic Cooling System & Cryostat", detail: "Liquid helium bathes the superconducting coils at about 4 K (about −269°C). A vacuum vessel, thermal shields, coldhead, compressor and chiller limit heat entry and helium boil-off. Modern systems minimise helium loss; a sudden loss of superconductivity is called a quench." },
      { name: "Shim System", detail: "Passive ferromagnetic shims and active superconducting or resistive shim coils fine-tune the main field so it is as uniform (homogeneous) as possible over the imaging volume. Better uniformity means sharper images, more reliable fat suppression, and fewer distortions." },
      { name: "Gradient Coils (Gx, Gy & Gz)", detail: "Three sets of powerful electromagnets inside the magnet produce controlled magnetic-field slopes along X, Y and Z. They switch in less than about a millisecond to encode position. Rapid switching makes the coils vibrate against the main field, causing MRI's familiar knocking and buzzing sounds." },
      { name: "Gradient Amplifiers & Control Processor", detail: "Cabinet-sized amplifiers deliver precisely timed, high currents to the gradient coils. The sequence controller synchronises gradient waveforms with RF pulses and signal sampling, while monitoring limits for heating and peripheral nerve stimulation." },
      { name: "RF Transmit System & Body Coil", detail: "An RF synthesizer/exciter creates a low-power signal at the Larmor frequency and a power amplifier strengthens it for the transmit (often built-in body) coil. Peak pulse power can reach many kilowatts, but pulses are brief; the system monitors specific absorption rate (SAR), a measure of RF energy deposited in tissue." },
      { name: "Local & Phased-Array Receive Coils", detail: "Head, spine, knee, wrist, torso and other anatomy-specific coils contain arrays of small antenna elements placed close to the region being examined. Proximity increases signal-to-noise ratio, and combining several elements can also support faster parallel imaging." },
      { name: "RF Receiver & Digitization Chain", detail: "Low-noise preamplifiers, often located at or near the receive coils, strengthen microvolt-level signals without adding much noise. Receiver electronics filter and demodulate the signal, then analogue-to-digital converters turn it into digital samples for k-space." },
      { name: "Noise Suppression & Artifact Control", detail: "Filtering, receiver blanking, shielding, spike detection and correction software reduce electrical transients and unwanted interference that could appear as lines, ghosts or zipper artifacts in the image. Quality-control scans help detect problems early." },
      { name: "Patient Table & Cradle", detail: "A non-magnetic, motorised table moves the patient smoothly into the bore and positions the body part at magnet isocenter with sub-millimetre to millimetre precision (model dependent). Some tabletops dock or detach for patient transfer, and positioning pads improve comfort and reduce movement." },
      { name: "Laser Landmarking System", detail: "Low-power laser crosshairs project reference lines onto the patient or coil so the operator can align the anatomy of interest with scanner isocenter before the table moves into the magnet." },
      { name: "Operator Console & Imaging Software", detail: "Workstations in the control room run scan protocols, display positioning images and reconstructed scans, and record patient and sequence information. The operator communicates with the patient through an intercom and observes them through the shielded window or camera system." },
      { name: "Image Reconstruction Computer", detail: "High-performance processors (often including GPUs) turn raw k-space data into images using Fourier transforms and corrections for coil sensitivity, field imperfections and motion. Finished images are displayed, archived, and commonly sent to hospital PACS systems." },
      { name: "Power Distribution & Equipment Cabinets", detail: "Electrical cabinets distribute regulated power to gradient amplifiers, RF amplifiers, computers, cooling equipment and controls. RF filters on cables entering the scan room prevent unwanted radio noise from being carried through the shield." },
      { name: "RF Shielding (Faraday Cage)", detail: "Copper or other conductive shielding incorporated into the scan-room walls, door, floor, ceiling and window blocks outside radiofrequency interference and contains the scanner's RF pulses. It is separate from magnetic shielding used to limit the stray (fringe) magnetic field." },
      { name: "Safety, Monitoring & Emergency Systems", detail: "Controlled-access zones, screening procedures, hearing protection, an emergency call bulb/button, intercom and patient observation reduce risk. Some suites add ferromagnetic-detection systems. A quench pipe safely vents helium gas outside; burst disks, relief valves, quench-protection circuits and an emergency magnet rundown are for trained personnel and genuine emergencies, not routine shutdown." },
    ],
    descriptions: [
      {
        heading: "Overview",
        body: "Magnetic Resonance Imaging (MRI) is a non-invasive way to look inside the body. Instead of taking a shadow picture with X-rays, it listens to how hydrogen protons in water and fat respond inside a strong magnetic field after carefully timed radiofrequency pulses. A computer converts those responses into highly detailed cross-sectional pictures that can be viewed in any plane or assembled into 3D views.\n\nMRI is especially good at separating soft tissues — for example grey matter from white matter in the brain, cartilage from ligament in a joint, or a tumour from nearby normal tissue. It uses no ionising radiation. That does not make it risk-free, however: the powerful magnet remains on, so every patient, staff member, device and loose object must be screened before entering the magnet room (ACR Zone IV).",
      },
      {
        heading: "How a Scan Is Made, Step by Step",
        body: "1. Screening and positioning: Staff check for implants, devices and metal fragments, help the patient onto the table, fit the appropriate receive coil and hearing protection, and use laser crosshairs to place the area of interest at scanner isocenter — the point where the magnetic field and gradients are best controlled.\n2. Proton alignment: As the table moves into the bore, the main field B0 makes a slight excess of hydrogen protons align and precess at the Larmor frequency. This creates a small net magnetization along the field.\n3. RF excitation: The transmit coil sends a short B1 pulse at exactly that frequency, tipping the magnetization by a chosen flip angle and creating a measurable sideways component.\n4. Position coding: Gradient coils switch rapidly in X, Y and Z. They select the slice and give each location a unique frequency/phase code while the scanner records the returning signal.\n5. Relaxation and signal capture: After excitation, T1 recovery and T2 decay proceed at rates influenced by tissue composition and the local microscopic environment. Receive coils detect the small changing signals; their timing and strength create contrast between tissues.\n6. Reconstruction: Steps 3–5 repeat until enough coded samples fill k-space. The reconstruction computer applies a Fourier transform to place signal contributions into pixels (or voxels in 3D), corrects errors, and displays the finished images for the radiologist or other clinician to interpret.",
      },
      {
        heading: "Magnet Types & Scanner Designs",
        body: "Superconducting electromagnets: The standard design for most 1.5 T and 3 T clinical scanners and stronger specialised systems. Liquid-helium cooling keeps the wire near 4 K so it carries a persistent current with virtually no electrical resistance. This gives a strong, stable and uniform field but requires cryogenics, shielding, a quench vent and careful siting.\nPermanent magnets: Made from permanently magnetised material, usually at lower field strength (often below 0.5 T). They need no cryogens and are commonly used in C-shaped open designs, but the assemblies can be very heavy and lower field can mean lower signal-to-noise ratio.\nResistive electromagnets: Conventional current-carrying coils that can be switched off. They generate substantial heat and consume power, provide lower field than most superconducting systems, and are now less common for whole-body clinical MRI.\nClosed-bore, open and upright designs: Conventional superconducting systems use a cylindrical bore and generally provide the strongest, most uniform field. Open scanners use separated magnet poles for easier access and less claustrophobia, commonly at lower field. Upright/positional systems can image a person sitting or standing where available.",
      },
      {
        heading: "Patient Preparation & Safety",
        body: "Before the scan: The MRI team asks about pacemakers and defibrillators, neurostimulators, cochlear implants, drug-infusion pumps, spinal cord stimulators, shunts, aneurysm clips or coils, stents and filters, surgical hardware, shrapnel or metal in the eye, and devices worn on the body such as continuous glucose monitors and insulin pumps. Jewellery, watches, hair accessories, removable dental work and other metal items are removed as instructed. Many modern implants are 'MR Conditional', meaning they may be scanned only under defined conditions — never assume a device is safe.\n\nDuring the scan: The patient lies on a padded table, often with a coil around the area being examined. Scans commonly take about 30–60 minutes, but timing varies. Gradient coils make loud knocking or buzzing, so earplugs or headphones are provided. The patient should lie as still as possible and can communicate through an intercom and emergency call button or squeeze bulb. Some examinations use an intravenous contrast agent when a clinician judges it appropriate.\n\nWhy screening matters: Ferromagnetic objects can be pulled violently toward the magnet (projectile effect). Magnetic fields and gradient/RF energy can move, heat, reset or interfere with some implants and external devices, and leads or loops on the skin can contribute to burns. These risks are controlled by trained staff, controlled-access zones, checklists and device-specific guidance.",
      },
      {
        heading: "Modern Innovations",
        body: "Quantitative MRI (qMRI): Instead of only producing pictures where brightness depends on scanner settings, qMRI aims to measure tissue properties such as T1, T2, fat fraction, stiffness or flow in repeatable units. NIST-supported MRI phantoms — test objects containing known materials — help sites calibrate scanners, compare results between hospitals and check whether a measured change is real.\nPortable low-field MRI: Smaller systems, particularly for bedside brain imaging, reduce siting demands and may improve access for critically ill patients or lower-resource settings. Lower field produces less signal, so sensitive coils, efficient sequences and computational or AI-based image enhancement are used to improve quality; they complement rather than replace conventional high-field scanners for many examinations.\nFaster and smarter imaging: Parallel imaging, compressed sensing, simultaneous multi-slice acquisition and AI reconstruction can shorten scans or reduce noise. Quieter gradient waveforms, wider/shorter bores and in-bore entertainment also improve comfort. These advances still depend on validation so image enhancement does not invent or hide clinically important detail.",
      },
      {
        heading: "Category Profile",
        body: "Main job: To create detailed 2D and 3D diagnostic pictures and, increasingly, quantitative measurements of internal organs, soft tissues, joints, blood vessels and function without surgery or ionising radiation.\nRisk level: Moderate to High safety control. The hazard is not X-ray exposure; it is the always-on static magnetic field, time-varying gradient fields, RF energy deposition, acoustic noise and interactions with metals or implanted/worn devices. Controlled access and screening are mandatory.\nRelated devices: Computed Tomography (CT), Positron Emission Tomography (PET), Diagnostic Ultrasound, Digital X-Ray and Magnetic Resonance Angiography (MRA) systems/sequences.",
      },
    ],
    references: [
      { title: "How Does an MRI Machine Work?", url: "https://www.nist.gov/how-do-you-measure-it/how-does-mri-machine-work", source: "National Institute of Standards and Technology (NIST)" },
      { title: "MR Machine — FRCR Physics Notes", url: "https://www.radiologycafe.com/frcr-physics-notes/mr-imaging/mr-machine/", source: "Radiology Cafe" },
      { title: "MRI Scanner Components: How MRI Machines Work & Key Parts", url: "https://www.medicalimagingsource.com/mri-scanner-components-explained", source: "Medical Imaging Source" },
      { title: "Magnetic Resonance Imaging (MRI): Overview, Procedure & Results", url: "https://my.clevelandclinic.org/health/diagnostics/4876-magnetic-resonance-imaging-mri", source: "Cleveland Clinic" },
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
  // MRI Scanner references
  {
    title: "How Does an MRI Machine Work?",
    type: "Article",
    url: "https://www.nist.gov/how-do-you-measure-it/how-does-mri-machine-work",
    source: "National Institute of Standards and Technology (NIST)",
    categories: ["Diagnostic Imaging"],
    topics: "MRI, proton precession, Larmor frequency, gradients, quantitative MRI, portable MRI",
    note: "Plain-language explanation from the United States national metrology institute, including quantitative MRI and low-field innovation.",
  },
  {
    title: "MR Machine — FRCR Physics Notes",
    type: "Article",
    url: "https://www.radiologycafe.com/frcr-physics-notes/mr-imaging/mr-machine/",
    source: "Radiology Cafe",
    categories: ["Diagnostic Imaging"],
    topics: "MRI, superconducting magnet, helium cooling, shim coils, gradient coils, RF coils",
    note: "Concise hardware notes for radiology physics, including magnet types and the origin of gradient noise.",
  },
  {
    title: "MRI Scanner Components: How MRI Machines Work & Key Parts",
    type: "Article",
    url: "https://www.medicalimagingsource.com/mri-scanner-components-explained",
    source: "Medical Imaging Source",
    categories: ["Diagnostic Imaging"],
    topics: "MRI components, cryostat, quench system, patient table, RF shielding, safety systems",
    note: "Component-by-component guide to the magnet, cryogenic, RF, computing, shielding and emergency systems.",
  },
  {
    title: "Magnetic Resonance Imaging (MRI): Overview, Procedure & Results",
    type: "Article",
    url: "https://my.clevelandclinic.org/health/diagnostics/4876-magnetic-resonance-imaging-mri",
    source: "Cleveland Clinic",
    categories: ["Diagnostic Imaging"],
    topics: "MRI uses, patient preparation, implant screening, procedure, safety",
    note: "Patient-friendly guide to why MRI is used, how to prepare, and why implants and metal objects must be disclosed.",
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
  // Cited media and 3D model sources used on equipment pages
  {
    title: "Essential parts of a modern MRI machine (poster image source)",
    type: "Other",
    url: "https://www.researchgate.net/figure/Essential-parts-of-a-modern-MRI-machine-12_fig82_241802473",
    source: "ResearchGate",
    categories: ["Diagnostic Imaging"],
    topics: "MRI Scanner, cutaway illustration, cited media source",
    note: "Scientific figure page for the MRI cutaway illustration used as the MRI page's click-to-load viewer poster (accessed 21 Oct 2026).",
  },
  {
    title: "HDYMI MRI animation (GIF source)",
    type: "Other",
    url: "https://www.nist.gov/image/hdymi-mri-animation",
    source: "N. Hanacek / NIST",
    categories: ["Diagnostic Imaging"],
    topics: "MRI Scanner, animation, cited media source",
    note: "Source page for the animated NIST GIF shown above the MRI 3D viewport.",
  },
  {
    title: "Magnetic resonance imaging (MRI) — 3D model",
    type: "Other",
    url: "https://sketchfab.com/3d-models/magnetic-resonance-imaging-mri-308304dd1771433fb5f37fe9132bb1e7",
    source: "SmartTek Solutions / Sketchfab",
    categories: ["Diagnostic Imaging"],
    topics: "MRI Scanner, interactive 3D model, cited model source",
    note: "Sketchfab model embedded on the MRI Scanner page after the visitor selects View 3D model.",
  },
  {
    title: "Mechanical ventilation (article and poster illustration source)",
    type: "Article",
    url: "https://www.britannica.com/science/mechanical-ventilation",
    source: "Encyclopaedia Britannica",
    categories: ["Life Support & Critical Care"],
    topics: "Mechanical Ventilator, parts and operation illustration, cited media source",
    note: "Britannica article containing the mechanical ventilator parts-and-operation illustration used as the ventilator page poster.",
  },
  {
    title: "Medical Ventilator — 3D model",
    type: "Other",
    url: "https://sketchfab.com/3d-models/medical-ventilator-a03a99fab9314aab96fd41ec69acf1a3",
    source: "lazarys / Sketchfab",
    categories: ["Life Support & Critical Care"],
    topics: "Mechanical Ventilator, interactive 3D model, cited model source",
    note: "Sketchfab model embedded on the Mechanical Ventilator page after the visitor selects View 3D model.",
  },
];
