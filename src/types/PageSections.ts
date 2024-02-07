interface Section {
  active: boolean;
  viewed: boolean;
}

export interface PageSections {
  [key: string]: Section;
}
