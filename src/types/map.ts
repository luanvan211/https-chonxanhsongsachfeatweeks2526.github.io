export interface CoffeeShop {
  id: string;
  name: string;
  lat: number;
  lng: number;
  isRegistered: boolean;
  address: string;
  contact?: string;
  vouchers?: {
    id: string;
    title: string;
    discount: string;
  }[];
}

// District 1 HCMC ONLY
export const MOCK_SHOPS: CoffeeShop[] = [
  {
    id: '1',
    name: 'The Coffee House - Signature',
    lat: 10.7769,
    lng: 106.7009,
    isRegistered: true,
    address: '141 Nguyen Hue, District 1, HCMC',
    vouchers: [
      { id: 'v1', title: 'Refill Discount', discount: '20% Off' },
      { id: 'v2', title: 'Green Gift', discount: 'Free Topping' }
    ]
  },
  {
    id: '2',
    name: 'Highlands Coffee - Post Office',
    lat: 10.7797,
    lng: 106.6999,
    isRegistered: true,
    address: '2 Cong Xa Paris, District 1, HCMC',
    vouchers: [
      { id: 'v1', title: 'Eco Saver', discount: '10% Off' }
    ]
  },
  {
    id: '3',
    name: 'Cong Caphe - Mac Thi Buoi',
    lat: 10.7758,
    lng: 106.7034,
    isRegistered: false,
    address: '26 Mac Thi Buoi, District 1, HCMC',
    contact: '028 3829 2175'
  },
  {
    id: '4',
    name: 'L’Usine - Le Loi',
    lat: 10.7738,
    lng: 106.7011,
    isRegistered: true,
    address: '70 Le Loi, District 1, HCMC',
    vouchers: [
      { id: 'v4', title: 'Brunch Special', discount: 'Free Coffee with Refill' }
    ]
  }
];
