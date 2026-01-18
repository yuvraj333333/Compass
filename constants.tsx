
import { VastuElement, DirectionData, RoomType } from './types';

export const DIRECTIONS: DirectionData[] = [
  {
    id: 'N',
    name: 'North',
    fullName: 'North (Uttar)',
    degree: 0,
    element: VastuElement.WATER,
    significance: 'Wealth, Opportunities, and Money flow.',
    color: '#3b82f6',
    ruler: 'Mercury / Kubera',
    tips: ['Entrance is excellent here.', 'Keep clean and clutter-free.', 'Place blue items.']
  },
  {
    id: 'NNE',
    name: 'NNE',
    fullName: 'North-North-East',
    degree: 22.5,
    element: VastuElement.WATER,
    significance: 'Health, Healing, and Immunity.',
    color: '#3b82f6',
    ruler: 'Ashwini Kumars',
    tips: ['Ideal for medicines.', 'Best place for a health clinic.', 'Avoid fire here.']
  },
  {
    id: 'NE',
    name: 'NE',
    fullName: 'North-East (Ishan)',
    degree: 45,
    element: VastuElement.WATER,
    significance: 'Wisdom, Clarity of Mind, and Spirituality.',
    color: '#3b82f6',
    ruler: 'Jupiter / Shiva',
    tips: ['Best for Puja room.', 'Meditation space.', 'Keep strictly open and light.']
  },
  {
    id: 'ENE',
    name: 'ENE',
    fullName: 'East-North-East',
    degree: 67.5,
    element: VastuElement.AIR,
    significance: 'Refreshment, Fun, and Recreation.',
    color: '#22c55e',
    ruler: 'Indra',
    tips: ['Good for living room.', 'Family lounge.', 'Add green plants.']
  },
  {
    id: 'E',
    name: 'East',
    fullName: 'East (Purva)',
    degree: 90,
    element: VastuElement.AIR,
    significance: 'Social connectivity and Government relations.',
    color: '#22c55e',
    ruler: 'Sun',
    tips: ['Social networking.', 'Main entrance for fame.', 'Window for morning sun.']
  },
  {
    id: 'ESE',
    name: 'ESE',
    fullName: 'East-South-East',
    degree: 112.5,
    element: VastuElement.AIR,
    significance: 'Churning, Anxiety, and Deep Analysis.',
    color: '#22c55e',
    ruler: 'Arjun',
    tips: ['Avoid bedroom here.', 'Good for washing machine.', 'Good for analytical work.']
  },
  {
    id: 'SE',
    name: 'SE',
    fullName: 'South-East (Agni)',
    degree: 135,
    element: VastuElement.FIRE,
    significance: 'Cash flow, Liquidity, and Fire energy.',
    color: '#ef4444',
    ruler: 'Venus',
    tips: ['Ideal for Kitchen.', 'Electrical panels.', 'Place red/orange shades.']
  },
  {
    id: 'SSE',
    name: 'SSE',
    fullName: 'South-South-East',
    degree: 157.5,
    element: VastuElement.FIRE,
    significance: 'Confidence, Strength, and Power.',
    color: '#ef4444',
    ruler: 'Yama',
    tips: ['Increases inner strength.', 'Avoid blue color here.', 'Good for gym or workout area.']
  },
  {
    id: 'S',
    name: 'South',
    fullName: 'South (Dakshin)',
    degree: 180,
    element: VastuElement.FIRE,
    significance: 'Name, Fame, and Relaxation.',
    color: '#ef4444',
    ruler: 'Mars',
    tips: ['Rest and deep sleep.', 'Avoid main gate here usually.', 'Keep heavy furniture here.']
  },
  {
    id: 'SSW',
    name: 'SSW',
    fullName: 'South-South-West',
    degree: 202.5,
    element: VastuElement.EARTH,
    significance: 'Disposal, Waste, and Expenditure.',
    color: '#eab308',
    ruler: 'Nirriti',
    tips: ['Best for Toilets.', 'Dustbins.', 'Avoid any positive activity here.']
  },
  {
    id: 'SW',
    name: 'SW',
    fullName: 'South-West (Nairitya)',
    degree: 225,
    element: VastuElement.EARTH,
    significance: 'Relationships, Skills, and Ancestors.',
    color: '#eab308',
    ruler: 'Rahu',
    tips: ['Master Bedroom.', 'Skills development.', 'Family photos.']
  },
  {
    id: 'WSW',
    name: 'WSW',
    fullName: 'West-South-West',
    degree: 247.5,
    element: VastuElement.SPACE,
    significance: 'Savings, Education, and Knowledge.',
    color: '#94a3b8',
    ruler: 'Varuna',
    tips: ['Study room.', 'Locker or Safe.', 'Bookshelf location.']
  },
  {
    id: 'W',
    name: 'West',
    fullName: 'West (Paschim)',
    degree: 270,
    element: VastuElement.SPACE,
    significance: 'Gains and Profits.',
    color: '#94a3b8',
    ruler: 'Saturn',
    tips: ['Business gains.', 'Dining area.', 'Keep clean and stable.']
  },
  {
    id: 'WNW',
    name: 'WNW',
    fullName: 'West-North-West',
    degree: 292.5,
    element: VastuElement.SPACE,
    significance: 'Depression, Detoxification, and Letting Go.',
    color: '#94a3b8',
    ruler: 'Shesha',
    tips: ['Ideal for guest room.', 'Detoxification area.', 'Avoid core family bedroom.']
  },
  {
    id: 'NW',
    name: 'NW',
    fullName: 'North-West (Vayu)',
    degree: 315,
    element: VastuElement.SPACE,
    significance: 'Support, Banking, and Movement.',
    color: '#94a3b8',
    ruler: 'Moon / Vayu',
    tips: ['Financial support.', 'Finished goods storage.', 'Garage.']
  },
  {
    id: 'NNW',
    name: 'NNW',
    fullName: 'North-North-West',
    degree: 337.5,
    element: VastuElement.WATER,
    significance: 'Attraction, Sex, and Relationship Harmony.',
    color: '#3b82f6',
    ruler: 'Soma',
    tips: ['Marital bliss.', 'Attraction between partners.', 'Pleasant decor.']
  }
];

export const ROOM_TYPES: RoomType[] = [
  { id: 'entrance', label: 'Main Entrance', icon: '🚪' },
  { id: 'kitchen', label: 'Kitchen', icon: '🍳' },
  { id: 'bedroom', label: 'Bedroom', icon: '🛌' },
  { id: 'toilet', label: 'Toilet', icon: '🚽' },
  { id: 'study', label: 'Study Room', icon: '📚' },
  { id: 'puja', label: 'Puja Room', icon: '🪔' },
  { id: 'living', label: 'Living Room', icon: '🛋️' }
];
