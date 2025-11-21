export interface Emperor {
  id: string;
  name: string; // Personal name (e.g., Aisin Gioro Xuanye)
  templeName: string; // Miaohao (e.g., Qing Shengzu)
  eraName: string; // Nianhao (e.g., Kangxi)
  reign: string; // Years of reign
  description: string; // Short bio
  image: string; // URL to image
  generation: number; // For vertical positioning guidance
}

export interface Link {
  source: string;
  target: string;
  label: string; // Relationship type (e.g., "Father", "Son")
}

export interface GraphData {
  nodes: Emperor[];
  links: Link[];
}
