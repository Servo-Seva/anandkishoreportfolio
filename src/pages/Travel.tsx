import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/ui/motion";
import { ArrowLeft, MapPin, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import travelPhoto1 from "@/assets/travel-photo.jpg";
import travelPhoto2 from "@/assets/travel-photo-2.jpg";
import travelPhoto3 from "@/assets/travel-photo-3.jpg";
import adiyogiPhoto from "@/assets/adiyogi.jpg";
import mysore from "@/assets/mysore.jpg";

const travelPhotos = [
  {
    id: 1,
    src: travelPhoto1,
    title: "Mountain Serenity",
    location: "Dalai Hills, Mussoorie, Uttarakhand, India",
    date: "December 2023",
    description:
      "Dalai Hills is a serene viewpoint near Mussoorie, Uttarakhand, known for its peaceful atmosphere and spiritual charm. Earlier called Happy Valley, the place reflects Tibetan influence, visible through prayer flags and a small Buddha statue. Surrounded by lush green hills and panoramic mountain views, Dalai Hills is ideal for travelers seeking calm away from crowded tourist spots. The gentle breeze, open sky, and quiet walking paths make it perfect for meditation, photography, and sunset views. Located close to Landour, it offers a refreshing escape into nature and mindfulness, making it a hidden gem in the Mussoorie region.",
  },
  {
    id: 2,
    src: travelPhoto2,
    title: "Misty Heights",
    location: "Rishikesh, Uttarakhand, India",
    date: "November 2023",
    description:
      "Rishikesh is a spiritual and adventure hub nestled on the banks of the sacred Ganga River in Uttarakhand. Known as the Yoga Capital of the World, it attracts seekers, saints, and travelers from across the globe. The city is famous for iconic landmarks like Laxman Jhula, Ram Jhula, ancient temples, and serene ashrams offering yoga and meditation. Beyond spirituality, Rishikesh thrills adventure lovers with river rafting, bungee jumping, and trekking. Surrounded by Himalayan foothills, the city blends peace, devotion, and adrenaline, making it a unique destination for both inner exploration and outdoor excitement.",
  },
  {
    id: 3,
    src: travelPhoto3,
    title: "Temple of Love",
    location: "Prem Mandir, Vrindavan, Uttar Pradesh, India",
    date: "October 2023",
    description:
      "Prem Mandir is a magnificent Hindu temple located in Vrindavan, Uttar Pradesh, dedicated to Lord Krishna and Radha. Built with pristine white marble by Jagadguru Shri Kripalu Ji Maharaj, the temple showcases exquisite carvings depicting scenes from Krishna’s life, including Ras Leela and Govardhan Leela. Prem Mandir means “Temple of Divine Love,” symbolizing devotion, purity, and spiritual harmony. The temple looks especially enchanting at night when illuminated with colorful lights. Surrounded by beautifully landscaped gardens, Prem Mandir offers a peaceful and devotional atmosphere, attracting pilgrims and tourists from all over India and the world.",
  },
  {
    id: 3,
    src: mysore,
    title: "Royal Palace",
    location: "Mysore Palace, Mysuru, Karnataka, India",
    date: "October 2023",
    description:
      "Mysore Palace is a grand royal residence located in Mysuru, Karnataka, and one of India’s most iconic palaces. Also known as the Amba Vilas Palace, it showcases Indo-Saracenic architecture with influences of Hindu, Mughal, Rajput, and Gothic styles. The palace was the official residence of the Wadiyar dynasty and is richly decorated with stained glass, carved doors, ornate ceilings, and royal artifacts. Surrounded by lush gardens, it becomes especially breathtaking during Dussehra and when illuminated at night. Mysore Palace reflects royal heritage, cultural pride, and architectural brilliance, making it a major attraction for history lovers and tourists alike.",
  },
  {
    id: 3,
    src: adiyogiPhoto,
    title: "Adiyogi Shiva Statue",
    location: "Coimbatore, Tamil Nadu, India",
    date: "October 2023",
    description:
      "Adiyogi Shiva Statue is a towering symbol of yoga and self transformation, dedicated to Lord Shiva as the first yogi. Located at the Isha Yoga Center in Tamil Nadu, the 112-foot statue represents the 112 ways to attain inner wellbeing through yoga. Adiyogi signifies the source of yogic sciences, from which yoga spread across the world. The statue’s powerful presence inspires stillness, balance, and awareness. Surrounded by the Velliangiri hills, Adiyogi is not just a monument but a spiritual experience that draws seekers, devotees, and travelers in search of inner peace and higher consciousness.",
  },
];

const Travel = () => {
  return (
    <>
      <Helmet>
        <title>Travel | Anand - Full Stack Developer</title>
        <meta
          name="description"
          content="Explore my travel adventures and photography from around the world."
        />
      </Helmet>

      <Navigation />

      <main className="min-h-screen pt-24">
        {/* Header */}
        <section className="section-padding pb-8">
          <div className="container-main">
            <Reveal>
              <Link to="/#about">
                <Button variant="ghost" className="gap-2 mb-8">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Button>
              </Link>

              <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
                Adventures
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                My Travel{" "}
                <span className="font-serif italic font-normal text-primary">
                  Journey
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Beyond the code, I love exploring new places and capturing
                moments. Here are some of my favorite travel memories.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Photo Gallery */}
        <section className="section-padding pt-0">
          <div className="container-main">
            <div className="grid gap-12">
              {travelPhotos.map((photo, index) => (
                <Reveal key={photo.id} delay={index * 0.1}>
                  <div
                    className={`grid lg:grid-cols-2 gap-8 items-center ${
                      index % 2 === 1 ? "lg:flex-row-reverse" : ""
                    }`}
                  >
                    <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                      <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-border/30 bg-gradient-to-br from-primary/10 to-accent/10">
                        <img
                          src={photo.src}
                          alt={photo.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>
                    <div
                      className={`space-y-4 ${
                        index % 2 === 1 ? "lg:order-1" : ""
                      }`}
                    >
                      <h2 className="text-3xl md:text-4xl font-display font-bold">
                        {photo.title}
                      </h2>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary" />
                          {photo.location}
                        </span>
                        <span className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-primary" />
                          {photo.date}
                        </span>
                      </div>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {photo.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Travel;
