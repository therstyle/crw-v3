interface Section {
  active: boolean;
  viewed: boolean;
  intersectionRatio: number;
  threshold: number;
}

export interface PageSections {
  [key: string]: Section;
}
