export type VitalData = {
  year: number;
  state: string;
  births: number;
  deaths: number;
};

export const nigerianStates = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", 
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", 
  "FCT - Abuja", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", 
  "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", 
  "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
];

const generateStateData = (state: string, year: number): VitalData => {
  const baseBirths = Math.floor(Math.random() * 20000) + 5000;
  const baseDeaths = Math.floor(baseBirths * (Math.random() * 0.3 + 0.1));
  const yearMultiplier = 1 + (year - 2020) * (Math.random() * 0.05 + 0.01);
  
  return {
    year,
    state,
    births: Math.floor(baseBirths * yearMultiplier),
    deaths: Math.floor(baseDeaths * yearMultiplier),
  };
};

const years = [2020, 2021, 2022, 2023, 2024];
export const vitalData: VitalData[] = nigerianStates.flatMap(state => 
  years.map(year => generateStateData(state, year))
);
