export enum ERoomType {
  BEDROOM = "bedroom",
  LOUNGE = "lounge",
  DINER = "diner",
  KITCHEN = "kitchen",
  BATHROOM = "bathroom",
  OFFICE = "office",
}

export enum EFloorType {
  WOOD = "wood",
  CARPET = "carpet",
}

export enum EWindowType {
  BAY = "Bay",
  FLAT = "Flat",
  FULL_HEIGHT = "Full Height",
}

export enum EWindowGlassType {
  TEMPERED = "tempered",
  TRIPLE_GLAZED = "triple glazed",
  DOUBLE_GLAZED = "double glazed",
}

export type Window = {
  type: EWindowType | string;
  glassType: EWindowGlassType;
};

export type Room = {
  type: ERoomType;
  size: number;
  floorType: EFloorType;
  window: number;
  wondows: Window[];
};

export enum EFoundation {
  BRICK = "brick",
  SLAB = "slab",
  REINFORCED_CONCRETE = "reinforced concrete",
}

export enum ERoof {
  STRAW = "straw",
  THATCHED = "thatched",
  TILED = "tiled",
  FLAT = "flat",
}

export type Questionnaire = {
  foundation: EFoundation;
  size: number;
  floor: number;
  roof: ERoof;
  room: number;
  rooms: Room[];
};

export enum EFormStep {
  First,
  Second,
  Three,
}
