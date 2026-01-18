
export enum VastuElement {
  WATER = 'Water',
  AIR = 'Air',
  FIRE = 'Fire',
  EARTH = 'Earth',
  SPACE = 'Space'
}

export interface DirectionData {
  id: string;
  name: string;
  fullName: string;
  degree: number;
  element: VastuElement;
  significance: string;
  color: string;
  ruler: string;
  tips: string[];
}

export interface RoomType {
  id: string;
  label: string;
  icon: string;
}

export interface VastuRemedy {
  score: number;
  assessment: string;
  remedies: string[];
}
