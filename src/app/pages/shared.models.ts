export interface ServiceStat {
  value: string;
  label: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}


export interface ServiceData {
  // Unique ID for the accordion so multiple services don't clash
  accordionId: string; 
  // Stats (The ">99%", ">95%", ">40%" section)
  stats: ServiceStat[];
  // The long paragraph text above the stats (optional)
  statsIntroText?: string; 
  // FAQ Section
  faqs: ServiceFaq[];
  // Partner Logos
}