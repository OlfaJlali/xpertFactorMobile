export interface SlideType {
    id: string;
    image: any;
    title: string;
    subtitle: string;
  }
  export interface FooterProps {
    currentSlideIndex: number;
    slides: SlideType[];
    skip: () => void;
    goToNextSlide: () => void;
    navigation: any; 
  }
  
  