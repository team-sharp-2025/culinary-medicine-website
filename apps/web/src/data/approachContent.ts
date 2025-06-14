export interface ApproachContent {
  title: string;
  subtitle: string;
  description: string;
  images: string[];
}

export const approachContentMap: Record<string, ApproachContent> = {
  second_Brain: {
    title: "THE SECOND BRAIN",
    subtitle: "Our approach is built on trusted clinical studies, peer-reviewed research",
    description:
      `The gut, often referred to as our "second brain," plays a crucial role in both physical and mental well-being. This vast network of trillions of microbes in the gut not only aids in digestion and immune function but also produces neurotransmitters, such as serotonin, which regulate mood and emotional well-being.`,
    images: [
      "/sunitha-b-the-sensitive-gut-certificate.PNG",
      "/sunitha-b-6-week-plan-for-healthy-eating-certificate.PNG",
      "/sunitha-b-lose-weight-and-keep-it-off-certificate.PNG",
      "/sunitha-b-managing-your-cholesterol-certificate.PNG",
    ],
  },

  bio_Induviduality: {
    title: "BIO-INDIVIDUALITY",
    subtitle: "Every person is unique and deserves a personalized approach",
    description:
      `Bioindividuality means there is no one-size-fits-all diet. Each person has unique needs influenced by genetics, lifestyle, and environment. Our approach respects individual differences to help find the best fit for your health journey.`,
    images: [
      "/sunitha-b-positive-psychology-certificate.png",
      "/sunitha-b-an-introduction-to-tai-chi-certificate.png",
      "/sunitha-b-cognitive-fitness-certificate.png",
      "/sunitha-b-def0b946-b444-44f8-ab9a-0eaef2417775-certificate.png",
    ],
  },

  culinary_Skills: {
    title: "CULINARY SKILLS",
    subtitle: "Empowering health through food and practical cooking knowledge",
    description:
      `Understanding basic cooking techniques helps individuals prepare healthy meals at home, creating sustainable and delicious eating habits that support long-term wellness.`,
    images: [
      "/HMS-certificate-download.png",
      "/Balasubramaniam, Sunitha (1).png",
      "/sunitha-b-healthy-eating-for-type-2-diabetes-certificate.png",
      "/sunitha-b-controlling-your-blood-pressure-certificate.png",
    ],
  },
};
