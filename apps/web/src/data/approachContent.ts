export interface ApproachContent {
  title: string;
  subtitle: string;
  description: string;
  images: string[];
}

export const approachContentMap: Record<string, ApproachContent> = {
  second_brain: {
    title: "The Second Brain",
    subtitle: "The gut, filled with a diverse microbiome and often called our 'second brain,' produces mood-regulating chemicals like serotonin. A balanced gut can enhance mood and reduce cravings for unhealthy foods.",
    description:
      `The gut, often referred to as our "second brain," plays a crucial role in both physical and
      mental well-being. This vast network of trillions of microbes in the gut not only aids in
      digestion and immune function but also produces neurotransmitters, such as serotonin,
      which regulate mood and emotional well-being. About 90% of the body's serotonin is
      made in the gut. These gut microbes communicate with the brain through a complex
      system known as the gut-brain axis. When the gut is balanced and healthy, nourished by
      a diet rich in fibre, fermented foods, and diverse plant-based nutrients, it can positively
      influence our mood and help curb cravings for unhealthy, processed foods. Thus,
      maintaining a healthy gut isn't just about digestion; it's deeply connected to emotional
      resilience and overall happiness.`,
    images: [
      "/sunitha-b-the-sensitive-gut-certificate.PNG",
      "/sunitha-b-6-week-plan-for-healthy-eating-certificate.PNG",
      "/sunitha-b-lose-weight-and-keep-it-off-certificate.PNG",
      "/sunitha-b-managing-your-cholesterol-certificate.PNG",
    ],
  },

  bio_individuality: {
    title: "Bio Individuality",
    subtitle: "Each of us processes food differently. While various dietary approaches may be practical, it's essential to tune into our body’s signals and behaviours to discover what truly supports our health and well-being.",
    description:
        `Bio-individuality is the concept that each person has unique nutritional needs based on
        genetics, metabolism, lifestyle, health conditions, and cultural background. This means
        that there’s no single “perfect” diet that works for everyone. While general dietary
        guidelines can offer helpful direction, they may not fully align with how our body
        responds to certain foods. Paying attention to how we feel after eating, including our
        energy levels, digestion, mood, and cravings, can provide valuable insights into what
        supports our health and well-being. By respecting these personal cues, we can make
        informed food choices tailored to our body’s needs rather than following a
        one-size-fits-all plan.`,
    images: [
      "/sunitha-b-positive-psychology-certificate.PNG",
      "/sunitha-b-an-introduction-to-tai-chi-certificate.PNG",
      "/sunitha-b-cognitive-fitness-certificate.PNG",
      "/sunitha-b-def0b946-b444-44f8-ab9a-0eaef2417775-certificate.PNG",
    ],
  },

  culinary_skills: {
    title: "CULINARY SKILLS",
    subtitle: "Healthy cooking doesn't have to be dull or time-consuming. With simple techniques and the right ingredients, we can create delicious and nourishing meals.",
    description:
      `Healthy cooking is often misunderstood as bland or diﬃcult, but it can be both
      enjoyable and rewarding when approached correctly. By mastering simple techniques
      and selecting fresh, wholesome ingredients, we can prepare meals rich in flavour and
      packed with nutrients. Culinary skills empower us to transform everyday foods into
      satisfying dishes that support our health without sacrificing taste or convenience. With
      some creativity and planning, cooking becomes a joyful act of self-care rather than a
      chore.`,
    images: [
      "/HMS-certificate-download.PNG",
      "/Balasubramaniam, Sunitha (1).PNG",
      "/sunitha-b-healthy-eating-for-type-2-diabetes-certificate.PNG",
      "/sunitha-b-controlling-your-blood-pressure-certificate.PNG",
    ],
  },
};
